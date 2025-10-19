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
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Built by experts
            </h2>
            <p className="text-2xl lg:text-3xl text-gray-600 leading-relaxed">
              AI-powered diagnostics. Privacy-first design.
            </p>
          </div>

          {/* Key features with borders */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center space-y-4 bg-white backdrop-blur-sm border-2 border-purple-300/40 rounded-2xl p-8 hover:border-purple-400/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Check className="w-10 h-10 text-white stroke-[3]" />
              </div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">Advanced AI</h3>
              <p className="text-xl text-gray-700 font-medium">Claude Sonnet 4.5 powers our diagnosis engine</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center space-y-4 bg-white backdrop-blur-sm border-2 border-pink-300/40 rounded-2xl p-8 hover:border-pink-400/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Check className="w-10 h-10 text-white stroke-[3]" />
              </div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">Image Analysis</h3>
              <p className="text-xl text-gray-700 font-medium">Upload photos for visual symptom assessment</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center space-y-4 bg-white backdrop-blur-sm border-2 border-blue-300/40 rounded-2xl p-8 hover:border-blue-400/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <Check className="w-10 h-10 text-white stroke-[3]" />
              </div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">Your Privacy</h3>
              <p className="text-xl text-gray-700 font-medium">All data stays on your device</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
