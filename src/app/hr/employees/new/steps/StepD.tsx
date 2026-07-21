"use client";
import {
    AppForm,
    DatePicker,
    InputField,
    PhoneNumberInput,
    SubmitButton,
    TextAreaField,
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
  next_of_kin_name: string | "";
  next_of_kin_relationship: string | "";
  next_of_kin_date_of_birth: string | "";
  occupation: string | "";
  work_place: string | "";
  next_of_kin_phone_number: string | "";
  next_of_kin_email: string | "";
  next_of_kin_address: string | "";
};

function StepD({ onNext, onBack, data }: StepProps) {
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();

  const stepBInitialValues = {
    next_of_kin_name: data?.next_of_kin_name || "",
    next_of_kin_relationship: data?.next_of_kin_relationship || "",
    next_of_kin_date_of_birth: data?.next_of_kin_date_of_birth || "",
    occupation: data?.occupation || "",
    work_place: data?.work_place || "",
    next_of_kin_phone_number: data?.next_of_kin_phone_number || "",
    next_of_kin_email: data?.next_of_kin_email || "",
    next_of_kin_address: data?.next_of_kin_address || "",
  };

  const stepBValidation = Yup.object({
    next_of_kin_name: Yup.string().required("Next of kin name is required"),
    next_of_kin_relationship: Yup.string().required(
      "Next of kin relationship is required",
    ),
    next_of_kin_date_of_birth: Yup.string().required(
      "Next of kin date of birth is required",
    ),
    occupation: Yup.string().required("Occupation is required"),
    work_place: Yup.string().required("Work place is required"),
    next_of_kin_phone_number: Yup.string().required(
      "Next of kin phone number is required",
    ),
    next_of_kin_email: Yup.string().email("Invalid email"),
    next_of_kin_address: Yup.string().required(
      "Next of kin address is required",
    ),
  });

  const onSubmit = async (values: FormValues) => {
    const formdata = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          // For arrays, append each item individually
          value.forEach((item) => {
            if (item !== null && item !== undefined) {
              formdata.append(key, item.toString());
            }
          });
        } else {
          formdata.append(key, value.toString());
        }
      }
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
      initialValues={stepBInitialValues}
      onSubmit={onSubmit}
      validationSchema={stepBValidation}
    >
      <div className="border-t  border-gray-900/10  dark:border-gray-400">
        <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">
          Next of Kin Information
        </h2>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
        <div className="sm:col-span-full">
          <InputField
            name="next_of_kin_name"
            label="Next of Kin Name"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="next_of_kin_relationship"
            label="Relationship"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <DatePicker
            name="next_of_kin_date_of_birth"
            label="Date of Birth"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField name="occupation" label="Occupation" required />
        </div>
        <div className="sm:col-span-3">
          <InputField name="work_place" label="Work Place" required />
        </div>
        <div className="sm:col-span-3">
          <PhoneNumberInput
            name="next_of_kin_phone_number"
            label="Phone Number"
            required
          />
        </div>

        <div className="sm:col-span-3">
          <InputField name="next_of_kin_email" label="Email" />
        </div>

        <div className="sm:col-span-full">
          <TextAreaField
            name="next_of_kin_address"
            label="Next of Kin Address"
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
          isLoading={isUpdating}
          title="Save & Continue"
          className="rounded-md flex min-w-32  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-sky-600"
        />
      </div>
    </AppForm>
  );
}

export default StepD;
