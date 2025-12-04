"use client"
import { StepA } from "@/app/interim-authority/new/steps"
import { Preview, StepB, StepC, StepD, StepE, StepF, StepG, StepH, StepI, StepJ } from "@/app/university-provisional-license/new/steps"
import { useState } from "react"


type props ={
  showStepNumber:boolean
  application_id?:number
}
const stepsArray = ['A','B','C','D','E','F','G','H','I','J','K'];
function ProvisionalForm({...props}:props) {
    const [step, setStep] = useState('A');
  const [formData, setFormData] = useState<UniversityProvisionalLicense>({} as UniversityProvisionalLicense);

  const handleNext = (data?:UniversityProvisionalLicense) => {
    if (data) setFormData(data);
    if (step === 'A') {
      setStep('B');
    } else if (step === 'B') {
      setStep('C');
    }
    else if (step === 'C') {
      setStep('D');
    }
    else if (step === 'D') {
      setStep('E');
    }
    else if (step === 'E') {
      setStep('F');
    }
    else if (step === 'F') {
      setStep('G');
    } else if (step === 'G') {
      setStep('H');
    } else if (step === 'H') {
      setStep('I');
    } else if (step === 'I') {
      setStep('J');
    }
    else if (step === 'J') {
      setStep('K');
    }
  };
  
  const handleBack = () => {
    if (step === 'J') {
      setStep('I');
    } else if (step === 'I') {
      setStep('H');
    } else if (step === 'H') {
      setStep('G');
    } else if (step === 'G') {
      setStep('F');
    } else if (step === 'F') {
      setStep('E');
    } else if (step === 'E') {
      setStep('D');
    } else if (step === 'D') {
      setStep('C');
    } else if (step === 'C') {
      setStep('B');
    } else if (step === 'B') {
      setStep('A');
    }
  };

  // method to navigate to a specific step for review
  const handleStepClick = (step: string) => {
    setStep(step);
  }

    const renderTopStepNumber = () => {
    if (!props.showStepNumber || step==='K') return null
        return (
           <section className="mt-2 mb-4 flex justify-between">
            {stepsArray.map((item, index) => (
                <div key={index} className={`w-8 h-8 flex justify-center items-center border-2 border-primary rounded-full cursor-pointer ${
                    item === step ? 'bg-primary text-white' : ''
                  }`}
                 //onClick={() => setStep(item)}
                >
                    {item}
                </div>
            ))}
              </section>
        )
      }
  return (
     <div className="space-y-12  overflow-y-auto px-3">
      
           {renderTopStepNumber()}
            <div >

          {step === 'A' && <StepA onNext={handleNext} />}
          {step === 'B' && <StepB onNext={handleNext} onBack={handleBack} id={props.application_id} />}
           {step === 'C' && <StepC  onBack={handleBack} onNext={handleNext} data={formData} />} 
          {step === 'D' && <StepD onBack={handleBack}  data={formData} onNext={handleNext} />} 
          {step === 'E' && <StepE onBack={handleBack}  data={formData} onNext={handleNext} />} 
          {step === 'F' && <StepF onBack={handleBack}  data={formData} onNext={handleNext} />}  
          {step === 'G' && <StepG onBack={handleBack}  data={formData} onNext={handleNext} />}  
          {step === 'H' && <StepH onBack={handleBack}  data={formData} onNext={handleNext} />}  
          {step === 'I' && <StepI onBack={handleBack}  data={formData} onNext={handleNext} />}  
          {step === 'J' && <StepJ onBack={handleBack}  data={formData} onNext={handleNext} />}
          {step === 'K' && <Preview onStepClick={handleStepClick} data={formData} />}
         

        </div>
        </div>
  )
}

export default ProvisionalForm