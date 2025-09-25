import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import successAnimation from "../assets/Success.json";
import "@fontsource/inter";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type UpdatePayload = { [key: string]: any };

const EditTransactionForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tx = location.state?.transaction; // 👈 passed from TransactionMonitoring

  // If no transaction, fallback
  if (!tx) {
    return (
      <p className="text-center text-red-500">
        No transaction data provided
      </p>
    );
  }

  // Pre-fill form with all tx fields
  const [formData, setFormData] = useState<UpdatePayload>({ ...tx });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (field: string, value: string) => {
    const isoDate = new Date(value).toISOString();
    setFormData((prev) => ({ ...prev, [field]: isoDate }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch(`http://localhost:5000/admin/transactions/${tx._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setIsSuccess(true);
      setTimeout(() => {
        navigate("/admin/transactions");
      }, 2000);
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Generate PDF Receipt ---
  const handleGeneratePdf = () => {
    const doc = new jsPDF();
    const currentDate = new Date(
      formData.timestamp || Date.now()
    ).toLocaleString();

    // Branding
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(79, 70, 229); // Indigo
    doc.text("TrustyFin", 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Transaction Receipt", 20, 30);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Generated: ${currentDate}`, 20, 36);

    // --- Summary Card (Amount, Status) ---
    doc.setDrawColor(200);
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(20, 42, 170, 20, 3, 3, "F");
    doc.setFontSize(11);
    doc.setTextColor(50);
    doc.text(`Amount: $${formData.amount || "—"}`, 25, 55);
    doc.setTextColor(22, 163, 74);
    doc.text("Successful", 120, 55);

    // Build table with details
    const rows = Object.entries(formData).map(([field, value]) => [
      field.replace(/_/g, " "),
      typeof value === "object" ? JSON.stringify(value) : value || "—",
    ]);

    autoTable(doc, {
      startY: 70,
      body: rows,
      styles: { fontSize: 10, cellPadding: 4 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      columnStyles: {
        0: { cellWidth: 60, fontStyle: "bold" },
        1: { cellWidth: "auto" },
      },
    });

    // Footer
    const finalY = (doc as any).lastAutoTable.finalY || 90;
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(
      "Thank you for banking with TrustyFin",
      20,
      finalY + 20
    );

    // Save PDF
    doc.save("transaction-receipt.pdf");
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Lottie
          animationData={successAnimation}
          loop={false}
          style={{ width: 150, height: 150 }}
        />
        <p className="text-green-600 font-semibold mt-4">
          Transaction updated successfully!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-card rounded-xl shadow-lg border border-border overflow-hidden">
      <div className="bg-primary text-primary-foreground px-6 py-4">
        <h2 className="text-xl font-semibold">Edit Transaction</h2>
        <p className="text-primary-foreground/80 text-sm mt-1">
          Update transaction details, modify date, or generate a receipt
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(formData).map(([field, value]) => {
            if (field.toLowerCase().includes("time")) {
              const datetimeValue = value
                ? new Date(value).toISOString().slice(0, 16)
                : "";

              return (
                <div key={field} className="space-y-2">
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium"
                  >
                    {field}
                  </label>
                  <input
                    id={field}
                    type="datetime-local"
                    value={datetimeValue}
                    onChange={(e) =>
                      handleDateChange(field, e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg border border-input bg-white"
                  />
                </div>
              );
            }

            return (
              <div key={field} className="space-y-2">
                <label
                  htmlFor={field}
                  className="block text-sm font-medium"
                >
                  {field}
                </label>
                <input
                  id={field}
                  type="text"
                  value={value || ""}
                  onChange={(e) =>
                    handleInputChange(field, e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-input bg-white"
                />
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <button
            type="button"
            className="flex-1 px-6 py-3 border rounded-lg"
            onClick={() => setFormData({ ...tx })}
          >
            Reset Changes
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg"
          >
            {isLoading ? "Updating..." : "Update Transaction"}
          </button>
          <button
            type="button"
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg"
            onClick={handleGeneratePdf}
          >
            Generate Receipt
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTransactionForm;
