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
            <h2 className="font-display text-5xl lg:text-7xl xl:text-8xl font-black text-dark-charcoal mb-8 leading-tight">
              What you get
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const iconBackgrounds = [
                'bg-[#EC4899]',   // Pain Mapping: bright pink
                'bg-[#3B82F6]',   // AI Diagnosis: bright blue
                'bg-[#F97316]',   // Image Analysis: bright orange
                'bg-[#A855F7]',   // Health Reports: bright purple
                'bg-[#EC4899]',   // Track Progress: bright pink
                'bg-[#A855F7]'    // Expert Care: bright purple
              ];

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className="group bg-cream rounded-3xl p-10 border-2 border-[#C0C0C0] shadow-card-soft hover:shadow-card-medium transition-all duration-300"
                >
                  {/* Icon */}
                  <div className={`w-24 h-24 rounded-2xl ${iconBackgrounds[index]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="w-12 h-12 text-white stroke-[2.5] drop-shadow-sm" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-3xl lg:text-4xl font-black text-dark-charcoal mb-4">{service.title}</h3>

                  {/* Description */}
                  <p className="text-xl text-text-primary leading-relaxed font-semibold">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
