
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Users, CreditCard, DollarSign, TrendingUp } from "lucide-react";

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Customers",
      value: "12,847",
      change: "+2.5%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Accounts",
      value: "18,342",
      change: "+1.8%",
      icon: CreditCard,
      color: "text-green-600"
    },
    {
      title: "Total Deposits",
      value: "$2.4M",
      change: "+5.2%",
      icon: DollarSign,
      color: "text-emerald-600"
    },
    {
      title: "Monthly Growth",
      value: "15.3%",
      change: "+0.8%",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 font-medium">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "TXN001", customer: "John Doe", amount: "$2,500", type: "Deposit", status: "Completed" },
                { id: "TXN002", customer: "Jane Smith", amount: "$1,200", type: "Transfer", status: "Pending" },
                { id: "TXN003", customer: "Mike Johnson", amount: "$5,000", type: "Withdrawal", status: "Completed" },
                { id: "TXN004", customer: "Sarah Wilson", amount: "$800", type: "Payment", status: "Completed" },
              ].map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium">{transaction.customer}</p>
                    <p className="text-sm text-slate-600">{transaction.id} • {transaction.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{transaction.amount}</p>
                    <p className={`text-xs ${transaction.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Security", message: "Unusual login detected for user ID 1247", severity: "high" },
                { type: "System", message: "Scheduled maintenance in 2 hours", severity: "medium" },
                { type: "Compliance", message: "Monthly report due in 3 days", severity: "low" },
                { type: "Transaction", message: "Large transaction flagged for review", severity: "high" },
              ].map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.severity === 'high' ? 'bg-red-500' : 
                    alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="font-medium text-sm">{alert.type}</p>
                    <p className="text-sm text-slate-600">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
