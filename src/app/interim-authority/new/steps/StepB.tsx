"use client"
import { AppForm, FileField, RadioInputField, RichEditorField, SubmitButton, TextAreaField } from "@/components/forms";
import { useCreateIntrimAuthorityMutation, usePatchIntrimAuthorityMutation, useRetrieveIntrimAuthorityQuery } from "@/redux/features/license-api-slice";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import * as Yup from "yup";
type StepBProps = {
  onNext: (data?: IntrimAuthority) => void;
  onBack: () => void;
  id?:number
}
type FormValues = { 
    has_title_deed: string,
    title_deed?: string | File,
    names_of_promoters: string,
   infrastructure: string,
  
}

const options = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
]
function StepB({ onNext, onBack, id }: StepBProps) {
  const [createInterimAuthority, { isLoading: isCreating }] = useCreateIntrimAuthorityMutation();
  //fetch initial values if id is provided
  const { data: initialValues } = useRetrieveIntrimAuthorityQuery(id ?? skipToken);
  const [patchIntrimAuthority, { isLoading: isPatching }] = usePatchIntrimAuthorityMutation();
  const isLoading = isCreating || isPatching;

  const stepBInitialValues: FormValues = {
        has_title_deed: String(initialValues?.has_title_deed ?? "false"),
        title_deed: initialValues?.title_deed ?? "",
        names_of_promoters: initialValues?.names_of_promoters || "",
       infrastructure: initialValues?.infrastructure || "",
      }
      
  const stepBValidation = Yup.object({
        has_title_deed: Yup.string().required("This field is required"),
        names_of_promoters: Yup.string().required("This field is required"),
       infrastructure: Yup.string().required("This field is required"),
       title_deed: Yup.mixed().when('has_title_deed', (has_title_deed: string[] , schema: Yup.MixedSchema) => {
        return has_title_deed[0] === "true"
          ? schema.required('Please attach the title deed')
          : schema.notRequired();
       }),

  });

  
  const onSubmit = async (values: FormValues) => {
        const formData = new FormData();
        // values.has_title_deed is "true" or "false" string coming from the radio options
        formData.append('has_title_deed', values.has_title_deed);
        if (values.title_deed instanceof File) {
          formData.append('title_deed', values.title_deed);
        } else {
          // If user explicitly removed an existing file, signal backend to remove it
          // (FileField should set the form value to null when user clicks Remove)
          if (values.title_deed === null && initialValues?.title_deed) {
            formData.append('title_deed_remove', '1');
          }
          // If values.title_deed is a string (existing URL/name), do nothing -> backend keeps existing file
        }
        formData.append('names_of_promoters', values.names_of_promoters);
        formData.append('infrastructure', values.infrastructure);
        
          try {
       let res;
      if (id) {
        // update existing
        res = await patchIntrimAuthority({ id, data: formData }).unwrap();
      } else {
        // create new
        res = await createInterimAuthority(formData).unwrap();
      }

      if (res) {
        onNext(res); // pass response object back to parent
      } else {
        toast.error("No response from server");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error submitting details, please try again later");
    }
  };
       
  
      const handlePreviousStep = () => {
          onBack();
      };
  return (
     <AppForm initialValues={stepBInitialValues} onSubmit={onSubmit} validationSchema={stepBValidation}>
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