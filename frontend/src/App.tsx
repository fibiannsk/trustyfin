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

// 🔑 Import contexts
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* 🔑 Wrap everything inside AuthProvider + DataProvider */}
        <AuthProvider>
          <DataProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/create-account" element={<CreateAccount />} />
              <Route path="/admin/edit-account" element={<EditAccount />} />

              {/* User Routes */}
              <Route path="/user" element={<UserDashboard />} />
              <Route path="/user/transfer" element={<Transfer />} />
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/user/transactions" element={<Transacts />} />
              <Route
                path="/user/profile/changepassword"
                element={<PasswdChanger />}
              />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
