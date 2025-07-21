import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Search, Plus, Edit, Eye, Ban } from "lucide-react";
import { useNavigate } from 'react-router-dom';


export function CustomerManagement() {

   const navigate = useNavigate();
    const accountform = () => {
      navigate('/admin/create-account');
    };
  const customers = [
    {
      id: "CUST001",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      accountBalance: "$12,500.00",
      status: "Active",
      joinDate: "2023-01-15",
      accountType: "Premium"
    },
    {
      id: "CUST002",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1 (555) 987-6543",
      accountBalance: "$8,750.00",
      status: "Active",
      joinDate: "2023-03-22",
      accountType: "Standard"
    },
    {
      id: "CUST003",
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+1 (555) 456-7890",
      accountBalance: "$25,000.00",
      status: "Suspended",
      joinDate: "2022-11-08",
      accountType: "Business"
    },
    {
      id: "CUST004",
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+1 (555) 321-0987",
      accountBalance: "$4,200.00",
      status: "Active",
      joinDate: "2023-06-10",
      accountType: "Standard"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Customer Management</h2>
        <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={accountform}>
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Customer Database</CardTitle>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input placeholder="Search customers..." className="pl-10 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-3 font-medium text-slate-600">Customer ID</th>
                  <th className="text-left p-3 font-medium text-slate-600">Name</th>
                  <th className="text-left p-3 font-medium text-slate-600">Contact</th>
                  <th className="text-left p-3 font-medium text-slate-600">Balance</th>
                  <th className="text-left p-3 font-medium text-slate-600">Status</th>
                  <th className="text-left p-3 font-medium text-slate-600">Type</th>
                  <th className="text-left p-3 font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-slate-50">
                    <td className="p-3 font-mono text-sm">{customer.id}</td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-slate-600">Joined {customer.joinDate}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <p>{customer.email}</p>
                        <p className="text-slate-600">{customer.phone}</p>
                      </div>
                    </td>
                    <td className="p-3 font-medium text-green-600">{customer.accountBalance}</td>
                    <td className="p-3">
                      <Badge variant={customer.status === 'Active' ? 'default' : 'destructive'}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="secondary">{customer.accountType}</Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Ban className="w-4 h-4" />
                        </Button>
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
