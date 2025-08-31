import { 
  Users, 
  CreditCard, 
  DollarSign, 
  Settings, 
  Shield, 
  BarChart3, 
  AlertTriangle,
  FileText,
  Bell
} from "lucide-react";
import { NavLink } from "react-router-dom";
const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3, path: "/admin" },
  { id: "customers", label: "Customers", icon: Users, path: "/admin/customers" },
  { id: "accounts", label: "Accounts", icon: CreditCard, path: "/admin/accounts" },
  { id: "transactions", label: "Transactions", icon: DollarSign, path: "/admin/transactions" },
  { id: "security", label: "Security", icon: Shield, path: "/admin/security" },
  { id: "reports", label: "Reports", icon: FileText, path: "/admin/reports" },
  { id: "alerts", label: "Alerts", icon: AlertTriangle, path: "/admin/alerts" },
  { id: "notifications", label: "Notifications", icon: Bell, path: "/admin/notifications" },
  { id: "settings", label: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-blue-400">BankAdmin Pro</h1>
        <p className="text-sm text-slate-400">Banking Administration</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.id === "dashboard"} // ensures `/admin` matches only index route
              className={({ isActive }) =>
                `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
