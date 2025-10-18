import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Menu } from 'lucide-react';

export default function Header() {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-black">
          InstaCare
        </div>

        {/* Icon Navigation */}
        <div className="flex items-center gap-8">
          <button
            className="p-2 hover:bg-black/5 rounded-full transition-colors duration-300"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-black" />
          </button>
          <button
            className="p-2 hover:bg-black/5 rounded-full transition-colors duration-300"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-black" />
          </button>
          <button
            className="p-2 hover:bg-black/5 rounded-full transition-colors duration-300"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
