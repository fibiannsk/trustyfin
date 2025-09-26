import { useEffect, useRef, useState } from "react";
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

// 👇 Hook to trigger animation on scroll
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target); // animate once
      }
    }, options);

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}

export function Features() {
  const header = useInView({ threshold: 0.2 });
  const stats = useInView({ threshold: 0.2 });

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={header.ref}
          className={`text-center mb-16 transition-all duration-700 ${
            header.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-[#e31837]/10 text-[#e31837] rounded-full mb-4 animate-bounce-slow">
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const item = useInView({ threshold: 0.15 });
            return (
              <div
                key={index}
                ref={item.ref}
                className={`transition-all duration-700 delay-[${index * 150}ms]
                  ${item.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                `}
              >
                <Card
                  className="border-0 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#e31837] to-[#012169] rounded-lg flex items-center justify-center mb-4 animate-pulse-slow">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div
          ref={stats.ref}
          className={`mt-20 bg-gradient-to-r from-[#012169] to-[#e31837] rounded-2xl p-8 lg:p-12 transition-all duration-700 ${
            stats.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: "2M+", label: "Happy Customers" },
              { value: "$50B+", label: "Assets Under Management" },
              { value: "99.9%", label: "Uptime Guarantee" },
              { value: "4.8★", label: "App Store Rating" },
            ].map((stat, i) => {
              const statItem = useInView({ threshold: 0.2 });
              return (
                <div
                  key={i}
                  ref={statItem.ref}
                  className={`transition-all duration-700 delay-[${i * 200}ms]
                    ${statItem.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                    transform hover:scale-105
                  `}
                >
                  <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
