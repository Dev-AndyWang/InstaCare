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
          className="bg-cream/80 backdrop-blur-sm rounded-3xl shadow-card-medium border-2 border-[#C0C0C0] hover:shadow-card-hover transition-all duration-500 text-center p-12 lg:p-16"
        >
          {/* Centered Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 max-w-6xl mx-auto"
          >
            <h2 className="text-5xl lg:text-7xl xl:text-8xl font-black text-dark-charcoal leading-tight whitespace-nowrap">
              Your health matters
            </h2>

            <p className="text-2xl lg:text-3xl text-warm-gray leading-relaxed font-medium whitespace-nowrap">
              Don't wait. Map your symptoms and get AI-powered insights today.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
