import { Shield, Heart, Users, TrendingUp } from 'lucide-react';

export function MissionValues() {
  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We protect your financial information and assets with the highest security standards and transparent practices."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Every decision we make is guided by what's best for our customers and their financial well-being."
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "We're deeply committed to strengthening the communities we serve through local investment and support."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We continuously evolve our services to meet changing customer needs with cutting-edge financial solutions."
    }
  ];

  return (
    <section className="py-16 bg-[#f0f4ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-6 text-[#012169]">
            Our Mission & Values
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            To empower individuals and businesses to achieve financial success through trusted partnerships, 
            innovative solutions, and unwavering commitment to our communities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#e31837] rounded-lg flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl mb-3 text-[#012169]">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}