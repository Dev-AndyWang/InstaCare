import { motion } from 'framer-motion';

export default function PurpleBlobVisual() {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-transparent to-pink-100/30 blur-3xl"></div>

      {/* Main blob container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="relative w-[400px] h-[400px]"
      >
        {/* Main purple blob */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full blur-3xl opacity-60 animate-float"></div>
        </motion.div>

        {/* Secondary pink blob */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-56 h-56 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full blur-3xl opacity-50 animate-float-delayed"></div>
        </motion.div>

        {/* Accent blob */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full blur-2xl opacity-70"
        ></motion.div>

        {/* Small accent dots */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 360) / 8;
          const radius = 150;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.3 + 2,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(${x}px, ${y}px)`,
              }}
              className="w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"
            />
          );
        })}

        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-purple-300/40 to-pink-300/40 rounded-full blur-2xl animate-pulse-slow"></div>
      </motion.div>

      {/* Additional ambient light effects */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-purple-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-pink-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
    </div>
  );
}
