import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createHero } from "../store/slices/heroesSlice";

const uploadImageToCloudinary = async (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'ml_default');
  data.append('cloud_name', 'dhqebqram');
  const res = await fetch('https://api.cloudinary.com/v1_1/dhqebqram/image/upload', {
    method: 'POST',
    body: data,
  });
  const result = await res.json();
  return result.secure_url;
};

const PhotoReviewStep = ({ formData, updateFormData, prevStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.heroes);
  const fileInputRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState(
    formData.photo && typeof formData.photo !== 'string' ? URL.createObjectURL(formData.photo) : ""
  );

  useEffect(() => {
    if (formData.photo && typeof formData.photo !== 'string') {
      setPhotoPreview(URL.createObjectURL(formData.photo));
    }
  }, [formData.photo]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
      updateFormData({ photo: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let photo_url = null;
    if (formData.photo && typeof formData.photo !== 'string') {
      photo_url = await uploadImageToCloudinary(formData.photo);
    }
    const heroData = {
      full_name: formData.heroName,
      story: formData.fullStory,
      location: formData.location,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
      photo_url,
    };
    const result = await dispatch(createHero(heroData));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-10 space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4">Photo & Review</h2>

      <div>
        <label className="block font-medium text-gray-700 mb-1">
          Hero Photo (optional)
        </label>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Upload Photo
          </button>
          <span className="text-sm text-gray-600">
            {photoPreview ? "Photo selected" : "No file selected"}
          </span>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handlePhotoChange}
          className="hidden"
        />
        {photoPreview && (
          <img
            src={photoPreview}
            alt="Hero Preview"
            className="mt-4 max-h-48 rounded shadow"
          />
        )}
        <p className="text-xs text-gray-500 mt-1">
          A photo helps bring your hero's story to life
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded border border-gray-200 space-y-2">
        <p>
          <strong>Name:</strong> {formData.heroName}
        </p>
        <p>
          <strong>Location:</strong> {formData.location}
        </p>
        <p>
          <strong>Story:</strong> {formData.fullStory}
        </p>
        {formData.tags && (
          <p>
            <strong>Tags:</strong> {formData.tags}
          </p>
        )}
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Nomination"}
        </button>
      </div>
    </form>
  );
};

export default PhotoReviewStep;
