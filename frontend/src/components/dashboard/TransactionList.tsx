import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import {
  ShoppingBag,
  Coffee,
  Car,
  Smartphone,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { Button } from "../ui/button";

export const TransactionList = () => {
  const navigate = useNavigate();
  const { transactions, txMeta, txLoading, fetchTransactions } = useData();

  // Load first page of transactions when mounted
  React.useEffect(() => {
    fetchTransactions(1, 5); // 👈 small page limit for preview list
  }, [fetchTransactions]);

  const handleNext = () => {
    if (txMeta?.page < txMeta?.pages) {
      fetchTransactions(txMeta.page + 1, txMeta.limit);
    }
  };

  const handlePrev = () => {
    if (txMeta?.page > 1) {
      fetchTransactions(txMeta.page - 1, txMeta.limit);
    }
  };

  const handleViewAll = () => {
    navigate("/user/transactions");
  };

  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
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

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
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
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (txLoading) {
    return <p className="text-center text-gray-500">Loading transactions...</p>;
  }

  if (!transactions.length) {
    return <p className="text-center text-gray-500">No transactions found.</p>;
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction._id}
          className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div
              className={`p-2 rounded-full ${getCategoryColor(
                transaction.category || transaction.type
              )}`}
            >
              {getCategoryIcon(transaction.category || transaction.type)}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">
                {transaction.narration ||
                  transaction.description ||
                  "Transaction"}
              </h4>
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-sm text-gray-500">
                  {transaction.from_account || "—"}
                </p>
                <span className="text-gray-300">•</span>
                <p className="text-sm text-gray-500">
                  {formatDate(transaction.timestamp)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-xs">
              {transaction.category || transaction.type}
            </Badge>
            <div className="text-right">
              <p
                className={`font-semibold ${
                  transaction.type === "credit"
                    ? "text-green-600"
                    : "text-gray-900"
                }`}
              >
                {transaction.type === "credit" ? "+" : "-"}$
                {Math.abs(transaction.amount).toFixed(2)}
              </p>
              {transaction.type === "credit" ? (
                <ArrowDownLeft className="h-3 w-3 text-green-600 ml-auto" />
              ) : (
                <ArrowUpRight className="h-3 w-3 text-gray-400 ml-auto" />
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Pagination controls */}
      <div className="flex justify-between items-center pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          disabled={txMeta?.page <= 1}
        >
          Previous
        </Button>

        <p className="text-sm text-gray-500">
          Page {txMeta?.page} of {txMeta?.pages}
        </p>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={txMeta?.page >= txMeta?.pages}
        >
          Next
        </Button>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={handleViewAll}
          className="text-gray-500 hover:text-blue-600 font-medium transition-colors"
        >
          View All Transactions
        </button>
      </div>
    </div>
  );
};
