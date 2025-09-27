
"use client";
import { useState } from "react";
import { StepA, StepB, StepC } from "./steps";
type props ={
  showStepNumber:boolean
}

const stepsArray = ['A','B','C']
 function InterimForm({...props}:props) {
  const [step, setStep] = useState('A');
 

  const handleNext = () => {
    if (step === 'A') {
      setStep('B');
    } else if (step === 'B') {
      setStep('C');
    }
  };
  const handleBack = () => {
    if (step === 'C') {
      setStep('B');
    } else if (step === 'B') {
      setStep('A');
    }
  };

  const renderTopStepNumber = () => {
    if (!props.showStepNumber || step==='F') return null
        return (
           <section className="mt-2 mb-4 flex justify-between">
            {stepsArray.map((item, index) => (
                <div key={index} className={`w-8 h-8 flex justify-center items-center border-2 border-primary rounded-full cursor-pointer ${
                    item === step ? 'bg-primary text-white' : ''
                  }`}
                 // onClick={() => setStep(item)}
                >
                    {item}
                </div>
            ))}
              </section>
        )
      }

  return (
    
      <div className="space-y-12 max-h-[520px] overflow-y-auto px-3">
      
           {renderTopStepNumber()}
        <div >

          {step === 'A' && <StepA onNext={handleNext} />}
          {step === 'B' && <StepB onNext={handleNext} onBack={handleBack} />}
          {step === 'C' && <StepC  onBack={handleBack} />}

        </div>
        
      </div>

  )
}

export default InterimForm;