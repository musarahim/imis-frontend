"use client";
import { AppForm, FileField, SubmitButton } from "@/components/forms";
import { usePatchProvisionalLicenseMutation } from "@/redux/features/license-api-slice";
import { toast } from "react-toastify";
import * as Yup from "yup";
type StepCProps = {
  onBack: () => void;
  onNext: (data?: UniversityProvisionalLicense) => void;
  data?: UniversityProvisionalLicense;
};

type FormValues = {
  signatures: File | null;
  member_cvs: File | null;
  finance_control: File | null;
  detailed_programmes: File | null;
  physical_education_facilities: File | null;
};

function StepJ({ onBack, onNext, data }: StepCProps) {
  const [patchProvisionalLicense, { isLoading }] =
    usePatchProvisionalLicenseMutation();
  const initialValues: FormValues = {
    signatures: data?.signatures || null,
    member_cvs: data?.member_cvs || null,
    finance_control: data?.finance_control || null,
    detailed_programmes: data?.detailed_programmes || null,
    physical_education_facilities: data?.physical_education_facilities || null,
  };
  const validationSchema = Yup.object().shape({
    signatures: Yup.mixed().required("Required"),
    member_cvs: Yup.mixed().required("Required"),
    finance_control: Yup.mixed().required("Required"),
    detailed_programmes: Yup.mixed().required("Required"),
    physical_education_facilities: Yup.mixed().required("Required"),
  });
  const onSubmit = async (values: FormValues) => {
    const formdata = new FormData();

    // Handle all file fields
    Object.entries(values).forEach(([key, value]) => {
      const fieldKey = key as keyof FormValues;
      
      if (value instanceof File) {
        // User selected/replaced a file -> send it
        formdata.append(key, value);
      } else if (value === null && initialValues[fieldKey]) {
        // User removed an existing file -> signal backend to delete
        formdata.append(`${key}_remove`, "1");
      }
      // If value is a string (existing URL/name) -> do nothing (keep existing file)
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
        toast.error("Error saving Step J data");
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
        PLEASE ATTACH THE FOLLOWING DOCUMENTS
        </h2>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
         <div className="sm:col-span-full">
                    <FileField
                        name="signatures"
                        label="Signatures of the Officers of the University"
                        required
                    />
                </div>
                <div className="sm:col-span-full">
                    <FileField
                        name="member_cvs"
                        label="CVs of the members of the university (governance, administration and academic)"
                        required
                    />
                </div>                
                <div className="sm:col-span-full">
                    <FileField
                        name="finance_control"
                        label="The financial control mechanism in place"
                        required
                    />
                </div>
                <div className="sm:col-span-full">
                    <FileField
                        name="detailed_programmes"
                        label="Detailed explanation of the programmes to be offered"
                        required
                    />
                </div>
                <div className="sm:col-span-full">
                    <FileField
                        name="physical_education_facilities"
                        label="The physical and educational facilities to be put in place"
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
          title="Save & Preview"
          className="rounded-md flex min-w-32  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-sky-600"
        />
      </div>
    </AppForm>
  );
}

export default StepJ;
