"use client";
import { useState } from "react";
import { Preview, StepA, StepB, StepC, StepD } from "./steps";
type props = {
  showStepNumber: boolean;
  application_id?: number;
};

const stepsArray = ["A", "B", "C", "D", "F"];
function InterimForm({ ...props }: props) {
  const [step, setStep] = useState("A");
  const [formData, setFormData] = useState<Partial<InterimAuthority>>({});

  const handleNext = (data?: InterimAuthority) => {
    if (data) setFormData(data);
    if (step === "A") {
      setStep("B");
    } else if (step === "B") {
      setStep("C");
    } else if (step === "C") {
      setStep("D");
    } else if (step === "D") {
      setStep("F");
    }
  };
  const handleBack = () => {
    if (step === "D") {
      setStep("C");
    } else if (step === "C") {
      setStep("B");
    } else if (step === "B") {
      setStep("A");
    }
  };

  // method to navigate to a specific step for review
  const handleStepClick = (step: string) => {
    setStep(step);
  };

  const renderTopStepNumber = () => {
    if (!props.showStepNumber || step === "F") return null;
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
        {step === "A" && <StepA onNext={handleNext} />}
        {step === "B" && (
          <StepB
            onNext={handleNext}
            onBack={handleBack}
            id={props.application_id}
          />
        )}
        {step === "C" && (
          <StepC
            onBack={handleBack}
            onNext={handleNext}
            data={formData as InterimAuthority}
          />
        )}
        {step === "D" && (
          <StepD
            onBack={handleBack}
            data={formData as InterimAuthority}
            onNext={handleNext}
          />
        )}
        {step === "F" && (
          <Preview
            onStepClick={handleStepClick}
            data={formData as InterimAuthority}
          />
        )}
      </div>
    </div>
  );
}

export default InterimForm;
