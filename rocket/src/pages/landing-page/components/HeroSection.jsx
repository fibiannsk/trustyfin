import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const [customerCount, setCustomerCount] = useState(100000);
  const fullText = 'Banking Made Simple';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const countTimer = setInterval(() => {
      setCustomerCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000);

    return () => clearInterval(countTimer);
  }, []);

  const handleOpenAccount = () => {
    const element = document.getElementById('account-opening');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSeeHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Typewriter Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-headline-bold text-text-primary leading-tight">
                {typewriterText}
                <motion.span
                  className="inline-block w-1 h-12 bg-primary ml-2"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed max-w-lg">
                Experience banking without boundaries - instant transfers, zero hidden fees, and bank-level security.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={handleOpenAccount}
                className="shadow-banking-cta hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                iconName="ArrowRight"
                iconPosition="right"
              >
                Open Account in 2 Minutes
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSeeHowItWorks}
                iconName="Play"
                iconPosition="left"
              >
                See How It Works
              </Button>
            </div>

            {/* Trust Bar */}
            <motion.div
              className="flex flex-wrap items-center gap-8 pt-8 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {/* FDIC Badge */}
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} color="var(--color-accent)" />
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">FDIC Insured</div>
                  <div className="text-xs text-text-secondary">Up to $250,000</div>
                </div>
              </div>

              {/* Encryption Badge */}
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Lock" size={20} color="var(--color-secondary)" />
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">Bank-Level</div>
                  <div className="text-xs text-text-secondary">256-bit Encryption</div>
                </div>
              </div>

              {/* Customer Counter */}
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">
                    {customerCount.toLocaleString()}+ Customers
                  </div>
                  <div className="text-xs text-text-secondary">And growing daily</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Banking Dashboard Preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-border">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Icon name="Building2" size={20} color="white" />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">Trustyfin Dashboard</div>
                    <div className="text-sm text-text-secondary">Welcome back, Sarah</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-sm text-accent font-medium">Live</span>
                </div>
              </div>

              {/* Balance Card */}
              <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm opacity-80">Available Balance</div>
                    <div className="text-3xl font-bold mt-1">$12,847.92</div>
                  </div>
                  <Icon name="Eye" size={20} color="white" className="opacity-80" />
                </div>
                <div className="flex items-center mt-4 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="TrendingUp" size={16} color="white" />
                    <span className="text-sm">+2.4% this month</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.button
                  className="p-4 bg-muted rounded-lg hover:bg-primary/5 transition-banking group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon name="Send" size={24} color="var(--color-primary)" className="mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium text-text-primary">Send Money</div>
                  <div className="text-xs text-text-secondary">Instant transfer</div>
                </motion.button>
                <motion.button
                  className="p-4 bg-muted rounded-lg hover:bg-accent/5 transition-banking group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon name="Smartphone" size={24} color="var(--color-accent)" className="mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium text-text-primary">Mobile Deposit</div>
                  <div className="text-xs text-text-secondary">Snap & deposit</div>
                </motion.button>
              </div>

              {/* Recent Activity */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-text-primary">Recent Activity</div>
                <div className="space-y-2">
                  {[
                    { icon: 'Coffee', name: 'Starbucks Coffee', amount: '-$4.95', time: '2 min ago' },
                    { icon: 'Zap', name: 'Salary Deposit', amount: '+$3,200.00', time: '1 day ago' },
                    { icon: 'Car', name: 'Uber Ride', amount: '-$12.50', time: '2 days ago' }
                  ].map((transaction, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 + index * 0.2 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                          <Icon name={transaction.icon} size={16} color="var(--color-text-secondary)" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-text-primary">{transaction.name}</div>
                          <div className="text-xs text-text-secondary">{transaction.time}</div>
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${transaction.amount.startsWith('+') ? 'text-accent' : 'text-text-primary'}`}>
                        {transaction.amount}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Notification */}
            <motion.div
              className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-border"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-text-primary">Transfer completed</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
