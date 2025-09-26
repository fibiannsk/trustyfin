import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, CheckCircle } from "lucide-react";

const services = [
  {
    title: "Personal Banking",
    description: "Complete banking solutions for your everyday financial needs.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?...",
    features: [
      "High-yield checking & savings accounts",
      "Premium credit cards with rewards",
      "Personal loans up to $100,000",
      "Mortgage and refinancing options"
    ],
    highlight: "0.45% APY"
  },
  {
    title: "Business Banking",
    description: "Powerful financial tools to help your business thrive and grow.",
    image: "https://images.unsplash.com/photo-1652503698072-175651f77634?...",
    features: [
      "Business checking with no monthly fees",
      "Commercial lending solutions",
      "Merchant services & payment processing",
      "Payroll and cash management tools"
    ],
    highlight: "No Fees"
  },
  {
    title: "Investment & Wealth",
    description: "Build and protect your wealth with our comprehensive investment platform.",
    image: "https://images.unsplash.com/photo-1730382624709-81e52dd294d4?...",
    features: [
      "Commission-free stock & ETF trading",
      "Robo-advisor portfolio management",
      "Retirement planning (401k, IRA)",
      "Financial advisor consultations"
    ],
    highlight: "$0 Commissions"
  }
];

// 🔎 Scroll animation hook
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}

export function Services() {
  const header = useInView({ threshold: 0.2 });

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={header.ref}
          className={`text-center mb-16 transition-all duration-700 ${
            header.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-[#012169]/10 text-[#012169] rounded-full mb-4">
            <span>🏦 Services</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Financial
            <span className="text-[#012169] block">Solutions for Everyone</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're starting your financial journey or building generational wealth, 
            we have the right products and services for you.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-16">
          {services.map((service, index) => {
            const block = useInView({ threshold: 0.2 });
            return (
              <div
                key={index}
                ref={block.ref}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 delay-[${index * 200}ms]
                  ${block.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                  ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}
                `}
              >
                {/* Image */}
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="relative">
                    <div className="absolute -top-4 -right-4 bg-[#e31837] text-white px-4 py-2 rounded-lg font-bold">
                      {service.highlight}
                    </div>
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-80 object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                </div>

                {/* Card */}
                <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      
                      <div className="space-y-3 mb-8">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button className="bg-[#e31837] hover:bg-[#c41230] text-white group">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
