import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function ContactFooter() {
  return (
    <footer className="bg-[#012169] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">TrustyFin Bank</h3>
            <p className="text-gray-300 mb-6">
              Your trusted financial partner since 1985, committed to helping you achieve your financial goals 
              through innovative solutions and personalized service.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-[#e31837] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">f</span>
              </div>
              <div className="w-8 h-8 bg-[#e31837] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">t</span>
              </div>
              <div className="w-8 h-8 bg-[#e31837] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">in</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Personal Banking</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Business Banking</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Loans & Mortgages</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Investment Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Online Banking</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Financial Planning</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Security Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Customer Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Branch Locator</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#e31837] mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>121 Commerce Street</p>
                  <p>Dallas, TX 75201</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#e31837] flex-shrink-0" />
                <span className="text-gray-300">+1-254-400-6117</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#e31837] flex-shrink-0" />
                <span className="text-gray-300">info@trustyfin.icu</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#e31837] mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>Mon-Fri: 9AM-6PM</p>
                  <p>Sat: 9AM-2PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 TrustyFin Bank. All rights reserved. Member FDIC.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}