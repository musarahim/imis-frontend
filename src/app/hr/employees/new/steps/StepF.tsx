"use client";
import {
    AppForm,
    InputField,
    PhoneNumberInput,
    SelectField,
    SubmitButton,
} from "@/components/forms";
import { Separator } from "@/components/ui/separator";
import { useUpdateEmployeeMutation } from "@/redux/features/hr-api-slice";
import { toast } from "sonner";
import * as Yup from "yup";

type StepProps = {
  onBack: () => void;
  onNext: (data?: Employee) => void;
  data?: Employee;
};
type FormValues = {
  father_name: string | "";
  father_status: string | "";
  father_contact: string | "";
  mother_name: string | "";
  mother_status: string | "";
  mother_contact: string | "";
};

const status_options = [
  { value: "alive", label: "Alive" },
  { value: "deceased", label: "Deceased" },
];

function StepF({ onNext, onBack, data }: StepProps) {
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();

  const stepFInitialValues = {
    father_name: data?.father_name || "",
    father_status: data?.father_status || "",
    father_contact: data?.father_contact || "",
    mother_name: data?.mother_name || "",
    mother_status: data?.mother_status || "",
    mother_contact: data?.mother_contact || "",
  };

  const stepFValidation = Yup.object({
    father_name: Yup.string().required("Father's name is required"),
    father_status: Yup.string().required("Father's status is required"),
    father_contact: Yup.string(),
    mother_name: Yup.string().required("Mother's name is required"),
    mother_status: Yup.string().required("Mother's status is required"),
    mother_contact: Yup.string(),
  });

  const onSubmit = async (values: FormValues) => {
    console.log("Submitting Step F with data:", values);
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
      initialValues={stepFInitialValues}
      onSubmit={onSubmit}
      validationSchema={stepFValidation}
    >
      <div className="border-t  border-gray-900/10  dark:border-gray-400">
        <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">
          Parents Information
        </h2>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
        <div className="sm:col-span-full">
          <h3 className="text-base/8 font-semibold mt-2 text-gray-800 dark:text-white">
            Father&apos;s Details
          </h3>
          <Separator className="my-2" />
        </div>
        <div className="sm:col-span-full">
          <InputField name="father_name" label="Father's Name" required />
        </div>
        <div className="sm:col-span-3">
          <SelectField
            name="father_status"
            label="Father's Status"
            options={status_options}
            required
          />
        </div>
        <div className="sm:col-span-3">
          <PhoneNumberInput name="father_contact" label="Father's Contact" />
        </div>

        <div className="sm:col-span-full">
          <h3 className="text-base/8 font-semibold mt-2 text-gray-800 dark:text-white">
            Mother&apos;s Details
          </h3>
          <Separator className="my-2" />
        </div>
        <div className="sm:col-span-full">
          <InputField name="mother_name" label="Mother's Name" required />
        </div>
        <div className="sm:col-span-3">
          <SelectField
            name="mother_status"
            label="Mother&lsquo;s Status"
            options={status_options}
            required
          />
        </div>
        <div className="sm:col-span-3">
          <PhoneNumberInput
            name="mother_contact"
            label="Mother&lsquo;s Contact"
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

export default StepF;
