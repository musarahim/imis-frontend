"use client";
import {
    AppForm,
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
  bank_name: string | "";
  branch: string | "";
  account_name: string | "";
  account_number: string | "";
  account_type: string | "";
};

const accountTypes = [
  { value: "savings", label: "Savings" },
  { value: "current", label: "Current" },
  { value: "fixed_deposit", label: "Fixed Deposit" },
  { value: "joint_account", label: "Joint Account" },
];

function StepH({ onNext, onBack, data }: StepProps) {
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();

  const stepHInitialValues = {
    bank_name: data?.bank_name || "",
    branch: data?.branch || "",
    account_name: data?.account_name || "",
    account_number: data?.account_number || "",
    account_type: data?.account_type || "",
  };

  const stepHValidation = Yup.object({
    bank_name: Yup.string().required("Bank name is required"),
    branch: Yup.string().required("Branch is required"),
    account_name: Yup.string().required("Account name is required"),
    account_number: Yup.string().required("Account number is required"),
    account_type: Yup.string().required("Account type is required"),
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
    console.log("Submitting Step H with data:", values);
    await updateEmployee({
      id: data?.id ? Number(data.id) : 0,
      data: formdata,
    })
      .unwrap()
      .then((res) => {
        //toast.success("Step H data saved successfully");
        onNext(res);
      })
      .catch((err) => {
        toast.error(
          err?.data?.message || "Failed to save Step H data. Please try again.",
        );
      });
  };

  const handlePreviousStep = () => {
    onBack();
  };

  return (
    <AppForm
      initialValues={stepHInitialValues}
      onSubmit={onSubmit}
      validationSchema={stepHValidation}
    >
      <div className="border-t  border-gray-900/10  dark:border-gray-400">
        <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">
          Bank Details
        </h2>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
        <div className="sm:col-span-full">
          <InputField name="bank_name" label="Bank Name" required />
        </div>
        <div className="sm:col-span-3">
          <InputField name="branch" label="Branch" required />
        </div>
        <div className="sm:col-span-3">
          <InputField name="account_name" label="Account Name" required />
        </div>

        <div className="sm:col-span-3">
          <InputField name="account_number" label="Account Number" required />
        </div>

        <div className="sm:col-span-3">
          <SelectField
            name="account_type"
            label="Account Type"
            options={accountTypes}
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

export default StepH;
