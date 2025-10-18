import { useState, useEffect } from 'react';
import './App.css';
import MaleBodyFront from './components/MaleBodyFront';
import MaleBodyBack from './components/MaleBodyBack';
import PainDetailsModal from './components/PainDetailsModal';
import DiagnosisModal from './components/DiagnosisModal';
import { generateDiagnosis } from './utils/aiService';

function App() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            InstaCare - Medical AI Diagnosis
          </h1>
          <p className="text-gray-600 mt-1">
            Click on body parts to map and track your pain points
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h2>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Gender Selection */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setGender('Male')}
                    className={`px-6 py-3 rounded-lg border-2 font-semibold transition-all ${
                      gender === 'Male'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('Female')}
                    className={`px-6 py-3 rounded-lg border-2 font-semibold transition-all ${
                      gender === 'Female'
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Age Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  min="0"
                  max="150"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Body Diagrams */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Body Diagram</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Front View */}
              <div>
                <h3 className="text-center text-lg font-semibold text-gray-700 mb-4 bg-gray-100 py-2 rounded-lg">
                  Front View
                </h3>
                <div className="flex justify-center">
                  {gender === 'Male' ? (
                    <MaleBodyFront
                      painPoints={painPoints}
                      onBodyPartClick={handleBodyPartClick}
                    />
                  ) : (
                    <MaleBodyFront
                      painPoints={painPoints}
                      onBodyPartClick={handleBodyPartClick}
                    />
                  )}
                </div>
              </div>

              {/* Back View */}
              <div>
                <h3 className="text-center text-lg font-semibold text-gray-700 mb-4 bg-gray-100 py-2 rounded-lg">
                  Back View
                </h3>
                <div className="flex justify-center">
                  {gender === 'Male' ? (
                    <MaleBodyBack
                      painPoints={painPoints}
                      onBodyPartClick={handleBodyPartClick}
                    />
                  ) : (
                    <MaleBodyBack
                      painPoints={painPoints}
                      onBodyPartClick={handleBodyPartClick}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pain Points Summary */}
          {painPoints.length > 0 && (
            <div className="mb-8 p-6 bg-orange-50 border-2 border-orange-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
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
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleGetDiagnosis}
              disabled={painPoints.length === 0 || diagnosisLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              {diagnosisLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  🩺 Get AI Diagnosis
                </>
              )}
            </button>
            <button
              onClick={handleClearAll}
              disabled={painPoints.length === 0}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
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

export default App;
