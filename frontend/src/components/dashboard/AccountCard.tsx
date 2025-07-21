
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CreditCard, PiggyBank, Wallet } from "lucide-react";

interface Account {
  id: number;
  name: string;
  type: string;
  balance: number;
  accountNumber: string;
  color: string;
}

interface AccountCardProps {
  account: Account;
  balanceVisible: boolean;
}

export const AccountCard = ({ account, balanceVisible }: AccountCardProps) => {
  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
        return <Wallet className="h-6 w-6" />;
      case "savings":
        return <PiggyBank className="h-6 w-6" />;
      case "credit":
        return <CreditCard className="h-6 w-6" />;
      default:
        return <Wallet className="h-6 w-6" />;
    }
  };

  const getAccountTypeLabel = (type: string) => {
    switch (type) {
      case "checking":
        return "Checking";
      case "savings":
        return "Savings";
      case "credit":
        return "Credit Card";
      default:
        return "Account";
    }
  };

  const formatBalance = (balance: number, type: string) => {
    const amount = Math.abs(balance);
    const formattedAmount = amount.toLocaleString('en-US', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
    
    if (type === "credit") {
      return balance < 0 ? `-$${formattedAmount}` : `$${formattedAmount}`;
    }
    return `$${formattedAmount}`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className={`h-2 ${account.color}`}></div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${account.color} text-white`}>
              {getAccountIcon(account.type)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{account.name}</h3>
              <p className="text-sm text-gray-500">{account.accountNumber}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {getAccountTypeLabel(account.type)}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500 mb-1">
              {account.type === "credit" ? "Current Balance" : "Available Balance"}
            </p>
            <p className={`text-2xl font-bold ${
              account.type === "credit" 
                ? account.balance < 0 
                  ? "text-red-600" 
                  : "text-green-600"
                : "text-gray-900"
            }`}>
              {balanceVisible ? formatBalance(account.balance, account.type) : "••••••"}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button size="sm" className="flex-1">
              {account.type === "credit" ? "Pay" : "Transfer"}
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
