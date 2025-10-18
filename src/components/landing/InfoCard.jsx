import { motion } from 'framer-motion';

export default function InfoCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative px-8 md:px-12 lg:px-32 py-20"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-12 transition-all duration-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          <div className="grid md:grid-cols-[200px_1fr] gap-12">
            {/* Left - Number Display */}
            <div className="space-y-2">
              <div className="text-[120px] font-extrabold leading-none text-black">
                01
              </div>
              <div className="text-sm text-gray-400 tracking-wide">
                2022-08-30
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-6">
              <div className="text-xs text-gray-400 uppercase tracking-widest">
                2022-08-30
              </div>

              <h2 className="text-2xl md:text-3xl font-semibold text-black leading-tight">
                First Central Laboratory in Clinical Research
              </h2>

              <p className="text-base text-gray-600 leading-[1.7] max-w-xl">
                InstaCare is a Global Clinical Research Central Laboratory dedicated to
                providing innovative diagnostic solutions. We combine cutting-edge AI
                technology with medical expertise to deliver accurate, timely health
                assessments that help people make informed decisions about their wellbeing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
