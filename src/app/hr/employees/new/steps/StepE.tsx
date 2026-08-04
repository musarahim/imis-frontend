"use client";
import {
    AppForm,
    InputField,
    PhoneNumberInput,
    SelectField,
    SubmitButton,
    TextAreaField,
} from "@/components/forms";
import { useGetRelationshipsQuery } from "@/redux/features/commonApiSlice";
import { useUpdateEmployeeMutation } from "@/redux/features/hr-api-slice";
import { toast } from "sonner";
import * as Yup from "yup";

type StepProps = {
  onBack: () => void;
  onNext: (data?: Employee) => void;
  data?: Employee;
};
type FormValues = {
  contact_person_name: string | "";
  contact_person_relationship: string | "";
  contact_person_telephone: string | "";
  contact_person_email: string | "";
  contact_person_address: string | "";
};

function StepE({ onNext, onBack, data }: StepProps) {
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();
  const { data: relationships = [] } = useGetRelationshipsQuery();
  const relationshipOptions = relationships.map((r) => ({
    value: String(r.id),
    label: r.name,
  }));

  const stepEInitialValues = {
    contact_person_name: data?.contact_person_name || "",
    contact_person_relationship: data?.contact_person_relationship || "",
    contact_person_telephone: data?.contact_person_telephone || "",
    contact_person_email: data?.contact_person_email || "",
    contact_person_address: data?.contact_person_address || "",
  };

  const stepEValidation = Yup.object({
    contact_person_name: Yup.string().required(
      "Contact person name is required",
    ),
    contact_person_relationship: Yup.string().required(
      "Contact person relationship is required",
    ),
    contact_person_telephone: Yup.string().required(
      "Contact person telephone is required",
    ),
    contact_person_email: Yup.string().email("Invalid email"),
    contact_person_address: Yup.string(),
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
      initialValues={stepEInitialValues}
      onSubmit={onSubmit}
      validationSchema={stepEValidation}
    >
      <div className="border-t  border-gray-900/10  dark:border-gray-400">
        <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">
          Contact Person Details
        </h2>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
        <div className="sm:col-span-full">
          <InputField
            name="contact_person_name"
            label="Contact Person Name"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <SelectField
            name="contact_person_relationship"
            label="Relationship"
            options={relationshipOptions}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <PhoneNumberInput
            name="contact_person_telephone"
            label="Telephone"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <InputField name="contact_person_email" label="Email" />
        </div>

        <div className="sm:col-span-full">
          <TextAreaField
            name="contact_person_address"
            label="Contact Person Address"
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

export default StepE;
