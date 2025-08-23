
// 🔑 Higher-order function that injects logout
export const apiFetch = (token, logoutAndRedirect, toast) => {
  return async (url, options = {}, requireAuth = true) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        ...(requireAuth && token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      };

      const res = await fetch(url, { ...options, headers });

      if (res.status === 401) {
        toast?.({ title: "Session expired", description: "Please log in again", variant: "destructive" });
        logoutAndRedirect?.();
        return null;
    }

      const data = await res.json();

      if (!res.ok) {
        toast?.({ title: "Error", description: data.error || "Request failed", variant: "destructive" });
        throw new Error(data.error || "Request failed");
    }

      return data;
    } catch (err) {
      console.error("apiFetch error:", err.message);
      throw err;
    }
  };
};
