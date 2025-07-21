
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Coffee, 
  Car, 
  Home, 
  Smartphone, 
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
  account: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}


export const TransactionList = ({ transactions }: TransactionListProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "shopping":
        return <ShoppingBag className="h-4 w-4" />;
      case "food & dining":
        return <Coffee className="h-4 w-4" />;
      case "transportation":
        return <Car className="h-4 w-4" />;
      case "entertainment":
        return <Smartphone className="h-4 w-4" />;
      case "income":
        return <DollarSign className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const navigate = useNavigate();
    const handleBackClick = () => {
      navigate('/user/transactions');
    };
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "shopping":
        return "bg-purple-100 text-purple-700";
      case "food & dining":
        return "bg-orange-100 text-orange-700";
      case "transportation":
        return "bg-blue-100 text-blue-700";
      case "entertainment":
        return "bg-pink-100 text-pink-700";
      case "income":
        return "bg-green-100 text-green-700";
      case "transfer":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-full ${getCategoryColor(transaction.category)}`}>
              {getCategoryIcon(transaction.category)}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{transaction.description}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-sm text-gray-500">{transaction.account}</p>
                <span className="text-gray-300">•</span>
                <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-xs">
              {transaction.category}
            </Badge>
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.amount > 0 ? "text-green-600" : "text-gray-900"
              }`}>
                {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
              </p>
              {transaction.amount > 0 ? (
                <ArrowDownLeft className="h-3 w-3 text-green-600 ml-auto" />
              ) : (
                <ArrowUpRight className="h-3 w-3 text-gray-400 ml-auto" />
              )}
            </div>
          </div>
        </div>
      ))}
      
      <div className="text-center pt-4">
         <button
              onClick={handleBackClick}
              className="text-gray-500 hover:text-blue-600 font-medium transition-colors">
              View All Transactions
          </button>
      </div>
    </div>
  );
};
