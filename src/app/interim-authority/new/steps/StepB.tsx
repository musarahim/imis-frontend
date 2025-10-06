"use client"
import { AppForm, FileField, RadioInputField, RichEditorField, SubmitButton, TextAreaField } from "@/components/forms";
import { useCreateIntrimAuthorityMutation } from "@/redux/features/license-api-slice";
import { toast } from "react-toastify";
import * as Yup from "yup";
type StepBProps = {
  onNext: (data?: any) => void;
  onBack: () => void;
}
type FormValues = { 
    has_title_deed: boolean,
    title_deed?: string | File,
    names_of_promoters: string,
   infrastructure: string,
  
}

const options = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
]
function StepB({ onNext, onBack }: StepBProps) {
  const [createInterimAuthority, {isLoading}] = useCreateIntrimAuthorityMutation();
  const stepBInitialValues = {
        has_title_deed: false,
        title_deed: "",
        names_of_promoters: "",
       
       infrastructure: "",
      }
  const stepBValidation = Yup.object({
        has_title_deed: Yup.boolean().required("This field is required"),
        names_of_promoters: Yup.string().required("This field is required"),
       infrastructure: Yup.string().required("This field is required"),

  });
  const onSubmit = async (values: FormValues) => {
        const formData = new FormData();
        formData.append('has_title_deed', values.has_title_deed ? 'true' : 'false');
        if (values.title_deed) {
          formData.append('title_deed', values.title_deed);
        }
        formData.append('names_of_promoters', values.names_of_promoters);
        formData.append('infrastructure', values.infrastructure);
        
        await createInterimAuthority(formData).unwrap().then((res) => {
          console.log(res);
          if (res) {
            onNext(res);
          } else {
            toast.error("No ID returned from server");
          }
         }).catch((err) => {
          console.log(err);
          toast.error("Error submitting details, please try again later");
         });
        // Proceed to the next step
       
  };
      const handlePreviousStep = () => {
          onBack();
      };
  return (
     <AppForm initialValues={stepBInitialValues} onSubmit={onSubmit} validationSchema={stepBValidation} onError={() => toast.error("Please fix the errors in the form")}>
        <div className="border-t  border-gray-900/10  dark:border-gray-400">
      <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">LOCATION AND LAND</h2>
    </div>
    <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
    <div className="sm:col-span-full">
        <RadioInputField name="has_title_deed" label="Do you already have a title deed?" options={options} />
        </div>
        <div className="sm:col-span-full">
          <FileField name="title_deed" label="Please attach a photocopy of the land title" required />
        </div>
        <div className="sm:col-span-full">
          <RichEditorField name="infrastructure" label="Describe the existing infrastructure to be used" required />
        </div>
       
        <div className="sm:col-span-full">
          <TextAreaField name="names_of_promoters" label="Name the promoters of the University project" required />
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

export default StepB