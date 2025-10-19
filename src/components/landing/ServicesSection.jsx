import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Brain, Camera, FileText, TrendingUp, Heart } from 'lucide-react';

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: MapPin,
      title: "Pain Mapping",
      description: "Click body parts to record symptoms"
    },
    {
      icon: Brain,
      title: "AI Diagnosis",
      description: "Get instant health insights"
    },
    {
      icon: Camera,
      title: "Image Analysis",
      description: "Upload photos for visual assessment"
    },
    {
      icon: FileText,
      title: "Health Reports",
      description: "Export detailed medical summaries"
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor symptoms over time"
    },
    {
      icon: Heart,
      title: "Expert Care",
      description: "Know when to see a doctor"
    }
  ];

  return (
    <section id="services" ref={ref} className="relative py-24 lg:py-32 bg-white/30">

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
              What you get
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const borderColors = [
                'border-purple-300/40 hover:border-purple-400/50',
                'border-blue-300/40 hover:border-blue-400/50',
                'border-pink-300/40 hover:border-pink-400/50',
                'border-cyan-300/40 hover:border-cyan-400/50',
                'border-orange-300/40 hover:border-orange-400/50',
                'border-purple-300/40 hover:border-purple-400/50'
              ];
              const iconGradients = [
                'from-purple-500 to-pink-500',
                'from-blue-500 to-cyan-500',
                'from-pink-500 to-orange-500',
                'from-cyan-500 to-purple-500',
                'from-orange-500 to-pink-500',
                'from-purple-500 to-blue-500'
              ];

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className={`group bg-white rounded-3xl p-10 border-2 ${borderColors[index]} hover:shadow-xl transition-all duration-300`}
                >
                  {/* Icon */}
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${iconGradients[index]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="w-12 h-12 text-white stroke-[2.5]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>

                  {/* Description */}
                  <p className="text-xl text-gray-700 leading-relaxed font-medium">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
