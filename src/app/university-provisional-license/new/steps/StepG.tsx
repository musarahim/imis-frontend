"use client";
import { AppForm, FileField, InputField, SubmitButton, TextAreaField } from "@/components/forms";
import { usePatchProvisionalLicenseMutation } from "@/redux/features/license-api-slice";
import { toast } from "react-toastify";
import * as Yup from "yup";
type StepCProps = {
  onBack: () => void;
  onNext: (data?: any) => void;
  data?: UniversityProvisionalLicense;
};
type FormValues = {
    other_assets:string|""
    anual_budget:number | 0
    fee_structure:File | null
    fees_percent_budget:number | 0
    other_income_sources:string | ""
    infrastructure_development:number | 0
    research_development:number | 0
    computer_hardware_software:number | 0
    science_lab_equipment:number | 0
    library_equipment:number | 0
    staff_development:number | 0
    staff_salaries:number | 0
    current_bankers:string | ""
};



function StepG({ onBack, onNext, data }: StepCProps) {
  const [patchProvisionalLicense, { isLoading }] =
        usePatchProvisionalLicenseMutation();
  const initialValues: FormValues = {
    other_assets: data?.other_assets || "",
    anual_budget: data?.anual_budget || 0,
    fee_structure: data?.fee_structure || null,
    fees_percent_budget: data?.fees_percent_budget || 0,
    other_income_sources: data?.other_income_sources || "",
    infrastructure_development: data?.infrastructure_development || 0,
    research_development: data?.research_development || 0,
    computer_hardware_software: data?.computer_hardware_software || 0,
    science_lab_equipment: data?.science_lab_equipment || 0,
    library_equipment: data?.library_equipment || 0,
    staff_development: data?.staff_development || 0,
    staff_salaries: data?.staff_salaries || 0,
    current_bankers: data?.current_bankers || "",
  };
  const validationSchema =Yup.object().shape({
    other_assets: Yup.string().required("Required"),
    anual_budget: Yup.number().min(0, "Must be at least 0").required("Required"),
    fee_structure: Yup.mixed().required("Required"),
    fees_percent_budget: Yup.number().min(0, "Must be at least 0").required("Required"),
    other_income_sources: Yup.string().required("Required"),
    infrastructure_development: Yup.number().min(0, "Must be at least 0").required("Required"),
    research_development: Yup.number().min(0, "Must be at least 0").required("Required"),
    computer_hardware_software: Yup.number().min(0, "Must be at least 0").required("Required"),
    science_lab_equipment: Yup.number().min(0, "Must be at least 0").required("Required"),
    library_equipment: Yup.number().min(0, "Must be at least 0").required("Required"),
    staff_development: Yup.number().min(0, "Must be at least 0").required("Required"),
    staff_salaries: Yup.number().min(0, "Must be at least 0").required("Required"),
    current_bankers: Yup.string().required("Required"),
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
          toast.error("Error saving Step G data");
          console.error("Error:", err);
        });
    }
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
              FINANCES AND THEIR MANAGEMENT
            </h2>
          </div>
         
    
          <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-full">
          <TextAreaField
            name="other_assets"
            label="What other assets, besides land and buildings, does the university own? "
            required
          />
        </div>
            <div className="sm:col-span-full">
          <InputField
            name="annual_budget"
            label="What is the proposed annual budget of the university?"
            required
            type="number"
          />
        </div>
          <div className="sm:col-span-full">
          <FileField
            name="fee_structure"
            label="Upload the fee structure of the university"
            required
          />
        </div>
         <div className="sm:col-span-full">
          <InputField
            name="fees_percent_budget"
            label="How much is the percentage of the budget to be derived from fees?"
            required
            type="number"
          />
          </div>
          <div className="sm:col-span-full">
          <TextAreaField
            name="other_income_sources"
            label="State other sources of income that will support the university"
            required
          />
        </div>
          <div className="sm:col-span-3">
          <InputField
            name="infrastructure_development"
            label="Amount allocated for infrastructure development"
            required
            type="number"
          />
          </div>
          <div className="sm:col-span-3">
          <InputField
            name="research_development"
            label="Amount allocated for research development"
            required
            type="number"
          />
          </div>
          <div className="sm:col-span-3">
          <InputField
            name="computer_hardware_software"
            label="Amount allocated for computer hardware and software"
            required
            type="number"
          />
          </div>
          <div className="sm:col-span-3">
          <InputField
            name="science_lab_equipment"
            label="Amount allocated for science lab equipment"
            required
            type="number"
          />
          </div>
          <div className="sm:col-span-3">
          <InputField
            name="library_equipment"
            label="Amount allocated for library equipment"
            required
            type="number"
          />
          </div>
          <div className="sm:col-span-3">
          <InputField
            name="staff_development"
            label="Amount allocated for staff development"
            required
            type="number"
          />
          </div>
          <div className="sm:col-span-3">
          <InputField
            name="staff_salaries"
            label="What percentage of the budget is given to staff salaries"
            required
            type="number"
          />
          </div>
          <div className="sm:col-span-full">
          <TextAreaField
            name="current_bankers"
            label="Who are the current bankers of the university?"
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

export default StepG