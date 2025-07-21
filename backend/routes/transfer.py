from flask import Blueprint, request, jsonify
from .. import db
from werkzeug.security import check_password_hash
from datetime import datetime

transfer_blueprint = Blueprint('transfer', __name__)

# Transfer endpoint
@transfer_blueprint.route('/transfer', methods=['POST'])
def transfer():
    data = request.get_json()
    from_account = data.get('fromAccount')
    beneficiary_bank = data.get('beneficiaryBank')
    beneficiary_account = data.get('beneficiaryAccount')
    beneficiary_name = data.get('beneficiaryName')
    amount = float(data.get('amount'))
    narration = data.get('narration')
    pin = data.get('pin')

    # Find sender's document
    sender = db.users.find_one({'account_number': from_account})
    if not sender:
        return jsonify({"error": "Contact your Bank , there seems to be a problem with your account "}), 404

    # Check pin authentication
    if not check_password_hash(sender['pin'], pin):
        return jsonify({"error": "Invalid pin"}), 401

    # Check if sender has sufficient balance
    if sender['balance'] < amount:
        return jsonify({"error": " Oops! Insufficient balance"}), 400

    # Update sender's balance
    db.users.update_one({'account_number': from_account}, {'$inc': {'balance': -amount}})

    # Create transaction document
    transaction = {
        'from_account': from_account,
        'beneficiary_bank': beneficiary_bank,
        'beneficiary_account': beneficiary_account,
        'beneficiary_name': beneficiary_name,
        'amount': amount,
        'narration': narration,
        'timestamp': datetime.now(),
        'type': 'debit'
    }

    # Insert transaction document into transactions collection
    db.transactions.insert_one(transaction)

    # Create expense document
    expense = {
        'account_number': from_account,
        'amount': amount,
        'narration': narration,
        'category': 'Transfer',
        'timestamp': datetime.now()
    }
    db.expenses.insert_one(expense)

    # Create transaction document for beneficiary (credit)
    beneficiary_transaction = {
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

    # Update beneficiary's balance if they exist in our system
    beneficiary = db.users.find_one({'account_number': beneficiary_account})
    if beneficiary:
        db.users.update_one({'account_number': beneficiary_account}, {'$inc': {'balance': amount}})

    return jsonify({"message": "Transfer successful"}), 200
