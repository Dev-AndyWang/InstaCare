import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator() {
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      onClick={scrollDown}
      className="fixed bottom-8 right-8 lg:bottom-12 lg:right-12 z-40 group"
      aria-label="Scroll for more"
    >
      <div className="bg-gray-900 text-white px-5 py-3 rounded-full flex items-center gap-2 text-xs font-medium uppercase tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-gray-800 hover:scale-105">
        <ChevronDown className="w-4 h-4 animate-bounce-indicator" />
        <span>Scroll for more</span>
      </div>
    </motion.button>
  );
}
