import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Volume2, Menu } from 'lucide-react';
import LanguageSelector from '../LanguageSelector';

export default function Header({ selectedLanguage, onLanguageChange }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16 h-20 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <div className="font-display text-4xl lg:text-5xl font-black tracking-tight text-gray-900">
            InstaCare
          </div>
        </motion.div>

        {/* Icon Navigation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-6"
        >
          <button
            className="p-2.5 hover:bg-gray-100 rounded-full transition-all duration-300 group"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
          </button>
          <button
            className="p-2.5 hover:bg-gray-100 rounded-full transition-all duration-300 group"
            aria-label="Sound"
          >
            <Volume2 className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
          </button>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
          />
          <button
            className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 rounded-full transition-all duration-300 group"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
              Menu
            </span>
          </button>
        </motion.div>
      </div>
    </motion.header>
  );
}
