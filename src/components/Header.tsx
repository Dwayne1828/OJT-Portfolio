import { useEffect, useState } from 'react';
import { Menu, X, Home, Building2, FileText, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      name: 'Home',
      href: '#home',
      icon: Home
    },
    {
      name: 'HTE',
      href: '#about',
      icon: Building2
    },
    {
      name: 'Documents',
      href: '#projects',
      icon: FileText
    },
    {
      name: 'Weekly Reports',
      href: '#reports',
      icon: CalendarDays
    }
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-brand-slate-950/90 backdrop-blur-md border-brand-slate-800 py-3'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between md:justify-start items-center">
          {/* Desktop Nav aligned to the left */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-brand-slate-400 hover:text-white font-medium text-sm transition-colors duration-200 cursor-pointer flex items-center gap-2 group"
                >
                  <Icon className="w-4 h-4 text-brand-blue group-hover:text-white transition-colors" />
                  <span>{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-slate-400 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-slate-950 border-t border-brand-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="w-full text-left px-3 py-3 text-base font-medium text-brand-slate-400 hover:text-white hover:bg-brand-slate-800 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                  >
                    <Icon className="w-4 h-4 text-brand-blue" />
                    <span>{link.name}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}