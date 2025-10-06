import { InputField, PhoneNumberInput } from "@/components/forms";
import { useFormikContext } from "formik";
import { toast } from "react-toastify";

type StepBProps = {
  onNext: () => void;
  onBack: () => void;
}
function StepB({ onNext, onBack }: StepBProps) {
    const { validateForm } = useFormikContext();
    const handleNext = async () => {
        const errors = await validateForm();
        if (Object.keys(errors).length === 0) {
            onNext();
        } else {
            toast.error("Please fix the errors before proceeding.");
        }
    };
    const handlePreviousStep = () => {
        onBack();
    };
  return (
    <>
        <div className="border-t  border-gray-900/10  dark:border-gray-400">
      <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">Contact Persons</h2>
    </div>
    <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
      <div className="col-span-full">
        <InputField name="contact_person" label="Contact Person" required />
        </div>
         <div className="sm:col-span-full">
                <PhoneNumberInput name="contact_person_phone" label="Phone Number (Contact Person)" required   />
            </div>
         <div className="col-span-full">
        <InputField name="alternative_contact_person" label="Alternative Contact Person" required />
        </div>
        
            <div className="sm:col-span-full">
                <PhoneNumberInput name="alternative_contact_person_phone" label="Phone Number (Alternative Contact Person)" required   />
            </div>
            </div>
     <div className="mt-6 flex items-center justify-end gap-x-6">
                  
                      <button type="button" className="rounded-md flex  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-red-500" onClick={handlePreviousStep}>
                          Previous
                      </button>
              
                      <button type="button" 
                      className="rounded-md flex  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-blue-500" 
                      onClick={handleNext}>
                          Next
                      </button>

                 
      
                  </div>
    </>
  )
}

export default StepB