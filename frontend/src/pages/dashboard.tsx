import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
//import { Badge } from "@/components/ui/badge";
import { AccountCard } from "../components/dashboard/AccountCard";
import { TransactionList } from "../components/dashboard/TransactionList";
import { QuickActions } from "../components/dashboard/QuickActions";
import { SpendingChart } from "../components/dashboard/SpendingChart";
import { Navbar } from "../components/dashboard/Navbar";
import { DollarSign, TrendingUp, TrendingDown, Eye, EyeOff } from "lucide-react";

const UserDashboard = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const accounts = [
    {
      id: 1,
      name: "Primary Checking",
      type: "checking",
      balance: 2847.63,
      accountNumber: "****1234",
      color: "bg-gradient-to-r from-blue-600 to-blue-700"
    },
    {
      id: 2,
      name: "High Yield Savings",
      type: "savings",
      balance: 15420.89,
      accountNumber: "****5678",
      color: "bg-gradient-to-r from-green-600 to-green-700"
    },
    {
      id: 3,
      name: "Rewards Credit Card",
      type: "credit",
      balance: -1245.32,
      accountNumber: "****9012",
      color: "bg-gradient-to-r from-purple-600 to-purple-700"
    }
  ];

  const totalBalance = accounts.reduce((sum, account) => {
    return account.type === "credit" ? sum + account.balance : sum + account.balance;
  }, 0);

  const recentTransactions = [
    {
      id: 1,
      description: "Amazon Purchase",
      amount: -89.99,
      date: "2024-06-11",
      category: "Shopping",
      account: "Primary Checking"
    },
    {
      id: 2,
      description: "Salary Deposit",
      amount: 3200.00,
      date: "2024-06-10",
      category: "Income",
      account: "Primary Checking"
    },
    {
      id: 3,
      description: "Coffee Shop",
      amount: -4.75,
      date: "2024-06-10",
      category: "Food & Dining",
      account: "Primary Checking"
    },
    {
      id: 4,
      description: "Transfer to Savings",
      amount: -500.00,
      date: "2024-06-09",
      category: "Transfer",
      account: "Primary Checking"
    },
    {
      id: 5,
      description: "Netflix Subscription",
      amount: -15.99,
      date: "2024-06-09",
      category: "Entertainment",
      account: "Primary Checking"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Sarah</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBalanceVisible(!balanceVisible)}
            className="flex items-center gap-2"
          >
            {balanceVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {balanceVisible ? "Hide" : "Show"} Balances
          </Button>
        </div>

        {/* Total Balance Overview */}
        <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5" />
              Available Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {balanceVisible ? `$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : "••••••"}
            </div>
            <div className="flex items-center gap-2 mt-2 text-green-400">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">+2.5% from last month</span>
            </div>
          </CardContent>
        </Card>
        {/* Quick Actions */}
        <QuickActions />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionList transactions={recentTransactions} />
              </CardContent>
            </Card>
          </div>

          {/* Spending Insights */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Spending</CardTitle>
              </CardHeader>
              <CardContent>
                <SpendingChart />
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Income</span>
                  <span className="font-semibold text-green-600">+$6,400</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Expenses</span>
                  <span className="font-semibold text-red-600">-$2,156</span>
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-sm font-medium">Net Income</span>
                  <span className="font-bold text-green-600">+$4,244</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
