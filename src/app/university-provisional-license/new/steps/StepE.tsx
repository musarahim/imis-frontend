"use client";
import { AppForm, InputField, RichEditorField, SubmitButton } from "@/components/forms";
import { usePatchProvisionalLicenseMutation } from "@/redux/features/license-api-slice";
import { toast } from "react-toastify";
import * as Yup from "yup";
type StepCProps = {
  onBack: () => void;
  onNext: (data?: any) => void;
  data?: UniversityProvisionalLicense;
};
type FormValues = {
    intended_full_time_academic_staff:number |0
    intended_part_time_academic_staff : number | 0
    intended_full_time_admin_staff : number | 0
    intended_support_staff : number | 0
    council_members:string|""
    proposed_chancellor:string|""
    proposed_vice_chancellor:string|""
    proposed_university_secretary:string|""
    proposed_academic_registrar:string|""
    heads_of_faculties:string|""
};
function StepE({ onBack, onNext, data }: StepCProps) {
  const [patchProvisionalLicense, { isLoading }] =
      usePatchProvisionalLicenseMutation();
  const initialValues: FormValues = {
    intended_full_time_academic_staff: data?.intended_full_time_academic_staff || 0,
    intended_part_time_academic_staff: data?.intended_part_time_academic_staff || 0,
    intended_full_time_admin_staff: data?.intended_full_time_admin_staff || 0,
    intended_support_staff: data?.intended_support_staff || 0,
    council_members: data?.council_members || "",
    proposed_chancellor: data?.proposed_chancellor || "",
    proposed_vice_chancellor: data?.proposed_vice_chancellor || "",
    proposed_university_secretary: data?.proposed_university_secretary || "",
    proposed_academic_registrar: data?.proposed_academic_registrar || "",
    heads_of_faculties: data?.heads_of_faculties || "",
  };
  const validationSchema = Yup.object().shape({
    intended_full_time_academic_staff: Yup.number()
      .min(0, "Must be at least 0")
      .required("Required"),
    intended_part_time_academic_staff: Yup.number()
      .min(0, "Must be at least 0")
      .required("Required"),
    intended_full_time_admin_staff: Yup.number()
      .min(0, "Must be at least 0")
      .required("Required"),
    intended_support_staff: Yup.number()
      .min(0, "Must be at least 0")
      .required("Required"),
    council_members: Yup.string().required("Required"),
    proposed_chancellor: Yup.string().required("Required"),
    proposed_vice_chancellor: Yup.string().required("Required"),
    proposed_university_secretary: Yup.string().required("Required"),
    proposed_academic_registrar: Yup.string().required("Required"),
    heads_of_faculties: Yup.string().required("Required"),  
  });
   const onSubmit = async (values: FormValues) => {
      const formdata = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formdata.append(
            key,
            typeof value === "number" || typeof value === "boolean" ? value.toString() : value
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
          onError={() => toast.error("Please fix the errors in the form")}
        >
          <div className="border-t  border-gray-900/10  dark:border-gray-400">
            <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">
              STAFF INFORMATION
            </h2>
          </div>
           <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
          <div className="sm:col-span-full">
              <h3 className="text-base/4  text-gray-800 dark:text-gray-200">
              Academic Staff
            </h3>
            </div>
             <div className="sm:col-span-full">
                      <InputField
                        name="full_time_academic_staff"
                        label="How many full time academic staff does the university intend to have?"
                        required
                        type="number"
                      />
                    </div>

                     <div className="sm:col-span-full">
                      <InputField
                        name="intended_part_time_academic_staff"
                        label="State the number of part-time staff the university intends to have?"
                        required
                        type="number"
                      />
                    </div>
            <div className="sm:col-span-full">
              <h3 className="text-base/4  text-gray-800 dark:text-gray-200">
              Administrative And Support Staff
            </h3>
            </div>
             <div className="sm:col-span-full">
                      <InputField
                        name="intended_full_time_admin_staff"
                        label="How many administrative staff do you intend to have?"
                        required
                        type="number"
                      />
                    </div>            
                   <div className="sm:col-span-full">
                      <InputField
                        name="intended_support_staff"
                        label="How many support staff do you intend to have?"
                        required
                        type="number"
                      />
                    </div>
            <div className="sm:col-span-full">
              <RichEditorField
                name="council_members"
                label="List all proposed members of the University Council"
                required
              />
            </div>
            <div className="sm:col-span-full">
                      <InputField
                        name="proposed_chancellor"
                        label="The Proposed Chancellor"
                        required
                        type="text"
                      />
                    </div>
           <div className="sm:col-span-full">
            <InputField
              name="proposed_vice_chancellor"
              label="The Proposed Vice Chancellor/Rector"
              required
              type="text"
              />
            </div>
            <div className="sm:col-span-full">
            <InputField
              name="proposed_university_secretary"
              label="The proposed University Secretary"
              required
              type="text"
              />
            </div>
            <div className="sm:col-span-full">
            <InputField
              name="proposed_academic_registrar"
              label="The Proposed Academic Registrar"
              required
              type="text"
              />
            </div>
            <div className="sm:col-span-full">
              <RichEditorField
                name="heads_of_faculties"
                label="The Deans of each of the faculties you have"
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

export default StepE