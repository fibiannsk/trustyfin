import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, User, Camera, Lock, Shield, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useToast } from "../hooks/use-toast";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

interface ProfilePageProps {
  onChangePassword?: () => void;
  onCreatePin?: () => void;
  onLogout?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { token, logoutAndRedirect } = useAuth();
  const { userInfo, refetchUserInfo } = useData(); // ✅ include refetchUserInfo
  const navigate = useNavigate();

  const profilePictureUrl = userInfo?.profile_picture
    ? `http://localhost:5000/${userInfo.profile_picture}`
    : null;
  
  const usePinResetToast = () => {
  return () => {
    toast({
      title: "Contact your Bank",
      description: "Contact your Bank for a Pin Reset",
      variant: "destructive",
    });
  };
};

  useEffect(() => {
    refetchUserInfo(); // ✅ fetch profile data on mount
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 5MB.",
        variant: "destructive",
      });
      return;
    }

    if (!token) {
      toast({
        title: "Authentication error",
        description: "No token found",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:5000/profile/upload-picture",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        await refetchUserInfo(); // ✅ refresh data after upload
        toast({
          title: "Profile picture updated",
          description: result.message,
        });
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRemoveImage = async () => {
    if (!token) {
      toast({
        title: "Authentication error",
        description: "No token found",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/profile/remove-picture",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        await refetchUserInfo(); // ✅ refresh data after removal
        toast({
          title: "Profile picture removed",
          description: result.message,
        });
      } else {
        throw new Error(result.error || "Remove failed");
      }
    } catch (error: any) {
      toast({
        title: "Remove failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleBackClick = () => {
    navigate("/user");
  };

  const actionCards = [
    {
      title: "Change Password",
      icon: Lock,
      description: "Update your account password",
      onClick: () => navigate("/user/profile/changepassword"),
    },
    {
      title: "Create PIN",
      icon: Shield,
      description: "Set up a secure PIN for quick access",
      onClick: {usePinResetToast},
    },
    {
      title: "Logout",
      icon: LogOut,
      description: "Sign out of your account",
      onClick: logoutAndRedirect,
      variant: "destructive" as const,
    },
  ];

  return (
    <div className="relative">
      {/* Back Button Overlay */}
      <button
        onClick={handleBackClick}
        className="absolute top-4 left-4 z-50 text-gray-500 hover:text-blue-600 transition-colors"
        aria-label="Go back to dashboard"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 py-8 px-4">
        <div className="max-w-lg mx-auto space-y-8">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-card border-4 border-white shadow-profile">
                {userInfo?.profile_picture ? (
                  <img
                    src={profilePictureUrl ?? ""}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <User className="w-10 h-10 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Camera Icon Overlay */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white text-primary hover:bg-white hover:text-primary-hover shadow-md border-2 border-white transition-all duration-200 hover:scale-105"
                    variant="outline"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={handleUploadClick}
                    className="cursor-pointer"
                  >
                    <Camera className="w-4 h-4 mr-2" /> Upload Picture
                  </DropdownMenuItem>
                  {userInfo?.profile_picture && (
                    <DropdownMenuItem
                      onClick={handleRemoveImage}
                      className="cursor-pointer text-destructive"
                    >
                      <User className="w-4 h-4 mr-2" /> Remove Picture
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-semibold text-foreground">
                Profile Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your account preferences
              </p>
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Action Cards Section */}
          <div className="space-y-4">
            {actionCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Card
                  key={index}
                  className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] bg-gradient-card border hover:border-primary/20 ${
                    card.variant === "destructive"
                      ? "hover:border-destructive/20"
                      : ""
                  }`}
                  onClick={card.onClick}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 rounded-full ${
                        card.variant === "destructive"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${
                          card.variant === "destructive"
                            ? "text-destructive"
                            : "text-foreground"
                        }`}
                      >
                        {card.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Footer */}
          <div className="text-center pt-8 pb-4">
            <p className="text-xs text-muted-foreground">
              Your account is secure and protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
