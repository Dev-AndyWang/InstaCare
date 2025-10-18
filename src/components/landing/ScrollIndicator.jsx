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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 2 }}
      onClick={scrollDown}
      className="fixed bottom-10 right-10 z-40 bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 text-sm animate-bounce-indicator hover:bg-black/90 transition-colors duration-300"
      aria-label="Scroll for more"
    >
      <span>Scroll for more</span>
      <ChevronDown className="w-4 h-4" />
    </motion.button>
  );
}
