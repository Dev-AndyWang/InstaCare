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
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              The team
            </h2>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 text-center"
              >
                {/* Profile Circle */}
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                  <span className="text-3xl font-bold text-white">{member.initials}</span>
                </div>

                {/* Name */}
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{member.name}</h3>

                {/* Role */}
                <p className="text-lg text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-br from-purple-100/80 via-pink-100/70 to-blue-100/60 backdrop-blur-sm rounded-3xl p-12 lg:p-16 text-center shadow-lg border border-purple-200/50">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Get in touch</h3>
              <p className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed">
                Questions? We're here to help.
              </p>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full text-xl font-bold hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-105 transition-all duration-300 shadow-lg">
                Contact Us
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
