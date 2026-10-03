"use client";
import { useCallback, useState } from "react";
import { FormValuesObserverContext } from "@/components/forms/form-values-observer";
import CompletionSummary from "@/app/profile/CompletionSummary";
import { useGetEmployeeDetailsQuery } from "@/redux/features/hr-api-slice";
import { skipToken } from "@reduxjs/toolkit/query";
import {
    StepA,
    StepB,
    StepC,
    StepD,
    StepE,
    StepF,
    StepG,
    StepH,
    StepI,
    StepJ,
    StepK,
    StepL,
    StepM,
} from "./steps";
type props = {
  showStepNumber: boolean;
  employee_id?: number;
};

const stepsArray = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
];
const sectionIds = [
  "personal_details", "residential_address", "place_of_origin", "next_of_kin",
  "contact_person", "parents", "identification", "bank_details", "dependents",
  "education_history", "work_history", "referees", "documents",
];
function Form({ showStepNumber, employee_id }: props) {
  const [step, setStep] = useState("A");
  const [formData, setFormData] = useState<Partial<Employee>>({});
  const [draftValues, setDraftValues] = useState<Partial<Employee>>({});
  const { data: savedEmployee, isLoading: isEmployeeLoading } = useGetEmployeeDetailsQuery(employee_id ?? skipToken);
  const observeValues = useCallback((values: Record<string, unknown>) => {
    setDraftValues(values as Partial<Employee>);
  }, []);

  const handleNext = (data?: Employee) => {
    setDraftValues({});
    if (data) setFormData(data);
    if (step === "A") {
      setStep("B");
    } else if (step === "B") {
      setStep("C");
    } else if (step === "C") {
      setStep("D");
    } else if (step === "D") {
      setStep("E");
    } else if (step === "E") {
      setStep("F");
    } else if (step === "F") {
      setStep("G");
    } else if (step === "G") {
      setStep("H");
    } else if (step === "H") {
      setStep("I");
    } else if (step === "I") {
      setStep("J");
    } else if (step === "J") {
      setStep("K");
    } else if (step === "K") {
      setStep("L");
    } else if (step === "L") {
      setStep("M");
    }
  };
  const handleBack = () => {
    setDraftValues({});
    if (step === "M") {
      setStep("L");
    } else if (step === "L") {
      setStep("K");
    } else if (step === "K") {
      setStep("J");
    } else if (step === "J") {
      setStep("I");
    } else if (step === "I") {
      setStep("H");
    } else if (step === "H") {
      setStep("G");
    } else if (step === "G") {
      setStep("F");
    } else if (step === "F") {
      setStep("E");
    } else if (step === "E") {
      setStep("D");
    } else if (step === "D") {
      setStep("C");
    } else if (step === "C") {
      setStep("B");
    } else if (step === "B") {
      setStep("A");
    }
  };

  const renderTopStepNumber = () => {
    if (!showStepNumber || step === "N") return null;
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
    <FormValuesObserverContext.Provider value={observeValues}>
    <div className="space-y-6 overflow-y-auto px-3">
      {isEmployeeLoading ? <p role="status">Loading form completion...</p> : (
        <CompletionSummary employee={{ ...savedEmployee, ...formData, ...draftValues }} live activeSection={sectionIds[stepsArray.indexOf(step)]} />
      )}
      {renderTopStepNumber()}
      <div>
        {step === "A" && <StepA onNext={handleNext} id={employee_id} />}
        {step === "B" && (
          <StepB
            onNext={handleNext}
            onBack={handleBack}
            data={formData as Employee}
          />
        )}
        {step === "C" && (
          <StepC
            onBack={handleBack}
            onNext={handleNext}
            data={formData as Employee}
          />
        )}
        {step === "D" && (
          <StepD
            onBack={handleBack}
            data={formData as Employee}
            onNext={handleNext}
          />
        )}
        {step === "E" && (
          <StepE
            onBack={handleBack}
            data={formData as Employee}
            onNext={handleNext}
          />
        )}
        {step === "F" && (
          <StepF
            onBack={handleBack}
            data={formData as Employee}
            onNext={handleNext}
          />
        )}
        {step === "G" && (
          <StepG
            onBack={handleBack}
            data={formData as Employee}
            onNext={handleNext}
          />
        )}
        {step === "H" && (
          <StepH
            onBack={handleBack}
            data={formData as Employee}
            onNext={handleNext}
          />
        )}
        {step === "I" && (
          <StepI
            onBack={handleBack}
            data={formData as Employee}
            onNext={handleNext}
          />
        )}
        {step === "J" && (
          <StepJ
            onBack={handleBack}
            data={formData as Employee}
            onNext={handleNext}
          />
        )}
        {step === "K" && (
          <StepK
            onBack={handleBack}
            data={formData as Employee}
            onNext={handleNext}
          />
        )}
        {step === "L" && (
          <StepL
            onBack={handleBack}
            data={formData as Employee}
            onNext={handleNext}
          />
        )}
        {step === "M" && (
          <StepM onBack={handleBack} data={formData as Employee} />
        )}
      </div>
    </div>
    </FormValuesObserverContext.Provider>
  );
}

export default Form;
