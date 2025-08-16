import BankHeader from "../components/BankHeader";
import LoginForm from "../components/LoginForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-white to-blue-500">
      <BankHeader />
      
      <main className="flex items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
      
      <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <p className="text-xs text-gray-700 text-center">
          © 2024 TrustyfinBank. All rights reserved. Member FDIC.
        </p>
      </footer>
    </div>
  );
};

export default Index;
