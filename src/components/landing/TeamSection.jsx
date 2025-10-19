import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail } from 'lucide-react';

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const teamMembers = [
    {
      name: "Andy Wang",
      role: "Lead Developer",
      initials: "AW"
    },
    {
      name: "Cayden Granado",
      role: "Full-Stack Engineer",
      initials: "CG"
    },
    {
      name: "William Nguyen",
      role: "Systems Architect",
      initials: "WN"
    },
    {
      name: "Jasmine Bui",
      role: "Product Designer",
      initials: "JB"
    },
    {
      name: "Jayden Dhaliwal",
      role: "AI Specialist",
      initials: "JD"
    }
  ];

  return (
    <section id="contacts" ref={ref} className="relative py-24 lg:py-32 bg-blue-100/30">

      <div className="relative max-w-[1200px] mx-auto px-8 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Headline */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-5xl lg:text-7xl xl:text-8xl font-black text-dark-charcoal mb-8 leading-tight">
              The team
            </h2>
          </div>

          {/* Team Grid */}
          <div className="mb-20">
            {/* Top Row - 3 Members */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
              {teamMembers.slice(0, 3).map((member, index) => {
                const avatarColors = [
                  'bg-[#EC4899]',   // Andy Wang: bright pink
                  'bg-[#A855F7]',   // Cayden Granado: bright purple
                  'bg-[#3B82F6]'    // William Nguyen: bright blue
                ];

                return (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                    className="bg-cream rounded-2xl p-8 shadow-card-soft hover:shadow-card-medium hover:scale-[1.02] transition-all duration-300 border-2 border-[#C0C0C0] text-center"
                  >
                    {/* Profile Circle */}
                    <div className={`w-24 h-24 mx-auto rounded-full ${avatarColors[index]} flex items-center justify-center mb-6 shadow-lg`}>
                      <span className="text-3xl font-bold text-white drop-shadow-sm">{member.initials}</span>
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl lg:text-3xl font-black text-dark-charcoal mb-2">{member.name}</h3>

                    {/* Role */}
                    <p className="text-lg text-text-primary font-semibold">{member.role}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Row - 2 Members Centered */}
            <div className="grid md:grid-cols-2 gap-10 max-w-3xl mx-auto">
              {teamMembers.slice(3, 5).map((member, index) => {
                const avatarColors = [
                  'bg-[#F97316]',   // Jasmine Bui: bright orange
                  'bg-[#06B6D4]'    // Jayden Dhaliwal: bright cyan
                ];

                return (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="bg-cream rounded-2xl p-8 shadow-card-soft hover:shadow-card-medium hover:scale-[1.02] transition-all duration-300 border-2 border-[#C0C0C0] text-center"
                  >
                    {/* Profile Circle */}
                    <div className={`w-24 h-24 mx-auto rounded-full ${avatarColors[index]} flex items-center justify-center mb-6 shadow-lg`}>
                      <span className="text-3xl font-bold text-white drop-shadow-sm">{member.initials}</span>
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl lg:text-3xl font-black text-dark-charcoal mb-2">{member.name}</h3>

                    {/* Role */}
                    <p className="text-lg text-text-primary font-semibold">{member.role}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-cream backdrop-blur-sm rounded-3xl p-12 lg:p-16 text-center shadow-card-medium border-2 border-[#C0C0C0]">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#A855F7] flex items-center justify-center shadow-lg">
                <Mail className="w-8 h-8 text-white drop-shadow-sm" />
              </div>
              <h3 className="text-4xl lg:text-6xl font-black mb-6 text-dark-charcoal">Get in touch</h3>
              <p className="text-xl lg:text-2xl text-text-primary mb-8 leading-relaxed font-semibold">
                Questions? We're here to help.
              </p>
              <button className="bg-cream border-2 border-[#E6D5FF] text-dark-charcoal px-10 py-4 rounded-full text-xl font-bold hover:shadow-glow-lavender-lg hover:scale-105 transition-all duration-300 shadow-button-soft">
                Contact Us
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
