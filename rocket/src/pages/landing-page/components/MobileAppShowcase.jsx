import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MobileAppShowcase = () => {
  const [activeScreen, setActiveScreen] = useState(0);

  const appScreenshots = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Complete overview of your finances at a glance',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=600&fit=crop',
      features: ['Balance overview', 'Recent transactions', 'Quick actions', 'Spending insights']
    },
    {
      id: 'transfer',
      title: 'Send Money',
      description: 'Transfer money instantly to anyone, anywhere',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=600&fit=crop',
      features: ['Instant transfers', 'Contact integration', 'QR code payments', 'Split bills']
    },
    {
      id: 'deposit',
      title: 'Mobile Deposit',
      description: 'Deposit checks by simply taking a photo',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=600&fit=crop',
      features: ['Photo capture', 'Auto-processing', 'Instant confirmation', 'Deposit history']
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Advanced security features for peace of mind',
      image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=300&h=600&fit=crop',
      features: ['Face ID login', 'Fingerprint auth', 'Real-time alerts', 'Fraud monitoring']
    }
  ];

  const appStats = [
    { platform: 'iOS App Store', rating: '4.8', reviews: '12,450', icon: 'Smartphone' },
    { platform: 'Google Play', rating: '4.9', reviews: '18,320', icon: 'Smartphone' },
    { platform: 'Total Downloads', rating: '500K+', reviews: 'Active Users', icon: 'Download' }
  ];

  const deviceFeatures = [
    { icon: 'Fingerprint', title: 'Biometric Login', description: 'Face ID & Touch ID support' },
    { icon: 'Bell', title: 'Smart Notifications', description: 'Real-time transaction alerts' },
    { icon: 'Wifi', title: 'Offline Mode', description: 'View balances without internet' },
    { icon: 'Shield', title: 'Bank-Level Security', description: '256-bit encryption' }
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
            Banking in Your
            <span className="text-primary"> Pocket</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Experience the full power of Trustyfin on your mobile device. 
            Everything you need for modern banking, designed for your smartphone.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Mobile App Preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Phone Mockup */}
            <div className="relative mx-auto max-w-sm">
              {/* Phone Frame */}
              <div className="relative bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
                <div className="bg-black rounded-[2.5rem] p-2">
                  {/* Screen */}
                  <div className="bg-white rounded-[2rem] overflow-hidden relative h-[600px]">
                    {/* Status Bar */}
                    <div className="bg-gray-900 h-8 flex items-center justify-between px-6 text-white text-xs">
                      <span>9:41</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Wifi" size={12} color="white" />
                        <Icon name="Battery" size={12} color="white" />
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="relative h-full">
                      <motion.div
                        key={activeScreen}
                        className="absolute inset-0"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={appScreenshots[activeScreen].image}
                          alt={appScreenshots[activeScreen].title}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Overlay with App UI Elements */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                          <div className="absolute bottom-6 left-6 right-6 text-white">
                            <h3 className="text-lg font-bold mb-2">
                              {appScreenshots[activeScreen].title}
                            </h3>
                            <p className="text-sm opacity-90">
                              {appScreenshots[activeScreen].description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Feature Cards */}
              <motion.div
                className="absolute -right-8 top-20 bg-white rounded-lg shadow-lg p-3 border border-border"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-text-primary">Secure Connection</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -left-8 bottom-32 bg-white rounded-lg shadow-lg p-3 border border-border"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={16} color="var(--color-primary)" />
                  <span className="text-xs font-medium text-text-primary">Instant Transfer</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* App Features & Controls */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Screen Navigation */}
            <div className="space-y-4">
              <h3 className="text-2xl font-headline text-text-primary mb-4">
                Explore App Features
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {appScreenshots.map((screen, index) => (
                  <motion.button
                    key={screen.id}
                    onClick={() => setActiveScreen(index)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      activeScreen === index
                        ? 'border-primary bg-primary/5' :'border-border bg-white hover:border-primary/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-medium text-text-primary mb-1">
                      {screen.title}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {screen.description}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Current Screen Features */}
            <div className="bg-muted rounded-lg p-6">
              <h4 className="font-medium text-text-primary mb-4">
                {appScreenshots[activeScreen].title} Features:
              </h4>
              <div className="space-y-2">
                {appScreenshots[activeScreen].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-text-primary">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Device Features */}
            <div className="space-y-4">
              <h4 className="font-medium text-text-primary">Mobile-First Features:</h4>
              <div className="grid grid-cols-2 gap-4">
                {deviceFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-border"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={feature.icon} size={16} color="var(--color-primary)" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">
                        {feature.title}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {feature.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* App Store Ratings & Download */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Ratings Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {appStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 shadow-banking-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name={stat.icon} size={24} color="var(--color-primary)" />
                </div>
                <div className="text-2xl font-bold text-text-primary mb-1">
                  {stat.rating}
                </div>
                <div className="text-sm text-text-secondary mb-1">
                  {stat.platform}
                </div>
                <div className="text-xs text-text-secondary">
                  {stat.reviews} reviews
                </div>
              </motion.div>
            ))}
          </div>

          {/* Download Buttons */}
          <div className="space-y-4">
            <h3 className="text-2xl font-headline text-text-primary mb-6">
              Download the Trustyfin App
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="flex items-center space-x-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name="Smartphone" size={24} color="white" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-medium">App Store</div>
                </div>
              </motion.button>

              <motion.button
                className="flex items-center space-x-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name="Smartphone" size={24} color="white" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-medium">Google Play</div>
                </div>
              </motion.button>
            </div>

            <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary mt-6">
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={16} />
                <span>Secure Download</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Icon name="Smartphone" size={16} />
                <span>iOS 14+ & Android 8+</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Icon name="Download" size={16} />
                <span>Free Download</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileAppShowcase;
