import { motion } from 'framer-motion';

export default function DNAVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1.2 }}
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* DNA Helix SVG */}
      <div className="relative w-[400px] h-[500px] animate-float">
        <svg
          viewBox="0 0 400 500"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradient definition */}
            <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Left helix strand */}
          <motion.path
            d="M 120 50 Q 80 125 120 200 T 120 350 T 120 500"
            stroke="url(#dnaGradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
          />

          {/* Right helix strand */}
          <motion.path
            d="M 280 50 Q 320 125 280 200 T 280 350 T 280 500"
            stroke="url(#dnaGradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
          />

          {/* Connection lines (rungs) */}
          {[...Array(8)].map((_, i) => {
            const y = 75 + i * 55;
            const x1 = 120 + Math.sin(i * 0.8) * 40;
            const x2 = 280 - Math.sin(i * 0.8) * 40;

            return (
              <motion.line
                key={i}
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                stroke="url(#dnaGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.6"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.6 }}
                transition={{ duration: 0.5, delay: 1.8 + i * 0.1 }}
                style={{ transformOrigin: 'center' }}
              />
            );
          })}

          {/* Floating particles */}
          {[...Array(12)].map((_, i) => {
            const cx = 100 + Math.random() * 200;
            const cy = 50 + Math.random() * 400;
            const size = 4 + Math.random() * 6;

            return (
              <motion.circle
                key={`particle-${i}`}
                cx={cx}
                cy={cy}
                r={size}
                fill="url(#dnaGradient)"
                opacity="0.4"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 1, 0],
                  opacity: [0, 0.6, 0.6, 0],
                  y: [0, -30, -60],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: 2 + Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3,
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* Background gradient blur */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>
      </div>
    </motion.div>
  );
}
