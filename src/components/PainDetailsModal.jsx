import { useState, useEffect } from 'react';

export default function PainDetailsModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  bodyPart,
  bodyPartName,
  view,
  existingData = null
}) {
  const [formData, setFormData] = useState({
    bodyPartId: bodyPart || '',
    bodyPartName: bodyPartName || '',
    view: view || 'front',
    suspectedCause: '',
    painType: '',
    intensity: 5,
    sensation: '',
    duration: '',
    otherSymptoms: '',
    image: null,
    imagePreview: null
  });

  useEffect(() => {
    if (existingData) {
      setFormData(existingData);
    } else if (bodyPart) {
      setFormData(prev => ({
        ...prev,
        bodyPartId: bodyPart,
        bodyPartName: bodyPartName,
        view: view
      }));
    }
  }, [existingData, bodyPart, bodyPartName, view]);

  const painTypes = [
    'Acute',
    'Chronic',
    'Nerve Pain',
    'Muscle Pain',
    'Joint Pain',
    'Bone Pain',
    'Referred Pain',
    'Phantom Pain'
  ];

  const sensations = [
    'Sharp',
    'Dull',
    'Throbbing',
    'Burning',
    'Tingling',
    'Numbness',
    'Shooting',
    'Aching'
  ];

  const durations = [
    'Just started (< 1 day)',
    'Few days (1-3 days)',
    'A week (4-7 days)',
    'Few weeks (1-4 weeks)',
    'A month (1-3 months)',
    'Several months (3-6 months)',
    'Over 6 months'
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
          imagePreview: previewUrl
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    if (formData.imagePreview) {
      URL.revokeObjectURL(formData.imagePreview);
    }
    setFormData({
      ...formData,
      image: null,
      imagePreview: null
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this pain point?')) {
      onDelete(formData.bodyPartId);
      onClose();
    }
  };

  if (!isOpen) return null;

  const getIntensityColor = (value) => {
    if (value <= 3) return 'from-green-400 to-yellow-400';
    if (value <= 6) return 'from-yellow-400 to-orange-400';
    return 'from-orange-400 to-red-600';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {existingData ? 'Edit' : 'Add'} Pain Details - {bodyPartName}
          </h2>
          <p className="text-sm text-gray-600 mt-1">View: {view === 'front' ? 'Front' : 'Back'}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Suspected Cause */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Suspected Cause (Optional)
            </label>
            <input
              type="text"
              value={formData.suspectedCause}
              onChange={(e) => setFormData({ ...formData, suspectedCause: e.target.value })}
              placeholder="e.g., Exercise injury, car accident, etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Pain Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pain Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {painTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, painType: type })}
                  className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                    formData.painType === type
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Pain Intensity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pain Intensity <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">{formData.intensity}</span>
                <span className="text-sm text-gray-600">
                  {formData.intensity <= 3 && 'Mild'}
                  {formData.intensity > 3 && formData.intensity <= 6 && 'Moderate'}
                  {formData.intensity > 6 && 'Severe'}
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.intensity}
                  onChange={(e) => setFormData({ ...formData, intensity: parseInt(e.target.value) })}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #4ade80, #facc15 30%, #fb923c 60%, #dc2626)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>1 (Minimal)</span>
                  <span>10 (Worst)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sensation */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sensation <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {sensations.map((sensation) => (
                <button
                  key={sensation}
                  type="button"
                  onClick={() => setFormData({ ...formData, sensation })}
                  className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                    formData.sensation === sensation
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  {sensation}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Duration <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select duration</option>
              {durations.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>

          {/* Other Symptoms */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Other Symptoms (Optional)
            </label>
            <textarea
              value={formData.otherSymptoms}
              onChange={(e) => setFormData({ ...formData, otherSymptoms: e.target.value })}
              placeholder="Describe any other symptoms you're experiencing..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Image (Optional)
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Upload a photo of the affected area to help with diagnosis. Max 5MB.
            </p>

            {!formData.imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Click to upload image</span>
                  <span className="text-xs text-gray-500 mt-1">PNG, JPG, WebP up to 5MB</span>
                </label>
              </div>
            ) : (
              <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden">
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-contain bg-gray-50"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            {existingData && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            )}
            <div className="flex-1"></div>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.painType || !formData.sensation || !formData.duration}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {existingData ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
