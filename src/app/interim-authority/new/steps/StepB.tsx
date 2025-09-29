import { AppForm, Editor, InputField, RadioInputField } from "@/components/forms";
import { toast } from "react-toastify";
import * as Yup from "yup";
type StepBProps = {
  onNext: () => void;
  onBack: () => void;
}
type FormValues = { 
    has_title_deed: boolean,
    title_deed?: string | File,
    names_of_promoters: string,
    governance_structure: string,
    human_resources: string,
    source_of_finance: string,
   action_plan: string,
   infrastructure: string,
   programmes: string | File,
  
}

const options = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
]
function StepB({ onNext, onBack }: StepBProps) {
  const stepBInitialValues = {
        has_title_deed: false,
        names_of_promoters: "",
        governance_structure: "",
        human_resources: "",
        source_of_finance: "",
       action_plan: "",
       infrastructure: "",
       programmes: "",
      }
  const stepBValidation = Yup.object({
        has_title_deed: Yup.boolean().required("This field is required"),
        names_of_promoters: Yup.string().required("This field is required"),
        governance_structure: Yup.string().required("This field is required"),
        human_resources: Yup.string().required("This field is required"),
        source_of_finance: Yup.string().required("This field is required"),
       action_plan: Yup.string().required("This field is required"),
       infrastructure: Yup.string().required("This field is required"),
       programmes: Yup.mixed().required("This field is required"),
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
    <div className="sm:col-span-full">
        <RadioInputField name="has_title_deed" label="Do you already have a title deed?" options={options} />
        </div>
        <div className="sm:col-span-full">
          <InputField name="title_deed" label="Title Deed" type="file" required />
        </div>
        <div className="sm:col-span-full">
          <InputField name="governance_structure" label="Governance Structure" required />
        </div>
        <div className="sm:col-span-full">
          <Editor />
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
    </AppForm>
    
  )
}

export default StepB