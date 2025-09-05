import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "../hooks/use-toast";
import { useAuth } from "./AuthContext";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { token, logout, user } = useAuth();
  const { toast } = useToast();

  const [userInfo, setUserInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [txMeta, setTxMeta] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [txLoading, setTxLoading] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [incomeSummary, setIncomeSummary] = useState({
    income: 0,
    expenses: 0,
    net_income: 0,
  });
  const [summaryLoading, setSummaryLoading] = useState(false);

  // 🚨 Centralized fetcher → ONLY runs if token exists
  const apiFetch = async (url, options = {}) => {
    if (!token) return null; // hard guard

    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        toast({
          title: "Session expired",
          description: "Please log in again.",
          variant: "destructive",
        });
        logout();
        return null;
      }

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `Request failed: ${res.statusText}`);
      }

      return res.json();
    } catch (err) {
      toast({
        title: "Network error",
        description: err.message,
        variant: "destructive",
      });
      throw err;
    }
  };

  // 🔽 Fetch user data only if token exists
  const fetchAllData = async () => {
  if (!token || user?.role === "superadmin") return; // 🚨 skip admin

  setLoading(true);
  try {
    const data = await apiFetch("http://localhost:5000/profile/");
    if (!data) return;

    setUserInfo({
      id: data.id,
      name: data.name,
      email: data.email,
      role: "user", // or data.role if backend sends it
      balance: data.balance,
      account_number: data.account_number,
      pin: data.pin,
      status: data.status || "active",
      profile_picture: data.profile_picture,
    });

    console.log("Profile saved to context:", data);
    await fetchTransactions(1, 5);
    await fetchTransactionSummary();
    await fetchBeneficiaries();

    toast({
      title: "Welcome back",
      description: `Hello, ${data.name}! Your profile has been loaded successfully.`,
    });
  } catch (error) {
    console.error("Error fetching profile data:", error);
  } finally {
    setLoading(false);
  }
};

  const fetchTransactionSummary = async () => {
    if (!token) return; // safeguard

    setSummaryLoading(true);
    try {
      const summary = await apiFetch(
        "http://localhost:5000/transfer/transactions/summary"
      );
      if (!summary) return;

      setIncomeSummary({
        income: summary.income || 0,
        expenses: summary.expenses || 0,
        net_income: summary.net_income || 0,
      });
    } catch (error) {
      console.error("Error fetching transaction summary:", error);
    } finally {
      setSummaryLoading(false);
    }
  };

  // ✅ Fetch paginated transactions from backend (/transfer/transactions)
// Supports optional filters: type, start, end
const fetchTransactions = React.useCallback(
  async (page = 1, limit = 5, { type = null, start = null, end = null } = {}) => {
    if (!token) return null; // safeguard

    setTxLoading(true);
    try {
      let url = `http://localhost:5000/transfer/transactions?page=${page}&limit=${limit}`;
      if (type) url += `&type=${encodeURIComponent(type)}`; // "debit" | "credit"
      if (start) url += `&start=${encodeURIComponent(start)}`; // YYYY-MM-DD
      if (end) url += `&end=${encodeURIComponent(end)}`; // YYYY-MM-DD

      const res = await apiFetch(url);
      if (!res) return null;

      // ⬇️ Save list + pagination metadata in context
      setTransactions(res.transactions || []);
      setTxMeta({
        page: res.page || page,
        limit: res.limit || limit,
        total: res.total || 0,
        pages: res.pages || 1,
      });

      return res; // so callers can use metadata directly
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return null;
    } finally {
      setTxLoading(false);
    }
  },
  [token]
);


  const fetchBeneficiaries = async () => {
    if (!token) return; // safeguard
  try {
    const res = await apiFetch("http://localhost:5000/transfer/beneficiaries");
    if (res) {
      setBeneficiaries(res);
    }
  } catch (err) {
    console.error("Failed to load beneficiaries:", err);
  }
};

  const refetchUserInfo = async () => {
    if (!token) return;
    const data = await apiFetch("http://localhost:5000/profile/");
    if (data) setUserInfo((prev) => ({ ...prev, ...data }));
  };

  // 🛑 Effect only runs when token exists
  useEffect(() => {
    if (token && user?.role !== "superadmin") {
      fetchAllData();
    } else {
      // Clear old state if token disappears
      setUserInfo(null);
      setTransactions([]);
      setTxMeta({ page: 1, limit: 10, total: 0, pages: 1 });
      setBeneficiaries([]);
      setIncomeSummary({ income: 0, expenses: 0, net_income: 0 });
    }
  }, [token, user?.role]);

  return (
    <DataContext.Provider
      value={{
        userInfo,
        transactions,
        txMeta,
        beneficiaries,
        loading,
        txLoading,
        incomeSummary,
        summaryLoading,
        apiFetch,
        fetchAllData,
        fetchTransactions,
        fetchTransactionSummary,
        fetchBeneficiaries,
        refetchUserInfo,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
