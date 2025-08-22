import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import CreateAccount from "./pages/AccountForm";
import EditAccount from "./pages/Edit";
import UserDashboard from "./pages/dashboard";
import Transfer from "./pages/Transfer";
import UserProfile from "./pages/profilepage";
import PasswdChanger from "./pages/ChangePassword";
import Transacts from "./pages/transactions";

// 🔑 Contexts
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

// 🔒 Protected routes
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />

              {/* Admin routes (protected) */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/create-account"
                element={
                  <ProtectedRoute>
                    <CreateAccount />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/edit-account"
                element={
                  <ProtectedRoute>
                    <EditAccount />
                  </ProtectedRoute>
                }
              />

              {/* User routes (protected) */}
              <Route
                path="/user"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/transfer"
                element={
                  <ProtectedRoute>
                    <Transfer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/transactions"
                element={
                  <ProtectedRoute>
                    <Transacts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/profile/changepassword"
                element={
                  <ProtectedRoute>
                    <PasswdChanger />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
