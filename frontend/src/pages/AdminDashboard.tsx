import { useState } from "react";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { DashboardOverview } from "../components/admin/DashboardOverview";
import { CustomerManagement } from "../components/admin/CustomerManagement";
import { TransactionMonitoring } from "../components/admin/TransactionMonitoring";
import { SecurityCenter } from "../components/admin/SecurityCenter";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'customers':
        return <CustomerManagement />;
      case 'transactions':
        return <TransactionMonitoring />;
      case 'security':
        return <SecurityCenter />;
      case 'accounts':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Account management features will be available here.</p>
            </CardContent>
          </Card>
        );
      case 'reports':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Reports & Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Financial reports and analytics will be available here.</p>
            </CardContent>
          </Card>
        );
      case 'alerts':
        return (
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">System alerts and notifications will be managed here.</p>
            </CardContent>
          </Card>
        );
      case 'notifications':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Notification Center</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Customer notifications and communication tools will be available here.</p>
            </CardContent>
          </Card>
        );
      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">System configuration and settings will be managed here.</p>
            </CardContent>
          </Card>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 p-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Banking Administration</h1>
              <p className="text-slate-600">Manage your banking operations efficiently</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">Welcome back, Admin</p>
                <p className="text-xs text-slate-600">Last login: Today at 9:15 AM</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                A
              </div>
            </div>
          </div>
        </header>
        
        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;