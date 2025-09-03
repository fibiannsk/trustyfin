import React, { useState } from 'react';
import { useToast } from '../hooks/use-toast';
import { ArrowLeft, Eye, EyeOff, Shield, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Validation functions
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!oldPassword) {
      newErrors.oldPassword = 'Old password is required';
    }

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    } else if (newPassword === oldPassword) {
      newErrors.newPassword = 'New password must be different from old password';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthText = (strength: number) => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Fair';
    if (strength < 5) return 'Good';
    return 'Strong';
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 2) return 'text-destructive';
    if (strength < 4) return 'text-yellow-600';
    if (strength < 5) return 'text-blue-600';
    return 'text-success';
  };

  const togglePasswordVisibility = (field: 'old' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const token = localStorage.getItem("token"); // adjust if you store JWT differently

    const response = await fetch("http://localhost:5000/profile/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast({
        title: "Error",
        description: data.error || "Password change failed",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password Changed Successfully",
      description: "Your password has been updated securely.",
      variant: "default",
    });

    // Clear form
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
  } catch (error) {
    console.error("Password change error:", error);
    toast({
      title: "Error",
      description: "Something went wrong. Please try again later.",
      variant: "destructive",
    });
  }
};


  const isFormValid = oldPassword && 
                     newPassword && 
                     confirmPassword && 
                     newPassword.length >= 8 && 
                     newPassword !== oldPassword && 
                     newPassword === confirmPassword;

  const passwordStrength = getPasswordStrength(newPassword);

  const navigate = useNavigate();
    const proffyl = () => {
      navigate('/user/profile');
    };
  return (
    <div className="relative">
            {/* Back Button Overlay */}
            <button
              onClick={proffyl}
              className="absolute top-4 left-4 z-50 text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="Go back to dashboard"
          >
            <ArrowLeft size={24} />
          </button>
    <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto p-6 bg-card border rounded-lg shadow-sm w-full">
        <div className="flex items-center justify-center mb-6">
          <Shield className="h-8 w-8 text-primary mr-3" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-foreground">
            Change Password
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Old Password */}
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-foreground mb-2">
              Old Password
            </label>
            <div className="relative">
              <input
                id="oldPassword"
                type={showPasswords.old ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="border rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-ring focus:outline-none bg-input text-foreground transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('old')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPasswords.old ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.oldPassword && (
              <p className="text-destructive text-sm mt-1 flex items-center">
                <X className="h-3 w-3 mr-1" />
                {errors.oldPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-foreground mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showPasswords.new ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-ring focus:outline-none bg-input text-foreground transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            {/* Password Requirements */}
            <div className="mt-2 text-sm text-muted-foreground">
              <p>Password must be at least 8 characters. Use letters, numbers, and symbols for stronger security.</p>
              
              {newPassword && (
                <div className="mt-2 flex items-center space-x-2">
                  <span>Strength:</span>
                  <span className={`font-medium ${getStrengthColor(passwordStrength)}`}>
                    {getStrengthText(passwordStrength)}
                  </span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 w-4 rounded ${
                          level <= passwordStrength 
                            ? passwordStrength < 2 ? 'bg-destructive' 
                              : passwordStrength < 4 ? 'bg-yellow-500'
                              : passwordStrength < 5 ? 'bg-blue-500'
                              : 'bg-success'
                            : 'bg-border'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {errors.newPassword && (
              <p className="text-destructive text-sm mt-1 flex items-center">
                <X className="h-3 w-3 mr-1" />
                {errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPasswords.confirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-ring focus:outline-none bg-input text-foreground transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            {confirmPassword && newPassword && (
              <div className="mt-1 flex items-center text-sm">
                {confirmPassword === newPassword ? (
                  <span className="text-success flex items-center">
                    <Check className="h-3 w-3 mr-1" />
                    Passwords match
                  </span>
                ) : (
                  <span className="text-destructive flex items-center">
                    <X className="h-3 w-3 mr-1" />
                    Passwords do not match
                  </span>
                )}
              </div>
            )}
            
            {errors.confirmPassword && (
              <p className="text-destructive text-sm mt-1 flex items-center">
                <X className="h-3 w-3 mr-1" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!oldPassword || !newPassword || !confirmPassword}
            className={`w-full py-2 rounded-md font-semibold transition-colors duration-300 ease-in-out ${
              isFormValid
                ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                : 'bg-banking-red text-destructive-foreground hover:bg-destructive-hover'
            }`}
          >

            Change Password
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Make sure to use a unique password that you don't use elsewhere.</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ChangePasswordForm;