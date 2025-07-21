import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Banking',
      links: [
        { name: 'Checking Account', href: '#' },
        { name: 'Savings Account', href: '#' },
        { name: 'Mobile Banking', href: '#' },
        { name: 'Online Banking', href: '#' },
        { name: 'Debit Cards', href: '#' }
      ]
    },
    {
      title: 'Features',
      links: [
        { name: 'Instant Transfers', href: '#' },
        { name: 'Mobile Deposit', href: '#' },
        { name: 'Bill Pay', href: '#' },
        { name: 'ATM Locator', href: '#' },
        { name: 'Spending Insights', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Contact Us', href: '#' },
        { name: 'Live Chat', href: '#' },
        { name: 'Phone Support', href: '#' },
        { name: 'Security Center', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Investors', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'Facebook', icon: 'Facebook', href: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#' },
    { name: 'Instagram', icon: 'Instagram', href: '#' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Accessibility', href: '#' },
    { name: 'Sitemap', href: '#' }
  ];

  const regulatoryInfo = [
    {
      title: 'FDIC Insurance',
      description: 'Member FDIC. Deposits insured up to $250,000 per depositor.',
      icon: 'Shield'
    },
    {
      title: 'Equal Housing Lender',
      description: 'We do business in accordance with the Federal Fair Housing Law.',
      icon: 'Home'
    },
    {
      title: 'Bank Secrecy Act',
      description: 'We comply with the Bank Secrecy Act and report suspicious activities.',
      icon: 'FileText'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Building2" size={24} color="white" />
              </div>
              <span className="text-2xl font-headline text-white">Trustyfin</span>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Modern banking designed for your digital life. Experience banking without boundaries 
              with instant transfers, zero hidden fees, and bank-level security.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} color="#9CA3AF" />
                <span className="text-gray-300">1-800-TRUSTY-FIN</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} color="#9CA3AF" />
                <span className="text-gray-300">support@trustyfin.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={16} color="#9CA3AF" />
                <span className="text-gray-300">San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={20} color="white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
            >
              <h3 className="text-lg font-medium text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: linkIndex * 0.05, duration: 0.3 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* App Download Section */}
        <motion.div
          className="border-t border-gray-800 pt-12 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium text-white mb-4">
              Get the Trustyfin Mobile App
            </h3>
            <p className="text-gray-300 mb-6">
              Download our award-winning mobile app for iOS and Android
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#"
                className="flex items-center space-x-3 bg-black border border-gray-700 text-white px-6 py-3 rounded-lg hover:border-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name="Smartphone" size={24} color="white" />
                <div className="text-left">
                  <div className="text-xs text-gray-300">Download on the</div>
                  <div className="text-sm font-medium">App Store</div>
                </div>
              </motion.a>
              <motion.a
                href="#"
                className="flex items-center space-x-3 bg-black border border-gray-700 text-white px-6 py-3 rounded-lg hover:border-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name="Smartphone" size={24} color="white" />
                <div className="text-left">
                  <div className="text-xs text-gray-300">Get it on</div>
                  <div className="text-sm font-medium">Google Play</div>
                </div>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Regulatory Information */}
        <motion.div
          className="border-t border-gray-800 pt-12 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-medium text-white mb-6 text-center">
            Regulatory Information
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {regulatoryInfo.map((info, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-lg p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name={info.icon} size={24} color="#9CA3AF" />
                </div>
                <h4 className="font-medium text-white mb-2">{info.title}</h4>
                <p className="text-sm text-gray-300">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {currentYear} Trustyfin. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-6">
              {legalLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Additional Disclaimers */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="text-xs text-gray-500 leading-relaxed space-y-2">
              <p>
                Trustyfin is a trademark of Trustyfin Bank, N.A. Member FDIC. 
                Equal Housing Lender. NMLS ID: 123456.
              </p>
              <p>
                Investment products are not FDIC insured, not bank guaranteed, 
                and may lose value. Investment products are offered through 
                Trustyfin Investment Services, LLC, member FINRA/SIPC.
              </p>
              <p>
                Apple and the Apple logo are trademarks of Apple Inc. Google Play 
                and the Google Play logo are trademarks of Google LLC.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
