import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Calendar, Sparkles, Trash2 } from 'lucide-react';
import '../App.css';
import MaleBodyFront from '../components/MaleBodyFront';
import PainDetailsForm from '../components/PainDetailsForm';
import { generateDiagnosis } from '../utils/aiService';
import LanguageSelector from '../components/LanguageSelector';

export default function DiagnosisApp({ onBackToLanding, onViewResults, selectedLanguage, onLanguageChange }) {
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('');
  const [painPoints, setPainPoints] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [selectedBodyPartName, setSelectedBodyPartName] = useState('');

  // Load pain points from localStorage
  useEffect(() => {
    const savedPainPoints = localStorage.getItem('painPoints');
    if (savedPainPoints) {
      setPainPoints(JSON.parse(savedPainPoints));
    }
  }, []);

  // Save pain points to localStorage whenever they change
  useEffect(() => {
    if (painPoints.length > 0) {
      localStorage.setItem('painPoints', JSON.stringify(painPoints));
    }
  }, [painPoints]);

  const handleBodyPartClick = (bodyPartId, bodyPartName, view) => {
    // Simply select the body part to show/edit its form
    setSelectedBodyPart(bodyPartId);
    setSelectedBodyPartName(bodyPartName);
  };

  const handleSavePainPoint = (painData) => {
    // Check if this body part already has a pain point
    const existingPoint = painPoints.find(p => p.bodyPartId === painData.bodyPartId);

    if (existingPoint) {
      // Update existing pain point
      setPainPoints(painPoints.map(p =>
        p.bodyPartId === painData.bodyPartId ? painData : p
      ));
    } else {
      // Add new pain point
      setPainPoints([...painPoints, painData]);
    }
  };

  const handleClearPainPoint = (bodyPartId) => {
    setPainPoints(painPoints.filter(p => p.bodyPartId !== bodyPartId));
    // Reset selection after clearing
    setSelectedBodyPart(null);
    setSelectedBodyPartName('');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all pain points? This action cannot be undone.')) {
      setPainPoints([]);
      localStorage.removeItem('painPoints');
    }
  };

  const handleGetDiagnosis = async () => {
    if (painPoints.length === 0) {
      alert('Please mark at least one pain point on the body diagram before getting a diagnosis.');
      return;
    }

    // Navigate to results page immediately and show loading state
    onViewResults(null, true, null);

    try {
      const result = await generateDiagnosis({
        age,
        gender,
        painPoints
      });

      // Update results page with diagnosis data
      onViewResults(result.diagnosis, false, null);
    } catch (error) {
      // Update results page with error
      onViewResults(null, false, error.message);
    }
  };

  const handleExportReport = () => {
    const report = {
      exportDate: new Date().toISOString(),
      gender,
      age: age || 'Not specified',
      totalPainPoints: painPoints.length,
      painPoints: painPoints.map(p => ({
        bodyPart: p.bodyPartName,
        view: p.view,
        suspectedCause: p.suspectedCause,
        painType: p.painType,
        intensity: p.intensity,
        sensation: p.sensation,
        duration: p.duration,
        otherSymptoms: p.otherSymptoms
      }))
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pain-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFD5E5] via-[#E6D5FF] via-[#D5E8FF] via-[#FFF4D5] to-[#FFDFD5]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b-2 border-purple-100">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={onBackToLanding}
                className="p-3 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 rounded-full transition-all duration-300 group"
                aria-label="Back to landing page"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700 group-hover:text-purple-700 transition-colors" />
              </button>
              <div>
                <h1 className="text-4xl lg:text-5xl font-black text-dark-charcoal">
                  InstaCare AI Diagnosis
                </h1>
                <p className="text-warm-gray mt-1 text-base lg:text-lg font-semibold">
                  Click on body parts to map and track your symptoms
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={onLanguageChange}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-8 lg:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-card-medium border-2 border-border-light p-8 lg:p-12"
        >
          {/* Personal Information */}
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-black text-dark-charcoal mb-6">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Gender Selection */}
              <div>
                <label className="flex items-center gap-2 text-lg font-bold text-warm-charcoal mb-4">
                  <User className="w-5 h-5 text-gray-500" />
                  Gender
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setGender('Male')}
                    className={`flex-1 px-6 py-4 rounded-2xl border-2 font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                      gender === 'Male'
                        ? 'border-transparent bg-[#A8C5DD] text-gray-800 shadow-md'
                        : 'border-gray-300 bg-white hover:border-gray-400 text-gray-700 hover:shadow-md'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('Female')}
                    className={`flex-1 px-6 py-4 rounded-2xl border-2 font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                      gender === 'Female'
                        ? 'border-transparent bg-[#F4C4D0] text-gray-800 shadow-md'
                        : 'border-gray-300 bg-white hover:border-gray-400 text-gray-700 hover:shadow-md'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Age Input */}
              <div>
                <label className="flex items-center gap-2 text-lg font-bold text-warm-charcoal mb-4">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  min="0"
                  max="150"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl text-lg font-semibold focus:ring-4 focus:ring-gray-200 focus:border-gray-400 transition-all duration-300 placeholder:text-gray-400 hover:border-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Pain Details and Body Diagram - Side by Side */}
          <div className="mb-0">
            <div className="mb-6">
              <h2 className="text-4xl lg:text-5xl font-black text-dark-charcoal mb-3">Pain Assessment</h2>
              <p className="text-warm-gray text-lg font-semibold">
                Click on any body part on the diagram to add or edit pain details.
              </p>
            </div>

            {/* Two Column Layout: Form LEFT, Diagram RIGHT */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* LEFT SIDE: Pain Details Form */}
              <div>
                <PainDetailsForm
                  bodyPart={selectedBodyPart}
                  bodyPartName={selectedBodyPartName}
                  existingData={selectedBodyPart ? painPoints.find(p => p.bodyPartId === selectedBodyPart) : null}
                  onSave={handleSavePainPoint}
                  onClear={handleClearPainPoint}
                />
              </div>

              {/* RIGHT SIDE: Body Diagram */}
              <div>
                <div className="mb-6">
                  <h3 className={`text-center text-xl font-black mb-4 py-3 rounded-2xl shadow-md ${
                    gender === 'Male'
                      ? 'bg-[#A8C5DD] text-gray-800'
                      : 'bg-[#F4C4D0] text-gray-800'
                  }`}>
                    Body Diagram
                  </h3>
                  {/* Legend */}
                  <div className="flex flex-wrap gap-4 text-sm justify-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded border-2 border-dashed border-gray-400"></div>
                      <span className="text-gray-600 font-medium">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#FDE047] border-2 border-yellow-500"></div>
                      <span className="text-gray-600 font-medium">Mild (1-3)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#FB923C] border-2 border-orange-500"></div>
                      <span className="text-gray-600 font-medium">Moderate (4-6)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#EF4444] border-2 border-red-500"></div>
                      <span className="text-gray-600 font-medium">Severe (7-10)</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <MaleBodyFront
                    painPoints={painPoints}
                    onBodyPartClick={handleBodyPartClick}
                    selectedBodyPart={selectedBodyPart}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pain Points Summary */}
          {painPoints.length > 0 && (
            <div className="mb-12 p-8 bg-[#F4E5A1]/30 border-2 border-gray-300 rounded-2xl shadow-card-medium">
              <h3 className="text-3xl lg:text-4xl font-black text-dark-charcoal mb-6">
                Current Pain Points ({painPoints.length})
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {painPoints.map((point) => (
                  <div
                    key={point.bodyPartId}
                    onClick={() => handleBodyPartClick(point.bodyPartId, point.bodyPartName, point.view)}
                    className="p-4 bg-white rounded-lg border-2 border-border-medium hover:border-[#B8D4A8] cursor-pointer transition-all shadow-card-soft hover:shadow-card-medium"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-warm-charcoal text-lg">{point.bodyPartName}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        point.intensity <= 3 ? 'bg-yellow-200 text-yellow-800' :
                        point.intensity <= 6 ? 'bg-orange-200 text-orange-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {point.intensity}/10
                      </span>
                    </div>
                    <div className="text-base text-text-primary space-y-1">
                      <p><span className="font-semibold">Type:</span> {point.painType}</p>
                      <p><span className="font-semibold">Sensation:</span> {point.sensation}</p>
                      <p><span className="font-semibold">Duration:</span> {point.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-6">
            <button
              onClick={handleGetDiagnosis}
              disabled={painPoints.length === 0}
              className="group relative px-10 py-5 bg-[#FBBF24] text-gray-900 rounded-2xl text-xl font-black tracking-wide uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none flex items-center gap-3"
            >
              <Sparkles className="w-7 h-7" />
              <span>Get AI Diagnosis</span>
            </button>
            <button
              onClick={handleClearAll}
              disabled={painPoints.length === 0}
              className="px-8 py-5 bg-white border-2 border-gray-300 text-gray-600 rounded-2xl text-lg font-bold hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-3 hover:scale-105 active:scale-95 disabled:hover:scale-100 shadow-button-soft"
            >
              <Trash2 className="w-6 h-6" />
              <span>Clear All</span>
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
