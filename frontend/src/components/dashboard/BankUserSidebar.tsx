import { useNavigate } from "react-router-dom";
import {
  Home,
  DollarSign,
  CreditCard,
  User,
  Shield,
  Bell,
  Settings,
  HelpCircle,
  X,
} from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, action: "dashboard" },
  { id: "transactions", label: "Transactions", icon: DollarSign, action: "transactions" },
  { id: "transfers", label: "Transfers", icon: CreditCard, action: "transfer" },
  { id: "profile", label: "Profile", icon: User, action: "profile" },
  { id: "security", label: "Security", icon: Shield, action: "security" },
  { id: "notifications", label: "Notifications", icon: Bell, action: "notifications" },
  { id: "settings", label: "Settings", icon: Settings, action: "settings" },
  { id: "support", label: "Privacy & Support", icon: HelpCircle, action: "support" },
];

export default function BankUserSidebar({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();

  const handleNavigation = (action: string) => {
    switch (action) {
      case "dashboard":
        navigate("/user");
        break;
      case "transactions":
        navigate("/user/transactions");
        break;
      case "transfer":
        navigate("/user/transfer");
        break;
      case "profile":
        navigate("/user/profile");
        break;
      case "security":
        navigate("/user/security");
        break;
      case "notifications":
        navigate("/user/notifications");
        break;
      case "settings":
        navigate("/user/settings");
        break;
      case "support":
        navigate("/user/support");
        break;
      default:
        break;
    }
    onClose(); // close sidebar after navigation
  };

  return (
    <div className="relative w-64 bg-slate-900 text-white h-full p-4">
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-white"
        onClick={onClose}
      >
        <X size={20} />
      </button>

      {/* Branding */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-blue-400">TrustyFin Bank</h1>
        <p className="text-sm text-slate-400">Your Banking Hub</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.action)}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
