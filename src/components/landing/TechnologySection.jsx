import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function TechnologySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const techStack = [
    {
      number: "01",
      title: "Body Mapping",
      description: "Click any body part to record pain and symptoms",
      image: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=800&h=600&fit=crop&q=80"
    },
    {
      number: "02",
      title: "AI Diagnosis",
      description: "Advanced AI analyzes text and images instantly",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80"
    },
    {
      number: "03",
      title: "Symptom Tracking",
      description: "Monitor pain patterns and intensity over time",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop&q=80"
    },
    {
      number: "04",
      title: "Privacy First",
      description: "Your health data never leaves your device",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop&q=80"
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
            <h2 className="font-display text-5xl lg:text-7xl xl:text-8xl font-black text-dark-charcoal mb-8 leading-tight">
              How it works
            </h2>
          </div>

          {/* Technology Stack Grid */}
          <div className="grid md:grid-cols-2 gap-10">
            {techStack.map((tech, index) => {
              return (
                <motion.div
                  key={tech.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="relative bg-cream/90 backdrop-blur-sm rounded-3xl shadow-card-soft hover:shadow-card-hover hover:scale-[1.02] transition-all duration-300 border-2 border-[#C0C0C0] overflow-hidden"
                >
                  {/* Step Number */}
                  <div className="absolute top-6 left-6 text-6xl lg:text-7xl font-black text-white z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                    {tech.number}
                  </div>

                  {/* Image */}
                  <div className="relative w-full h-64 overflow-hidden">
                    <img
                      src={tech.image}
                      alt={tech.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cream/90 via-cream/40 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-10 pt-6">
                    {/* Title */}
                    <h3 className="font-display text-4xl lg:text-5xl font-black text-dark-charcoal mb-4">{tech.title}</h3>

                    {/* Description */}
                    <p className="text-xl lg:text-2xl text-text-primary leading-relaxed font-semibold">{tech.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
