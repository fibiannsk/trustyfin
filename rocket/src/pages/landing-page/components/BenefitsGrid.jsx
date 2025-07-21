import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const BenefitsGrid = () => {
  const [hoveredBenefit, setHoveredBenefit] = useState(null);

  const benefits = [
    {
      id: 'instant-transfers',
      icon: 'Zap',
      title: 'Instant Transfers',
      description: 'Send money to anyone, anywhere in seconds',
      details: 'Transfer money instantly to any bank account or Trustyfin user. No waiting periods, no delays.',
      stats: { label: 'Average Speed', value: '< 3 seconds' },
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      id: 'secure-login',
      icon: 'Shield',
      title: 'Secure Login',
      description: 'Biometric authentication & advanced security',
      details: 'Face ID, Touch ID, and multi-factor authentication keep your account secure 24/7.',
      stats: { label: 'Security Rating', value: '99.9% Secure' },
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'no-fees',
      icon: 'DollarSign',
      title: 'No Hidden Fees',
      description: 'Transparent pricing with zero surprises',
      details: 'What you see is what you pay. No monthly fees, no overdraft fees, no surprise charges.',
      stats: { label: 'Hidden Fees', value: '$0.00' },
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'support',
      icon: 'MessageCircle',
      title: '24/7 Support',
      description: 'Real humans ready to help anytime',
      details: 'Get instant help through live chat, phone, or email. Our support team never sleeps.',
      stats: { label: 'Response Time', value: '< 30 seconds' },
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const speedComparison = [
    { bank: 'Traditional Banks', time: '1-3 business days', color: 'bg-red-100 text-red-700' },
    { bank: 'Other Digital Banks', time: '2-24 hours', color: 'bg-yellow-100 text-yellow-700' },
    { bank: 'Trustyfin', time: '< 3 seconds', color: 'bg-green-100 text-green-700' }
  ];

  const securityFeatures = [
    { feature: 'Face ID / Touch ID', status: 'active' },
    { feature: '256-bit Encryption', status: 'active' },
    { feature: 'Multi-Factor Auth', status: 'active' },
    { feature: 'Real-time Monitoring', status: 'active' }
  ];

  const feeComparison = [
    { fee: 'Monthly Maintenance', traditional: '$12-25', trustyfin: '$0' },
    { fee: 'Overdraft Fee', traditional: '$35', trustyfin: '$0' },
    { fee: 'ATM Fee', traditional: '$2.50', trustyfin: '$0' },
    { fee: 'Wire Transfer', traditional: '$15-30', trustyfin: '$0' }
  ];

  return (
    <section id="features" className="py-20 bg-muted">
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
            Banking Features That
            <span className="text-primary"> Actually Work</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Experience the difference with features designed for modern life. 
            No compromises, no frustrations, just banking that works.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              className={`${benefit.bgColor} ${benefit.borderColor} border rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg group`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onHoverStart={() => setHoveredBenefit(benefit.id)}
              onHoverEnd={() => setHoveredBenefit(null)}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {/* Icon with Gradient */}
              <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon name={benefit.icon} size={28} color="white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-headline text-text-primary mb-2">
                {benefit.title}
              </h3>
              <p className="text-text-secondary mb-4">
                {benefit.description}
              </p>

              {/* Stats */}
              <div className="bg-white rounded-lg p-3 border border-white/50">
                <div className="text-xs text-text-secondary">{benefit.stats.label}</div>
                <div className="text-lg font-bold text-text-primary">{benefit.stats.value}</div>
              </div>

              {/* Hover Details */}
              <motion.div
                className="mt-4 text-sm text-text-secondary"
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: hoveredBenefit === benefit.id ? 1 : 0,
                  height: hoveredBenefit === benefit.id ? 'auto' : 0
                }}
                transition={{ duration: 0.3 }}
              >
                {benefit.details}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Demonstrations */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Speed Comparison Chart */}
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-banking-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={24} color="white" />
              </div>
              <div>
                <h3 className="text-xl font-headline text-text-primary">Transfer Speed Comparison</h3>
                <p className="text-text-secondary">See how we stack up against the competition</p>
              </div>
            </div>

            <div className="space-y-4">
              {speedComparison.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <span className="font-medium text-text-primary">{item.bank}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.color}`}>
                    {item.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Security Features */}
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-banking-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={24} color="white" />
              </div>
              <div>
                <h3 className="text-xl font-headline text-text-primary">Security Features</h3>
                <p className="text-text-secondary">Bank-level protection for your peace of mind</p>
              </div>
            </div>

            <div className="space-y-4">
              {securityFeatures.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <span className="font-medium text-text-primary">{item.feature}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-sm text-accent font-medium">Active</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Fee Comparison Table */}
        <motion.div
          className="mt-12 bg-white rounded-2xl p-8 shadow-banking-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-headline text-text-primary mb-2">
              Transparent Pricing Breakdown
            </h3>
            <p className="text-text-secondary">
              See exactly how much you'll save by switching to Trustyfin
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-6 font-medium text-text-primary">Fee Type</th>
                  <th className="text-center py-4 px-6 font-medium text-text-primary">Traditional Banks</th>
                  <th className="text-center py-4 px-6 font-medium text-primary">Trustyfin</th>
                </tr>
              </thead>
              <tbody>
                {feeComparison.map((row, index) => (
                  <motion.tr
                    key={index}
                    className="border-b border-border hover:bg-muted transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <td className="py-4 px-6 font-medium text-text-primary">{row.fee}</td>
                    <td className="py-4 px-6 text-center text-red-600 font-medium">{row.traditional}</td>
                    <td className="py-4 px-6 text-center text-accent font-bold">{row.trustyfin}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-accent/10 rounded-lg px-4 py-2">
              <Icon name="Calculator" size={16} color="var(--color-accent)" />
              <span className="text-sm font-medium text-accent">
                Average savings: $300+ per year
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsGrid;
