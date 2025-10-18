import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SideNav() {
  const [activeSection, setActiveSection] = useState('intro');

  const navItems = [
    { id: 'intro', label: 'Intro' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'technology', label: 'Technology' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="fixed left-12 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
    >
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 w-px h-[120px] bg-gray-200"></div>

        {/* Navigation items */}
        <div className="flex flex-col gap-6 pl-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className="relative text-left group"
            >
              <span
                className={`text-xs font-medium transition-all duration-300 hover:text-black hover:scale-110 inline-block ${
                  activeSection === item.id
                    ? 'text-black font-semibold'
                    : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>

              {/* Active indicator */}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
