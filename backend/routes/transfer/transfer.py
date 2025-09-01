from flask import Blueprint, request, jsonify
from backend.extensions import db
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity

transfer_blueprint = Blueprint('transfer', __name__)

# ----------------- Transfer Endpoint -----------------
@transfer_blueprint.route('/', methods=['POST'])
@jwt_required()
def transfer():
    sender_id = get_jwt_identity()
    data = request.get_json()

    from_account = data.get('fromAccount')
    beneficiary_bank = data.get('beneficiaryBank')
    beneficiary_account = data.get('beneficiaryAccount')
    beneficiary_name = data.get('beneficiaryName')
    narration = data.get('narration')
    pin = data.get('pin')

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

    # Deduct from sender
    new_balance = int(sender['balance']) - int(amount)

    db.users.update_one(
        {"accountNumber": from_account},
        {"$set": {"balance": new_balance}}
    )



    # Record debit transaction
    sender_transaction = {
        'user_id': sender_id,
        'from_account': from_account,
        'beneficiary_bank': beneficiary_bank,
        'beneficiary_account': beneficiary_account,
        'beneficiary_name': beneficiary_name,
        'amount': amount,
        'narration': narration,
        'timestamp': datetime.now(),
        'type': 'debit'
    }
    db.transactions.insert_one(sender_transaction)

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

    # 🔑 Internal Transfer: Trustyfin Bank
    if beneficiary_bank.lower() == "trustyfin bank":
        beneficiary = db.users.find_one({'accountNumber': beneficiary_account})
        if beneficiary:
            new_balance = int(beneficiary['balance']) + int(amount)
            
            db.users.update_one(
                {"accountNumber": beneficiary_account},
                {"$set": {"balance": new_balance}}
            )

            beneficiary_transaction = {
                'user_id': str(beneficiary['_id']),
                'from_account': beneficiary_account,
                'beneficiary_bank': '',
                'beneficiary_account': from_account,
                'beneficiary_name': sender['name'],
                'amount': amount,
                'narration': narration,
                'timestamp': datetime.now(),
                'type': 'credit'
            }
            db.transactions.insert_one(beneficiary_transaction)

    # 🔑 External Transfer: Save Beneficiary if not Trustyfin
    else:
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

    return jsonify({"message": "Transfer successful"}), 200




# ----------------- Transaction Summary -----------------
@transfer_blueprint.route("/transactions/summary", methods=["GET"])
@jwt_required()
def get_transaction_summary():
    user_id = get_jwt_identity()

    # Fetch only this user's transactions
    transactions = list(db.transactions.find({"user_id": user_id}))

    income = sum(t.get("amount", 0) for t in transactions if t.get("type") == "credit")
    expenses = sum(t.get("amount", 0) for t in transactions if t.get("type") == "debit")
    net_income = income - expenses

    # Format timestamps for JSON response
    formatted_transactions = [
        {
            **t,
            "_id": str(t["_id"]),  # ✅ convert ObjectId to string
            "timestamp": t["timestamp"].isoformat() if "timestamp" in t else None
        }
        for t in transactions
    ]

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