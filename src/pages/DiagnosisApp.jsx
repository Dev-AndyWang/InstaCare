import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Calendar, Sparkles, Trash2 } from 'lucide-react';
import '../App.css';
import MaleBodyFront from '../components/MaleBodyFront';
import MaleBodyBack from '../components/MaleBodyBack';
import PainDetailsModal from '../components/PainDetailsModal';
import DiagnosisModal from '../components/DiagnosisModal';
import { generateDiagnosis } from '../utils/aiService';

export default function DiagnosisApp({ onBackToLanding }) {
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('');
  const [painPoints, setPainPoints] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [selectedBodyPartName, setSelectedBodyPartName] = useState('');
  const [selectedView, setSelectedView] = useState('front');
  const [editingPoint, setEditingPoint] = useState(null);
  const [diagnosisData, setDiagnosisData] = useState(null);
  const [diagnosisLoading, setDiagnosisLoading] = useState(false);
  const [diagnosisError, setDiagnosisError] = useState(null);
  const [showDiagnosis, setShowDiagnosis] = useState(false);

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
    // Check if this body part already has a pain point
    const existingPoint = painPoints.find(p => p.bodyPartId === bodyPartId);

    if (existingPoint) {
      // Edit existing pain point
      setEditingPoint(existingPoint);
      setSelectedBodyPart(bodyPartId);
      setSelectedBodyPartName(bodyPartName);
      setSelectedView(view);
      setModalOpen(true);
    } else {
      // Add new pain point
      setSelectedBodyPart(bodyPartId);
      setSelectedBodyPartName(bodyPartName);
      setSelectedView(view);
      setEditingPoint(null);
      setModalOpen(true);
    }
  };

  const handleSavePainPoint = (painData) => {
    if (editingPoint) {
      // Update existing pain point
      setPainPoints(painPoints.map(p =>
        p.bodyPartId === painData.bodyPartId ? painData : p
      ));
    } else {
      // Add new pain point
      setPainPoints([...painPoints, painData]);
    }
    setModalOpen(false);
    setEditingPoint(null);
  };

  const handleDeletePainPoint = (bodyPartId) => {
    setPainPoints(painPoints.filter(p => p.bodyPartId !== bodyPartId));
    setModalOpen(false);
    setEditingPoint(null);
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

    setDiagnosisLoading(true);
    setDiagnosisError(null);
    setShowDiagnosis(true);

    try {
      const result = await generateDiagnosis({
        age,
        gender,
        painPoints
      });

      setDiagnosisData(result.diagnosis);
    } catch (error) {
      setDiagnosisError(error.message);
    } finally {
      setDiagnosisLoading(false);
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
    <div className="min-h-screen bg-gradient-to-br from-[#E5D9F2] via-[#F5E6FF] via-[#FFE5F1] via-[#E5E5FF] to-[#F0E6FF]">
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
                <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  InstaCare AI Diagnosis
                </h1>
                <p className="text-gray-600 mt-1 text-sm lg:text-base font-medium">
                  Click on body parts to map and track your symptoms
                </p>
              </div>
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
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 lg:p-12"
        >
          {/* Personal Information */}
          <div className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-6">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Gender Selection */}
              <div>
                <label className="flex items-center gap-2 text-base font-bold text-gray-700 mb-4">
                  <User className="w-5 h-5 text-purple-600" />
                  Gender
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setGender('Male')}
                    className={`flex-1 px-6 py-4 rounded-2xl border-2 font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                      gender === 'Male'
                        ? 'border-transparent bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-300/50'
                        : 'border-gray-300 bg-white hover:border-blue-400 text-gray-700 hover:shadow-md'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('Female')}
                    className={`flex-1 px-6 py-4 rounded-2xl border-2 font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                      gender === 'Female'
                        ? 'border-transparent bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-300/50'
                        : 'border-gray-300 bg-white hover:border-pink-400 text-gray-700 hover:shadow-md'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Age Input */}
              <div>
                <label className="flex items-center gap-2 text-base font-bold text-gray-700 mb-4">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  min="0"
                  max="150"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl text-lg font-semibold focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 placeholder:text-gray-400 hover:border-purple-300"
                />
              </div>
            </div>
          </div>

          {/* Body Diagrams */}
          <div className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-6">Body Diagram</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Front View */}
              <div>
                <h3 className={`text-center text-xl font-black text-white mb-4 py-3 rounded-2xl shadow-lg ${
                  gender === 'Male'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                    : 'bg-gradient-to-r from-pink-500 to-purple-500'
                }`}>
                  Front View
                </h3>
                <div className="flex justify-center">
                  <MaleBodyFront
                    painPoints={painPoints}
                    onBodyPartClick={handleBodyPartClick}
                  />
                </div>
              </div>

              {/* Back View */}
              <div>
                <h3 className={`text-center text-xl font-black text-white mb-4 py-3 rounded-2xl shadow-lg ${
                  gender === 'Male'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                    : 'bg-gradient-to-r from-pink-500 to-purple-500'
                }`}>
                  Back View
                </h3>
                <div className="flex justify-center">
                  <MaleBodyBack
                    painPoints={painPoints}
                    onBodyPartClick={handleBodyPartClick}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pain Points Summary */}
          {painPoints.length > 0 && (
            <div className="mb-12 p-8 bg-gradient-to-br from-orange-50/80 to-pink-50/80 border-2 border-orange-200/50 rounded-2xl shadow-lg">
              <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-6">
                Current Pain Points ({painPoints.length})
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {painPoints.map((point) => (
                  <div
                    key={point.bodyPartId}
                    onClick={() => handleBodyPartClick(point.bodyPartId, point.bodyPartName, point.view)}
                    className="p-4 bg-white rounded-lg border border-gray-300 hover:border-orange-500 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{point.bodyPartName}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        point.intensity <= 3 ? 'bg-yellow-200 text-yellow-800' :
                        point.intensity <= 6 ? 'bg-orange-200 text-orange-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {point.intensity}/10
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Type:</span> {point.painType}</p>
                      <p><span className="font-medium">Sensation:</span> {point.sensation}</p>
                      <p><span className="font-medium">Duration:</span> {point.duration}</p>
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
              disabled={painPoints.length === 0 || diagnosisLoading}
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-2xl text-xl font-black tracking-wide uppercase transition-all duration-300 shadow-[0_10px_40px_rgba(139,92,246,0.4)] hover:shadow-[0_15px_60px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none flex items-center gap-3"
            >
              {diagnosisLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  <span>Get AI Diagnosis</span>
                </>
              )}
            </button>
            <button
              onClick={handleClearAll}
              disabled={painPoints.length === 0}
              className="px-8 py-5 bg-white border-2 border-red-300 text-red-600 rounded-2xl text-lg font-bold hover:bg-red-50 hover:border-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-3 hover:scale-105 active:scale-95 disabled:hover:scale-100"
            >
              <Trash2 className="w-5 h-5" />
              <span>Clear All</span>
            </button>
          </div>
        </motion.div>
      </main>

      {/* Pain Details Modal */}
      <PainDetailsModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingPoint(null);
        }}
        onSave={handleSavePainPoint}
        onDelete={handleDeletePainPoint}
        bodyPart={selectedBodyPart}
        bodyPartName={selectedBodyPartName}
        view={selectedView}
        existingData={editingPoint}
      />

      {/* Diagnosis Results Modal */}
      <DiagnosisModal
        isOpen={showDiagnosis}
        onClose={() => setShowDiagnosis(false)}
        diagnosisData={diagnosisData}
        loading={diagnosisLoading}
        error={diagnosisError}
      />
    </div>
  );
}
