"use client";
import { useState } from "react";
import { SectionA, SectionB } from "./steps";
type props = {
  showStepNumber: boolean;
  appraisal_id?: number;
};

const stepsArray = ["A", "B"];
function Form({ showStepNumber, appraisal_id }: props) {
  const [step, setStep] = useState("A" as "A" | "B");
  const [formData, setFormData] = useState<Partial<PerformanceAppraisal>>({});

  const handleNext = (data?: PerformanceAppraisal) => {
    if (data) setFormData(data);
    if (step === "A") {
      setStep("B");
    } else if (step === "B") {
    }
  };
  const handleBack = () => {
    if (step === "B") {
      setStep("A");
    }
  };

  const renderTopStepNumber = () => {
    if (!showStepNumber) return null;
    return (
      <section className="mt-2 mb-4 flex justify-between">
        {stepsArray.map((item, index) => (
          <div
            key={index}
            className={`w-8 h-8 flex justify-center items-center border-2 border-primary rounded-full cursor-pointer ${
              item === step ? "bg-primary text-white" : ""
            }`}
            //onClick={() => setStep(item)}
          >
            {item}
          </div>
        ))}
      </section>
    );
  };
  return (
    <div className="space-y-12  overflow-y-auto px-3">
      {renderTopStepNumber()}
      <div>
        {step === "A" && <SectionA onNext={handleNext} id={appraisal_id} />}
        {step === "B" && (
          <SectionB
            onBack={handleBack}
            data={formData as PerformanceAppraisal}
          />
        )}
      </div>
    </div>
  );
}

export default Form;
