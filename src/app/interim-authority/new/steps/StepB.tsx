import { AppForm } from "@/components/forms";
import { toast } from "react-toastify";
import * as Yup from "yup";
type StepBProps = {
  onNext: () => void;
  onBack: () => void;
}
type FormValues = { 
    has_title_deed: boolean,
    names_of_promoters: string,
   vision: string,
   mission: string,
   objectives: string,
   philosophy: string,
   governance_structure: string,
   human_resources: string,
   source_of_finance: string,
   action_plan: string,
   infrastructure: string,
   programmes: string | File,
   status?: "pending" | "approved" | "rejected" | "draft" | "submitted" | "pending",
   institution?: string,
   application_date?:string
}
function StepB({ onNext, onBack }: StepBProps) {
  const stepBInitialValues = {
        contact_person_1_name: "",
        contact_person_1_email: "",
        contact_person_1_phone: "",
        contact_person_2_name: "",
        contact_person_2_email: "",
        contact_person_2_phone: "",
      }
  const stepBValidation = Yup.object({
              contact_person_1_name: Yup.string().required("Contact person 1 name is required"),
              contact_person_1_email: Yup.string().email("Invalid email address").required("Contact person 1 email is required"),
              contact_person_1_phone: Yup.string().required("Contact person 1 phone number is required"),
              contact_person_2_name: Yup.string().required("Contact person 2 name is required"),
              contact_person_2_email: Yup.string().email("Invalid email address").required("Contact person 2 email is required"),
              contact_person_2_phone: Yup.string().required("Contact person 2 phone number is required"),
  });
  const onSubmit = async (values: FormValues) => {
        
  };
   const handleNext = async () => {
         
              onNext();
      };
      const handlePreviousStep = () => {
          onBack();
      };
  return (
     <AppForm initialValues={stepBInitialValues} onSubmit={onSubmit} validationSchema={stepBValidation} onError={() => toast.error("Please fix the errors in the form")}>
        <div className="border-t  border-gray-900/10  dark:border-gray-400">
      <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">Contact Persons</h2>
    </div>
    <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
    
        
         
        
            
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
    </AppForm>
    
  )
}

export default StepB