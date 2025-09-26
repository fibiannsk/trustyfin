import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from './AppIcon';
import { Button } from './ui/button';
import logotrustyfin from '../../assets/logotrustyfin.png';
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const [customerCount, setCustomerCount] = useState(100000);
  const fullText = 'Banking Made Simple';
  const navigate = useNavigate(); // 👈 create navigate function

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
    document.getElementById('account-opening')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSeeHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSignIn = () => {
    navigate("/login"); // 👈 navigate to /login
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#002868] via-white to-[#BF0A30] text-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-[#002868]/20 rounded-full blur-xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 bg-[#BF0A30]/20 rounded-full blur-xl"
          animate={{ x: [0, -40, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
              <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-[#002868]">
                {typewriterText}
                <motion.span
                  className="inline-block w-1 h-12 bg-[#BF0A30] ml-2"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed max-w-lg">
                Experience banking without boundaries — instant transfers, zero hidden fees, and bank-level security.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleOpenAccount}
                className="bg-[#002868] text-white hover:bg-[#001a4d] rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Open Account in 2 Minutes
              </Button>
              <Button
                size="lg"
                onClick={handleSeeHowItWorks}
                className="border-2 border-[#BF0A30] text-[#BF0A30] hover:bg-[#BF0A30] hover:text-white rounded-2xl transition-colors duration-300"
              >
                See How It Works
              </Button>
            </div>

            {/* Trust Bar */}
            <motion.div
              className="flex flex-wrap items-center gap-8 pt-8 border-t border-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {/* FDIC Badge */}
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-[#002868]/10 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} color="#002868" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#002868]">FDIC Insured</div>
                  <div className="text-xs text-gray-600">Up to $250,000</div>
                </div>
              </div>

              {/* Encryption Badge */}
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-[#BF0A30]/10 rounded-lg flex items-center justify-center">
                  <Icon name="Lock" size={20} color="#BF0A30" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#BF0A30]">Bank-Level</div>
                  <div className="text-xs text-gray-600">256-bit Encryption</div>
                </div>
              </div>

              {/* Customer Counter */}
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-[#002868]/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} color="#002868" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#002868]">
                    {customerCount.toLocaleString()}+ Customers
                  </div>
                  <div className="text-xs text-gray-600">And growing daily</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Dashboard */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img 
                      src={logotrustyfin} 
                      alt="trustyfin logo" 
                      className="h-16 w-auto mx-auto"
                  />
                  <div>
                    <div className="font-semibold text-[#002868]">TrustyFin Bank</div>
                    <div className="text-sm text-gray-600">Welcome back, Sarah</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#BF0A30] rounded-full animate-pulse"></div>
                  <span className="text-sm text-[#BF0A30] font-medium">Live</span>
                </div>
              </div>

              {/* Balance Card */}
              <div className="bg-gradient-to-r from-[#002868] to-[#BF0A30] rounded-xl p-6 text-white mb-6">
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
                  className="p-4 bg-gray-100 rounded-lg hover:bg-[#002868]/10 transition group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon name="Send" size={24} color="#002868" className="mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium text-[#002868]">Send Money</div>
                  <div className="text-xs text-gray-600">Instant transfer</div>
                </motion.button>
                <motion.button
                  className="p-4 bg-gray-100 rounded-lg hover:bg-[#BF0A30]/10 transition group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon name="Smartphone" size={24} color="#BF0A30" className="mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium text-[#BF0A30]">Mobile Deposit</div>
                  <div className="text-xs text-gray-600">Snap & deposit</div>
                </motion.button>
              </div>

              {/* Recent Activity */}
              <div className="space-y-3">
                <div className="text-sm font-semibold text-[#002868]">Recent Activity</div>
                <div className="space-y-2">
                  {[
                    { icon: 'Coffee', name: 'Starbucks Coffee', amount: '-$4.95', time: '2 min ago' },
                    { icon: 'Zap', name: 'Salary Deposit', amount: '+$3,200.00', time: '1 day ago' },
                    { icon: 'Car', name: 'Uber Ride', amount: '-$12.50', time: '2 days ago' }
                  ].map((transaction, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 + index * 0.2 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                          <Icon name={transaction.icon} size={16} color="#6b7280" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800">{transaction.name}</div>
                          <div className="text-xs text-gray-500">{transaction.time}</div>
                        </div>
                      </div>
                      <div
                        className={`text-sm font-semibold ${
                          transaction.amount.startsWith('+') ? 'text-[#002868]' : 'text-[#BF0A30]'
                        }`}
                      >
                        {transaction.amount}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Notification */}
            <motion.div
              className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#002868] rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-[#002868]">Transfer completed</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
