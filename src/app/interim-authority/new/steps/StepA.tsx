"use client"
import { InputField, PhoneNumberInput } from "@/components/forms";
import { PhoneInput } from '@/components/ui/phone-input';
import { useFormikContext } from "formik";
import { toast } from "react-toastify";
type StepAProps = {
  onNext: () => void;
}
function StepA({ onNext }: StepAProps) {
  const {validateForm} = useFormikContext();
   const handleNext = async () => {
        const errors = await validateForm();
        if (Object.keys(errors).length === 0) {
            onNext();
            //submit form
        } else {
            toast.error("Make sure all required fields are filled.");
            console.log(errors);
        }
    };  
  return (
    <>
     <div className="border-t  border-gray-900/10  dark:border-gray-400">
      <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">Institute Details</h2>
      </div>
    <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <InputField name="name" label="Institution Name" required />
              
        </div>
        <div className="sm:col-span-3">
        
        <InputField name="acroynm" label="Acronym" required />
        </div>
        <div className="sm:col-span-3">
        
        <InputField name="postal_address" label="Postal Address" required />
        </div>
         <div className="sm:col-span-3">
        
        <InputField name="website" label="Website" required />
        </div>
         <div className="sm:col-span-2">
        
        <InputField name="email" label="Email" required />
        </div>
         <div className="sm:col-span-2">
        
        <PhoneNumberInput name="landline" label="Landline" required />
        </div>
         <div className="sm:col-span-2">
        
        <PhoneNumberInput name="mobile" label="Mobile" required />
        </div>
          <div className="sm:col-span-3">
            <PhoneInput
              value=""
              prefix="+"
              onChange={() => {}} />
              </div>


      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6 border-t  border-gray-900/10  dark:border-gray-400">
                <button type="button" 
                className="rounded-md flex  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-sky-500" 
                onClick={handleNext}>
                    Next
                </button>
           
            </div>
     </>
   
  )
}

export default StepA