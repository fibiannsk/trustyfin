
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bell, Settings, LogOut, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import logotrustyfin from '../../assets/logotrustyfin.png';
import { useAuth } from '../../context/AuthContext';
 

export const Navbar = () => {

  const { logout } = useAuth();
   const navigate = useNavigate();

   const dashboardmv = () => {
    navigate('/user');
 };

  const profilemv = () => {
    navigate('/user/profile');
 };

 const transferr = () => {
    navigate('/user/transfer');
 };

 const transactionhistory = () => {
    navigate('/user/transactions');
 };
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img 
                  src={logotrustyfin} 
                  alt="trustyfin logo" 
                  className="h-16 w-auto mx-auto"
              />
              <span className="text-xl font-bold text-gray-900">TrustyFin Bank</span>
            </div>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={dashboardmv}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Dashboard
            </button>
            <button
              onClick={transactionhistory}
              className="text-gray-500 hover:text-blue-600 font-medium transition-colors">
              Transactions
            </button>
            <button
              onClick={transferr}
              className="text-gray-500 hover:text-blue-600 font-medium transition-colors">
              Transfers
            </button>
            <a href="#" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">
              Privacy & Support
            </a>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Sarah Johnson" />
                    <AvatarFallback className="bg-blue-600 text-white">SJ</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block text-sm font-medium">Sarah Johnson</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <button
                    onClick={profilemv}
                    className="text-gray-500 hover:text-blue-600 font-medium transition-colors">
                    Settings
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer" 
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
