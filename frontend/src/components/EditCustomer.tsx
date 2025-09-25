import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import
import Lottie from "lottie-react";
import successAnimation from "../assets/Success.json"; // ✅ path to your Lottie file

export type LabelsMap = {
  [key: string]: string;
};

export type UpdatePayload = {
  [key: string]: string | number | null;
};

type EditCustomerFormProps = {
  labels: LabelsMap;
  userData: UpdatePayload;
  onUpdate: (data: UpdatePayload) => Promise<void> | void;
};

const EditCustomerForm: React.FC<EditCustomerFormProps> = ({
  labels,
  userData,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<UpdatePayload>(userData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false); // ✅ success state

  const navigate = useNavigate(); // ✅ hook

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    Object.keys(labels).forEach((field) => {
      if (!formData[field] || formData[field]?.toString().trim() === "") {
        newErrors[field] = `${labels[field]} is required`;
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email.toString())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.balance && isNaN(Number(formData.balance))) {
      newErrors.balance = "Balance must be a valid number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onUpdate(formData);
      setIsSuccess(true); // ✅ trigger animation
      setTimeout(() => {
        navigate("/admin/customers"); // ✅ smooth redirect
      }, 2000);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    // ✅ full-screen success check animation
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Lottie
          animationData={successAnimation}
          loop={false}
          style={{ width: 150, height: 150 }}
        />
        <p className="text-green-600 font-semibold mt-4">
          User updated successfully!
        </p>
      </div>
    );
  }

  // 🔥 original form UI (untouched except success handling)
  return (
    <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          Edit Customer Information
        </h2>
        <p className="text-primary-foreground/80 text-sm mt-1">
          Update customer details and account balance
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(labels).map(([field, label]) => (
            <div key={field} className="space-y-2">
              <label
                htmlFor={field}
                className="block text-sm font-medium text-banking-dark"
              >
                {label}
              </label>
              <input
                id={field}
                type="text"
                value={formData[field] || ""}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors[field] && (
                <p className="text-sm text-destructive">{errors[field]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <button
            type="button"
            className="flex-1 px-6 py-3 border border-border rounded-lg text-foreground bg-background hover:bg-muted"
            onClick={() => setFormData(userData)}
          >
            Reset Changes
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${
                isLoading
                  ? "bg-primary/80 text-primary-foreground cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              }`}
          >
            {isLoading ? "Updating..." : "Update Customer"}
          </button>
           {/* 🚨 Delete Button */}
          <button
            type="button"
            className="flex-1 px-6 py-3 rounded-lg font-medium bg-destructive text-white hover:bg-destructive/90 transition-all duration-200"
            onClick={async () => {
              if (!window.confirm("Are you sure you want to delete this customer?")) return;
            
              try {
                setIsLoading(true);
                const res = await fetch(`http://127.0.0.1:5000/admin/user/${formData.accountNumber}`, {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                });
                
                if (res.ok) {
                  navigate("/admin/customers");
                } else {
                  const err = await res.json();
                  alert(err.error || "Failed to delete customer");
                }
              } catch (error) {
                console.error("Delete failed:", error);
              } finally {
                setIsLoading(false);
              }
            }}
            >
            {isLoading ? "Deleting..." : "Delete Customer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCustomerForm;