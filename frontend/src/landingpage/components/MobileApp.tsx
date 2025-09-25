import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Apple, Smartphone, Star, Download } from "lucide-react";

export function MobileApp() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#012169] to-[#1e3a8a] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#e31837] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-white space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
              <Smartphone className="h-4 w-4 mr-2" />
              <span>Award-Winning App</span>
            </div>
            
            <h2 className="text-4xl font-bold leading-tight">
              Bank on the Go with Our
              <span className="text-[#e31837] block">Mobile Banking App</span>
            </h2>
            
            <p className="text-xl text-white/90">
              Experience seamless banking with our intuitive mobile app. 
              Manage your finances, pay bills, and invest your money – all from your smartphone.
            </p>

            {/* App Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#e31837] rounded-full"></div>
                <span className="text-white/90">Instant account balance and transaction history</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#e31837] rounded-full"></div>
                <span className="text-white/90">Mobile check deposit with photo capture</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#e31837] rounded-full"></div>
                <span className="text-white/90">Send money instantly with Zelle</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#e31837] rounded-full"></div>
                <span className="text-white/90">Biometric login with Face ID and Touch ID</span>
              </div>
            </div>

            {/* Ratings */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-white/90">4.8 on App Store</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-white/90">4.7 on Google Play</span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-black hover:bg-gray-800 text-white px-6 py-4 rounded-xl"
              >
                <Apple className="mr-3 h-6 w-6" />
                <div className="text-left">
                  <div className="text-xs text-gray-300">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-black bg-white hover:bg-gray-100 px-6 py-4 rounded-xl"
              >
                <div className="mr-3 h-6 w-6 bg-gradient-to-br from-green-400 to-blue-500 rounded flex items-center justify-center">
                  <Download className="h-3 w-3 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-600">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 max-w-sm mx-auto">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1681826291722-70bd7e9e6fc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBiYW5raW5nJTIwYXBwfGVufDF8fHx8MTc1ODAwNzI4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Mobile Banking App"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>

            {/* Floating UI Elements */}
            <div className="absolute -top-4 -left-8 bg-white p-4 rounded-2xl shadow-lg transform rotate-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Payment Sent</p>
                  <p className="text-xs text-gray-600">$250.00 to John Doe</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 bg-white p-4 rounded-2xl shadow-lg transform -rotate-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#e31837] mb-1">+$1,200</div>
                <p className="text-xs text-gray-600">Monthly Savings Goal</p>
                <div className="w-16 h-2 bg-gray-200 rounded-full mt-2">
                  <div className="w-12 h-2 bg-[#e31837] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}