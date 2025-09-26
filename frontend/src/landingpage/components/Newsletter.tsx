import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Mail, CheckCircle, TrendingUp, DollarSign, Shield } from "lucide-react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    }
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: "Market Insights",
      description:
        "Weekly analysis of market trends and investment opportunities",
    },
    {
      icon: DollarSign,
      title: "Money Tips",
      description: "Expert advice on budgeting, saving, and growing your wealth",
    },
    {
      icon: Shield,
      title: "Security Updates",
      description:
        "Important security notifications and feature announcements",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-[#e31837]/10 text-[#e31837] rounded-full mb-6">
              <Mail className="h-4 w-4 mr-2" />
              <span>Stay Informed</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Get the Latest{" "}
              <span className="text-[#e31837] block">Financial Insights</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join over 100,000 subscribers who receive our weekly newsletter
              packed with market insights, money-saving tips, and exclusive
              offers.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#e31837] to-[#012169] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div>
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8">
                {!isSubscribed ? (
                  <>
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#e31837] to-[#012169] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Subscribe Now
                      </h3>
                      <p className="text-gray-600">
                        Get weekly insights delivered to your inbox
                      </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12 text-lg border-gray-200 focus:border-[#e31837] focus:ring-[#e31837]"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-12 bg-[#e31837] hover:bg-[#c41230] text-white text-lg"
                      >
                        Subscribe for Free
                      </Button>
                    </form>
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-500">
                        Join 100,000+ subscribers • Unsubscribe anytime • No
                        spam, ever
                      </p>
                      <div className="flex items-center justify-center space-x-4 mt-3 text-xs text-gray-400">
                        <span className="flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                          Free forever
                        </span>
                        <span className="flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                          Weekly delivery
                        </span>
                        <span className="flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                          Expert insights
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Welcome Aboard!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      You've successfully subscribed to our newsletter. Check
                      your inbox for a welcome email with exclusive content.
                    </p>
                    <Button
                      onClick={() => setIsSubscribed(false)}
                      variant="outline"
                      className="border-[#012169] text-[#012169] hover:bg-[#012169] hover:text-white"
                    >
                      Subscribe Another Email
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Trusted by customers at leading companies
          </p>
          <div className="flex items-center justify-center space-x-8 opacity-60">
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg"
              alt="Google"
              className="h-8 w-auto"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoft.svg"
              alt="Microsoft"
              className="h-8 w-auto"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/apple.svg"
              alt="Apple"
              className="h-8 w-auto"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/amazon.svg"
              alt="Amazon"
              className="h-8 w-auto"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tesla.svg"
              alt="Tesla"
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

