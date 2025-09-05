import React, { useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Navbar } from "../dashboard/Navbar";
import { useData } from "../../context/DataContext";

const ITEMS_PER_PAGE = 10; // 👈 larger limit for full history

const TransactionHistory = () => {
  const { transactions, txMeta, txLoading, fetchTransactions } = useData();

 

  // Load first page on mount
  useEffect(() => {
    fetchTransactions(1, ITEMS_PER_PAGE);
  }, [fetchTransactions]);

  const formatAmount = (amount: number, type: string): string => {
    const sign = type === "credit" ? "+" : "-";
    return `${sign}$${Math.abs(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${day} ${month} ${year}, ${time}`;
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= (txMeta?.pages || 1)) {
      fetchTransactions(page, ITEMS_PER_PAGE);
    }
  };

  // 🔄 Loading state
  if (txLoading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <Navbar />
        <div className="max-w-4xl mx-auto mt-10 text-center text-muted-foreground">
          Loading your transactions...
        </div>
      </div>
    );
  }

  // 🚨 No transactions
  if (!transactions || transactions.length === 0) {
    return (
      <div className="min-h-screen bg-background p-4">
        <Navbar />
        <div className="max-w-4xl mx-auto mt-10 text-center text-muted-foreground">
          No transactions found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Transaction History
            </h1>
          </div>
          <p className="text-muted-foreground">
            View and manage your recent financial transactions
          </p>
        </div>

        {/* Transaction Cards */}
        <div className="space-y-3 mb-8">
          {transactions.map((tx) => (
            <article
              key={tx.transaction_id}
              className="w-full max-w-4xl mx-auto rounded-lg border border-border shadow-sm p-6 bg-card hover:shadow-md transition-shadow duration-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Amount */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Amount
                  </label>
                  <div className="flex items-center gap-2">
                    {tx.type === "credit" ? (
                      <ArrowUpRight className="h-4 w-4 text-credit" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-debit" />
                    )}
                    <span
                      className={`text-lg font-bold ${
                        tx.type === "credit" ? "text-credit" : "text-debit"
                      }`}
                    >
                      {formatAmount(tx.amount, tx.type)}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Description
                  </label>
                  <p className="text-base font-medium text-card-foreground">
                    {tx.narration || tx.description || "—"}
                  </p>
                </div>

                {/* Reference */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Reference
                  </label>
                  <p className="text-base font-mono text-card-foreground bg-muted/30 px-2 py-1 rounded text-sm">
                    {tx.transaction_id || "N/A"}
                  </p>
                </div>

                {/* Transaction Date */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Transaction Date
                  </label>
                  <p className="text-base text-card-foreground">
                    {formatDate(tx.timestamp)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground">
            Showing {(txMeta.page - 1) * txMeta.limit + 1} to{" "}
            {Math.min(txMeta.page * txMeta.limit, txMeta.total)} of{" "}
            {txMeta.total} transactions
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(txMeta.page - 1)}
              disabled={txMeta.page <= 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: txMeta.pages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={txMeta.page === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(txMeta.page + 1)}
              disabled={txMeta.page >= txMeta.pages}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
