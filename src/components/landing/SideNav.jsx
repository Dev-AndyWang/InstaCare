import { motion } from 'framer-motion';

export default function SideNav({ activeSection }) {
  const sections = [
    { id: 'intro', label: 'Intro' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'technology', label: 'Technology' },
    { id: 'services', label: 'Services' },
    { id: 'contacts', label: 'Contacts' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="fixed left-8 lg:left-12 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
    >
      <div className="relative flex flex-col gap-8">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-gray-200 via-purple-200 to-gray-200"></div>

        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            onClick={() => scrollToSection(section.id)}
            className="relative pl-6 text-sm font-medium transition-all duration-300 hover:text-gray-900 text-left group"
          >
            {/* Active indicator dot */}
            {activeSection === section.id && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            <span
              className={`transition-all duration-300 ${
                activeSection === section.id
                  ? 'text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold text-base scale-110 inline-block'
                  : 'text-gray-400'
              }`}
            >
              {section.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}
