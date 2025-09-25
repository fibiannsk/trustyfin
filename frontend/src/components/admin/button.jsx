import React, { useState } from "react";
import { Lock, Unlock } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";

export default function BlockToggleButton({ userId, initialBlocked, onStatusChange }) {
  const [blocked, setBlocked] = useState(initialBlocked);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const toggleBlockStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/admin/user/${userId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocked: !blocked }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      const data = await res.json();
      setBlocked(!blocked);

      // notify parent if provided
      if (onStatusChange) {
        onStatusChange(userId, !blocked);
      }

      toast({
        title: "Status Updated",
        description: data.message,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={blocked ? "destructive" : "default"}
      disabled={loading}
      onClick={toggleBlockStatus}
      className="flex items-center gap-2"
    >
      {blocked ? <Lock size={18} /> : <Unlock size={18} />}
    </Button>
  );
}
