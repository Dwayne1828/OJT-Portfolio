import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
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
    href: '#home'
  },
  {
    name: 'Weekly Reports',
    href: '#reports'
  },
  {
    name: 'Projects',
    href: '#projects'
  }];

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-brand-slate-950/90 backdrop-blur-md border-brand-slate-800 py-3' : 'bg-transparent border-transparent py-5'}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => scrollToSection('#home')}>
            
            <span className="text-xl font-bold text-white tracking-tight">
              Internship <span className="text-brand-blue">Report</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) =>
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-brand-slate-400 hover:text-white font-medium transition-colors duration-200">
              
                {link.name}
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle mobile menu">
              
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="md:hidden bg-brand-slate-950 border-t border-brand-slate-800 overflow-hidden">
          
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) =>
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="block w-full text-left px-3 py-3 text-base font-medium text-brand-slate-400 hover:text-white hover:bg-brand-slate-800 transition-colors">
              
                  {link.name}
                </button>
            )}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}