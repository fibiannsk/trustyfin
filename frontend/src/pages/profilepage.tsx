import { ProfilePage } from '../components/ProfilePage';
import { useToast } from '../hooks/use-toast';

const UserProfile = () => {
  const { toast } = useToast();

  const handleChangePassword = () => {
    toast({
      title: "Change Password",
      description: "Password change functionality would be implemented here.",
    });
  };

  const handleCreatePin = () => {
    toast({
      title: "Create PIN",
      description: "PIN creation functionality would be implemented here.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logout",
      description: "Logout functionality would be implemented here.",
      variant: "destructive",
    });
  };

  return (
    <ProfilePage
      onChangePassword={handleChangePassword}
      onCreatePin={handleCreatePin}
      onLogout={handleLogout}
    />
  );
};

export default UserProfile;