"use client";
import { AppForm, InputField, SubmitButton } from "@/components/forms";
import { usePatchProvisionalLicenseMutation } from "@/redux/features/license-api-slice";
import { toast } from "react-toastify";
import * as Yup from "yup";
type StepCProps = {
  onBack: () => void;
  onNext: (data?: any) => void;
  data?: UniversityProvisionalLicense;
};

type FormValues = {
    total_number_of_students: number | 0
    arts_percentage: number | 0
    social_sciences_percentage: number | 0
    basic_sciences_percentage: number | 0
    arts_education_percentage: number | 0
    science_education_percentage: number | 0
    agriculture_percentage: number | 0
    medicine_percentage: number | 0
    veterinary_percentage: number | 0
    engineering_percentage: number | 0
    technology_percentage: number | 0

};
function StepI({ onBack, onNext, data }: StepCProps) {
    const [patchProvisionalLicense, { isLoading }] =
              usePatchProvisionalLicenseMutation();
    const initialValues: FormValues = {
        total_number_of_students: data?.total_number_of_students || 0,
        arts_percentage: data?.arts_percentage || 0,
        social_sciences_percentage: data?.social_sciences_percentage || 0,
        basic_sciences_percentage: data?.basic_sciences_percentage || 0,
        arts_education_percentage: data?.arts_education_percentage || 0,
        science_education_percentage: data?.science_education_percentage || 0,
        agriculture_percentage: data?.agriculture_percentage || 0,
        medicine_percentage: data?.medicine_percentage || 0,
        veterinary_percentage: data?.veterinary_percentage || 0,
        engineering_percentage: data?.engineering_percentage || 0,
        technology_percentage: data?.technology_percentage || 0,
    };

    const validationSchema =Yup.object().shape({
        total_number_of_students: Yup.number().min(0, "Must be at least 0").required("Required"),
        arts_percentage: Yup.number().min(0, "Must be at least 0").required("Required"),
        social_sciences_percentage: Yup.number().min(0, "Must be at least 0").required("Required"),
        basic_sciences_percentage: Yup.number().min(0, "Must be at least 0").required("Required"),
        arts_education_percentage: Yup.number().min(0, "Must be at least 0").required("Required"),
        science_education_percentage: Yup.number().min(0, "Must be at least 0").required("Required"),
        agriculture_percentage: Yup.number().min(0, "Must be at least 0").required("Required"),
        medicine_percentage: Yup.number().min(0, "Must be at least 0").required("Required"),
        veterinary_percentage: Yup.number().min(0, "Must be at least 0").required("Required"),
        engineering_percentage: Yup.number().min(0, "Must be at least 0").required("Required"),
        technology_percentage: Yup.number().min(0, "Must be at least 0").required("Required"),
    });

    const onSubmit = async (values: FormValues) => {
           const formdata = new FormData();
           Object.entries(values).forEach(([key, value]) => {
             if (value !== undefined && value !== null) {
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
              STUDENT POPULATION DISTRIBUTION
            </h2>
          </div>
           <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
                <div className="sm:col-span-full">
            <InputField
                name="total_number_of_students"
                label="Total number of students the university intends to admit"
                required
            />
          </div>
           <div className="sm:col-span-full">
              <h3 className="text-base/4  text-gray-800 dark:text-gray-200">
              Planned/estimated programme distribution of students (number and percentage)  
            </h3>
            </div>
               <div className="sm:col-span-2">
            <InputField
                name="arts_percentage"
                label="Arts (%)"
                required
            />
          </div> 
          <div className="sm:col-span-2">
            <InputField
                name="social_sciences_percentage"
                label="Social Sciences (%)"
                required
            />
          </div>
        <div className="sm:col-span-2">
            <InputField
                name="basic_sciences_percentage"
                label="Basic Sciences (%)"
                required
            />
          </div>
        <div className="sm:col-span-2">
            <InputField
                name="arts_education_percentage"
                label="Arts Education (Teaching) (%)"
                required
            />
          </div>
        <div className="sm:col-span-2">
            <InputField
                name="agriculture_percentage"
                label="Agriculture (%)"
                required
            />
          </div>        
          <div className="sm:col-span-2">
            <InputField
                name="engineering_percentage"
                label="Engineering/ Technology (%)"
                required
            />
          </div>
          <div className="sm:col-span-3">
            <InputField
                name="medicine_percentage"
                label="Medicine (Medicine Pharmacy, dentistry) (%)"
                required
            />
          </div>
            <div className="sm:col-span-3">
            <InputField
                name="veterinary_percentage"
                label="Veterinary medicine (%)"
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

export default StepI