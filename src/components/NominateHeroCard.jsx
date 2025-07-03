import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { basicInfoSchema } from "../schema/nominateSchema";
const NominateHeroCard = ({ formData, updateFormData, nextStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      heroName: formData.heroName,
      location: formData.location,
      impactArea: formData.impactArea,
    },
  });

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md mt-10 space-y-4"
    >
      <h2 className="text-xl font-bold mb-4">Nominate a Hero</h2>

      <div>
        <label className="block font-medium text-gray-700">Hero Name *</label>
        <input
          {...register("heroName")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.heroName && (
          <p className="text-red-500 text-sm">{errors.heroName.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700">Location *</label>
        <input
          {...register("location")}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700">Impact Area *</label>
        <select
          {...register("impactArea")}
          className="w-full p-2 border rounded"
        >
          <option value="">Select an impact area</option>
          <option value="Youth Development">Youth Development</option>
          <option value="Community Service">Community Service</option>
        </select>
        {errors.impactArea && (
          <p className="text-red-500 text-sm">{errors.impactArea.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Next Step
      </button>
    </form>
  );
};

export default NominateHeroCard;
