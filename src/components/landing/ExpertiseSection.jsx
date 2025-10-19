import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';

export default function ExpertiseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    "AI-Powered Analysis: Utilizing Claude Sonnet 4.5, one of the most advanced language models, for nuanced symptom interpretation",
    "Multimodal Diagnostics: Combining text descriptions with visual image analysis for comprehensive assessments",
    "Interactive Experience: Intuitive body mapping interface that makes tracking symptoms simple and precise",
    "Privacy-First: Your health data stays on your device—we prioritize your privacy and security"
  ];

  return (
    <section id="expertise" ref={ref} className="relative py-24 lg:py-32 bg-white/30">

      <div className="relative max-w-[1200px] mx-auto px-8 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Headline */}
          <div className="text-center max-w-5xl mx-auto mb-16">
            <h2 className="text-5xl lg:text-7xl xl:text-8xl font-black text-dark-charcoal mb-8 leading-tight">
              Built by experts
            </h2>
            <p className="text-2xl lg:text-3xl text-warm-gray leading-relaxed font-semibold">
              AI-powered diagnostics. Privacy-first design.
            </p>
          </div>

          {/* Key features with borders */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center space-y-4 bg-cream backdrop-blur-sm border-2 border-[#C0C0C0] rounded-2xl p-8 shadow-card-soft hover:shadow-card-medium transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#A855F7] to-[#9333EA] flex items-center justify-center shadow-lg">
                <Check className="w-10 h-10 text-white stroke-[3] drop-shadow-sm" />
              </div>
              <h3 className="font-display text-3xl lg:text-4xl font-black text-dark-charcoal">Advanced AI</h3>
              <p className="text-xl text-text-primary font-semibold">Claude Sonnet 4.5 powers our diagnosis engine</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center space-y-4 bg-cream backdrop-blur-sm border-2 border-[#C0C0C0] rounded-2xl p-8 shadow-card-soft hover:shadow-card-medium transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center shadow-lg">
                <Check className="w-10 h-10 text-white stroke-[3] drop-shadow-sm" />
              </div>
              <h3 className="font-display text-3xl lg:text-4xl font-black text-dark-charcoal">Image Analysis</h3>
              <p className="text-xl text-text-primary font-semibold">Upload photos for visual symptom assessment</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center space-y-4 bg-cream backdrop-blur-sm border-2 border-[#C0C0C0] rounded-2xl p-8 shadow-card-soft hover:shadow-card-medium transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#FB923C] to-[#F97316] flex items-center justify-center shadow-lg">
                <Check className="w-10 h-10 text-white stroke-[3] drop-shadow-sm" />
              </div>
              <h3 className="font-display text-3xl lg:text-4xl font-black text-dark-charcoal">Your Privacy</h3>
              <p className="text-xl text-text-primary font-semibold">All data stays on your device</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
