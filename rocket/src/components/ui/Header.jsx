import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const navigationSections = [
    { label: 'How It Works', anchor: 'how-it-works', description: '2-minute account opening process' },
    { label: 'Features', anchor: 'features', description: 'Key banking benefits' },
    { label: 'Security', anchor: 'security', description: 'FDIC insured & secure' },
    { label: 'Pricing', anchor: 'pricing', description: 'Account tiers & fees' },
    { label: 'Reviews', anchor: 'reviews', description: 'Customer testimonials' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navigationSections.map(nav => nav.anchor);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (anchor) => {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-banking ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-banking-card' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Building2" size={20} color="white" />
                </div>
                <span className="text-xl font-headline text-text-primary">Trustyfin</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationSections.map((section) => (
                <button
                  key={section.anchor}
                  onClick={() => handleSectionClick(section.anchor)}
                  className={`text-sm font-medium transition-banking hover:text-primary ${
                    activeSection === section.anchor 
                      ? 'text-primary border-b-2 border-primary pb-1' :'text-text-secondary'
                  }`}
                  title={section.description}
                >
                  {section.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-text-secondary hover:text-primary">
                Sign In
              </Button>
              <Button variant="default" className="shadow-banking-cta">
                Open Account
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-banking"
              aria-label="Toggle menu"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} color="currentColor" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Icon name="Building2" size={20} color="white" />
                  </div>
                  <span className="text-xl font-headline text-text-primary">Trustyfin</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-banking"
                  aria-label="Close menu"
                >
                  <Icon name="X" size={24} color="currentColor" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-6 py-8">
                <div className="space-y-6">
                  {navigationSections.map((section) => (
                    <button
                      key={section.anchor}
                      onClick={() => handleSectionClick(section.anchor)}
                      className={`w-full text-left p-4 rounded-lg transition-banking hover:bg-muted ${
                        activeSection === section.anchor 
                          ? 'bg-primary/5 border-l-4 border-primary text-primary' :'text-text-primary'
                      }`}
                    >
                      <div className="font-medium">{section.label}</div>
                      <div className="text-sm text-text-secondary mt-1">{section.description}</div>
                    </button>
                  ))}
                </div>
              </nav>

              {/* Mobile CTAs */}
              <div className="p-6 border-t border-border space-y-3">
                <Button variant="ghost" fullWidth className="justify-center">
                  Sign In
                </Button>
                <Button variant="default" fullWidth className="justify-center shadow-banking-cta">
                  Open Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll Progress Indicator */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <div 
          className="h-1 bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out"
          style={{
            width: `${Math.min(100, (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%`
          }}
        />
      </div>
    </>
  );
};

export default Header;
