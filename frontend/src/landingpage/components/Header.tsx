import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logotrustyfin from "../../assets/logotrustyfin.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login"); // 👈 navigate to /login
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src={logotrustyfin}
              alt="trustyfin logo"
              className="h-16 w-auto mx-auto"
            />
            <span className="text-2xl font-bold text-[#012169] font-inter">
              TrustyFin
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 font-inter">
            <a href="#services" className="text-gray-700 hover:text-[#e31837] transition-colors">
              Services
            </a>
            <a href="#features" className="text-gray-700 hover:text-[#e31837] transition-colors">
              Features
            </a>
            <a href="#security" className="text-gray-700 hover:text-[#e31837] transition-colors">
              Security
            </a>
            <a href="#about" className="text-gray-700 hover:text-[#e31837] transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-[#e31837] transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4 font-inter">
            <Button
              variant="outline"
              className="border-[#012169] text-[#012169] hover:bg-[#012169] hover:text-white"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Button className="bg-[#e31837] hover:bg-[#c41230] text-white">
              Open Account
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden font-inter">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a
                href="#services"
                className="block px-3 py-2 text-gray-700 hover:text-[#e31837] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#features"
                className="block px-3 py-2 text-gray-700 hover:text-[#e31837] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#security"
                className="block px-3 py-2 text-gray-700 hover:text-[#e31837] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Security
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-gray-700 hover:text-[#e31837] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-gray-700 hover:text-[#e31837] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" className="w-full border-[#012169] text-[#012169] hover:bg-[#012169] hover:text-white">
                  Sign In
                </Button>
                <Button className="w-full bg-[#e31837] hover:bg-[#c41230] text-white">
                  Open Account
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
