import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditCustomerForm, { LabelsMap, UpdatePayload } from "../components/EditCustomer";
import { useToast } from "../hooks/use-toast";

const EditAccount = () => {
  const { accountNumber } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [userData, setUserData] = useState<UpdatePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const labels: LabelsMap = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone Number",
    balance: "Account Balance",
    status: "Status",
    accountType: "Account Type",
    password: "Password",
    pin: "PIN",
  };

  useEffect(() => {
  if (!accountNumber) return;

  setLoading(true);

  fetch(`http://127.0.0.1:5000/admin/user/${accountNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`User fetch failed: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setUserData(data);
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      setUserData(null);
    })
    .finally(() => {
      setLoading(false);
    });
}, [accountNumber]);


  const handleUpdate = (payload: UpdatePayload) => {
  setUpdating(true);

  fetch(`http://127.0.0.1:5000/admin/user/${accountNumber}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Update failed");
      }
      return response.json();
    })
    .then((updated) => {
      setUserData(updated);

      toast({
        title: "Customer Updated Successfully",
        description: `${updated.firstName} ${updated.lastName}'s information has been updated.`,
      });

      navigate("/admin/customers");
    })
    .catch((err) => {
      console.error("Error updating user:", err);
      toast({
        title: "Error",
        description: "Could not update user",
        variant: "destructive",
      });
    })
    .finally(() => {
      setUpdating(false);
    });
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-banking-light">
        <p className="text-lg text-muted-foreground">Loading user data...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-banking-light">
        <p className="text-lg text-red-600">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-banking-light py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-banking-dark mb-2">
            Banking Admin Portal
          </h1>
          <p className="text-muted-foreground">
            Manage customer accounts and information
          </p>
        </div>

        <div className="mb-4">
          <button
            className="text-blue-600 hover:underline"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>

        <EditCustomerForm
          labels={labels}
          userData={userData}
          onUpdate={handleUpdate}
        />

        {updating && (
          <div className="mt-4 text-center text-blue-600 font-medium">
            Processing update...
          </div>
        )}

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Professional banking administration interface built with React and
            Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
