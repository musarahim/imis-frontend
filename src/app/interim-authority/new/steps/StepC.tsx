import { AppForm, SubmitButton, TextAreaField } from "@/components/forms";
import { usePatchIntrimAuthorityMutation } from "@/redux/features/license-api-slice";
import { toast } from "react-toastify";
import * as Yup from "yup";
type StepCProps = {
  onBack: () => void;
  onNext: (data?: any) => void;
  data?: IntrimAuthority;
}


type FormValues = { 
    vision:string,
    mission: string,
    objectives: string,
    philosophy: string,
    governance_structure: string,
    human_resources: string,
    source_of_finance: string,
    action_plan: string,
    programmes: string | File,
  
}
function StepC({ onBack, onNext, data }: StepCProps) {
  const [patchInstitution, {isLoading}] = usePatchIntrimAuthorityMutation();
  const stepCInitialValues = {
        vision: data?.vision || "",
        mission: data?.mission || "",
        objectives: data?.objectives || "",
        philosophy: data?.philosophy || "",
        governance_structure: data?.governance_structure || "",
        human_resources: data?.human_resources || "",
        source_of_finance: data?.source_of_finance || "",
        action_plan: data?.action_plan || "",
        programmes: data?.programmes || "",
      }
  const stepCValidation = Yup.object({
        vision: Yup.string().required("Vision is required field"),
        mission: Yup.string().required("This field is required"),
        objectives: Yup.string().required("This field is required"),
        philosophy: Yup.string().required("This field is required"),
        governance_structure: Yup.string().required("This field is required"),
        human_resources: Yup.string().required("This field is required"),
        source_of_finance: Yup.string().required("This field is required"),
        action_plan: Yup.string().required("This field is required"),
        programmes: Yup.string().required("This field is required"),

  });
  const onSubmit = async (values: FormValues) => {
   
       const formdata = new FormData();
       Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formdata.append(key, value);
        }
      });
  
      console.log("Form data:", formdata);
       await patchInstitution({ id: data?.id ? Number(data.id) : 0, data: formdata }).unwrap().then((res) => {
        
       if (res) {
            onNext(res);
          } else {
            toast.error("No ID returned from server");
          }
       }).catch((err) => {
        console.log("Patch error:", err);
        toast.error("Error saving details, please try again later");
       });
        // Proceed to the next step
         
  }
   const handlePreviousStep = () => {
          onBack();
      };
  return (
     <AppForm initialValues={stepCInitialValues} onSubmit={onSubmit} validationSchema={stepCValidation} onError={() => toast.error("Please fix the errors in the form")}>
            
    <div className="border-t  border-gray-900/10  dark:border-gray-400">
      <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">VISION, MISSION, OBJECTIVES AND PHILOSOPHY</h2>
    </div>
     <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
       
            <div className="sm:col-span-full">
              <TextAreaField name="vision" label="State the Vision of the University to be established" type="file" required />
            </div>
           
            <div className="sm:col-span-full">
              <TextAreaField name="mission" label="State the Mission for which the University is to be established" required />
            </div>
             <div className="sm:col-span-full">
              <TextAreaField name="objectives" label="State the objectives for which the University is to be established" required />
            </div>
            <div className="sm:col-span-full">
              <TextAreaField name="philosophy" label="State the philosophy of the University to be established" required />
            </div>
            <div className="sm:col-span-full">
              <TextAreaField name="governance_structure" label="State the proposed Governance Structures of the University"  required />
            </div>  
            <div className="sm:col-span-full">
              <TextAreaField name="human_resources" label="State the Proposed human resources that will be required to operate the University"  required />
            </div>            
            <div className="sm:col-span-full">
              <TextAreaField name="source_of_finance" label="State the expected sources of financial resources"  required />
            </div>
            <div className="sm:col-span-full">
              <TextAreaField name="action_plan" label="State the action plan towards the realization of the objectives of the project"  required />
            </div>
          <div className="sm:col-span-full">
          <TextAreaField name="programmes" label="What programmes of study are planned in the setting up of the University" required />
        </div>
       
                </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                  
                      <button type="button" className="rounded-md flex  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-red-500" onClick={handlePreviousStep}>
                          Previous
                      </button>
              
                     
                      <SubmitButton isLoading={isLoading} title="Save & Continue" className="rounded-md flex min-w-32  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-sky-600"/>
                 
                 
      
                  </div>
    </AppForm>
  
  )
}

export default StepC