import React from 'react';

const ImpactStoryStep = ({ formData, updateFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Their Impact Story</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Short Description*</label>
        <input
          type="text"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          maxLength={120}
          placeholder='e.g., "Started a community garden feeding 100"'
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        <p className="text-xs text-gray-500 mt-1">{formData.shortDescription.length}/120</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Full Impact Story*</label>
        <textarea
          name="fullStory"
          value={formData.fullStory}
          onChange={handleChange}
          rows={6}
          minLength={100}
          placeholder="Tell us the full story of their impact..."
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        <p className="text-xs text-gray-500 mt-1">{formData.fullStory.length} characters (min 100)</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Impact Tags (Optional)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder='e.g., "Community Garden", "Volunteer"'
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={prevStep} className="bg-gray-300 px-4 py-2 rounded-md">
          Previous
        </button>
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-md">
          Next Step
        </button>
      </div>
    </form>
  );
};

export default ImpactStoryStep;
