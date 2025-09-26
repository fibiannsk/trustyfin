import { Card, CardContent } from "./ui/card";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    rating: 5,
    content:
      "TrustyFin has transformed how I manage my business finances. The instant transfers and mobile deposits save me hours every week. Their customer service is exceptional!",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    rating: 5,
    content:
      "The investment tools are incredible. I love the commission-free trading and the robo-advisor has helped me build a diversified portfolio effortlessly. Highly recommend!",
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Manager",
    rating: 5,
    content:
      "Switching to TrustyFin was the best financial decision I've made. The high-yield savings account and automatic round-ups have helped me save more than ever before.",
    avatar: "ER",
  },
  {
    name: "David Thompson",
    role: "Retired Teacher",
    rating: 5,
    content:
      "At my age, security is everything. TrustyFin's advanced security features and FDIC insurance give me complete peace of mind. The app is also surprisingly easy to use!",
    avatar: "DT",
  },
  {
    name: "Lisa Park",
    role: "Freelance Designer",
    rating: 5,
    content:
      "As a freelancer, I need flexible banking solutions. TrustyFin's business account with no monthly fees and excellent mobile app have been game-changers for my workflow.",
    avatar: "LP",
  },
  {
    name: "James Wilson",
    role: "College Student",
    rating: 5,
    content:
      "TrustyFin made banking simple for me as a student. No hidden fees, great mobile app, and the savings features help me build good financial habits early.",
    avatar: "JW",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full mb-4">
            <Star className="h-4 w-4 mr-2 fill-current" />
            <span>Customer Reviews</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Loved by Over
            <span className="text-[#e31837] block">2 Million Customers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our customers
            have to say about their TrustyFin experience.
          </p>
        </motion.div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gray-50 px-6 py-3 rounded-full shadow-sm">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">4.8</span>
            <span className="text-gray-600">out of 5 stars</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">Based on 50,000+ reviews</span>
          </div>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative group">
                <CardContent className="p-6">
                  <motion.div
                    whileHover={{ rotate: -10, scale: 1.1 }}
                    className="absolute -top-3 -left-3 w-8 h-8 bg-[#e31837] rounded-full flex items-center justify-center"
                  >
                    <Quote className="h-4 w-4 text-white" />
                  </motion.div>

                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center space-x-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 bg-gradient-to-br from-[#e31837] to-[#012169] rounded-full flex items-center justify-center shadow-md"
                    >
                      <span className="text-white font-bold text-sm">
                        {testimonial.avatar}
                      </span>
                    </motion.div>
                    <div>
                      <p className="font-bold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 bg-gray-50 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Recognized Excellence
            </h3>
            <p className="text-gray-600">
              Our commitment to customer satisfaction is recognized by industry
              leaders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: "🏆",
                title: "Best Digital Bank 2024",
                subtitle: "Financial Technology Awards",
              },
              {
                icon: "⭐",
                title: "Top Customer Service",
                subtitle: "Banking Excellence Institute",
              },
              {
                icon: "🛡️",
                title: "Most Secure Platform",
                subtitle: "Cybersecurity Excellence Awards",
              },
            ].map((badge, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#e31837] to-[#012169] rounded-full flex items-center justify-center mb-4 shadow-md">
                  <span className="text-white font-bold text-lg">
                    {badge.icon}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{badge.title}</h4>
                <p className="text-sm text-gray-600">{badge.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
