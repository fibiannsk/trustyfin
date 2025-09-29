import { ImageWithFallback } from './figma/ImageWithFallback';
import ScotGoodwill from "../../assets/ScotGoodwill.jpg"; // ✅ import local CEO image

export function LeadershipTeam() {
  const leaders = [
    {
      name: "Scot Goodwill",
      title: "Chief Executive Officer",
      bio: "With over 20 years in banking, Blake leads TrustyFin with a vision for innovative customer service and sustainable growth.",
      image: ScotGoodwill, // ✅ replaced with local image
    },
    {
      name: "Michael Rodriguez",
      title: "Chief Financial Officer", 
      bio: "Michael brings extensive experience in financial planning and risk management to ensure TrustyFin's continued stability and growth.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBiYW5rZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTgwNzUzNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Jennifer Washington",
      title: "Chief Technology Officer",
      bio: "Jennifer spearheads our digital transformation initiatives, ensuring TrustyFin stays at the forefront of banking technology.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBiYW5rZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTgwNzUzNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-6 text-[#012169]">
            Leadership Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our experienced leadership team brings together decades of financial expertise 
            and a shared commitment to serving our customers and communities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <div key={index} className="text-center">
              <div className="mb-6">
                <ImageWithFallback 
                  src={leader.image}
                  alt={leader.name}
                  className="w-48 h-48 rounded-full object-cover mx-auto shadow-lg"
                />
              </div>
              <h3 className="text-xl mb-2 text-[#012169]">{leader.name}</h3>
              <p className="text-[#e31837] mb-4">{leader.title}</p>
              <p className="text-gray-600">{leader.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
