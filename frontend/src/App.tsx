import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlockedRoute from "./blockedroute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import CreateAccount from "./pages/AccountForm";
import EditAccount from "./pages/Edit";
import LandingApp from "./landingpage/LandingApp";
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

// 📊 Admin section components
import { DashboardOverview } from "./components/admin/DashboardOverview";
import { CustomerManagement } from "./components/admin/CustomerManagement";
import { TransactionMonitoring } from "./components/admin/TransactionMonitoring";
import { SecurityCenter } from "./components/admin/SecurityCenter";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import EditTransactionForm from "./pages/EditTransactionForm"; // add this


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
              <Route path="/" element={<LandingApp />} /> {/* 👈 landing page */}
              <Route path="/login" element={<Index />} />
              <Route path="*" element={<NotFound />} />

              {/* Admin routes (protected, nested) */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardOverview />} />
                <Route path="customers" element={<CustomerManagement />} />
                  {/* Transactions nested routes */}
                <Route path="transactions">
                  <Route index element={<TransactionMonitoring />} />
                  <Route path="edit/:txId" element={<EditTransactionForm />} />
                </Route>
                <Route path="security" element={<SecurityCenter />} />

                <Route
                  path="accounts"
                  element={
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Management</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          Account management features will be available here.
                        </p>
                      </CardContent>
                    </Card>
                  }
                />
                <Route
                  path="reports"
                  element={
                    <Card>
                      <CardHeader>
                        <CardTitle>Reports & Analytics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          Financial reports and analytics will be available here.
                        </p>
                      </CardContent>
                    </Card>
                  }
                />
                <Route
                  path="alerts"
                  element={
                    <Card>
                      <CardHeader>
                        <CardTitle>System Alerts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          System alerts and notifications will be managed here.
                        </p>
                      </CardContent>
                    </Card>
                  }
                />
                <Route
                  path="notifications"
                  element={
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Center</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          Customer notifications and communication tools will be
                          available here.
                        </p>
                      </CardContent>
                    </Card>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <Card>
                      <CardHeader>
                        <CardTitle>System Settings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          System configuration and settings will be managed
                          here.
                        </p>
                      </CardContent>
                    </Card>
                  }
                />
              </Route>

              {/* Admin standalone forms */}
              <Route
                path="/admin/create-account"
                element={
                  <ProtectedRoute>
                    <CreateAccount />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/edit-account/:accountNumber"
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
                    <BlockedRoute>
                      <Transfer />
                    </BlockedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/profile"
                element={
                  <ProtectedRoute>
                    <BlockedRoute>
                      <UserProfile />
                    </BlockedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/transactions"
                element={
                  <ProtectedRoute>
                    <BlockedRoute>
                      <Transacts />
                    </BlockedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/profile/changepassword"
                element={
                  <ProtectedRoute>
                    <BlockedRoute>
                      <PasswdChanger />
                    </BlockedRoute>
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
