import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Marketing Director',
      company: 'TechStart Inc.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      quote: `Switching to Trustyfin was the best financial decision I've made. The instant transfers saved me countless hours, and the transparent pricing means no more surprise fees. It's banking that actually works for busy professionals.`,
      benefits: ['Instant Transfers', 'No Hidden Fees', 'Mobile First'],
      videoThumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
      linkedinVerified: true,
      joinDate: 'March 2024'
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Small Business Owner',
      company: 'Chen\'s Restaurant',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      quote: `As a restaurant owner, I need banking that keeps up with my fast-paced business. Trustyfin's mobile deposit feature lets me deposit checks instantly, and the 24/7 support has been incredible when I needed help after hours.`,
      benefits: ['Mobile Deposit', '24/7 Support', 'Business Features'],
      videoThumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      linkedinVerified: true,
      joinDate: 'January 2024'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',title: 'Software Engineer',company: 'Google',avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',rating: 5,quote: `The security features are outstanding. Face ID login, real-time fraud monitoring, and bank-level encryption give me complete peace of mind. Plus, the app's UX is better than any banking app I've used before.`,
      benefits: ['Advanced Security', 'Great UX', 'Real-time Monitoring'],
      videoThumbnail: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop',
      linkedinVerified: true,
      joinDate: 'February 2024'
    },
    {
      id: 4,
      name: 'David Thompson',title: 'Freelance Designer',company: 'Independent',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',rating: 5,quote: `Managing finances as a freelancer used to be a nightmare with traditional banks. Trustyfin's spending tracking and instant notifications help me stay on top of my cash flow. The fee-free structure is perfect for my variable income.`,
      benefits: ['Spending Tracking', 'Instant Notifications', 'No Monthly Fees'],
      videoThumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop',
      linkedinVerified: true,
      joinDate: 'April 2024'
    },
    {
      id: 5,
      name: 'Lisa Park',
      title: 'Healthcare Professional',
      company: 'City General Hospital',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      quote: `Working long shifts means I rarely have time for traditional banking. Trustyfin's 24/7 availability and mobile-first approach mean I can handle all my banking needs between patients. It's been a game-changer for my busy schedule.`,
      benefits: ['24/7 Availability', 'Mobile Banking', 'Time Saving'],
      videoThumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
      linkedinVerified: true,
      joinDate: 'May 2024'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        color={index < rating ? "#F59E0B" : "#E5E7EB"}
        className={index < rating ? "fill-current" : ""}
      />
    ));
  };

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-headline-bold text-text-primary mb-4">
            What Our Customers
            <span className="text-primary"> Are Saying</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Join over 100,000 satisfied customers who've already experienced the difference. 
            Here's what real users say about their Trustyfin experience.
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              className="bg-white rounded-2xl shadow-banking-card p-8 lg:p-12"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Testimonial Content */}
                <div className="space-y-6">
                  {/* Quote */}
                  <div className="relative">
                    <Icon 
                      name="Quote" 
                      size={48} 
                      color="var(--color-primary)" 
                      className="absolute -top-4 -left-4 opacity-20" 
                    />
                    <blockquote className="text-lg lg:text-xl text-text-primary leading-relaxed relative z-10">
                      "{testimonials[currentTestimonial].quote}"
                    </blockquote>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {renderStars(testimonials[currentTestimonial].rating)}
                    </div>
                    <span className="text-sm text-text-secondary ml-2">
                      5.0 out of 5 stars
                    </span>
                  </div>

                  {/* Benefits Tags */}
                  <div className="flex flex-wrap gap-2">
                    {testimonials[currentTestimonial].benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  {/* Customer Info */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-border">
                    <div className="relative">
                      <Image
                        src={testimonials[currentTestimonial].avatar}
                        alt={testimonials[currentTestimonial].name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {testimonials[currentTestimonial].linkedinVerified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <Icon name="Check" size={12} color="white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {testimonials[currentTestimonial].title}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {testimonials[currentTestimonial].company}
                      </div>
                      <div className="text-xs text-text-secondary mt-1">
                        Customer since {testimonials[currentTestimonial].joinDate}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Thumbnail */}
                <div className="relative">
                  <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={testimonials[currentTestimonial].videoThumbnail}
                      alt="Video testimonial"
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <motion.button
                        className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Icon name="Play" size={24} color="var(--color-primary)" />
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Verified Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-2">
                    <Icon name="Shield" size={16} color="var(--color-accent)" />
                    <span className="text-xs font-medium text-text-primary">Verified Customer</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all z-10"
            aria-label="Previous testimonial"
          >
            <Icon name="ChevronLeft" size={20} color="var(--color-text-primary)" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all z-10"
            aria-label="Next testimonial"
          >
            <Icon name="ChevronRight" size={20} color="var(--color-text-primary)" />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentTestimonial 
                  ? 'bg-primary w-8' :'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play Control */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center space-x-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
            <span>{isAutoPlaying ? 'Pause' : 'Play'} Auto-rotation</span>
          </button>
        </div>

        {/* Customer Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { label: 'Customer Satisfaction', value: '98.5%', icon: 'Heart' },
            { label: 'Average Rating', value: '4.9/5', icon: 'Star' },
            { label: 'Would Recommend', value: '96%', icon: 'ThumbsUp' },
            { label: 'Support Response', value: '<30s', icon: 'MessageCircle' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-banking-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name={stat.icon} size={24} color="var(--color-primary)" />
              </div>
              <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
