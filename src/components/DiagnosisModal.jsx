export default function DiagnosisModal({ isOpen, onClose, diagnosisData, loading, error }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const parseDiagnosis = (text) => {
    if (!text) return null;

    // Split into sections by the horizontal dividers
    const sections = text.split('---').map(s => s.trim());

    return {
      rawText: text,
      sections: sections
    };
  };

  const parsed = parseDiagnosis(diagnosisData);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-2xl font-bold text-gray-900">
            🩺 AI Health Analysis
          </h2>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              🖨️ Print
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-lg font-medium text-gray-700">Analyzing your symptoms...</p>
              <p className="mt-2 text-sm text-gray-500">This may take a few moments</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h3 className="font-semibold text-red-900 text-lg">Error</h3>
                  <p className="text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && parsed && (
            <div className="space-y-6">
              {/* Disclaimer - Top */}
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚕️</span>
                  <div>
                    <h3 className="font-bold text-yellow-900 text-lg">IMPORTANT DISCLAIMER</h3>
                    <p className="text-yellow-800 mt-2 leading-relaxed">
                      This AI analysis is for <strong>informational purposes only</strong> and does not replace
                      professional medical advice, diagnosis, or treatment. Always consult with a qualified
                      healthcare provider for proper medical care. If you're experiencing a medical emergency,
                      call 911 immediately.
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Diagnosis Content - Rendered as Markdown-style */}
              <div className="prose prose-lg max-w-none">
                <div
                  className="diagnosis-content space-y-8"
                  style={{
                    lineHeight: '1.8',
                    fontSize: '16px'
                  }}
                >
                  {parsed.rawText.split('\n').map((line, index) => {
                    // Remove markdown # symbols and style as headings
                    if (line.startsWith('# ')) {
                      const text = line.replace(/^#\s+/, '');
                      return (
                        <div key={index} className="mt-10 mb-6 pb-4 border-b-4 border-blue-500">
                          <h2 className="text-3xl font-bold text-gray-900">{text}</h2>
                        </div>
                      );
                    }

                    if (line.startsWith('## ')) {
                      const text = line.replace(/^##\s+/, '');
                      return (
                        <h3 key={index} className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
                          {text}
                        </h3>
                      );
                    }

                    if (line.startsWith('### ')) {
                      const text = line.replace(/^###\s+/, '');
                      return (
                        <h4 key={index} className="text-xl font-semibold text-gray-700 mt-4 mb-2">
                          {text}
                        </h4>
                      );
                    }

                    if (line.startsWith('---')) {
                      return <hr key={index} className="my-8 border-t-2 border-gray-300" />;
                    }

                    if (line.startsWith('- ')) {
                      const text = line.replace(/^-\s+/, '');
                      return (
                        <li key={index} className="ml-6 text-gray-700 mb-2">
                          {text}
                        </li>
                      );
                    }

                    if (line.match(/^\d+\.\s+/)) {
                      const text = line.replace(/^\d+\.\s+/, '');
                      const num = line.match(/^(\d+)\./)[1];
                      return (
                        <li key={index} className="ml-6 text-gray-700 mb-2" style={{ listStyleType: 'decimal' }}>
                          {text}
                        </li>
                      );
                    }

                    if (line.trim() && !line.startsWith('#')) {
                      // Check for severity badges
                      if (line.includes('🟢') || line.includes('🟡') || line.includes('🟠') || line.includes('🔴')) {
                        const severityClass = line.includes('🟢') ? 'bg-green-100 border-green-500 text-green-900' :
                                            line.includes('🟡') ? 'bg-yellow-100 border-yellow-500 text-yellow-900' :
                                            line.includes('🟠') ? 'bg-orange-100 border-orange-500 text-orange-900' :
                                            'bg-red-100 border-red-500 text-red-900';

                        return (
                          <div key={index} className={`inline-block px-6 py-3 border-2 rounded-lg font-bold text-lg mb-4 ${severityClass}`}>
                            {line.trim()}
                          </div>
                        );
                      }

                      // Check for bold text with **
                      if (line.includes('**')) {
                        const parts = line.split('**');
                        return (
                          <p key={index} className="text-gray-700 mb-3">
                            {parts.map((part, i) =>
                              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                            )}
                          </p>
                        );
                      }

                      return <p key={index} className="text-gray-700 mb-3">{line}</p>;
                    }

                    return <div key={index} className="h-2"></div>;
                  })}
                </div>
              </div>

              {/* Disclaimer - Bottom */}
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mt-10">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚕️</span>
                  <div>
                    <h3 className="font-bold text-yellow-900 text-lg">REMINDER</h3>
                    <p className="text-yellow-800 mt-2 leading-relaxed">
                      This analysis is AI-generated and may not be completely accurate. Please consult with a
                      qualified healthcare professional for proper diagnosis and treatment. Your health and safety
                      are too important to rely solely on automated analysis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx>{`
        @media print {
          .fixed {
            position: relative;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
