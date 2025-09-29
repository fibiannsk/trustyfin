export function HistoryTimeline() {
  const milestones = [
    {
      year: "1985",
      title: "Founded",
      description: "TrustyFin Bank opens its first branch in downtown Springfield with a commitment to personalized service."
    },
    {
      year: "1992",
      title: "Regional Expansion",
      description: "Expanded to 25 branches across three states, becoming a recognized regional banking leader."
    },
    {
      year: "2001",
      title: "Digital Banking Launch",
      description: "Launched our first online banking platform, pioneering digital financial services in our market."
    },
    {
      year: "2010",
      title: "Mobile Innovation",
      description: "Introduced mobile banking app with industry-leading features including mobile check deposit."
    },
    {
      year: "2018",
      title: "Community Investment",
      description: "Established the TrustyFin Community Foundation with $50M in community development funding."
    },
    {
      year: "2024",
      title: "AI-Powered Banking",
      description: "Launched AI-powered financial advisory services, helping customers make smarter money decisions."
    }
  ];

  return (
    <section className="py-16 bg-[#f0f4ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-6 text-[#012169]">
            Our Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nearly four decades of growth, innovation, and unwavering commitment to our customers and communities.
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#012169]"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <div className="text-2xl font-bold text-[#e31837] mb-2">{milestone.year}</div>
                    <h3 className="text-xl mb-3 text-[#012169]">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="relative flex items-center justify-center w-8 h-8">
                  <div className="w-4 h-4 bg-[#e31837] rounded-full border-4 border-white shadow-md"></div>
                </div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}