import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function InfoCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-purple-100/30">

      <div className="relative max-w-[1200px] mx-auto px-8 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-[0_2px_40px_rgba(0,0,0,0.04)] p-12 lg:p-16 hover:shadow-[0_4px_60px_rgba(0,0,0,0.06)] transition-all duration-500 text-center"
        >
          {/* Centered Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 max-w-4xl mx-auto"
          >
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
              Your health matters
            </h2>

            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed whitespace-nowrap">
              Don't wait. Map your symptoms and get AI-powered insights today.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
