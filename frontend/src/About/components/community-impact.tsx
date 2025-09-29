import { ImageWithFallback } from './figma/ImageWithFallback';

export function CommunityImpact() {
  const impactStats = [
    { number: "$50M", label: "Community Investment" },
    { number: "500+", label: "Local Businesses Supported" },
    { number: "25,000", label: "Students Scholarships" },
    { number: "100+", label: "Volunteer Hours Monthly" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBjaGFyaXR5JTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NTgwNzUzNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="TrustyFin community volunteers"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl mb-6 text-[#012169]">
              Community Impact
            </h2>
            <p className="text-gray-600 mb-6">
              At TrustyFin Bank, we believe in giving back to the communities that have supported us throughout our journey. 
              Through the TrustyFin Community Foundation and countless volunteer initiatives, we're making a real difference 
              in the lives of our neighbors.
            </p>
            <p className="text-gray-600 mb-8">
              From supporting local small businesses with specialized lending programs to providing financial literacy 
              education in schools, we're committed to building stronger, more prosperous communities for everyone.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {impactStats.map((stat, index) => (
                <div key={index} className="text-center bg-[#f0f4ff] rounded-lg p-4">
                  <div className="text-2xl font-bold text-[#e31837] mb-1">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}