import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Brain, TrendingUp, Shield } from 'lucide-react';

export default function TechnologySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const techStack = [
    {
      number: "01",
      title: "Body Mapping",
      description: "Click any body part to record pain and symptoms",
      icon: MapPin
    },
    {
      number: "02",
      title: "AI Diagnosis",
      description: "Advanced AI analyzes text and images instantly",
      icon: Brain
    },
    {
      number: "03",
      title: "Symptom Tracking",
      description: "Monitor pain patterns and intensity over time",
      icon: TrendingUp
    },
    {
      number: "04",
      title: "Privacy First",
      description: "Your health data never leaves your device",
      icon: Shield
    }
  ];

  return (
    <section id="technology" ref={ref} className="relative py-24 lg:py-32 bg-pink-100/30">

      <div className="relative max-w-[1200px] mx-auto px-8 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Headline */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="font-display text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-8 leading-tight">
              How it works
            </h2>
          </div>

          {/* Technology Stack Grid */}
          <div className="grid md:grid-cols-2 gap-10">
            {techStack.map((tech, index) => {
              const borderColors = [
                'border-purple-300/40 hover:border-purple-400/50',
                'border-blue-300/40 hover:border-blue-400/50',
                'border-pink-300/40 hover:border-pink-400/50',
                'border-cyan-300/40 hover:border-cyan-400/50'
              ];
              const gradients = [
                'from-purple-500 to-pink-500',
                'from-blue-500 to-cyan-500',
                'from-pink-500 to-orange-500',
                'from-cyan-500 to-purple-500'
              ];

              const IconComponent = tech.icon;

              return (
                <motion.div
                  key={tech.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-10 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-2 ${borderColors[index]}`}
                >
                  {/* Number and Icon */}
                  <div className="flex items-center gap-12 mb-6">
                    <div className="text-8xl lg:text-9xl font-black text-gray-900">
                      {tech.number}
                    </div>
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <IconComponent className="w-10 h-10 text-white stroke-[2.5]" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-3xl lg:text-4xl font-black text-gray-900 mb-4">{tech.title}</h3>

                  {/* Description */}
                  <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium">{tech.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
