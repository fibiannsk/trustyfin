import { Navigate } from "react-router-dom";
import { useData } from "./context/DataContext";
import { useToast } from "./hooks/use-toast";

export default function BlockedRoute({ children }) {
  const { userInfo } = useData();
  const { toast } = useToast();

  if (userInfo?.blocked) {
    toast({
      title: "Account blocked",
      description: "Your account is blocked. Please contact support.",
      variant: "destructive",
    });
    return <Navigate to="/user" replace />; // redirect to dashboard
  }

  return children;
}
