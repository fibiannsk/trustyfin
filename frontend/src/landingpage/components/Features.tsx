import { Card, CardContent } from "./ui/card";
import { 
  Smartphone, 
  CreditCard, 
  PiggyBank, 
  TrendingUp, 
  Shield, 
  Zap,
  Globe,
  Users
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Mobile Banking",
    description: "Bank anywhere, anytime with our award-winning mobile app featuring biometric security and instant notifications."
  },
  {
    icon: CreditCard,
    title: "Smart Cards",
    description: "Contactless payments, real-time spending alerts, and automatic cashback rewards on every purchase."
  },
  {
    icon: PiggyBank,
    title: "Auto Savings",
    description: "Round up purchases and automatically save spare change. Set savings goals and watch your money grow."
  },
  {
    icon: TrendingUp,
    title: "Investment Tools",
    description: "Commission-free trading, robo-advisors, and personalized investment recommendations."
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description: "Military-grade encryption, fraud monitoring, and instant account alerts keep your money safe."
  },
  {
    icon: Zap,
    title: "Instant Transfers",
    description: "Send money instantly to friends and family with just their phone number or email address."
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Use your card worldwide with no foreign transaction fees and access to 55,000+ ATMs."
  },
  {
    icon: Users,
    title: "24/7 Support",
    description: "Get help when you need it with our round-the-clock customer support team and live chat."
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#e31837]/10 text-[#e31837] rounded-full mb-4">
            <span>✨ Features</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to
            <span className="text-[#e31837] block">Manage Your Money</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From everyday banking to long-term investments, TrustyFin provides all the tools 
            you need to take control of your financial future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#e31837] to-[#012169] rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-[#012169] to-[#e31837] rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">2M+</div>
              <div className="text-white/80">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">$50B+</div>
              <div className="text-white/80">Assets Under Management</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">99.9%</div>
              <div className="text-white/80">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">4.8★</div>
              <div className="text-white/80">App Store Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}