import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import logotrustyfin from "../../assets/logotrustyfin.png";

const footerLinks = {
  Banking: [
    "Checking Accounts",
    "Savings Accounts",
    "Credit Cards",
    "Personal Loans",
    "Mortgages",
    "Auto Loans",
  ],
  Support: [
    "Contact Us",
    "Help Center",
    "Security Center",
    "Find ATM/Branch",
    "Mobile App",
    "Online Banking",
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#012169] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-7 flex items-center justify-center">
                <img 
                    src={logotrustyfin} 
                    alt="trustyfin logo" 
                    className="h-16 w-auto mx-auto"
                    />
              </div>
              <span className="text-2xl font-bold">TrustyFin</span>
            </div>

            <p className="text-white/80 mb-6 leading-relaxed">
              TrustyFin is a modern digital bank committed to making financial
              services accessible, secure, and transparent for everyone. Join
              millions who trust us with their financial future.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-white/80">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">
                  121 Commerce Street, Dallas, TX 75201
                </span>
              </div>
              <div className="flex items-center space-x-3 text-white/80">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">
                  +1-254-400-6117
                </span>
              </div>
              <div className="flex items-center space-x-3 text-white/80">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">support@trustyfin.icu</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-white/80 hover:text-white hover:bg-white/10"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-white/80 hover:text-white hover:bg-white/10"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-white/80 hover:text-white hover:bg-white/10"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-white/80 hover:text-white hover:bg-white/10"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-white/80 hover:text-white hover:bg-white/10"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/80 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-12 bg-white/20" />

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
            <span>© 2025 TrustyFin. All rights reserved.</span>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Accessibility
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>

          <div className="flex items-center space-x-6 text-sm text-white/60">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-[#012169] font-bold text-xs">FDIC</span>
              </div>
              <span>Member FDIC</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Equal Housing Lender</span>
            </div>
          </div>
        </div>

        {/* Regulatory Text */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <p className="text-xs text-white/50 leading-relaxed">
            TrustyFin is a trademark of TrustyFin Bank, N.A. Member FDIC.
            Investment and insurance products are not FDIC insured, are not bank
            guaranteed, and may lose value. Investment products are offered
            through TrustyFin Advisors LLC, member SIPC. Insurance products are
            offered through TrustyFin Insurance Agency LLC.
          </p>
        </div>
      </div>
    </footer>
  );
}
