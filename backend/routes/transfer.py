from flask import Blueprint, request, jsonify
from .. import db
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity

transfer_blueprint = Blueprint('transfer', __name__)

# ----------------- Transfer Endpoint -----------------
@transfer_blueprint.route('/', methods=['POST'])
@jwt_required()
def transfer():
    sender_id = get_jwt_identity()   # 🔑 logged-in sender
    data = request.get_json()

    from_account = data.get('fromAccount')
    beneficiary_bank = data.get('beneficiaryBank')
    beneficiary_account = data.get('beneficiaryAccount')
    beneficiary_name = data.get('beneficiaryName')
    amount = float(data.get('amount'))
    narration = data.get('narration')
    pin = data.get('pin')

    # Find sender
    sender = db.users.find_one({'account_number': from_account})
    if not sender:
        return jsonify({"error": "Contact your Bank, there seems to be a problem with your account"}), 404

    if sender['pin'] != pin:
        return jsonify({"error": "Invalid pin"}), 401

    if sender['balance'] < amount:
        return jsonify({"error": "Oops! Insufficient balance"}), 400

    # Deduct from sender
    db.users.update_one({'account_number': from_account}, {'$inc': {'balance': -amount}})

    # Debit transaction for sender
    sender_transaction = {
        'user_id': sender_id,   # ✅ link to sender
        'from_account': from_account,
        'beneficiary_bank': beneficiary_bank,
        'beneficiary_account': beneficiary_account,
        'beneficiary_name': beneficiary_name,
        'amount': amount,
        'narration': narration,
        'timestamp': datetime.now(),   # ✅ stored as datetime
        'type': 'debit'
    }
    db.transactions.insert_one(sender_transaction)

    # Expense for sender
    expense = {
        'user_id': sender_id,
        'account_number': from_account,
        'amount': amount,
        'narration': narration,
        'category': 'Transfer',
        'timestamp': datetime.now(),   # ✅ stored as datetime
    }
    db.expenses.insert_one(expense)

    # Credit transaction for beneficiary (if they exist)
    beneficiary = db.users.find_one({'account_number': beneficiary_account})
    if beneficiary:
        db.users.update_one(
            {'account_number': beneficiary_account},
            {'$inc': {'balance': amount}}
        )

        beneficiary_transaction = {
            'user_id': str(beneficiary['_id']),
            'from_account': beneficiary_account,
            'beneficiary_bank': '',
            'beneficiary_account': from_account,
            'beneficiary_name': sender['name'],
            'amount': amount,
            'narration': narration,
            'timestamp': datetime.now(),   # ✅ stored as datetime
            'type': 'credit'
        }
        db.transactions.insert_one(beneficiary_transaction)

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