import React, { useState } from "react";
import NominateHeroCard from "./NominateHeroCard";
import ImpactStoryStep from "./ImpactStoryStep";
import PhotoReviewStep from "./PhotoReviewStep";
// import { saveHero } from '../utils/storage';
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
      <div className="max-w-2xl mx-auto  p-6 mt-10 space-y-4">
        <Link to="/" className="text-orange-500  flex items-center">
          {" "}
          <ArrowLeft size={18} />
          <span>Back to Heroes</span>
        </Link>
        <div className="text-center gap-1">
          <p className="text-orange-700 bg-orange-100 ml-48 mr-48 p-1 rounded-lg">
            Celebrate Community Impact
          </p>
          <h1 className="text-4xl font-bold m-2">Nominate a Local Hero</h1>
          <p className="text-lg">
            Help us celebrate someone making a positive impact in your
            community. <br></br>Every hero deserves recognition.
          </p>
        </div>
      </div>
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
