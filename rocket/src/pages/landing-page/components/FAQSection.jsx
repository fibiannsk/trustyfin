import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      id: 1,
      category: 'Account Opening',
      question: 'How long does it take to open a Trustyfin account?',
      answer: `Opening a Trustyfin account takes just 2-3 minutes. You'll need to provide basic information like your name, address, phone number, and email. We'll also need to verify your identity with a government-issued ID. Once verified, your account is ready to use immediately.`,
      videoUrl: 'https://example.com/account-opening-demo',
      tags: ['account', 'opening', 'verification', 'time']
    },
    {
      id: 2,
      category: 'Security',
      question: 'How secure is my money with Trustyfin?',
      answer: `Your money is extremely secure with Trustyfin. We use bank-level 256-bit encryption, multi-factor authentication, and real-time fraud monitoring. Your deposits are FDIC insured up to $250,000, and we're regulated by the Federal Reserve. We also use biometric authentication (Face ID/Touch ID) for additional security.`,
      videoUrl: 'https://example.com/security-features-demo',
      tags: ['security', 'FDIC', 'encryption', 'fraud', 'biometric']
    },
    {
      id: 3,
      category: 'Fees',question: 'What fees does Trustyfin charge?',answer: `Trustyfin Free has no monthly fees, no minimum balance requirements, and no overdraft fees. We reimburse up to $10 in ATM fees monthly. Trustyfin Premium costs $9.99/month but includes unlimited ATM fee reimbursement worldwide, cashback rewards, and premium features. There are no hidden fees - what you see is what you pay.`,videoUrl: 'https://example.com/fee-structure-demo',
      tags: ['fees', 'pricing', 'ATM', 'premium', 'free']
    },
    {
      id: 4,
      category: 'Features',question: 'Can I deposit checks with my phone?',
      answer: `Yes! Our mobile check deposit feature lets you deposit checks instantly by taking a photo with your smartphone. Simply open the app, tap "Deposit Check," take photos of the front and back of your check, and submit. Funds are typically available within minutes for Trustyfin Premium users, or by the next business day for Free users.`,
      videoUrl: 'https://example.com/mobile-deposit-demo',
      tags: ['mobile', 'deposit', 'check', 'photo', 'instant']
    },
    {
      id: 5,
      category: 'Transfers',question: 'How fast are money transfers with Trustyfin?',
      answer: `Trustyfin offers instant transfers to other Trustyfin users and most major banks. Standard transfers are completed within seconds, while transfers to external banks typically take 1-2 business days. Premium users get unlimited instant transfers, while Free users get 5 instant transfers per month.`,
      videoUrl: 'https://example.com/transfer-speed-demo',
      tags: ['transfers', 'instant', 'speed', 'external', 'banks']
    },
    {
      id: 6,
      category: 'Support',question: 'What kind of customer support do you offer?',
      answer: `We offer 24/7 customer support through live chat, phone, and email. Free users get standard support with typical response times under 2 hours. Premium users get priority support with response times under 30 seconds for live chat and immediate phone support. Our support team consists of real humans, not bots.`,
      videoUrl: 'https://example.com/customer-support-demo',
      tags: ['support', 'chat', 'phone', 'email', 'priority', '24/7']
    },
    {
      id: 7,
      category: 'Account Types',question: 'What\'s the difference between Free and Premium accounts?',
      answer: `Trustyfin Free includes all basic banking features with no monthly fees. Trustyfin Premium ($9.99/month) adds unlimited instant transfers, unlimited ATM fee reimbursement worldwide, 1.5% cashback on purchases, investment tools, credit score monitoring, travel insurance, and priority customer support.`,
      videoUrl: 'https://example.com/account-comparison-demo',
      tags: ['free', 'premium', 'comparison', 'features', 'cashback']
    },
    {
      id: 8,
      category: 'Technical',
      question: 'Is there a mobile app? What devices are supported?',
      answer: `Yes! The Trustyfin mobile app is available for iOS (14+) and Android (8+). The app includes all banking features: account management, transfers, mobile deposit, bill pay, spending tracking, and more. You can also access your account through our secure web portal on any device with internet access.`,
      videoUrl: 'https://example.com/mobile-app-demo',
      tags: ['mobile', 'app', 'iOS', 'Android', 'web', 'devices']
    }
  ];

  const categories = ['All', ...new Set(faqs.map(faq => faq.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-headline-bold text-text-primary mb-4">
            Frequently Asked
            <span className="text-primary"> Questions</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Get answers to common questions about Trustyfin banking. 
            Can't find what you're looking for? Our support team is here to help 24/7.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon name="Search" size={20} color="var(--color-text-secondary)" />
            </div>
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white' :'bg-white text-text-secondary hover:bg-primary/10 hover:text-primary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Icon name="Search" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-text-primary mb-2">No results found</h3>
              <p className="text-text-secondary">
                Try adjusting your search terms or browse all categories.
              </p>
            </motion.div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="bg-white rounded-lg shadow-banking-card border border-border overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                {/* Question Header */}
                <motion.button
                  className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
                  onClick={() => toggleFAQ(faq.id)}
                  whileHover={{ backgroundColor: 'var(--color-muted)' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-text-primary pr-4">
                        {faq.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedFAQ === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <Icon name="ChevronDown" size={20} color="var(--color-text-secondary)" />
                    </motion.div>
                  </div>
                </motion.button>

                {/* Answer Content */}
                <AnimatePresence>
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-border">
                        <div className="pt-6">
                          <p className="text-text-secondary leading-relaxed mb-4">
                            {faq.answer}
                          </p>

                          {/* Video Demo Link */}
                          <div className="flex items-center justify-between bg-muted rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Icon name="Play" size={20} color="var(--color-primary)" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-text-primary">
                                  Watch Video Explanation
                                </div>
                                <div className="text-xs text-text-secondary">
                                  See this feature in action
                                </div>
                              </div>
                            </div>
                            <motion.button
                              className="text-primary hover:text-primary/80 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Icon name="ExternalLink" size={16} />
                            </motion.button>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mt-4">
                            {faq.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="text-xs bg-gray-100 text-text-secondary px-2 py-1 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* Contact Support CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-banking-card">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="MessageCircle" size={24} color="var(--color-primary)" />
              </div>
              <h3 className="text-xl font-headline text-text-primary">Still Have Questions?</h3>
            </div>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Our friendly support team is available 24/7 to help you with any questions 
              about Trustyfin banking. Get instant answers through live chat or schedule a call.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name="MessageCircle" size={20} />
                <span>Start Live Chat</span>
              </motion.button>
              <motion.button
                className="flex items-center justify-center space-x-2 border border-border text-text-primary px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name="Phone" size={20} />
                <span>Schedule Call</span>
              </motion.button>
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary mt-6">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} />
                <span>24/7 Support</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Icon name="Zap" size={16} />
                <span>&lt;30s Response</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={16} />
                <span>Real Humans</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
