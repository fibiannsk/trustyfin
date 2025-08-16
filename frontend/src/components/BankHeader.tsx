import { Button } from "./ui/button";

const BankHeader = () => {
  return (
    <header className="w-full bg-white border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">B</span>
          </div>
          <span className="ml-3 text-xl font-semibold text-secondary">SecureBank</span>
        </div>
        
        <Button variant="ghost" className="text-secondary hover:text-primary hover:bg-transparent">
          Help & Support
        </Button>
      </div>
    </header>
  );
};

export default BankHeader;