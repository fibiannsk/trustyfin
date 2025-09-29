import { ImageWithFallback } from './figma/ImageWithFallback';
import { Award, Users, Globe, Lightbulb } from 'lucide-react';

export function TeamCulture() {
  const culturePoints = [
    {
      icon: Users,
      title: "Diverse & Inclusive",
      description: "We celebrate diversity and foster an inclusive environment where everyone can thrive."
    },
    {
      icon: Lightbulb,
      title: "Innovation-Driven",
      description: "We encourage creative thinking and innovative solutions to better serve our customers."
    },
    {
      icon: Award,
      title: "Excellence Focused",
      description: "We strive for excellence in everything we do, from customer service to community impact."
    },
    {
      icon: Globe,
      title: "Globally Minded",
      description: "While rooted in local communities, we maintain a global perspective on financial services."
    }
  ];

  return (
    <section className="py-16 bg-[#f0f4ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-6 text-[#012169]">
            Our Team & Culture
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our success is built on the talent, dedication, and shared values of our exceptional team members 
            who work together to serve our customers and communities every day.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwYnVzaW5lc3MlMjB0ZWFtJTIwb2ZmaWNlfGVufDF8fHx8MTc1ODAzNDkxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="TrustyFin team collaboration"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl mb-6 text-[#012169]">
              Where Great Minds Meet Great Opportunities
            </h3>
            <p className="text-gray-600 mb-6">
              At TrustyFin Bank, we've built a culture that values collaboration, continuous learning, and 
              meaningful work. Our team of over 3,000 professionals across the country share a common 
              passion for helping customers achieve their financial dreams.
            </p>
            <p className="text-gray-600 mb-8">
              We invest in our people through comprehensive training programs, career development opportunities, 
              and a supportive work environment that promotes work-life balance and personal growth.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {culturePoints.map((point, index) => (
            <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="w-12 h-12 bg-[#012169] rounded-full flex items-center justify-center mx-auto mb-4">
                <point.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg mb-3 text-[#012169]">{point.title}</h4>
              <p className="text-gray-600 text-sm">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}