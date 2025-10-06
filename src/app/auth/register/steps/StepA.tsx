import { InputField, PhoneNumberInput, SelectField } from "@/components/forms";
import { useRegistration } from "@/hooks";
import { useFormikContext } from "formik";
import { toast } from "react-toastify";

type StepAProps = {
  onNext: () => void;
}
 const institution_types = [
    {label: "Public", value: "public"},
    {label: "Private", value: "private"},
   
  ]
function StepA({ onNext }: StepAProps) {
    const {validateForm} = useFormikContext();
    const { districtOptions, } = useRegistration();
    const districts: Option[] = (districtOptions || []).map(opt => ({
        ...opt,
        value: String(opt.value),
    }));
    const handleNext = async () => {
        const errors = await validateForm();
        if (Object.keys(errors).length === 0) {
            onNext();
        } else {
            toast.error("Make sure all required fields are filled and valid.");
            console.log(errors);
        }
    };  
  return (
    <>
       
            <div className="border-t  border-gray-900/10  dark:border-gray-400">
      <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">Institute Details</h2>
    </div>
    <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
      <div className="col-span-full">
        <InputField name="name" label="Institution Name" required />
        </div>
         <div className="col-span-full">
        <InputField name="email" label="Primary Email" required />
        </div>
 <div className="col-span-full">
        <InputField name="alternative_email" label="Alternative Email" required />
        </div>

        
            <div className="sm:col-span-3">
                <SelectField name="district" options={districts} label="District" placeholder="Select District" required />
             
            </div>

            <div className="sm:col-span-3">
            
              <SelectField name="institution_type" options={institution_types} label="Institution Type" placeholder="Select Institution Type" required />
            </div> 
             <div className="sm:col-span-3">
                <PhoneNumberInput name="phone" label="Phone Number (Mobile)" required   />
            </div>
            <div className="sm:col-span-3">
                <PhoneNumberInput name="landline" label="Phone Number (Landline)" required   />
            </div>
            </div>
        
        <div className="mt-6 flex items-center justify-end gap-x-6 border-t  border-gray-900/10  dark:border-gray-400">
                <button type="button" 
                className="rounded-md flex  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-sky-600" 
                onClick={handleNext}>
                    Next
                </button>
           
            </div>
    </>
  )
}

export default StepA