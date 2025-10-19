export default function ProgressIndicator({ currentStep }) {
  const steps = [
    { number: 1, label: 'Personal Info' },
    { number: 2, label: 'Map Pain Points' },
    { number: 3, label: 'Get Diagnosis' }
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-center gap-0 max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Step Circle and Label Group */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg transition-all duration-300 ${
                  currentStep >= step.number
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-110'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStep > step.number ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`mt-3 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="w-24 h-1 mx-4">
                <div
                  className={`h-full transition-all duration-500 ${
                    currentStep > step.number
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                      : 'bg-gray-200'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
