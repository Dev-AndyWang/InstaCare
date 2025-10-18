import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import DiagnosisApp from './pages/DiagnosisApp';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' or 'diagnosis'

  const handleGetStarted = () => {
    setCurrentView('diagnosis');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  return (
    <AnimatePresence mode="wait">
      {currentView === 'landing' ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage onGetStarted={handleGetStarted} />
        </motion.div>
      ) : (
        <motion.div
          key="diagnosis"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DiagnosisApp onBackToLanding={handleBackToLanding} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
