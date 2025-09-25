import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Search, Download } from "lucide-react";

import logotrustyfin from "../../assets/logotrustyfin.png";

interface Transaction {
  [key: string]: any;
  _id: string;
  user_id: string;
  amount: any;
  type: string;
  status?: string;
  timestamp?: any;
  flagged?: boolean;
}

interface User {
  _id: string;
  name: string;
  accountNumber: string;
}

export function TransactionMonitoring() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // search + filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/admin/all-data");
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setTransactions(data.transactions || []);
        setUsers(data.users || []);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getUserName = (userId: string) => {
    const user = users.find((u) => u._id === userId);
    return user ? `${user.name} (${user.accountNumber})` : userId || "Unknown";
  };

  const getStatusColor = (status: string = "") => {
    switch (status.toLowerCase()) {
      case "completed":
        return "default";
      case "pending":
      case "pending review":
        return "secondary";
      case "flagged":
        return "destructive";
      default:
        return "secondary";
    }
  };

  // ---------- timestamp parsing helpers ----------
  const parseTimestamp = (ts: any): Date | null => {
    if (ts === null || ts === undefined) return null;
    if (typeof ts === "string" || typeof ts === "number") {
      const d = new Date(ts);
      if (!isNaN(d.getTime())) return d;
    }
    try {
      if (typeof ts === "object") {
        if ("$date" in ts) {
          const val = ts.$date;
          if (typeof val === "string") {
            const d = new Date(val);
            if (!isNaN(d.getTime())) return d;
          }
          if (typeof val === "object" && "$numberLong" in val) {
            const ms = Number(val.$numberLong);
            if (!isNaN(ms)) return new Date(ms);
          }
          if (typeof val === "number") {
            const d = new Date(val);
            if (!isNaN(d.getTime())) return d;
          }
        }
        if ("$numberLong" in ts) {
          const ms = Number(ts.$numberLong);
          if (!isNaN(ms)) return new Date(ms);
        }
        if ("$numberInt" in ts) {
          const ms = Number(ts.$numberInt);
          if (!isNaN(ms)) return new Date(ms);
        }
        const maybe = ts.valueOf ? ts.valueOf() : ts.toString();
        const d = new Date(maybe as any);
        if (!isNaN(d.getTime())) return d;
      }
    } catch (err) {
      console.warn("parseTimestamp error:", err, ts);
    }
    return null;
  };

  const formatTxDate = (ts: any) => {
    const d = parseTimestamp(ts);
    if (!d) return "—";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  // ------------------------------------------------

  // filter + search
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        (tx._id || "").toString().toLowerCase().includes(searchLower) ||
        (tx.type || "").toString().toLowerCase().includes(searchLower) ||
        (getUserName(tx.user_id) || "").toLowerCase().includes(searchLower);

      const matchesFilter =
        filter === "all" ||
        (filter === "flagged" && tx.flagged) ||
        (filter === "pending" &&
          ["pending", "pending review"].includes((tx.status || "").toLowerCase())) ||
        (filter === "completed" && (tx.status || "").toLowerCase() === "completed");

      return matchesSearch && matchesFilter;
    });
  }, [transactions, searchTerm, filter, users]);

  // sort by date desc
  const sortedTransactions = useMemo(
    () =>
      [...filteredTransactions].sort((a, b) => {
        const da = parseTimestamp(a.timestamp)?.getTime() ?? 0;
        const db = parseTimestamp(b.timestamp)?.getTime() ?? 0;
        return db - da;
      }),
    [filteredTransactions]
  );

  const totalPages = Math.ceil(sortedTransactions.length / pageSize);
  const currentTransactions = sortedTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // all keys dynamically
  const transactionKeys =
    transactions.length > 0 ? Object.keys(transactions[0]) : [];

  const editTransaction = (tx: any) => {
    navigate(`/admin/transactions/edit/${tx._id}`, { state: { transaction: tx } });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
                <Input
                  placeholder="Search transactions..."
                  className="pl-10 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <Select onValueChange={setFilter} defaultValue="all">
                <SelectTrigger className="w-[140px]">
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
          {loading ? (
            <div className="flex justify-center items-center p-10">
              <img src={logotrustyfin} alt="Loading..." className="w-20 h-20 animate-spin" />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      {transactionKeys.map((key) => (
                        <th key={key} className="text-left p-3 font-medium text-slate-600">
                          {key}
                        </th>
                      ))}
                      <th className="text-left p-3 font-medium text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTransactions.length > 0 ? (
                      currentTransactions.map((tx) => (
                        <tr
                          key={tx._id}
                          className={`border-b hover:bg-slate-50 ${tx.flagged ? "bg-red-50" : ""}`}
                        >
                          {transactionKeys.map((key) => (
                            <td key={key} className="p-3">
                              {key === "user_id"
                                ? getUserName(tx[key])
                                : key === "timestamp"
                                ? formatTxDate(tx[key])
                                : key === "amount"
                                ? `$${Number(tx[key])?.toLocaleString()}`
                                : key === "status"
                                ? <Badge variant={getStatusColor(tx[key])}>{tx[key] || "unknown"}</Badge>
                                : typeof tx[key] === "object"
                                ? JSON.stringify(tx[key])
                                : String(tx[key])}
                            </td>
                          ))}
                          <td className="p-3">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => editTransaction(tx)}>
                                View
                              </Button>
                              {tx.flagged && (
                                <Button size="sm" variant="destructive">
                                  Review
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={transactionKeys.length + 1} className="text-center p-4 text-slate-500">
                          No transactions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    Prev
                  </Button>
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
