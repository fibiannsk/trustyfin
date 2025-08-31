import { Outlet, useNavigate } from "react-router-dom";
import  AdminSidebar   from "../components/admin/AdminSidebar";
import { useAuth } from '../context/AuthContext';
import { LogOut } from "lucide-react";


const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logoutAndRedirect } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar with routing instead of local state */}
      <AdminSidebar onSectionChange={(path) => navigate(path)} />

      <div className="flex-1 p-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Banking Administration
              </h1>
              <p className="text-slate-600">
                Manage your banking operations efficiently
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">Welcome back, Admin</p>
                <p className="text-xs text-slate-600">
                  Last login: Today at 9:15 AM
                </p>
              </div>
              <button
                onClick={logoutAndRedirect}
                className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Main content comes from nested routes */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
