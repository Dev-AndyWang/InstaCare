import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'EN', name: 'English', nativeName: 'English' },
  { code: 'ES', name: 'Spanish', nativeName: 'Español' },
  { code: 'ZH', name: 'Chinese', nativeName: '中文' },
  { code: 'HI', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'AR', name: 'Arabic', nativeName: 'العربية' },
  { code: 'FR', name: 'French', nativeName: 'Français' },
  { code: 'PT', name: 'Portuguese', nativeName: 'Português' },
  { code: 'RU', name: 'Russian', nativeName: 'Русский' },
  { code: 'JA', name: 'Japanese', nativeName: '日本語' },
  { code: 'DE', name: 'German', nativeName: 'Deutsch' }
];

export default function LanguageSelector({ selectedLanguage = 'EN', onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageSelect = (languageCode) => {
    onLanguageChange(languageCode);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2.5 hover:bg-gray-100 rounded-full transition-all duration-300 group"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
        <span className="hidden sm:inline text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
          {currentLanguage.code}
        </span>
        <ChevronDown className={`hidden sm:block w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border-2 border-gray-100 py-2 z-50 animate-fadeIn">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Select Language
            </p>
          </div>
          <div className="py-1 max-h-80 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className={`w-full px-4 py-2.5 text-left flex items-center justify-between transition-all duration-200 ${
                  selectedLanguage === language.code
                    ? 'bg-purple-50 text-purple-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-base">
                    {language.nativeName}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    ({language.code})
                  </span>
                </span>
                {selectedLanguage === language.code && (
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
