import { motion } from 'framer-motion';
import DNAVisual from './DNAVisual';

export default function HeroSection({ onGetStarted }) {
  return (
    <section className="relative h-screen flex items-center justify-center px-8 md:px-12 lg:px-32">
      <div className="max-w-[1440px] w-full mx-auto grid lg:grid-cols-[60%_40%] gap-16 items-center">
        {/* Left Column - Content */}
        <div className="space-y-8">
          {/* Small label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-xs font-medium tracking-[2px] uppercase text-gray-400">
              Purpose of InstaCare
            </p>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.2] max-w-2xl"
          >
            Detailed AI diagnostic
            <br />
            of your body
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg text-gray-600 leading-relaxed max-w-lg"
          >
            Health is the most important thing. So don't put it off for later.
            Think about your future today.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <button
              onClick={onGetStarted}
              className="px-10 py-4 border border-black rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 active:scale-95"
            >
              Make an Appointment
            </button>
          </motion.div>
        </div>

        {/* Right Column - Visual Element */}
        <div className="hidden lg:block relative h-[500px]">
          <DNAVisual />
        </div>
      </div>
    </section>
  );
}
