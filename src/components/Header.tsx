import { useEffect, useState } from 'react';
import { Menu, X, Home, Building2, FileText, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      // Track current section based on scroll position
      const scrollPosition = window.scrollY + 250;
      const sections = [
        { id: 'home', name: 'Home' },
        { id: 'about', name: 'HTE' },
        { id: 'projects', name: 'Documents' },
        { id: 'reports', name: 'Weekly Reports' }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].name);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <>
      {/* 1. TOP HEADER: Displays at the top of page (and handles mobile sticky header) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
            ? 'md:hidden bg-brand-slate-950/95 backdrop-blur-md border-b border-brand-slate-800 py-3'
            : 'bg-transparent border-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between md:justify-start items-center">
            {/* Top Desktop Nav: visible only when at the top */}
            {!isScrolled && (
              <nav className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.name;
                  return (
                    <button
                      key={link.name}
                      onClick={() => scrollToSection(link.href)}
                      className={`font-medium text-sm transition-colors duration-200 cursor-pointer flex items-center gap-2 group ${isActive ? 'text-white' : 'text-brand-slate-400 hover:text-white'
                        }`}
                    >
                      <Icon className="w-4 h-4 text-brand-blue group-hover:text-white transition-colors" />
                      <span>{link.name}</span>
                    </button>
                  );
                })}
              </nav>
            )}

            {/* Mobile Menu Toggle Button */}
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

        {/* Mobile Dropdown Nav */}
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
                  const isActive = activeSection === link.name;
                  return (
                    <button
                      key={link.name}
                      onClick={() => scrollToSection(link.href)}
                      className={`w-full text-left px-3 py-3 text-base font-medium rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer ${isActive
                          ? 'bg-brand-blue/15 text-white'
                          : 'text-brand-slate-400 hover:text-white hover:bg-brand-slate-800'
                        }`}
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

      {/* 2. LEFT FLOATING NAVBAR: Previous glassmorphic dock on scroll */}
      <AnimatePresence>
        {isScrolled && (
          <motion.nav
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="hidden md:flex fixed left-4 lg:left-6 top-28 lg:top-32 z-50 flex-col items-start bg-brand-slate-950/90 backdrop-blur-md border border-brand-slate-800 rounded-2xl p-2.5 shadow-2xl shadow-black/50 space-y-1.5"
            aria-label="Side Navigation"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.name;
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2.5 transition-all w-full text-left cursor-pointer group ${isActive
                      ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                      : 'text-brand-slate-300 hover:text-white hover:bg-brand-slate-800/80'
                    }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-brand-blue group-hover:text-white'
                      }`}
                  />
                  <span className="tracking-tight whitespace-nowrap">{link.name}</span>
                </button>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}