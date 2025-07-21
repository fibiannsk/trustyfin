
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Search, Filter, Download, AlertTriangle } from "lucide-react";

export function TransactionMonitoring() {
  const transactions = [
    {
      id: "TXN001",
      customer: "John Doe",
      type: "Transfer",
      amount: "$2,500.00",
      status: "Completed",
      date: "2024-01-15 14:30",
      fromAccount: "****1234",
      toAccount: "****5678",
      flagged: false
    },
    {
      id: "TXN002",
      customer: "Jane Smith",
      type: "Withdrawal",
      amount: "$15,000.00",
      status: "Pending Review",
      date: "2024-01-15 13:45",
      fromAccount: "****9876",
      toAccount: "External",
      flagged: true
    },
    {
      id: "TXN003",
      customer: "Mike Johnson",
      type: "Deposit",
      amount: "$5,000.00",
      status: "Completed",
      date: "2024-01-15 12:20",
      fromAccount: "External",
      toAccount: "****3456",
      flagged: false
    },
    {
      id: "TXN004",
      customer: "Sarah Wilson",
      type: "Payment",
      amount: "$800.00",
      status: "Completed",
      date: "2024-01-15 11:15",
      fromAccount: "****7890",
      toAccount: "****1111",
      flagged: false
    },
    {
      id: "TXN005",
      customer: "Robert Brown",
      type: "Transfer",
      amount: "$25,000.00",
      status: "Flagged",
      date: "2024-01-15 10:00",
      fromAccount: "****2222",
      toAccount: "****3333",
      flagged: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'default';
      case 'Pending Review': return 'secondary';
      case 'Flagged': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Transaction Monitoring</h2>
        <Button className="bg-green-600 hover:bg-green-700">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <CardTitle>Recent Transactions</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input placeholder="Search transactions..." className="pl-10 w-full sm:w-64" />
              </div>
              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-3 font-medium text-slate-600">Transaction ID</th>
                  <th className="text-left p-3 font-medium text-slate-600">Customer</th>
                  <th className="text-left p-3 font-medium text-slate-600">Type</th>
                  <th className="text-left p-3 font-medium text-slate-600">Amount</th>
                  <th className="text-left p-3 font-medium text-slate-600">From/To</th>
                  <th className="text-left p-3 font-medium text-slate-600">Status</th>
                  <th className="text-left p-3 font-medium text-slate-600">Date</th>
                  <th className="text-left p-3 font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className={`border-b hover:bg-slate-50 ${transaction.flagged ? 'bg-red-50' : ''}`}>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{transaction.id}</span>
                        {transaction.flagged && (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="p-3 font-medium">{transaction.customer}</td>
                    <td className="p-3">{transaction.type}</td>
                    <td className="p-3 font-medium text-green-600">{transaction.amount}</td>
                    <td className="p-3">
                      <div className="text-sm">
                        <p>From: {transaction.fromAccount}</p>
                        <p>To: {transaction.toAccount}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm text-slate-600">{transaction.date}</td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        {transaction.flagged && (
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
