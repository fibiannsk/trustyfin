import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConversionCTA = () => {
  const [isNewVisitor, setIsNewVisitor] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(24 * 60 * 60); // 24 hours in seconds
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formStep, setFormStep] = useState(1);

  // Check if user is returning visitor
  useEffect(() => {
    const hasVisited = localStorage.getItem('trustyfin_visited');
    if (hasVisited) {
      setIsNewVisitor(false);
    } else {
      localStorage.setItem('trustyfin_visited', 'true');
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setFormStep(2);
    }
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone) {
      setFormStep(3);
      // Simulate account creation success
      setTimeout(() => {
        setFormStep(4);
      }, 2000);
    }
  };

  const handleSocialLogin = (provider) => {
    // Simulate social login
    setFormStep(4);
  };

  const offers = {
    new: {
      title: 'Limited-Time $50 Signup Bonus',
      subtitle: 'New customers only - expires soon!',
      description: 'Open your Trustyfin account today and get $50 deposited instantly when you make your first deposit of $100 or more.',
      urgency: 'Only available for the next',
      cta: 'Claim Your $50 Bonus',
      color: 'from-green-500 to-emerald-600'
    },
    returning: {
      title: 'Exclusive Premium Upgrade Offer',
      subtitle: 'Welcome back! Special offer just for you',
      description: 'Upgrade to Trustyfin Premium and get your first 3 months free, plus unlimited ATM fee reimbursement worldwide.',
      urgency: 'Limited time offer expires in',
      cta: 'Upgrade to Premium Free',
      color: 'from-purple-500 to-indigo-600'
    }
  };

  const currentOffer = isNewVisitor ? offers.new : offers.returning;

  const benefits = [
    { icon: 'Zap', text: 'Account ready in 2 minutes' },
    { icon: 'Shield', text: 'FDIC insured up to $250,000' },
    { icon: 'DollarSign', text: 'No hidden fees ever' },
    { icon: 'Smartphone', text: 'Full mobile banking' }
  ];

  return (
    <section id="account-opening" className="py-20 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <div className="max-w-4xl mx-auto px-6">
        {/* Urgency Banner */}
        <motion.div
          className={`bg-gradient-to-r ${currentOffer.color} text-white rounded-2xl p-6 mb-8 text-center`}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Clock" size={20} color="white" />
            <span className="text-sm font-medium">{currentOffer.urgency}</span>
          </div>
          <div className="text-2xl font-bold font-mono">
            {formatTime(timeRemaining)}
          </div>
        </motion.div>

        {/* Main CTA Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-headline-bold text-text-primary mb-4">
            {currentOffer.title}
          </h2>
          <p className="text-xl text-text-secondary mb-2">
            {currentOffer.subtitle}
          </p>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {currentOffer.description}
          </p>
        </motion.div>

        {/* Account Opening Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 border border-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {!showForm ? (
            // Initial CTA
            <div className="text-center">
              <h3 className="text-2xl font-headline text-text-primary mb-6">
                Start Your Application Now
              </h3>
              
              {/* Benefits Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center p-4 bg-muted rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                      <Icon name={benefit.icon} size={20} color="var(--color-primary)" />
                    </div>
                    <span className="text-sm text-text-primary text-center">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              <Button
                variant="default"
                size="lg"
                onClick={() => setShowForm(true)}
                className="shadow-banking-cta hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4"
                iconName="ArrowRight"
                iconPosition="right"
                fullWidth
              >
                {currentOffer.cta}
              </Button>

              <p className="text-sm text-text-secondary">
                No credit check required • FDIC insured • Takes less than 2 minutes
              </p>
            </div>
          ) : (
            // Progressive Form
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-center mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <React.Fragment key={step}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      formStep >= step 
                        ? 'bg-primary text-white' 
                        : formStep === step 
                          ? 'bg-primary/20 text-primary border-2 border-primary' :'bg-gray-200 text-text-secondary'
                    }`}>
                      {formStep > step ? (
                        <Icon name="Check" size={16} color="white" />
                      ) : (
                        step
                      )}
                    </div>
                    {step < 4 && (
                      <div className={`w-12 h-1 mx-2 ${
                        formStep > step ? 'bg-primary' : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Form Steps */}
              {formStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-headline text-text-primary text-center mb-6">
                    Let's start with your email
                  </h3>
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <Input
                      type="email"
                      label="Email Address"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      fullWidth
                      disabled={!email}
                    >
                      Continue
                    </Button>
                  </form>

                  {/* Social Login Options */}
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-text-secondary">Or continue with</span>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        onClick={() => handleSocialLogin('google')}
                        iconName="Mail"
                        iconPosition="left"
                      >
                        Google
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleSocialLogin('apple')}
                        iconName="Smartphone"
                        iconPosition="left"
                      >
                        Apple
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {formStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-headline text-text-primary text-center mb-6">
                    Now your phone number for SMS verification
                  </h3>
                  <form onSubmit={handlePhoneSubmit} className="space-y-4">
                    <Input
                      type="tel"
                      label="Phone Number"
                      placeholder="(555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      fullWidth
                      disabled={!phone}
                    >
                      Send Verification Code
                    </Button>
                  </form>
                </motion.div>
              )}

              {formStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Icon name="Loader" size={32} color="var(--color-primary)" />
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-headline text-text-primary mb-2">
                    Creating Your Account...
                  </h3>
                  <p className="text-text-secondary">
                    We're setting up your secure Trustyfin account. This will just take a moment.
                  </p>
                </motion.div>
              )}

              {formStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} color="white" />
                  </div>
                  <h3 className="text-2xl font-headline text-text-primary mb-4">
                    Welcome to Trustyfin! 🎉
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Your account has been created successfully. Your $50 bonus will be deposited 
                    as soon as you make your first deposit of $100 or more.
                  </p>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Icon name="Gift" size={20} color="var(--color-accent)" />
                      <span className="font-medium text-accent">Bonus Confirmed</span>
                    </div>
                    <div className="text-2xl font-bold text-accent">$50.00</div>
                    <div className="text-sm text-text-secondary">
                      Will be added after your first $100+ deposit
                    </div>
                  </div>

                  <Button
                    variant="default"
                    size="lg"
                    fullWidth
                    iconName="Smartphone"
                    iconPosition="left"
                    className="mb-4"
                  >
                    Download Mobile App
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    fullWidth
                    iconName="CreditCard"
                    iconPosition="left"
                  >
                    Fund Your Account
                  </Button>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-6 mt-8 text-sm text-text-secondary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} />
            <span>FDIC Insured</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={16} />
            <span>Bank-Level Security</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} />
            <span>2-Minute Setup</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} />
            <span>100,000+ Customers</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConversionCTA;
