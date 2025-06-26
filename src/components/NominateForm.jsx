import React, { useState } from "react";
import NominateHeroCard from "./NominateHeroCard";
import ImpactStoryStep from "./ImpactStoryStep";
import PhotoReviewStep from "./PhotoReviewStep";
// import { saveHero } from '../utils/storage';

const NominateForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    heroName: "",
    location: "",
    impactArea: "",
    shortDescription: "",
    fullStory: "",
    tags: "",
    photo: null,
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleSubmit = () => {
    const newHero = {
      id: Date.now().toString(),
      ...formData,
    };
    // saveHero(newHero);
    alert("Hero nomination submitted successfully!");
    setFormData({
      heroName: "",
      location: "",
      impactArea: "",
      shortDescription: "",
      fullStory: "",
      tags: "",
      photo: null,
    });
    setStep(1);
  };

  return (
    <div>
      {step === 1 && (
        <NominateHeroCard
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <ImpactStoryStep
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <PhotoReviewStep
          formData={formData}
          updateFormData={updateFormData}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default NominateForm;
