import React from 'react';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import BenefitsGrid from './components/BenefitsGrid';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import MobileAppShowcase from './components/MobileAppShowcase';
import AccountTiersComparison from './components/AccountTiersComparison';
import SecuritySection from './components/SecuritySection';
import FAQSection from './components/FAQSection';
import ConversionCTA from './components/ConversionCTA';
import Footer from './components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Problem/Solution Section */}
      <ProblemSection />
      
      {/* Benefits Grid */}
      <BenefitsGrid />
      
      {/* How It Works */}
      <HowItWorksSection />
      
      {/* Testimonials */}
      <TestimonialsCarousel />
      
      {/* Mobile App Showcase */}
      <MobileAppShowcase />
      
      {/* Pricing/Account Tiers */}
      <AccountTiersComparison />
      
      {/* Security Section */}
      <SecuritySection />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Final Conversion CTA */}
      <ConversionCTA />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
