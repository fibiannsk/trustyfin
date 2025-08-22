import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { TransactionList } from "../components/dashboard/TransactionList";
import { QuickActions } from "../components/dashboard/QuickActions";
import { SpendingChart } from "../components/dashboard/SpendingChart";
import { Navbar } from "../components/dashboard/Navbar";
import { TrendingUp, TrendingDown, Eye, EyeOff } from "lucide-react";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const {
    userInfo,
    transactions,
    incomeSummary,
    summaryLoading,
    token,
    refetchUserInfo,
  } = useData();
  const navigate = useNavigate();

  // ✅ Refetch user info whenever token changes or page refreshes
  useEffect(() => {
    if (token) {
      refetchUserInfo();
    }
  }, [token, refetchUserInfo]);

  // ✅ Safely compute available balance
  const totalBalance = userInfo?.balance || 0;

  // ✅ Calculate balance change percentage
  const percentageChange = useMemo(() => {
    if (!incomeSummary) return 0;
    const { income, expenses, net_income } = incomeSummary;
    const lastMonthNet = income - expenses; // Simplified assumption
    if (lastMonthNet === 0) return 0;
    return ((net_income - lastMonthNet) / Math.abs(lastMonthNet)) * 100;
  }, [incomeSummary]);

  // ✅ Dynamic trend icon & color
  const isPositive = percentageChange >= 0;

  // ✅ Get recent 5 transactions
  const recentTransactions = useMemo(() => {
    return [...(transactions || [])]
      .sort((a, b) => {
        const aTime = a?.timestamp ? new Date(a.timestamp).getTime() : 0;
        const bTime = b?.timestamp ? new Date(b.timestamp).getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, 5);
  }, [transactions]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {userInfo?.name || "User"}
            </h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBalanceVisible(!balanceVisible)}
            className="flex items-center gap-2"
          >
            {balanceVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {balanceVisible ? "Hide" : "Show"} Balance
          </Button>
        </div>

        {/* Total Balance Overview */}
        <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              Available Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {balanceVisible
                ? `$${totalBalance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}`
                : "••••••"}
            </div>
            <div
              className={`flex items-center gap-2 mt-2 ${
                isPositive ? "text-green-400" : "text-red-400"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span className="text-sm">
                {percentageChange.toFixed(2)}% from last month
              </span>
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
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/transactions")}
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <TransactionList transactions={recentTransactions} />
              </CardContent>
            </Card>
          </div>

          {/* Spending Insights & Quick Stats */}
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
                  <span className="font-semibold text-green-600">
                    +${incomeSummary?.income?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Expenses</span>
                  <span className="font-semibold text-red-600">
                    -${incomeSummary?.expenses?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-sm font-medium">Net Income</span>
                  <span
                    className={`font-bold ${
                      (incomeSummary?.net_income || 0) >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {incomeSummary?.net_income >= 0 ? "+" : ""}
                    ${incomeSummary?.net_income?.toLocaleString() || 0}
                  </span>
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
