import React, { useState } from "react";

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
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (field: string, label: string) => {
    const isBalanceField = field === "balance" || field === "funds";
    const inputType =
      field === "email" ? "email" : isBalanceField ? "number" : "text";

    return (
      <div key={field} className="space-y-2">
        <label
          htmlFor={field}
          className="block text-sm font-medium text-banking-dark"
        >
          {label}
          {isBalanceField && (
            <span className="ml-1 text-banking-green font-semibold">($)</span>
          )}
        </label>
        <div className="relative">
          <input
            id={field}
            type={inputType}
            value={formData[field] || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200
              bg-white text-foreground placeholder:text-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              hover:border-primary/50
              ${
                errors[field]
                  ? "border-destructive focus:ring-destructive"
                  : "border-input"
              }
              ${isBalanceField ? "font-mono text-lg" : ""}
            `}
            placeholder={`Enter ${label.toLowerCase()}`}
            step={isBalanceField ? "0.01" : undefined}
            min={isBalanceField ? "0" : undefined}
            aria-invalid={errors[field] ? "true" : "false"}
            aria-describedby={errors[field] ? `${field}-error` : undefined}
          />
          {isBalanceField && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-sm font-medium text-banking-green">USD</span>
            </div>
          )}
        </div>
        {errors[field] && (
          <p
            id={`${field}-error`}
            className="text-sm text-destructive flex items-center gap-1"
            role="alert"
          >
            {errors[field]}
          </p>
        )}
      </div>
    );
  };

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
          {Object.entries(labels).map(([field, label]) =>
            renderField(field, label)
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <button
            type="button"
            className="flex-1 px-6 py-3 border border-border rounded-lg text-foreground bg-background hover:bg-muted transition-all duration-200 font-medium"
            onClick={() => setFormData(userData)}
          >
            Reset Changes
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200
              flex items-center justify-center gap-2
              ${
                isLoading
                  ? "bg-primary/80 text-primary-foreground cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-lg transform hover:-translate-y-0.5"
              }
            `}
          >
            {isLoading ? "Updating..." : "Update Customer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCustomerForm;
