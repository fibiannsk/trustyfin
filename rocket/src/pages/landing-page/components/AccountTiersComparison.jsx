import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AccountTiersComparison = () => {
  const [selectedTier, setSelectedTier] = useState('premium');
  const [annualBilling, setAnnualBilling] = useState(false);

  const accountTiers = [
    {
      id: 'free',
      name: 'Trustyfin Free',
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for getting started with digital banking',
      popular: false,
      color: 'from-gray-400 to-gray-600',
      features: [
        { name: 'Free checking account', included: true },
        { name: 'Mobile app access', included: true },
        { name: 'Online banking', included: true },
        { name: 'Debit card', included: true },
        { name: 'ATM fee reimbursement', included: true, limit: 'Up to $10/month' },
        { name: 'Mobile check deposit', included: true },
        { name: 'Bill pay', included: true },
        { name: 'Instant transfers', included: true, limit: '5 per month' },
        { name: 'Overdraft protection', included: false },
        { name: 'Premium customer support', included: false },
        { name: 'Investment tools', included: false },
        { name: 'Credit score monitoring', included: false }
      ],
      benefits: [
        'No monthly fees',
        'No minimum balance',
        'FDIC insured up to $250,000',
        'Basic mobile banking'
      ]
    },
    {
      id: 'premium',
      name: 'Trustyfin Premium',
      price: { monthly: 9.99, annual: 99.99 },
      description: 'Advanced features for power users and professionals',
      popular: true,
      color: 'from-primary to-secondary',
      features: [
        { name: 'Everything in Free', included: true },
        { name: 'Unlimited instant transfers', included: true },
        { name: 'ATM fee reimbursement', included: true, limit: 'Unlimited worldwide' },
        { name: 'Overdraft protection', included: true },
        { name: 'Premium customer support', included: true },
        { name: 'Investment tools', included: true },
        { name: 'Credit score monitoring', included: true },
        { name: 'Cashback rewards', included: true, limit: '1.5% on all purchases' },
        { name: 'Travel insurance', included: true },
        { name: 'Purchase protection', included: true },
        { name: 'Priority customer service', included: true },
        { name: 'Advanced spending analytics', included: true }
      ],
      benefits: [
        'Unlimited ATM fee reimbursement',
        'Cashback on all purchases',
        'Investment platform access',
        'Premium support & perks'
      ]
    }
  ];

  const calculateSavings = (tier) => {
    const traditionalBankFees = {
      monthly: 25,
      overdraft: 35,
      atm: 15,
      wire: 30,
      total: 105
    };

    const trustyfinCost = tier.id === 'free' ? 0 : (annualBilling ? tier.price.annual / 12 : tier.price.monthly);
    const monthlySavings = traditionalBankFees.total - trustyfinCost;
    const annualSavings = monthlySavings * 12;

    return { monthly: monthlySavings, annual: annualSavings };
  };

  return (
    <section id="pricing" className="py-20 bg-muted">
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
            Choose Your
            <span className="text-primary"> Banking Plan</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Start with our free account or upgrade to Premium for advanced features. 
            Either way, you'll save hundreds compared to traditional banks.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm font-medium ${!annualBilling ? 'text-text-primary' : 'text-text-secondary'}`}>
              Monthly
            </span>
            <motion.button
              className={`relative w-14 h-7 rounded-full transition-colors ${
                annualBilling ? 'bg-primary' : 'bg-gray-300'
              }`}
              onClick={() => setAnnualBilling(!annualBilling)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm"
                animate={{ x: annualBilling ? 32 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <span className={`text-sm font-medium ${annualBilling ? 'text-text-primary' : 'text-text-secondary'}`}>
              Annual
            </span>
            {annualBilling && (
              <span className="text-xs bg-accent text-white px-2 py-1 rounded-full font-medium">
                Save 17%
              </span>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {accountTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              className={`relative bg-white rounded-2xl shadow-banking-card border-2 transition-all duration-300 ${
                selectedTier === tier.id 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'border-border hover:border-primary/50'
              } ${tier.popular ? 'lg:scale-105' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              onClick={() => setSelectedTier(tier.id)}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${tier.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon name={tier.id === 'free' ? 'User' : 'Crown'} size={32} color="white" />
                  </div>
                  <h3 className="text-2xl font-headline text-text-primary mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-text-secondary mb-4">
                    {tier.description}
                  </p>
                  
                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-text-primary">
                        ${annualBilling ? (tier.price.annual / 12).toFixed(2) : tier.price.monthly}
                      </span>
                      <span className="text-text-secondary ml-2">/month</span>
                    </div>
                    {annualBilling && tier.price.annual > 0 && (
                      <div className="text-sm text-text-secondary">
                        Billed annually (${tier.price.annual}/year)
                      </div>
                    )}
                  </div>

                  {/* Savings Calculator */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                    <div className="text-sm font-medium text-accent mb-1">
                      You Save vs Traditional Banks
                    </div>
                    <div className="text-lg font-bold text-accent">
                      ${calculateSavings(tier).monthly.toFixed(0)}/month
                    </div>
                    <div className="text-xs text-text-secondary">
                      ${calculateSavings(tier).annual.toFixed(0)} annually
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: featureIndex * 0.05, duration: 0.3 }}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        feature.included 
                          ? 'bg-accent/10' :'bg-gray-100'
                      }`}>
                        <Icon 
                          name={feature.included ? 'Check' : 'X'} 
                          size={12} 
                          color={feature.included ? 'var(--color-accent)' : 'var(--color-text-secondary)'} 
                        />
                      </div>
                      <div className="flex-1">
                        <span className={`text-sm ${
                          feature.included ? 'text-text-primary' : 'text-text-secondary'
                        }`}>
                          {feature.name}
                        </span>
                        {feature.limit && (
                          <div className="text-xs text-text-secondary">
                            {feature.limit}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Key Benefits */}
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-text-primary mb-3">Key Benefits:</h4>
                  <div className="space-y-2">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-sm text-text-secondary">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                    tier.id === 'premium' ?'bg-primary text-white hover:bg-primary/90 shadow-banking-cta' :'bg-muted text-text-primary hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tier.id === 'free' ? 'Start Free Account' : 'Upgrade to Premium'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          className="bg-white rounded-2xl shadow-banking-card p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-headline text-text-primary text-center mb-8">
            Detailed Feature Comparison
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-6 font-medium text-text-primary">Feature</th>
                  <th className="text-center py-4 px-6 font-medium text-text-primary">Free</th>
                  <th className="text-center py-4 px-6 font-medium text-primary">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Monthly Fee', free: '$0', premium: '$9.99' },
                  { feature: 'ATM Fee Reimbursement', free: 'Up to $10', premium: 'Unlimited' },
                  { feature: 'Instant Transfers', free: '5 per month', premium: 'Unlimited' },
                  { feature: 'Cashback Rewards', free: 'None', premium: '1.5%' },
                  { feature: 'Investment Tools', free: 'No', premium: 'Yes' },
                  { feature: 'Credit Monitoring', free: 'No', premium: 'Yes' },
                  { feature: 'Travel Insurance', free: 'No', premium: 'Yes' },
                  { feature: 'Priority Support', free: 'No', premium: 'Yes' }
                ].map((row, index) => (
                  <motion.tr
                    key={index}
                    className="border-b border-border hover:bg-muted transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <td className="py-4 px-6 font-medium text-text-primary">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-text-secondary">{row.free}</td>
                    <td className="py-4 px-6 text-center text-primary font-medium">{row.premium}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-headline text-text-primary mb-6">
            Questions About Our Plans?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="MessageCircle" size={16} />
              <span className="text-sm">Live chat support available 24/7</span>
            </div>
            <span className="hidden sm:block text-border">•</span>
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="RefreshCw" size={16} />
              <span className="text-sm">Switch plans anytime</span>
            </div>
            <span className="hidden sm:block text-border">•</span>
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="Shield" size={16} />
              <span className="text-sm">30-day money-back guarantee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AccountTiersComparison;
