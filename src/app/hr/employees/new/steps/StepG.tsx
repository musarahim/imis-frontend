"use client";
import {
    AppForm,
    DatePicker,
    FileField,
    ImageField,
    InputField,
    SelectField,
    SubmitButton,
} from "@/components/forms";
import { useUpdateEmployeeMutation } from "@/redux/features/hr-api-slice";

import { toast } from "sonner";
import * as Yup from "yup";

type StepProps = {
  onBack: () => void;
  onNext: (data?: Employee) => void;
  data?: Employee;
};
type FormValues = {
  nin: string | "";
  national_id_document: string | File;
  passport_photo: string | File;
  license_number: string | "";
  class_of_license: string | "";
  date_of_issue: string | "";
  date_of_expiry: string | "";
  license_document: string | File;
  passport_number: string | "";
  passport_type: string | "";
  issue_date: string | "";
  expiry_date: string | "";
  place_of_issue: string | "";
};

const passportTypes = [
  { value: "ordinary", label: "Ordinary" },
  { value: "service", label: "Service/Official" },
  { value: "diplomatic", label: "Diplomatic" },
];

function StepG({ onNext, onBack, data }: StepProps) {
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();

  const stepGInitialValues = {
    nin: data?.nin || "",
    national_id_document: data?.national_id_document || "",
    passport_photo: data?.passport_photo || "",
    license_number: data?.license_number || "",
    class_of_license: data?.class_of_license || "",
    date_of_issue: data?.date_of_issue || "",
    date_of_expiry: data?.date_of_expiry || "",
    license_document: data?.license_document || "",
    passport_number: data?.passport_number || "",
    passport_type: data?.passport_type || "",
    issue_date: data?.issue_date || "",
    expiry_date: data?.expiry_date || "",
    place_of_issue: data?.place_of_issue || "",
  };

  const stepGValidation = Yup.object({
    nin: Yup.string().required("NIN is required"),
    national_id_document: Yup.mixed(),
    passport_photo: Yup.mixed(),
    license_number: Yup.string(),
    class_of_license: Yup.string(),
    date_of_issue: Yup.string(),
    date_of_expiry: Yup.string(),
    license_document: Yup.mixed(),
    passport_number: Yup.string(),
    passport_type: Yup.string(),
    issue_date: Yup.string(),
    expiry_date: Yup.string(),
    place_of_issue: Yup.string(),
  });

  const onSubmit = async (values: FormValues) => {
    const formdata = new FormData();
    const fileFields = [
      "national_id_document",
      "passport_photo",
      "license_document",
    ];

    // Helper function to append non-null values
    const appendIfExists = (key: string, value: unknown) => {
      if (value !== null && value !== undefined) {
        if (fileFields.includes(key) && value instanceof File) {
          formdata.append(key, value);
        } else if (!fileFields.includes(key)) {
          // Handle special date formatting
          if (value instanceof Date) {
            formdata.append(key, value.toISOString().split("T")[0]);
          } else {
            formdata.append(key, String(value));
          }
        }
      }
    };

    // Process all form values
    Object.entries(values).forEach(([key, value]) => {
      appendIfExists(key, value);
    });
    console.log("Submitting Step B with data:", values);
    await updateEmployee({
      id: data?.id ? Number(data.id) : 0,
      data: formdata,
    })
      .unwrap()
      .then((res) => {
        //toast.success("Step B data saved successfully");
        onNext(res);
      })
      .catch((err) => {
        toast.error(
          err?.data?.message || "Failed to save Step B data. Please try again.",
        );
      });
  };

  const handlePreviousStep = () => {
    onBack();
  };

  return (
    <AppForm
      initialValues={stepGInitialValues}
      onSubmit={onSubmit}
      validationSchema={stepGValidation}
    >
      <div className="border-t  border-gray-900/10  dark:border-gray-400">
        <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">
          IDentification Details
        </h2>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
        <div className="sm:col-span-full">
          <InputField
            name="nin"
            label="National Identification Number (NIN)"
            required
          />
        </div>
        <div className="sm:col-span-full">
          <FileField
            name="national_id_document"
            label="Copy of National ID Document"
            accept=".pdf"
          />
        </div>
        <div className="sm:col-span-full">
          <ImageField name="passport_photo" label="Passport Photo" />
        </div>

        <div className="sm:col-span-3">
          <InputField name="license_number" label="Driving License Number" />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="class_of_license"
            label="Class of Driving License"
          />
        </div>
        <div className="sm:col-span-3">
          <DatePicker name="date_of_issue" label="Date of Issue" />
        </div>
        <div className="sm:col-span-3">
          <DatePicker name="date_of_expiry" label="Date of Expiry" />
        </div>
        <div className="sm:col-span-full">
          <FileField
            name="license_document"
            label="Copy of Driving License Document"
            accept=".pdf"
          />
        </div>
        <div className="sm:col-span-3">
          <InputField name="passport_number" label="Passport Number" />
        </div>
        <div className="sm:col-span-3">
          <SelectField
            name="passport_type"
            label="Passport Type"
            options={passportTypes}
          />
        </div>
        <div className="sm:col-span-3">
          <DatePicker name="issue_date" label="Date of Issue" />
        </div>
        <div className="sm:col-span-3">
          <DatePicker name="expiry_date" label="Date of Expiry" />
        </div>
        <div className="sm:col-span-full">
          <InputField name="place_of_issue" label="Place of Issue" />
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
          isLoading={isUpdating}
          title="Save & Continue"
          className="rounded-md flex min-w-32  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-sky-600"
        />
      </div>
    </AppForm>
  );
}

export default StepG;
