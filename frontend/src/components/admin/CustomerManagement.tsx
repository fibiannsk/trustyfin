import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Search, Plus, Edit, Eye, Ban } from "lucide-react";
import BlockToggleButton from "./button"; // adjust path
import { useNavigate } from "react-router-dom";
import { useToast } from '../../hooks/use-toast';
import { useAuth } from '../../context/AuthContext';

// ⭐ ADDED: import your logo
import logotrustyfin from '../../assets/logotrustyfin.png'; 

export function CustomerManagement() {
  const navigate = useNavigate();
  
  const { toast } = useToast();
  const { logoutAndRedirect } = useAuth();

  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  // ⭐ ADDED: loading state
  const [loading, setLoading] = useState(true);

  // Fetch all users from backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true); // ⭐ ADDED
        const res = await fetch("http://localhost:5000/admin/all-data");
        if (!res.ok) throw new Error("Failed to fetch data");

        if (res.status === 401) {
          toast({
            title: "Session Expired",
            description: "Your login has expired. Please log in again.",
            variant: "destructive",
          });
          logoutAndRedirect();
          return;
        }
        const data = await res.json();

        // Map backend users to table format
        const formattedUsers = data.users.map((user) => ({
          id: user._id,
          accountNumber: user.accountNumber || "—",           // 🔑 only account number (no fallback to id)
          name: user.name || "—",
          email: user.email,
          phone: user.phone || "—",
          accountBalance: user.balance
            ? `$${user.balance.toLocaleString()}`
            : "—",
          status: user.status || "Active",
          joinDate: user.joinDate || "—",                     // optional, may always be "—"
          accountType: user.accountType || "Standard",
          password: user.password || "—",
          pin: user.pin || "—",
        }));


        setCustomers(formattedUsers);
      } catch (err) {
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false); // ⭐ ADDED
      }
    };

    fetchCustomers();
  }, []);

  const accountform = () => {
    navigate("/admin/create-account");
  };

  const editform = (accountNumber) => {
    navigate(`/admin/edit-account/${accountNumber}`);
  };

  const handleStatusChange = (userId, newBlocked) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === userId
          ? { ...c, blocked: newBlocked, status: newBlocked ? "Blocked" : "Active" }
          : c
      )
    );
  };
  // Filter by name or email only
  const filteredCustomers = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  const startIndex = (currentPage - 1) * customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + customersPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">
          Customer Management
        </h2>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={accountform}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Customer Database</CardTitle>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search by name or email..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset page on search
                }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* ⭐ ADDED: Show logo loader while fetching */}
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
                      <th className="text-left p-3 font-medium text-slate-600">
                        Account Number
                      </th>
                      <th className="text-left p-3 font-medium text-slate-600">
                        Name
                      </th>
                      <th className="text-left p-3 font-medium text-slate-600">
                        Contact
                      </th>
                      <th className="text-left p-3 font-medium text-slate-600">
                        Balance
                      </th>
                      <th className="text-left p-3 font-medium text-slate-600">
                        Status
                      </th>
                      <th className="text-left p-3 font-medium text-slate-600">
                        Type
                      </th>
                      <th className="text-left p-3 font-medium text-slate-600">
                        Password
                      </th>
                      <th className="text-left p-3 font-medium text-slate-600">
                        Pin
                      </th>
                      <th className="text-left p-3 font-medium text-slate-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCustomers.length > 0 ? (
                      currentCustomers.map((customer) => (
                        <tr
                          key={customer.id}
                          className="border-b hover:bg-slate-50"
                        >
                          <td className="p-3 font-mono text-sm">{customer.accountNumber}</td>
                          <td className="p-3">
                            <div>
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-sm text-slate-600">
                                Joined {customer.joinDate}
                              </p>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm">
                              <p>{customer.email}</p>
                              <p className="text-slate-600">{customer.phone}</p>
                            </div>
                          </td>
                          <td className="p-3 font-medium text-green-600">
                            {customer.accountBalance}
                          </td>
                          <td className="p-3">
                            <Badge
                              variant={
                                customer.status?.toLowerCase() === "active"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {customer.status}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge variant="secondary">{customer.accountType}</Badge>
                          </td>
                          <td className="p-3 font-mono text-sm">{customer.password}</td>
                          <td className="p-3 font-mono text-sm">{customer.pin}</td>
                          <td className="p-3">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => editform(customer.accountNumber)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              {/* ⭐ Replace Ban with BlockToggleButton */}
                              <BlockToggleButton
                                userId={customer.id}
                                initialBlocked={customer.blocked}
                                onStatusChange={handleStatusChange}
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="text-center p-4 text-slate-500"
                        >
                          No customers found
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
