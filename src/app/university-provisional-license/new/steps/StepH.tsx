"use client";
import { AppForm, FileField, RichEditorField, SubmitButton, TextAreaField } from "@/components/forms";
import { usePatchProvisionalLicenseMutation } from "@/redux/features/license-api-slice";
import { toast } from "react-toastify";
import * as Yup from "yup";
type StepCProps = {
  onBack: () => void;
  onNext: (data?: any) => void;
  data?: UniversityProvisionalLicense;
};

type FormValues = {
    vision: string | ""
    mission: string | ""
    specific_objectives: string | ""
    stractegic_plan: File | null
    programmes: File | null
    area_of_competence: string | ""
    feature_programmes: string | ""
};
function StepH({ onBack, onNext, data }: StepCProps) {
    const [patchProvisionalLicense, { isLoading }] =
              usePatchProvisionalLicenseMutation();

    const initialValues: FormValues = {
        vision: data?.vision || "",
        mission: data?.mission || "",
        specific_objectives: data?.specific_objectives || "",
        stractegic_plan: data?.stractegic_plan || null,
        programmes: data?.programmes || null,
        area_of_competence: data?.area_of_competence || "",
        feature_programmes: data?.feature_programmes || "",
    };

    const validationSchema =Yup.object().shape({
        vision: Yup.string().required("Required"),
        mission: Yup.string().required("Required"),
        specific_objectives: Yup.string().required("Required"),
        stractegic_plan: Yup.mixed().required("Required"),
        programmes: Yup.mixed().required("Required"),
        area_of_competence: Yup.string().required("Required"),
        feature_programmes: Yup.string().required("Required"),
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
            toast.error("Error saving Step H data");
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
              VISION AND MISSION OF THE UNIVERSITY
            </h2>
          </div>
           <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
                <div className="sm:col-span-full">
                    <TextAreaField
                        name="vision"
                        label="What is the vision of the university?"
                        required
                    />
                </div>
                <div className="sm:col-span-full">
                    <TextAreaField
                        name="mission"
                        label="What is the mission of the University?"
                        required
                    />
                </div>
                <div className="sm:col-span-full">
                    <TextAreaField
                        name="specific_objectives"
                        label="What are the specific objectives of the university?"
                        required
                    />
                </div>
                <div className="sm:col-span-full">
          <FileField
            name="stractegic_plan"
            label="Upload the strategic plan of the university"
            required
          />
        </div>
        <div className="sm:col-span-full">
          <FileField
            name="programmes"
            label="Upload the programmes to be offered by the university"
            required
          />
        </div>
        <div className="sm:col-span-full">
                    <RichEditorField
                        name="area_of_competence"
                        label="What is the area of competence of the university?"
                        required
                    />
                </div>
                <div className="sm:col-span-full">
                    <RichEditorField
                        name="feature_programmes"
                        label="What are the future planned programmes and when will they start?"
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

export default StepH