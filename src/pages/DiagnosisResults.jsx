import { motion } from 'framer-motion';
import { ArrowLeft, Home, Printer } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

export default function DiagnosisResults({
  diagnosisData,
  loading,
  error,
  onBackToDiagnosis,
  onBackToLanding,
  selectedLanguage,
  onLanguageChange
}) {
  const handlePrint = () => {
    window.print();
  };

  // Parse the diagnosis markdown into structured sections
  const parseDiagnosisContent = (text) => {
    if (!text) return null;

    const lines = text.split('\n');
    const sections = [];
    let currentSection = null;
    let currentSubsection = null;

    lines.forEach((line) => {
      // Main sections (# with emoji)
      if (line.match(/^#\s+[🔍📊⚠️🏠📅🤔]/)) {
        if (currentSection) sections.push(currentSection);
        currentSection = {
          title: line.replace(/^#\s+/, ''),
          content: [],
          subsections: []
        };
        currentSubsection = null;
      }
      // Subsections (##)
      else if (line.startsWith('## ')) {
        if (currentSection) {
          if (currentSubsection) {
            currentSection.subsections.push(currentSubsection);
          }
          currentSubsection = {
            title: line.replace(/^##\s+/, ''),
            content: []
          };
        }
      }
      // Content lines
      else if (line.trim()) {
        if (currentSubsection) {
          currentSubsection.content.push(line);
        } else if (currentSection) {
          currentSection.content.push(line);
        }
      }
    });

    // Push last subsection and section
    if (currentSubsection && currentSection) {
      currentSection.subsections.push(currentSubsection);
    }
    if (currentSection) sections.push(currentSection);

    return sections;
  };

  const sections = parseDiagnosisContent(diagnosisData);

  // Function to render text with markdown bold and image references
  const renderWithMarkdown = (text) => {
    if (!text) return null;

    // Clean up malformed markdown: remove trailing ** that don't have a match
    let cleanedText = text;
    // Remove trailing ** at the end if there's no matching ** before it
    if (cleanedText.endsWith('**') && !cleanedText.slice(0, -2).includes('**')) {
      cleanedText = cleanedText.slice(0, -2);
    }

    // First split by bold markers (**text**)
    const boldParts = cleanedText.split(/(\*\*[^*]+\*\*)/g);

    return boldParts.map((boldPart, boldIndex) => {
      // Handle bold text
      if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
        const boldText = boldPart.replace(/\*\*/g, '');
        // Check if bold text contains image references
        const imageParts = boldText.split(/(Image \d+)/g);
        return (
          <strong key={boldIndex} className="font-bold text-warm-charcoal">
            {imageParts.map((imgPart, imgIndex) => {
              if (imgPart.match(/Image \d+/)) {
                return (
                  <span
                    key={imgIndex}
                    className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 font-bold rounded mx-1"
                  >
                    {imgPart}
                  </span>
                );
              }
              return imgPart;
            })}
          </strong>
        );
      }

      // Handle regular text with image highlights
      const imageParts = boldPart.split(/(Image \d+)/g);
      return imageParts.map((imgPart, imgIndex) => {
        if (imgPart.match(/Image \d+/)) {
          return (
            <span
              key={`${boldIndex}-${imgIndex}`}
              className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 font-bold rounded mx-1"
            >
              {imgPart}
            </span>
          );
        }
        return <span key={`${boldIndex}-${imgIndex}`}>{imgPart}</span>;
      });
    });
  };

  // Function to get severity color
  const getSeverityColor = (text) => {
    if (text.includes('🟢')) return 'border-green-500 bg-green-50';
    if (text.includes('🟡')) return 'border-yellow-500 bg-yellow-50';
    if (text.includes('🟠')) return 'border-orange-500 bg-orange-50';
    if (text.includes('🔴')) return 'border-red-500 bg-red-50';
    return 'border-gray-300 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFD5E5] via-[#E6D5FF] via-[#D5E8FF] via-[#FFF4D5] to-[#FFDFD5]">
      {/* Fixed Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b-2 border-purple-100 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5">
          <div className="grid grid-cols-3 gap-4 items-center">
            {/* Left: Navigation Buttons */}
            <div className="flex items-center gap-4 justify-start">
              <button
                onClick={onBackToDiagnosis}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 text-warm-charcoal rounded-xl font-bold hover:bg-gray-50 hover:border-purple-400 transition-all duration-300 hover:scale-105 shadow-button-soft"
                aria-label="Back to pain mapping"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Mapping</span>
              </button>
              <button
                onClick={onBackToLanding}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 text-warm-charcoal rounded-xl font-bold hover:bg-gray-50 hover:border-purple-400 transition-all duration-300 hover:scale-105 shadow-button-soft"
                aria-label="Back to home"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
              </button>
            </div>

            {/* Center: Title */}
            <h1 className="text-2xl lg:text-4xl font-black text-[#2D3748] text-center whitespace-nowrap">
              Your Health Analysis
            </h1>

            {/* Right: Language Selector and Print Button */}
            <div className="flex items-center justify-end gap-4">
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={onLanguageChange}
              />
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F4E5A1] to-[#F0D78C] text-gray-800 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 print:hidden shadow-button-soft"
                aria-label="Print results"
              >
                <Printer className="w-5 h-5" />
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-500 border-t-transparent"></div>
            <p className="mt-6 text-2xl font-bold text-warm-charcoal">Analyzing your symptoms...</p>
            <p className="mt-2 text-lg text-warm-gray">This may take a few moments</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-2 border-red-300 rounded-2xl p-8"
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">⚠️</span>
              <div>
                <h2 className="text-2xl font-bold text-red-900 mb-2">Error</h2>
                <p className="text-lg text-red-700">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Content */}
        {!loading && !error && sections && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Disclaimer - Top */}
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-8 shadow-card-medium">
              <div className="flex items-start gap-4">
                <span className="text-4xl">⚕️</span>
                <div>
                  <h3 className="text-2xl font-bold text-yellow-900 mb-3">IMPORTANT DISCLAIMER</h3>
                  <p className="text-base text-yellow-900 leading-relaxed">
                    This AI analysis is for <strong>informational purposes only</strong> and does not replace
                    professional medical advice, diagnosis, or treatment. Always consult with a qualified
                    healthcare provider for proper medical care. If you're experiencing a medical emergency,
                    call 911 immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Render Sections */}
            {sections.map((section, sectionIndex) => {
              // Special handling for "Why We Think This" section - make it prominent
              const isWhySection = section.title.includes('WHY WE THINK THIS');
              const isQuickSummary = section.title.includes('QUICK SUMMARY');
              const isEmergency = section.title.includes('WHEN TO SEE A DOCTOR');

              return (
                <div
                  key={sectionIndex}
                  className={`bg-white rounded-2xl shadow-card-medium hover:shadow-card-hover transition-shadow p-10 ${
                    isWhySection ? 'border-4 border-purple-400' :
                    isQuickSummary ? 'border-4 ' + getSeverityColor(section.content.join(' ')) :
                    isEmergency ? 'border-2 border-orange-400 bg-orange-50/30' :
                    'border-2 border-border-light'
                  }`}
                >
                  {/* Section Title */}
                  <h2 className="text-4xl lg:text-5xl font-black text-dark-charcoal mb-8">
                    {section.title}
                  </h2>

                  {/* Section Content */}
                  <div className="space-y-3">
                    {section.content.map((line, lineIndex) => {
                      // Skip separator lines
                      if (line.trim() === '---' || line.trim() === '--') {
                        return null;
                      }

                      // Check for bold label pattern: *Label**: or *Label** (fix malformed markdown - can be multi-word)
                      if (line.trim().match(/^\*(.+?)\*\*:?/)) {
                        // Fix the pattern by adding the missing * at the start
                        const fixedLine = line.replace(/^\*/, '**');
                        return (
                          <p key={lineIndex} className="text-lg text-text-primary leading-relaxed mb-2">
                            {renderWithMarkdown(fixedLine)}
                          </p>
                        );
                      }

                      // Check for single asterisk with colon pattern: *Label: (convert to bold)
                      if (line.trim().match(/^\*([^*]+?):/)) {
                        // Convert *Label: to **Label:** for proper bold rendering
                        const fixedLine = line.replace(/^\*([^*]+?):/, '**$1:**');
                        return (
                          <p key={lineIndex} className="text-lg text-text-primary leading-relaxed mb-2">
                            {renderWithMarkdown(fixedLine)}
                          </p>
                        );
                      }

                      // Handle bullet points (both * and - for compatibility)
                      if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
                        const content = line.replace(/^[*-]\s*/, '');
                        return (
                          <li key={lineIndex} className="ml-8 text-lg text-text-primary leading-relaxed list-disc marker:text-purple-600">
                            {renderWithMarkdown(content)}
                          </li>
                        );
                      }

                      // Handle numbered lists
                      if (line.match(/^\d+\.\s+/)) {
                        return (
                          <li key={lineIndex} className="ml-8 text-lg text-text-primary leading-relaxed list-decimal marker:text-purple-600">
                            {renderWithMarkdown(line.replace(/^\d+\.\s*/, ''))}
                          </li>
                        );
                      }

                      // Regular text - only if not empty
                      if (line.trim()) {
                        return (
                          <p key={lineIndex} className="text-lg text-text-primary leading-relaxed mb-2">
                            {renderWithMarkdown(line)}
                          </p>
                        );
                      }

                      return null;
                    })}

                    {/* Subsections */}
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="mt-8">
                        <h3 className="text-2xl font-bold text-warm-charcoal mb-4">
                          {subsection.title}
                        </h3>
                        <div className="space-y-2 ml-4">
                          {subsection.content.map((line, lineIndex) => {
                            // Skip separator lines
                            if (line.trim() === '---' || line.trim() === '--') {
                              return null;
                            }

                            // Check for bold label pattern: *Label**: or *Label** (fix malformed markdown - can be multi-word)
                            if (line.trim().match(/^\*(.+?)\*\*:?/)) {
                              // Fix the pattern by adding the missing * at the start
                              const fixedLine = line.replace(/^\*/, '**');
                              return (
                                <p key={lineIndex} className="text-lg text-text-primary leading-relaxed mb-1">
                                  {renderWithMarkdown(fixedLine)}
                                </p>
                              );
                            }

                            // Check for single asterisk with colon pattern: *Label: (convert to bold)
                            if (line.trim().match(/^\*([^*]+?):/)) {
                              // Convert *Label: to **Label:** for proper bold rendering
                              const fixedLine = line.replace(/^\*([^*]+?):/, '**$1:**');
                              return (
                                <p key={lineIndex} className="text-lg text-text-primary leading-relaxed mb-1">
                                  {renderWithMarkdown(fixedLine)}
                                </p>
                              );
                            }

                            // Handle bullet points (both * and - for compatibility)
                            if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
                              const content = line.replace(/^[*-]\s*/, '');
                              return (
                                <li key={lineIndex} className="ml-6 text-lg text-text-primary leading-relaxed list-disc marker:text-purple-600">
                                  {renderWithMarkdown(content)}
                                </li>
                              );
                            }

                            // Handle numbered lists
                            if (line.match(/^\d+\.\s+/)) {
                              return (
                                <li key={lineIndex} className="ml-6 text-lg text-text-primary leading-relaxed list-decimal marker:text-purple-600">
                                  {renderWithMarkdown(line.replace(/^\d+\.\s*/, ''))}
                                </li>
                              );
                            }

                            // Regular text - only if not empty
                            if (line.trim()) {
                              return (
                                <p key={lineIndex} className="text-lg text-text-primary leading-relaxed mb-1">
                                  {renderWithMarkdown(line)}
                                </p>
                              );
                            }

                            return null;
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </main>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          header button {
            display: none !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
