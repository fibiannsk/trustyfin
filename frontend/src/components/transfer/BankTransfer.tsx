import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { useToast } from '../../hooks/use-toast';
import { ArrowLeft, CreditCard, Lock, Receipt, X, Check, AlertTriangle } from 'lucide-react';
import { useData } from "../../context/DataContext";

const BANKS = [
"GTBank", "First Bank", "Access Bank", "UBA", "Zenith Bank",
"Sterling Bank", "Fidelity Bank", "Unity Bank", "Wema Bank"
];


interface TransferFormData {
fromAccount: string;
beneficiaryBank: string;
beneficiaryAccount: string;
beneficiaryName: string;
amount: string;
narration: string;
}


type Layer = 'form' | 'beneficiaries' | 'confirmation' | 'pin' | 'success';


const LAYERS = {
FORM: 'form' as Layer,
BENEFICIARIES: 'beneficiaries' as Layer,
CONFIRMATION: 'confirmation' as Layer,
PIN: 'pin' as Layer,
SUCCESS: 'success' as Layer
};

export default function BankTransfer() {
  const { userInfo, beneficiaries, apiFetch } = useData();
  const [bank, setBank] = useState<any>('');
  const [currentLayer, setCurrentLayer] = useState<Layer>(LAYERS.FORM);
  const [formData, setFormData] = useState<TransferFormData>({
    fromAccount: '',
  beneficiaryBank: '',
  beneficiaryAccount: '',
  beneficiaryName: '',
  amount: '',
  narration: ''
});
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
 
  const selectedAccount = userInfo?.account_number === formData.fromAccount
  ? { accountNumber: userInfo.account_number, balance: userInfo.balance, type: 'Main' }
  : null;

  const handleInputChange = (field: keyof TransferFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


 const handleSelectBeneficiary = (beneficiary: typeof beneficiaries[0]) => {
  setFormData(prev => ({
    ...prev,
    beneficiaryBank: beneficiary.bank,
    beneficiaryAccount: beneficiary.accountNumber,
    beneficiaryName: beneficiary.name
  }));
  setCurrentLayer(LAYERS.FORM);
  toast({
    title: "Beneficiary Selected",
    description: `${beneficiary.name} has been selected`,
  });
};

  const validateForm = () => {
    const amount = parseFloat(formData.amount);
    const balance = selectedAccount?.balance || 0;
    
    if (!formData.fromAccount) {
      toast({
        title: "Validation Error",
        description: "Please select an account",
        variant: "destructive"
      });
      return false;
    }
    
    if (!formData.beneficiaryBank || !formData.beneficiaryAccount || !formData.beneficiaryName) {
      toast({
        title: "Validation Error",
        description: "Please fill in all beneficiary details",
        variant: "destructive"
      });
      return false;
    }
    
    if (!amount || amount <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return false;
    }
    
    if (amount > balance) {
      toast({
        title: "Insufficient Funds",
        description: "Transfer amount exceeds available balance",
        variant: "destructive"
      });
      return false;
    }
  
  return true;
};

  const handleProceed = () => {
    if (validateForm()) {
      setCurrentLayer(LAYERS.CONFIRMATION);
    }
  };

 const handleConfirm = () => {
  setCurrentLayer(LAYERS.PIN);
  setPin('');
  setPinError('');
};

  const handlePinSubmit = async () => {
    if (pin !== userInfo?.pin) {
      setPinError('Incorrect PIN. Please try again.');
      return;
    }
    
    setIsProcessing(true);
    setPinError('');

    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentLayer(LAYERS.SUCCESS);
      toast({
        title: "Transfer Successful!",
        description: `$${formData.amount} sent to ${formData.beneficiaryName}`,
        variant: "default"
      });
    }, 2000);
  };

  const handlePrintReceipt = () => {
    const receiptWindow = window.open('', '_blank');
    const currentDate = new Date().toLocaleString();
    
    receiptWindow?.document.write(`
      <html>
        <head>
          <title>Transfer Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .receipt { max-width: 400px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .details { margin: 20px 0; }
            .row { display: flex; justify-content: space-between; margin: 8px 0; }
            .label { font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <h2>BANK TRANSFER RECEIPT</h2>
              <p>Transaction Date: ${currentDate}</p>
            </div>
            <div class="details">
              <div class="row"><span class="label">From Account:</span> <span>${formData.fromAccount}</span></div>
              <div class="row"><span class="label">To Account:</span> <span>${formData.beneficiaryAccount}</span></div>
              <div class="row"><span class="label">Beneficiary:</span> <span>${formData.beneficiaryName}</span></div>
              <div class="row"><span class="label">Bank:</span> <span>${formData.beneficiaryBank}</span></div>
              <div class="row"><span class="label">Amount:</span> <span>$${formData.amount}</span></div>
              <div class="row"><span class="label">Narration:</span> <span>${formData.narration}</span></div>
              <div class="row"><span class="label">Status:</span> <span>SUCCESSFUL</span></div>
            </div>
          </div>
        </body>
      </html>
    `);
    receiptWindow?.document.close();
    receiptWindow?.print();
  };

  const resetTransfer = () => {
    setCurrentLayer(LAYERS.FORM);
    setFormData({
      fromAccount: '',
      beneficiaryBank: '',
      beneficiaryAccount: '',
      beneficiaryName: '',
      amount: '',
      narration: ''
    });
    setPin('');
    setPinError('');
  };

  // Layer 1: Transfer Form
  if (currentLayer === LAYERS.FORM) {
    return (
      <div className="min-h-screen bg-slate-900 py-8 px-4 flex justify-center items-start">
        <div className="w-full max-w-lg bg-slate-700 p-6 rounded-xl shadow-lg">
          <Card className="shadow-elevated bg-gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <CreditCard className="w-6 h-6 text-primary" />
                Bank Transfer
              </CardTitle>
              <CardDescription>
                Send money securely to any bank account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fromAccount">From Account</Label>
                <Select value={formData.fromAccount} onValueChange={(value) => handleInputChange('fromAccount', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your account" />
                  </SelectTrigger>
                  <SelectContent>
                    {USER_ACCOUNTS.map((account) => (
                      <SelectItem key={account.accountNumber} value={account.accountNumber}>
                        {account.accountNumber} ({account.type}) - ₦{account.balance.toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedAccount && (
                  <p className="text-sm text-muted-foreground">
                    Available Balance: ${selectedAccount.balance.toLocaleString()}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="beneficiaryBank">Beneficiary Bank</Label>
                <Select value={formData.beneficiaryBank} onValueChange={(value) => handleInputChange('beneficiaryBank', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <Input
                    type="text"
                    placeholder="Enter bank name"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                   />
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="savedBeneficiaries">Saved Beneficiaries</Label>
                  <button
                    type="button"
                    onClick={() => setCurrentLayer(LAYERS.BENEFICIARIES)}
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Use Saved Beneficiary
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="beneficiaryName">Beneficiary Name</Label>
                <Input
                  id="beneficiaryName"
                  value={formData.beneficiaryName}
                  onChange={(e) => handleInputChange('beneficiaryName', e.target.value)}
                  placeholder="Enter beneficiary name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="beneficiaryAccount">Beneficiary Account Number</Label>
                <Input
                  id="beneficiaryAccount"
                  value={formData.beneficiaryAccount}
                  onChange={(e) => handleInputChange('beneficiaryAccount', e.target.value)}
                  placeholder="Enter account number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="narration">Transaction Narration</Label>
                <Textarea
                  id="narration"
                  value={formData.narration}
                  onChange={(e) => handleInputChange('narration', e.target.value)}
                  placeholder="e.g., Rent for July"
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleProceed}
                className="w-full"
                variant="banking"
                size="xl"
              >
                Proceed
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Layer 2: Saved Beneficiaries Overlay
  if (currentLayer === LAYERS.BENEFICIARIES) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light to-accent-light p-4">
        <div className="max-w-lg mx-auto pt-8">
          <Card className="shadow-elevated bg-gradient-card animate-slide-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Saved Beneficiaries</CardTitle>
                  <CardDescription>Select a beneficiary from your saved list</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentLayer(LAYERS.FORM)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {SAVED_BENEFICIARIES.map((beneficiary) => (
                <Card
                  key={beneficiary.id}
                  className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                  onClick={() => handleSelectBeneficiary(beneficiary)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{beneficiary.name}</h4>
                        <p className="text-sm text-muted-foreground">{beneficiary.bank}</p>
                        <p className="text-sm text-muted-foreground">{beneficiary.accountNumber}</p>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary opacity-0 hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Layer 3: Confirmation Summary
  if (currentLayer === LAYERS.CONFIRMATION) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light to-accent-light p-4">
        <div className="max-w-lg mx-auto pt-8">
          <Card className="shadow-elevated bg-gradient-card animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentLayer(LAYERS.FORM)}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <CardTitle>Confirm Transfer</CardTitle>
                  <CardDescription>Please review your transfer details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-warning-light p-4 rounded-lg border border-warning/20">
                <div className="flex items-center gap-2 text-warning">
                  <AlertTriangle className="w-4 h-4" />
                  <p className="text-sm font-medium">Review carefully before proceeding</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">From Account:</span>
                  <span className="font-medium">{formData.fromAccount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available Balance:</span>
                  <span className="font-medium">₦{selectedAccount?.balance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Beneficiary Name:</span>
                  <span className="font-medium">{formData.beneficiaryName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bank:</span>
                  <span className="font-medium">{formData.beneficiaryBank}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Number:</span>
                  <span className="font-medium">{formData.beneficiaryAccount}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-primary-light rounded-lg">
                  <span className="text-primary font-semibold">Amount:</span>
                  <span className="text-xl font-bold text-primary">${formData.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Narration:</span>
                  <span className="font-medium">{formData.narration}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setCurrentLayer(LAYERS.FORM)}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleConfirm}
                  variant="banking"
                  className="flex-1"
                >
                  Confirm
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Layer 4: PIN Authentication Modal
  if (currentLayer === LAYERS.PIN) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light to-accent-light p-4 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-modal bg-gradient-card animate-fade-in">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Enter Your PIN</CardTitle>
            <CardDescription>
              Please enter your 4-digit PIN to authorize this transaction
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-center gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 border-2 border-primary rounded-lg flex items-center justify-center text-2xl font-bold"
                  >
                    {pin[i] ? '•' : ''}
                  </div>
                ))}
              </div>
              {pinError && (
                <p className="text-destructive text-center text-sm">{pinError}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((num) => (
                <Button
                  key={num}
                  variant="outline"
                  className="h-12 text-lg font-semibold"
                  onClick={() => {
                    if (num === '*') {
                      setPin('');
                      setPinError('');
                    } else if (num === '#') {
                      if (pin.length > 0) {
                        setPin(pin.slice(0, -1));
                        setPinError('');
                      }
                    } else if (pin.length < 4) {
                      setPin(pin + num);
                      setPinError('');
                    }
                  }}
                  disabled={isProcessing}
                >
                  {num === '*' ? '⌫' : num === '#' ? '←' : num}
                </Button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setCurrentLayer(LAYERS.CONFIRMATION)}
                variant="outline"
                className="flex-1"
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePinSubmit}
                variant="banking"
                className="flex-1"
                disabled={pin.length !== 4 || isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Authorize'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Layer 5: Success Screen
  if (currentLayer === LAYERS.SUCCESS) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-success-light to-primary-light p-4 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-modal bg-gradient-card animate-fade-in">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-success rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-success">Transfer Successful!</CardTitle>
            <CardDescription>
              Your transaction has been completed successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-success-light p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Amount Sent:</span>
                <span className="font-bold text-success">${formData.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">To:</span>
                <span className="font-medium">{formData.beneficiaryName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Transaction ID:</span>
                <span className="font-mono text-sm">TXN{Date.now().toString().slice(-8)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handlePrintReceipt}
                variant="outline"
                className="flex-1"
              >
                <Receipt className="w-4 h-4 mr-2" />
                Print Receipt
              </Button>
              <Button
                onClick={resetTransfer}
                variant="banking"
                className="flex-1"
              >
                New Transfer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}