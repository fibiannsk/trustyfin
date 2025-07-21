import React, { useState } from 'react';

const EditCustomerForm = ({ labels, userData, onUpdate }) => {
  const [formData, setFormData] = useState(userData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(labels).forEach(field => {
      if (!formData[field] || formData[field].toString().trim() === '') {
        newErrors[field] = `${labels[field]} is required`;
      }
    });

    // Additional validation for email
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Additional validation for balance (should be a number)
    if (formData.balance && isNaN(parseFloat(formData.balance))) {
      newErrors.balance = 'Balance must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      await onUpdate(formData);
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (field, label) => {
    const isBalanceField = field === 'balance' || field === 'funds';
    const inputType = field === 'email' ? 'email' : isBalanceField ? 'number' : 'text';
    
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
            value={formData[field] || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className={`
              w-full px-4 py-3 rounded-lg border transition-all duration-200
              bg-white text-foreground placeholder:text-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              hover:border-primary/50
              ${errors[field] 
                ? 'border-destructive focus:ring-destructive' 
                : 'border-input'
              }
              ${isBalanceField ? 'font-mono text-lg' : ''}
            `}
            placeholder={`Enter ${label.toLowerCase()}`}
            step={isBalanceField ? "0.01" : undefined}
            min={isBalanceField ? "0" : undefined}
            aria-invalid={errors[field] ? 'true' : 'false'}
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
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
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
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
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

        {/* Customer ID Display */}
        {userData.id && (
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Customer ID: <span className="font-mono font-medium text-foreground">{userData.id}</span>
            </div>
          </div>
        )}

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
            className={`
              flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200
              flex items-center justify-center gap-2
              ${isLoading 
                ? 'bg-primary/80 text-primary-foreground cursor-not-allowed' 
                : 'bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-lg transform hover:-translate-y-0.5'
              }
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            `}
          >
            {isLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Updating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Update Customer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCustomerForm;