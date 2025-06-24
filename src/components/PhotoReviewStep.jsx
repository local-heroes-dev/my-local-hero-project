import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const PhotoReviewStep = ({ formData, updateFormData, prevStep, handleSubmit }) => {
  const { register, handleSubmit: handleFormSubmit,  watch } = useForm({
    defaultValues: {
      photo: formData.photo,
    },
  });

  const fileInputRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState(formData.photo ? URL.createObjectURL(formData.photo) : '');

  // Watch for photo changes and update preview
  const photoFile = watch('photo');

  useEffect(() => {
    if (photoFile && photoFile.length > 0) {
      const file = photoFile[0];
      setPhotoPreview(URL.createObjectURL(file));
      updateFormData({ photo: file });
    }
  }, [photoFile, updateFormData]);

  const onSubmit = (data) => {
    handleSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit(onSubmit)} className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-10 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Photo & Review</h2>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Hero Photo (optional)</label>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Upload Photo
          </button>
          <span className="text-sm text-gray-600">{photoPreview ? 'Photo selected' : 'No file selected'}</span>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          {...register('photo')}
          className="hidden"
        />
        {photoPreview && (
          <img
            src={photoPreview}
            alt="Hero Preview"
            className="mt-4 max-h-48 rounded shadow"
          />
        )}
        <p className="text-xs text-gray-500 mt-1">A photo helps bring your hero's story to life</p>
      </div>

      <div className="bg-gray-50 p-4 rounded border border-gray-200 space-y-2">
        <p><strong>Name:</strong> {formData.heroName}</p>
        <p><strong>Location:</strong> {formData.location}</p>
        <p><strong>Impact Area:</strong> {formData.impactArea}</p>
        <p><strong>Description:</strong> {formData.shortDescription}</p>
        <p><strong>Story:</strong> {formData.fullStory}</p>
        {formData.tags && <p><strong>Tags:</strong> {formData.tags}</p>}
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={prevStep} className="bg-gray-300 px-4 py-2 rounded">
          Previous
        </button>
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Submit Nomination
        </button>
      </div>
    </form>
  );
};

export default PhotoReviewStep;
