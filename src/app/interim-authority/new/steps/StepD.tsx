import { AppForm, FileField, SubmitButton } from "@/components/forms";
import { usePatchIntrimAuthorityMutation } from "@/redux/features/license-api-slice";
import React from "react";
import { toast } from "react-toastify";

import * as Yup from "yup";
type StepDProps = {
  onBack: () => void;
  data?: IntrimAuthority;
  onNext: (data: IntrimAuthority) => void;
}
type FormValues = { 
      promoters?: string | File,
      project_proposal?: string | File
}
function StepD({ onBack,data, onNext }: StepDProps) {
  const [patchIntrimAuthority, {isLoading}] = usePatchIntrimAuthorityMutation();
  const stepDInitialValues = {
        promoters: data?.promoters || "",
        project_proposal: data?.project_proposal || "",
      }

  // keep the original initial values to detect removals
  const initialValuesRef = React.useRef(stepDInitialValues);
  const stepDValidation = Yup.object({
        promoters: Yup.mixed().required("This field is required"),
        project_proposal: Yup.mixed().required("This field is required"),

  });
  const onSubmit = async (values: FormValues) => {
        const formdata = new FormData();
        // list file fields so we treat them specially
        const fileFields: (keyof FormValues)[] = ["promoters", "project_proposal"];

        Object.entries(values).forEach(([key, value]) => {
          if (fileFields.includes(key as keyof FormValues)) {
            // file field handling
            if (value instanceof File) {
              // user selected/replaced a file -> send it
              formdata.append(key, value);
            } else if (value === null && initialValuesRef.current[key as keyof FormValues]) {
              // user removed an existing file -> signal backend to delete
              formdata.append(`${key}_remove`, "1");
            } else {
              // value is a string (existing URL/name) -> do nothing (keep existing file)
            }
          } else {
            // non-file fields: append if present
            if (value !== undefined && value !== null && value !== "") {
              formdata.append(key, String(value));
            }
          }
        });

        try {
          const res = await patchIntrimAuthority({ id: Number(data?.id) || 0, data: formdata }).unwrap();
          if (res) {
            toast.success("Details saved successfully. Please preview your application before submission.");
            onNext(res);
          } else {
            toast.error("No ID returned from server");
          }
        } catch (err) {
          console.log(err);
          toast.error("Error submitting details, please try again later");
        }
  }
        
        // Proceed to the next step
        
  
   const handlePreviousStep = () => {
          onBack();
      };
  return (
 <AppForm initialValues={stepDInitialValues} onSubmit={onSubmit} validationSchema={stepDValidation} onError={() => toast.error("Please fix the errors in the form")}>
            
    <div className="border-t  border-gray-900/10  dark:border-gray-400">
      <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">OTHER DOCUMENTS</h2>
    </div>
     <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
       
            <div className="sm:col-span-full">
              <FileField name="promoters" label="Names and Signatures of the promoters"  required />
            </div>
            <div className="sm:col-span-full">
             <label>Please attach a detailed project proposal containing the following:</label>
             <ul
                className="list-disc list-inside"
              >
                <li>Background of the promoters</li>
                <li>Vision and Mission of the proposed University</li>
                <li>Academic programmes to be offered</li>
                <li>Market demand analysis</li>
                <li>Infrastructure and facilities plan</li>
                <li>Financial projections and funding sources</li>
                <li>Governance and management structure</li>
                <li>Compliance with regulatory requirements</li>
              </ul>
            </div>
           
            <div className="sm:col-span-full">
              <FileField name="project_proposal" label="Attach Proposal" required />
            </div>
            
       
                </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                  
                      <button type="button" className="rounded-md flex  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-red-500" onClick={handlePreviousStep}>
                          Previous
                      </button>
              
                     
                      <SubmitButton isLoading={isLoading} title="Save & Preview" className="rounded-md flex min-w-32  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-sky-600"/>
                 
                 
      
                  </div>
    </AppForm>
  )
}

export default StepD