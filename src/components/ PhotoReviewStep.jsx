import React, { useRef, useState } from 'react';

const PhotoReviewStep = ({ formData, updateFormData, prevStep, handleSubmit }) => {
  const fileInputRef = useRef(null);
  const [photoName, setPhotoName] = useState('');

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoName(file.name);
      updateFormData({ photo: file });
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Photo & Review</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Hero Photo (optional)</label>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="bg-orange-500 text-white px-4 py-2 rounded-md"
          >
            Upload Photo
          </button>
          <span className="text-sm text-gray-600">{photoName || 'No file selected'}</span>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handlePhotoUpload}
          className="hidden"
        />
        <p className="text-xs text-gray-500 mt-1">A photo helps bring your hero's story to life</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-2">
        <p><strong>Name:</strong> {formData.heroName}</p>
        <p><strong>Location:</strong> {formData.location}</p>
        <p><strong>Impact Area:</strong> {formData.impactArea}</p>
        <p><strong>Description:</strong> {formData.shortDescription}</p>
        <p><strong>Story:</strong> {formData.fullStory}</p>
        {formData.tags && <p><strong>Tags:</strong> {formData.tags}</p>}
      </div>

      <div className="flex justify-between mt-6">
        <button type="button" onClick={prevStep} className="bg-gray-300 px-4 py-2 rounded-md">
          Previous
        </button>
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-md">
          Submit Nomination
        </button>
      </div>
    </form>
  );
};

export default PhotoReviewStep;
