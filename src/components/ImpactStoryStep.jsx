import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { impactStorySchema } from "../schema/nominateSchema";
const ImpactStoryStep = ({ formData, updateFormData, nextStep, prevStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(impactStorySchema),
    defaultValues: {
      shortDescription: formData.shortDescription,
      fullStory: formData.fullStory,
      tags: formData.tags,
    },
  });

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-10 space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4">Their Impact Story</h2>

      <div>
        <label className="block font-medium text-gray-700">
          Short Description *
        </label>
        <input
          {...register("shortDescription")}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder='e.g., "Started a community garden feeding 100"'
        />
        {errors.shortDescription && (
          <p className="text-red-500 text-sm">
            {errors.shortDescription.message}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          {formData.shortDescription.length}/120
        </p>
      </div>

      <div>
        <label className="block font-medium text-gray-700">
          Full Impact Story *
        </label>
        <textarea
          {...register("fullStory", { required: "Full story is required" })}
          className="w-full p-2 border border-gray-300 rounded"
          rows={6}
          placeholder="Tell us the full story of their impact..."
        />
        {errors.fullStory && (
          <p className="text-red-500 text-sm">{errors.fullStory.message}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          {formData.fullStory.length} characters (min 100)
        </p>
      </div>

      <div>
        <label className="block font-medium text-gray-700">
          Impact Tags (Optional)
        </label>
        <input
          {...register("tags")}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder='e.g., "Community Garden", "Volunteer"'
        />
        {errors.tags && (
          <p className="text-red-500 text-sm">{errors.tags.message}</p>
        )}
      </div>

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
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default ImpactStoryStep;
