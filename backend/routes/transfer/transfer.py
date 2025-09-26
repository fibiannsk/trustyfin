from flask import current_app
from flask import Blueprint, request, jsonify
from backend.extensions import db
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.decorators import block_check_required
import hashlib



def color_from_text(text: str) -> str:
    """
    Generate a consistent HEX color from a string (narration).
    """
    hex_digest = hashlib.md5(text.encode("utf-8")).hexdigest()
    return f"#{hex_digest[:6]}"

transfer_blueprint = Blueprint('transfer', __name__)

# ----------------- Transfer Endpoint -----------------
@transfer_blueprint.route('/', methods=['POST'])
@jwt_required()
@block_check_required
def transfer():
    sender_id = get_jwt_identity()
    data = request.get_json()
    print("📩 Full Incoming Data:", data)

    from backend.tasks.email_tasks import send_transaction_email_task   # 👈 import celery task

    from_account = data.get('fromAccount')
    beneficiary_bank = data.get('beneficiaryBank')
    beneficiary_account = data.get('beneficiaryAccount')
    beneficiary_name = data.get('beneficiaryName')
    narration = data.get('narration')
    pin = data.get('pin')
    save_beneficiary = data.get('saveBeneficiary', False)
    transaction_id = data.get('transactionId')
    
    print("🔎 Incoming transaction_id:", transaction_id)  # Debug log

    if not transaction_id:
        return jsonify({"error": "Transaction ID missing"}), 400

    # Validate amount
    try:
        amount = float(data.get('amount'))
        if amount <= 0:
            return jsonify({"error": "Transfer amount must be greater than zero"}), 400
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid transfer amount"}), 400

    # Prevent self-transfer
    if from_account == beneficiary_account:
        return jsonify({"error": "You cannot transfer to the same account"}), 400

    # Find sender
    sender = db.users.find_one({'accountNumber': from_account})
    if not sender:
        return jsonify({"error": "Contact your Bank, there seems to be a problem with your account"}), 404

    # Check PIN
    if str(sender['pin']) != str(pin):
        return jsonify({"error": "Invalid pin"}), 401

    # Check balance
    balance = float(sender['balance'])

    if balance < amount:
        return jsonify({"error": "Oops! Insufficient balance"}), 400


     # ----------------- Helper: Mask Account -----------------
    def mask_account_number(account_number: str) -> str:
        if len(account_number) < 6:
            return account_number  # too short, return as-is
        return f"{account_number[0]}XX..{account_number[-2]}X"

    masked_from_account = mask_account_number(from_account)
    masked_beneficiary_account = mask_account_number(beneficiary_account)

    # Deduct from sender
    new_balance = int(sender['balance']) - int(amount)

    db.users.update_one(
        {"accountNumber": from_account},
        {"$set": {"balance": new_balance}}
    )

    # Build sender full name once
    sender_name = f"{sender.get('firstName', '')} {sender.get('lastName', '')}".strip()
    if not sender_name:
        sender_name = "Customer"

    # Record debit transaction
    sender_transaction = {
        'user_id': sender_id,
        'initiator_name': sender_name,   # 👈 added here
        "transaction_id": transaction_id,
        'from_account': from_account,
        'masked_from_account': masked_from_account,
        'beneficiary_bank': beneficiary_bank,
        'beneficiary_account': beneficiary_account,
        'masked_beneficiary_account': masked_beneficiary_account,
        'beneficiary_name': beneficiary_name,
        'amount': amount,
        'narration': narration,
        'timestamp': datetime.now(),
        'type': 'debit'
    }
    db.transactions.insert_one(sender_transaction)

    # Enqueue debit email notification
    try:
        customer_name = f"{sender.get('firstName', '')} {sender.get('lastName', '')}".strip()
        if not customer_name:
            customer_name = "Customer"

        payload = {
            "email": sender.get("email"),
            "customer_name": customer_name,
            "amount": f"${amount:.2f}",
            "transaction_type": "DEBIT",  # keep consistent with CREDIT
            "currency": sender.get("currency", "USD"),
            "maskedAccountNumber": masked_sender_account,
            "narration": narration,
            "reference": transaction_id,
            "dateTime": datetime.now().strftime("%d-%b-%Y %H:%M"),
            "availableBalance": f"{new_balance:,.2f}",
            "clearedBalance": f"{new_balance:,.2f}",
            "template": "transaction",
            "accountNumber": sender.get("accountNumber"),
            "status": sender.get("status", "Active"),
        }

        send_transaction_email_task.delay(payload)
        
    except Exception as e:
        current_app.logger.exception("❌ Failed to enqueue debit email task: %s", e)


    # Expense record
    expense = {
        'user_id': sender_id,
        'accountNumber': from_account,
        'amount': amount,
        'narration': narration,
        'category': 'Transfer',
        'timestamp': datetime.now(),
    }
    db.expenses.insert_one(expense)

    # ----------------- HANDLE CREDIT (if internal) -----------------
    recipient = db.users.find_one({'accountNumber': beneficiary_account})
    if recipient:  # ✅ only if beneficiary exists in your system
        recipient_new_balance = float(recipient['balance']) + amount
        db.users.update_one(
            {"accountNumber": beneficiary_account},
            {"$set": {"balance": recipient_new_balance}}
        )

        credit_transaction = {
            'user_id': str(recipient['_id']),  # recipient's user ID
            'initiator_name': sender_name,   # 👈 added here
            "transaction_id": transaction_id,
            'from_account': from_account,
            'masked_from_account': masked_from_account,
            'beneficiary_bank': beneficiary_bank,
            'beneficiary_account': beneficiary_account,
            'masked_beneficiary_account': masked_beneficiary_account,
            'beneficiary_name': beneficiary_name,
            'amount': amount,
            'narration': narration,
            'timestamp': datetime.now(),
            'type': 'credit'
        }
        db.transactions.insert_one(credit_transaction)
    
    # Enqueue credit email notification
        try:
            # Combine firstName and lastName into a full name
            customer_name = f"{recipient.get('firstName', '')} {recipient.get('lastName', '')}".strip()
            if not customer_name:
                customer_name = "Customer"

            payload = {
                "email": recipient['email'],
                "customer_name": recipient.get("fullName", "Customer"),
                "amount": f"${amount:.2f}",
                "transaction_type": "CREDIT",
                "currency": "USD",
                "maskedAccountNumber": masked_beneficiary_account,
                "narration": narration,
                "reference": transaction_id,
                "dateTime": datetime.now().strftime("%d-%b-%Y %H:%M"),
                "availableBalance": f"{recipient_new_balance:,.2f}",
                "clearedBalance": f"{recipient_new_balance:,.2f}",
                "template": "transaction"
            }
            send_transaction_email_task.delay(payload)
        except Exception as e:
            current_app.logger.exception("❌ Failed to enqueue credit email task: %s", e)

    # ✅ Save Beneficiary (for both internal & external transfers)
    if save_beneficiary:
        db.beneficiaries.update_one(
            {
                "user_id": sender_id,
                "accountNumber": beneficiary_account,
                "bank": beneficiary_bank
            },
            {
                "$set": {
                    "name": beneficiary_name,
                    "bank": beneficiary_bank,
                    "accountNumber": beneficiary_account,
                    "lastUsed": datetime.now()
                }
            },
            upsert=True
        )

    return jsonify({
        "message": "Transfer successful",
         "transaction_id": transaction_id
        }), 200




# ----------------- Transaction Summary -----------------
@transfer_blueprint.route("/transactions/summary", methods=["GET"])
@jwt_required()
def get_transaction_summary():
    user_id = get_jwt_identity()

    # Fetch only this user's transactions
    transactions = list(db.transactions.find({"user_id": user_id}))

    def safe_amount(value):
        """Convert amount to float safely, default 0 on error."""
        try:
            return float(value)
        except (ValueError, TypeError):
            return 0.0

    income = sum(safe_amount(t.get("amount", 0)) for t in transactions if t.get("type") == "credit")
    expenses = sum(safe_amount(t.get("amount", 0)) for t in transactions if t.get("type") == "debit")
    net_income = income - expenses

    # Format transactions for JSON response
    formatted_transactions = []
    for t in transactions:
        formatted_transactions.append({
            **{k: v for k, v in t.items() if k != "_id"},  # copy everything except raw _id
            "_id": str(t["_id"]),  # ✅ convert ObjectId to string
            "amount": safe_amount(t.get("amount", 0)),  # ✅ always numeric
            "timestamp": t["timestamp"].isoformat() if "timestamp" in t else None
        })

    # Collect unique beneficiaries from debit transactions
    beneficiaries = {}
    for t in transactions:
        if t.get("type") == "debit":  # ✅ only outgoing transfers
            acct = t.get("beneficiary_account")
            name = t.get("beneficiary_name")
            bank = t.get("beneficiary_bank")

            if acct and acct not in beneficiaries:
                beneficiaries[acct] = {
                    "account_number": acct,
                    "name": name,
                    "bank": bank
                }

    return jsonify({
        "income": income,
        "expenses": expenses,
        "net_income": net_income,
        "transactions": formatted_transactions,
        "beneficiaries": list(beneficiaries.values())  # ✅ unique list
    }), 200


@transfer_blueprint.route("/beneficiaries", methods=['GET'])
@jwt_required()
def get_beneficiaries():
    user_id = get_jwt_identity()

    beneficiaries = list(db.beneficiaries.find({"user_id": user_id}))
    for b in beneficiaries:
        b["_id"] = str(b["_id"])  # convert ObjectId to string
    return jsonify(beneficiaries), 200

# ----------------- Get User Transactions (Paginated) -----------------
@transfer_blueprint.route("/transactions", methods=["GET"])
@jwt_required()
@block_check_required
def get_transactions():
    user_id = get_jwt_identity()

    # Optional filters
    txn_type = request.args.get("type")  # "debit" | "credit" | None
    page = int(request.args.get("page", 1))       # default: 1
    limit = int(request.args.get("limit", 10))    # default: 10

    if page < 1: 
        page = 1
    if limit < 1: 
        limit = 10

    query = {"user_id": user_id}
    if txn_type in ["debit", "credit"]:
        query["type"] = txn_type

    # Total count for pagination
    total = db.transactions.count_documents(query)

    # Fetch transactions with skip & limit
    transactions = (
        db.transactions.find(query)
        .sort("timestamp", -1)
        .skip((page - 1) * limit)
        .limit(limit)
    )

    # Format response
    formatted = []
    for t in transactions:
        formatted.append({
            "_id": str(t["_id"]),
            "transaction_id": t.get("transaction_id"),
            "from_account": t.get("from_account"),
            "beneficiary_bank": t.get("beneficiary_bank"),
            "beneficiary_account": t.get("beneficiary_account"),
            "beneficiary_name": t.get("beneficiary_name"),
            "amount": t.get("amount"),
            "narration": t.get("narration"),
            "type": t.get("type"),
            "timestamp": t.get("timestamp").isoformat() if "timestamp" in t else None
        })

    return jsonify({
        "page": page,
        "limit": limit,
        "total": total,
        "pages": (total + limit - 1) // limit,  # total pages (ceiling division)
        "transactions": formatted
    }), 200


@transfer_blueprint.route("/transactions/spending-chart", methods=["GET", "OPTIONS"])
def spending_chart_options():
    # Handle the preflight CORS OPTIONS request
    if request.method == "OPTIONS":
        return "", 204
    return protected_spending_chart()


@jwt_required()
def protected_spending_chart():
    user_id = get_jwt_identity()

    now = datetime.utcnow()
    start_of_month = datetime(now.year, now.month, 1)

    # ✅ fetch only this month’s debit transactions for this user
    transactions = list(db.transactions.find({
        "user_id": user_id,
        "type": "debit",
        "timestamp": {"$gte": start_of_month}
    }))

    def safe_amount(value):
        try:
            return float(value)
        except (ValueError, TypeError):
            return 0.0

    # ✅ group spending by narration
    spending_summary = {}
    for t in transactions:
        narration = t.get("narration", "Other") or "Other"
        amount = safe_amount(t.get("amount", 0))
        spending_summary[narration] = spending_summary.get(narration, 0) + amount

    total_spending = sum(spending_summary.values())

    # ✅ build chart data
    chart_data = []
    other_total = 0

    for narration, total in spending_summary.items():
        percent = (total / total_spending) * 100 if total_spending else 0
        if percent < 5:  # merge small categories into "Other"
            other_total += total
        else:
            chart_data.append({
                "name": narration,
                "value": total,
                "color": color_from_text(narration)
            })

    # ✅ add "Other" if needed
    if other_total > 0:
        chart_data.append({
            "name": "Other",
            "value": other_total,
            "color": "#6B7280"
        })

    # ✅ sort biggest → smallest
    chart_data.sort(key=lambda x: x["value"], reverse=True)

    return jsonify(chart_data), 200
