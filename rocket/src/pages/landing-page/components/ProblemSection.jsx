import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProblemSection = () => {
  const traditionalProblems = [
    {
      icon: 'Clock',
      title: 'Long Wait Times',
      description: 'Hours in line for simple transactions',
      stress: 'High',
      color: 'text-red-500'
    },
    {
      icon: 'DollarSign',
      title: 'Hidden Fees',
      description: 'Surprise charges on every transaction',
      stress: 'Very High',
      color: 'text-red-600'
    },
    {
      icon: 'MapPin',
      title: 'Branch Requirements',
      description: 'Must visit physical locations for basic services',
      stress: 'Medium',
      color: 'text-orange-500'
    },
    {
      icon: 'FileText',
      title: 'Complex Paperwork',
      description: 'Endless forms and documentation',
      stress: 'High',
      color: 'text-red-500'
    }
  ];

  const digitalSolutions = [
    {
      icon: 'Zap',
      title: 'Instant Everything',
      description: 'Transfers, deposits, and payments in seconds',
      benefit: 'Save Hours',
      color: 'text-accent'
    },
    {
      icon: 'Eye',
      title: 'Transparent Pricing',
      description: 'No hidden fees, ever. See all costs upfront',
      benefit: 'Save Money',
      color: 'text-accent'
    },
    {
      icon: 'Smartphone',
      title: 'Mobile First',
      description: 'Everything you need in your pocket',
      benefit: 'Ultimate Convenience',
      color: 'text-accent'
    },
    {
      icon: 'Shield',
      title: 'Simple & Secure',
      description: 'Bank-level security with user-friendly design',
      benefit: 'Peace of Mind',
      color: 'text-accent'
    }
  ];

  return (
    <section className="py-20 bg-white">
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
            Why Traditional Banking
            <span className="text-primary"> Frustrates </span>
            You
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We understand the pain points that drive you away from traditional banks. 
            That's why we built something completely different.
          </p>
        </motion.div>

        {/* Split Screen Comparison */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Traditional Banking Problems */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-headline text-text-primary mb-2">
                Traditional Banking Problems
              </h3>
              <p className="text-text-secondary">
                The frustrations that waste your time and money
              </p>
            </div>

            <div className="space-y-4">
              {traditionalProblems.map((problem, index) => (
                <motion.div
                  key={index}
                  className="bg-red-50 border border-red-100 rounded-lg p-6 hover:shadow-md transition-banking"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={problem.icon} size={24} color="#EF4444" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-text-primary">{problem.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full bg-red-100 ${problem.color} font-medium`}>
                          {problem.stress} Stress
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">{problem.description}</p>
                      
                      {/* Stress Indicator Animation */}
                      <div className="mt-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-red-600">Frustration Level:</span>
                          <div className="flex space-x-1">
                            {[...Array(problem.stress === 'Very High' ? 5 : problem.stress === 'High' ? 4 : 3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-red-500 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ 
                                  duration: 1, 
                                  repeat: Infinity, 
                                  delay: i * 0.2 
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Digital Solutions */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-headline text-text-primary mb-2">
                Our Digital-First Solutions
              </h3>
              <p className="text-text-secondary">
                How we solve every traditional banking frustration
              </p>
            </div>

            <div className="space-y-4">
              {digitalSolutions.map((solution, index) => (
                <motion.div
                  key={index}
                  className="bg-green-50 border border-green-100 rounded-lg p-6 hover:shadow-md transition-banking group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon name={solution.icon} size={24} color="#10B981" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-text-primary">{solution.title}</h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-accent font-medium">
                          {solution.benefit}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">{solution.description}</p>
                      
                      {/* Success Indicator Animation */}
                      <div className="mt-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-accent">Satisfaction Level:</span>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-accent rounded-full"
                                animate={{ 
                                  scale: [1, 1.3, 1],
                                  opacity: [0.7, 1, 0.7]
                                }}
                                transition={{ 
                                  duration: 1.5, 
                                  repeat: Infinity, 
                                  delay: i * 0.1 
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Transition CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8">
            <h3 className="text-2xl font-headline text-text-primary mb-4">
              Ready to Leave Banking Frustrations Behind?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Join over 100,000 customers who've already made the switch to stress-free, 
              transparent digital banking that actually works for your lifestyle.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-accent">
              <Icon name="CheckCircle" size={16} />
              <span>2-minute account opening</span>
              <span className="text-border">•</span>
              <Icon name="CheckCircle" size={16} />
              <span>No hidden fees</span>
              <span className="text-border">•</span>
              <Icon name="CheckCircle" size={16} />
              <span>FDIC insured</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
