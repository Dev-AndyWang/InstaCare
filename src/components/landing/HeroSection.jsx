import { motion } from 'framer-motion';
import GeometricHeart from './GeometricHeart';

export default function HeroSection({ onGetStarted }) {
  return (
    <section id="intro" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white/20">

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 lg:px-16 py-20">
        <div className="max-w-4xl">
          {/* Left content */}
          <div className="space-y-8">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-base lg:text-lg font-black tracking-[4px] uppercase text-lavender mb-2">
                PURPOSE OF INSTACARE
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black text-warm-charcoal leading-[0.95] tracking-tight"
            >
              AI-Powered Health Diagnostics
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xl md:text-2xl lg:text-3xl text-warm-gray leading-relaxed font-medium"
            >
              Map your symptoms. Get instant AI analysis.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <button
                onClick={onGetStarted}
                className="group relative px-16 py-6 bg-gradient-to-r from-soft-blush via-lavender to-sky-blue text-warm-charcoal rounded-full text-xl lg:text-2xl font-black tracking-wide uppercase transition-all duration-300 border-4 border-gray-600 shadow-[0_10px_40px_rgba(230,213,255,0.4)] hover:shadow-[0_15px_60px_rgba(230,213,255,0.6)] hover:border-gray-700 hover:scale-105 active:scale-95"
              >
                START AI DIAGNOSIS
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3D Geometric Heart - Absolutely positioned on right side */}
      <GeometricHeart />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-2 text-light-warm-gray">
          <span className="text-xs font-medium tracking-wide uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
