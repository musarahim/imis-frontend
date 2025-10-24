"use client";
import { AppForm, RichEditorField, SubmitButton } from "@/components/forms";
import { usePatchProvisionalLicenseMutation } from "@/redux/features/license-api-slice";
import { toast } from "react-toastify";
import * as Yup from "yup";
type StepCProps = {
  onBack: () => void;
  onNext: (data?: any) => void;
  data?: UniversityProvisionalLicense;
};
type FormValues = {
    institution_ownership:string|""
    university_promoters : string | ""
};

function StepF({ onBack, onNext, data }: StepCProps) {
     const [patchProvisionalLicense, { isLoading }] =
          usePatchProvisionalLicenseMutation();
      const initialValues: FormValues = {
        institution_ownership: data?.institution_ownership || "",
        university_promoters: data?.university_promoters || "",
      };
      const validationSchema =Yup.object().shape({
        institution_ownership: Yup.string().required("Required"),
        university_promoters: Yup.string().required("Required"),
      });
  const onSubmit = async (values: FormValues) => {
        const formdata = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            formdata.append(
              key,
              typeof value === "number" || typeof value === "boolean" ? String(value) : value
            );
          }
        });
    
        console.log("Form data:", formdata);
        await patchProvisionalLicense({
          id: data?.id ? Number(data.id) : 0,
          data: formdata,
        })
          .unwrap()
          .then((res) => {
            if (res) {
              onNext(res);
            }
          })
          .catch((err) => {
            toast.error("Error saving Step C data");
            console.error("Error:", err);
          });
      };
      const handlePreviousStep = () => {
        onBack();
      };
  
  return (
    <AppForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
             <div className="border-t  border-gray-900/10  dark:border-gray-400">
            <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">
              OWNERSHIP OF THE UNIVERSITY
            </h2>
          </div>
           <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
          <div className="sm:col-span-full">
              <h3 className="text-base/4  text-gray-800 dark:text-gray-200">
              Academic Staff
            </h3>
            </div>
             <div className="sm:col-span-full">
                      <RichEditorField
                        name="institution_ownership"
                        label="Please indicate the owners of the proposed university, clearly stating how they will retain control (e.g. representation on the Council, Senate, appointments etc)"
                        required
                        
                      />
                    </div>

                     <div className="sm:col-span-full">
                      <RichEditorField
                        name="university_promoters"
                        label="Who are the promoters of the university?"
                        required
                      />
                    </div>
                    </div>
                      <div className="mt-6 flex items-center justify-end gap-x-6">
                                       <button
                                         type="button"
                                         className="rounded-md flex  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-red-500"
                                         onClick={handlePreviousStep}
                                       >
                                         Previous
                                       </button>
                               
                                       <SubmitButton
                                         isLoading={isLoading}
                                         title="Save & Continue"
                                         className="rounded-md flex min-w-32  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-sky-600"
                                       />
                                     </div>

             </AppForm>
  )
}

export default StepF