import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'signup',
      icon: 'UserPlus',
      title: 'Sign Up',
      subtitle: '2 minutes to get started',
      description: 'Create your account with just your email and phone number. No lengthy paperwork or branch visits required.',
      details: [
        'Enter basic information',
        'Verify your identity with ID',
        'Set up your secure login',
        'Choose your account type'
      ],
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-blue-50',
      time: '~2 minutes'
    },
    {
      id: 'fund',
      icon: 'CreditCard',
      title: 'Fund Account',
      subtitle: 'Multiple funding options',
      description: 'Add money to your account instantly using various methods. Start banking immediately after funding.',
      details: [
        'Link existing bank account',
        'Direct deposit setup',
        'Mobile check deposit',
        'Cash deposit at ATMs'
      ],
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      time: '~1 minute'
    },
    {
      id: 'banking',
      icon: 'Smartphone',
      title: 'Start Banking',
      subtitle: 'Full banking in your pocket',
      description: 'Access all banking features instantly. Send money, pay bills, track spending, and more from anywhere.',
      details: [
        'Send & receive money',
        'Pay bills automatically',
        'Track spending patterns',
        'Get real-time notifications'
      ],
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50',
      time: 'Instant access'
    }
  ];

  const progressPercentage = ((activeStep + 1) / steps.length) * 100;

  return (
    <section id="how-it-works" className="py-20 bg-white">
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
            Get Started in
            <span className="text-primary"> 3 Simple Steps</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Opening your Trustyfin account takes less time than waiting in line at a traditional bank. 
            Here's how easy it is to get started.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Progress</span>
            <span className="text-sm font-medium text-primary">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Steps Navigation */}
        <div className="flex flex-col lg:flex-row justify-center mb-12 space-y-4 lg:space-y-0 lg:space-x-8">
          {steps.map((step, index) => (
            <motion.button
              key={step.id}
              className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                activeStep === index 
                  ? `${step.bgColor} border-2 border-current shadow-md` 
                  : 'bg-muted hover:bg-gray-100'
              }`}
              onClick={() => setActiveStep(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                activeStep === index 
                  ? `bg-gradient-to-r ${step.color}` 
                  : 'bg-gray-200'
              }`}>
                <Icon 
                  name={step.icon} 
                  size={24} 
                  color={activeStep === index ? "white" : "var(--color-text-secondary)"} 
                />
              </div>
              <div className="text-left">
                <div className={`font-medium ${activeStep === index ? 'text-text-primary' : 'text-text-secondary'}`}>
                  Step {index + 1}: {step.title}
                </div>
                <div className="text-sm text-text-secondary">{step.time}</div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Active Step Content */}
        <motion.div
          key={activeStep}
          className="grid lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Step Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${steps[activeStep].color} rounded-xl flex items-center justify-center`}>
                  <Icon name={steps[activeStep].icon} size={32} color="white" />
                </div>
                <div>
                  <h3 className="text-3xl font-headline text-text-primary">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-lg text-text-secondary">
                    {steps[activeStep].subtitle}
                  </p>
                </div>
              </div>
              <p className="text-text-secondary text-lg leading-relaxed">
                {steps[activeStep].description}
              </p>
            </div>

            {/* Step Details List */}
            <div className="space-y-3">
              {steps[activeStep].details.map((detail, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={14} color="var(--color-accent)" />
                  </div>
                  <span className="text-text-primary">{detail}</span>
                </motion.div>
              ))}
            </div>

            {/* Time Estimate */}
            <div className={`${steps[activeStep].bgColor} rounded-lg p-4 border border-current/20`}>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} color="var(--color-text-secondary)" />
                <span className="text-sm font-medium text-text-primary">
                  Estimated time: {steps[activeStep].time}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="relative">
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-6 border border-border"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Demo Content Based on Active Step */}
              {activeStep === 0 && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-medium text-text-primary mb-2">Account Setup</h4>
                    <p className="text-sm text-text-secondary">Quick and secure registration</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <Icon name="Mail" size={20} color="var(--color-primary)" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-text-primary">Email Verification</div>
                        <div className="text-xs text-text-secondary">sarah.johnson@email.com ✓</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <Icon name="Smartphone" size={20} color="var(--color-primary)" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-text-primary">Phone Verification</div>
                        <div className="text-xs text-text-secondary">+1 (555) 123-4567 ✓</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <Icon name="CreditCard" size={20} color="var(--color-primary)" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-text-primary">Identity Verification</div>
                        <div className="text-xs text-text-secondary">Driver's License ✓</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} color="var(--color-accent)" />
                      <span className="text-sm font-medium text-accent">Account created successfully!</span>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-medium text-text-primary mb-2">Fund Your Account</h4>
                    <p className="text-sm text-text-secondary">Choose your preferred funding method</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div
                      className="p-4 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:shadow-md transition-all"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Icon name="Building2" size={24} color="var(--color-primary)" className="mb-2" />
                      <div className="text-sm font-medium text-text-primary">Bank Transfer</div>
                      <div className="text-xs text-text-secondary">1-2 business days</div>
                    </motion.div>
                    
                    <motion.div
                      className="p-4 bg-green-50 border border-green-200 rounded-lg cursor-pointer hover:shadow-md transition-all"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Icon name="Zap" size={24} color="var(--color-accent)" className="mb-2" />
                      <div className="text-sm font-medium text-text-primary">Instant Transfer</div>
                      <div className="text-xs text-text-secondary">Available now</div>
                    </motion.div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm opacity-80">Initial Deposit</div>
                        <div className="text-2xl font-bold">$500.00</div>
                      </div>
                      <Icon name="TrendingUp" size={24} color="white" />
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-medium text-text-primary mb-2">Welcome to Trustyfin!</h4>
                    <p className="text-sm text-text-secondary">Your account is ready to use</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-4 text-white mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm opacity-80">Available Balance</div>
                        <div className="text-2xl font-bold">$500.00</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm opacity-80">Account</div>
                        <div className="text-sm font-medium">****1234</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: 'Send', label: 'Send Money', color: 'text-blue-600' },
                      { icon: 'Smartphone', label: 'Mobile Deposit', color: 'text-green-600' },
                      { icon: 'CreditCard', label: 'Pay Bills', color: 'text-purple-600' },
                      { icon: 'PieChart', label: 'Track Spending', color: 'text-orange-600' }
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="p-3 bg-muted rounded-lg hover:shadow-md transition-all cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Icon name={feature.icon} size={20} className={`${feature.color} mb-2`} />
                        <div className="text-xs font-medium text-text-primary">{feature.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Floating Success Badge */}
            <motion.div
              className="absolute -top-4 -right-4 bg-accent text-white rounded-full p-3 shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
            >
              <Icon name="Check" size={20} color="white" />
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8">
            <h3 className="text-2xl font-headline text-text-primary mb-4">
              Ready to Experience Modern Banking?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who've already made the switch. 
              Your new account can be ready in just 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-banking-cta"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Application
              </motion.button>
              <motion.button
                className="border border-border text-text-primary px-8 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
