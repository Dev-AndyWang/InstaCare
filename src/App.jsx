import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import DiagnosisApp from './pages/DiagnosisApp';
import DiagnosisResults from './pages/DiagnosisResults';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'diagnosis', or 'results'
  const [diagnosisData, setDiagnosisData] = useState(null);
  const [diagnosisLoading, setDiagnosisLoading] = useState(false);
  const [diagnosisError, setDiagnosisError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  const handleGetStarted = () => {
    setCurrentView('diagnosis');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    // Clear diagnosis data when going back to landing
    setDiagnosisData(null);
    setDiagnosisError(null);
  };

  const handleBackToDiagnosis = () => {
    setCurrentView('diagnosis');
  };

  const handleViewResults = (data, loading, error) => {
    setDiagnosisData(data);
    setDiagnosisLoading(loading);
    setDiagnosisError(error);
    setCurrentView('results');
  };

  return (
    <AnimatePresence mode="wait">
      {currentView === 'landing' && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage
            onGetStarted={handleGetStarted}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </motion.div>
      )}

      {currentView === 'diagnosis' && (
        <motion.div
          key="diagnosis"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DiagnosisApp
            onBackToLanding={handleBackToLanding}
            onViewResults={handleViewResults}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </motion.div>
      )}

      {currentView === 'results' && (
        <motion.div
          key="results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DiagnosisResults
            diagnosisData={diagnosisData}
            loading={diagnosisLoading}
            error={diagnosisError}
            onBackToDiagnosis={handleBackToDiagnosis}
            onBackToLanding={handleBackToLanding}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
