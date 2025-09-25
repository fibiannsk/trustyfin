import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Shield, Lock, Eye, AlertTriangle, CheckCircle2, Fingerprint } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "FDIC Insured",
    description: "Your deposits are protected up to $250,000 by the Federal Deposit Insurance Corporation."
  },
  {
    icon: Lock,
    title: "256-bit Encryption",
    description: "Bank-level security with the same encryption used by major financial institutions worldwide."
  },
  {
    icon: Fingerprint,
    title: "Biometric Authentication",
    description: "Secure login with fingerprint and facial recognition technology on supported devices."
  },
  {
    icon: Eye,
    title: "Real-time Monitoring",
    description: "AI-powered fraud detection monitors your account 24/7 for suspicious activities."
  },
  {
    icon: AlertTriangle,
    title: "Instant Alerts",
    description: "Get notified immediately of any account activity via SMS, email, or push notifications."
  },
  {
    icon: CheckCircle2,
    title: "Zero Liability",
    description: "You're not responsible for unauthorized transactions when reported promptly."
  }
];

export function Security() {
  return (
    <section id="security" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full mb-6">
              <Shield className="h-4 w-4 mr-2" />
              <span>Bank-Grade Security</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Your Money is Safe &
              <span className="text-[#e31837] block">Fully Protected</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              We use cutting-edge security technology and follow strict regulatory standards 
              to ensure your money and personal information are always protected.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#e31837] to-[#012169] rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1673600043990-6ba525635ec0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBzZWN1cml0eSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU4MDIzMTM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Financial Security"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
            
            {/* Security Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold text-gray-900">Security Status</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-sm text-gray-600">All systems secure</p>
                  <p className="text-xs text-green-600 font-medium">Last checked: Just now</p>
                </div>
              </div>
            </div>

            {/* Compliance Badges */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#012169] rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">FDIC</span>
                </div>
                <p className="text-xs text-gray-600">Insured Bank</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted by Industry Leaders</h3>
            <p className="text-gray-600">Our security standards are recognized and certified by leading organizations</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                <span className="font-bold text-gray-700">SOC</span>
              </div>
              <p className="text-xs text-gray-600">SOC 2 Certified</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                <span className="font-bold text-gray-700">PCI</span>
              </div>
              <p className="text-xs text-gray-600">PCI Compliant</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                <span className="font-bold text-gray-700">ISO</span>
              </div>
              <p className="text-xs text-gray-600">ISO 27001</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                <span className="font-bold text-gray-700">NIST</span>
              </div>
              <p className="text-xs text-gray-600">NIST Framework</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}