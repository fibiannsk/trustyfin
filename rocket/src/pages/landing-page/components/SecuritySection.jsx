import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SecuritySection = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);

  const securityFeatures = [
    {
      id: 'encryption',
      icon: 'Lock',
      title: '256-Bit Encryption',
      description: 'Military-grade encryption protects all your data',
      details: `Your data is protected with the same level of encryption used by the military and major financial institutions. Every transaction, login, and piece of personal information is encrypted using AES-256 encryption, making it virtually impossible for unauthorized parties to access your information.`,
      color: 'from-blue-500 to-indigo-600',
      stats: { label: 'Security Level', value: 'Military Grade' }
    },
    {
      id: 'biometric',
      icon: 'Fingerprint',
      title: 'Biometric Authentication',
      description: 'Face ID and Touch ID for secure access',
      details: `Access your account using your unique biometric data. Face ID uses advanced facial recognition technology, while Touch ID uses your fingerprint. These methods are more secure than traditional passwords because they're unique to you and can't be easily replicated or stolen.`,
      color: 'from-green-500 to-emerald-600',
      stats: { label: 'Authentication Speed', value: '< 1 second' }
    },
    {
      id: 'monitoring',
      icon: 'Eye',
      title: 'Real-Time Monitoring',
      description: '24/7 fraud detection and prevention',
      details: `Our advanced AI systems monitor your account 24/7 for suspicious activity. Machine learning algorithms analyze transaction patterns, location data, and spending habits to detect potential fraud instantly. You'll receive immediate alerts for any unusual activity.`,
      color: 'from-purple-500 to-pink-600',
      stats: { label: 'Detection Rate', value: '99.9%' }
    },
    {
      id: 'compliance',icon: 'Shield',title: 'Regulatory Compliance',description: 'FDIC insured and fully compliant',details: `Trustyfin is fully compliant with all federal banking regulations. Your deposits are FDIC insured up to $250,000, and we follow strict guidelines set by the Federal Reserve, OCC, and other regulatory bodies to ensure your money is always protected.`,color: 'from-red-500 to-rose-600',
      stats: { label: 'Insurance Coverage', value: '$250,000' }
    }
  ];

  const complianceBadges = [
    {
      name: 'FDIC Insured',
      description: 'Federal Deposit Insurance Corporation',
      icon: 'Shield',
      verified: true
    },
    {
      name: 'Federal Reserve',
      description: 'Regulated by the Federal Reserve System',
      icon: 'Building2',
      verified: true
    },
    {
      name: 'SOC 2 Compliant',
      description: 'Service Organization Control 2 certified',
      icon: 'CheckCircle',
      verified: true
    },
    {
      name: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      icon: 'CreditCard',
      verified: true
    }
  ];

  const securityStats = [
    { label: 'Uptime', value: '99.99%', icon: 'Activity' },
    { label: 'Fraud Prevention', value: '99.9%', icon: 'Shield' },
    { label: 'Data Centers', value: '5 Locations', icon: 'Server' },
    { label: 'Security Audits', value: 'Monthly', icon: 'Search' }
  ];

  const partnerLogos = [
    { name: 'Visa', icon: 'CreditCard' },
    { name: 'Mastercard', icon: 'CreditCard' },
    { name: 'AWS', icon: 'Cloud' },
    { name: 'Cloudflare', icon: 'Shield' }
  ];

  return (
    <section id="security" className="py-20 bg-white">
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
            Your Security is Our
            <span className="text-primary"> Top Priority</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We use the same security measures as major banks and government institutions 
            to keep your money and personal information completely safe.
          </p>
        </motion.div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="bg-muted rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => setExpandedFeature(expandedFeature === feature.id ? null : feature.id)}
              whileHover={{ scale: 1.02 }}
            >
              {/* Feature Header */}
              <div className="flex items-start space-x-4 mb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon name={feature.icon} size={28} color="white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-headline text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary">
                    {feature.description}
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: expandedFeature === feature.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon name="ChevronDown" size={20} color="var(--color-text-secondary)" />
                </motion.div>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">{feature.stats.label}</span>
                  <span className="text-lg font-bold text-text-primary">{feature.stats.value}</span>
                </div>
              </div>

              {/* Expanded Details */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: expandedFeature === feature.id ? 'auto' : 0,
                  opacity: expandedFeature === feature.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-border">
                  <p className="text-text-secondary leading-relaxed">
                    {feature.details}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Compliance Badges */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-headline text-text-primary text-center mb-8">
            Regulatory Compliance & Certifications
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {complianceBadges.map((badge, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 shadow-banking-card text-center border border-border hover:border-primary/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name={badge.icon} size={24} color="var(--color-accent)" />
                </div>
                <h4 className="font-medium text-text-primary mb-2">{badge.name}</h4>
                <p className="text-sm text-text-secondary mb-3">{badge.description}</p>
                <div className="flex items-center justify-center space-x-1">
                  <Icon name="CheckCircle" size={16} color="var(--color-accent)" />
                  <span className="text-sm text-accent font-medium">Verified</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Statistics */}
        <motion.div
          className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-headline text-text-primary text-center mb-8">
            Security Performance Metrics
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {securityStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Icon name={stat.icon} size={28} color="var(--color-primary)" />
                </div>
                <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Partners */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-headline text-text-primary mb-8">
            Trusted Security Partners
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            {partnerLogos.map((partner, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 bg-white rounded-lg px-6 py-4 shadow-banking-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Icon name={partner.icon} size={24} color="var(--color-text-secondary)" />
                <span className="font-medium text-text-primary">{partner.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Security Promise */}
          <div className="bg-white rounded-2xl p-8 shadow-banking-card max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={24} color="var(--color-accent)" />
              </div>
              <h4 className="text-xl font-headline text-text-primary">Our Security Promise</h4>
            </div>
            <p className="text-text-secondary leading-relaxed mb-6">
              We guarantee that your money and personal information are protected by the highest 
              security standards in the industry. If unauthorized access occurs due to a security 
              breach on our end, we'll make it right with 100% liability protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 text-sm text-accent">
                <Icon name="CheckCircle" size={16} />
                <span>Zero liability fraud protection</span>
              </div>
              <span className="hidden sm:block text-border">•</span>
              <div className="flex items-center space-x-2 text-sm text-accent">
                <Icon name="CheckCircle" size={16} />
                <span>24/7 security monitoring</span>
              </div>
              <span className="hidden sm:block text-border">•</span>
              <div className="flex items-center space-x-2 text-sm text-accent">
                <Icon name="CheckCircle" size={16} />
                <span>Instant fraud alerts</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecuritySection;
