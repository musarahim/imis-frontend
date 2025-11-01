"use client";
import {
  AppForm,
  DatePicker,
  FileField,
  InputField,
  RadioInputField,
  SubmitButton
} from "@/components/forms";
import {
  useCreateCharterApplicationMutation,
  usePatchCharterApplicationMutation,
  useRetrieveCharterApplicationQuery,
} from "@/redux/features/license-api-slice";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import * as Yup from "yup";
type StepBProps = {
  onNext: (data?: any) => void;
  onBack: () => void;
  id?: number;
};

type FormValues = {
  has_provisional_license: boolean;
  provisional_license: string | File | null;
  provisional_license_issue_date: Date | null;
  amount_of_land_owned: string | null;
  land_title: File | null;
  land_in_use: string | null;
  land_for_future_use: string | null;
  year_obtained: string | null;
  leased_or_rented: boolean;
  lease_or_rent_agreement: File | null;
};
const options = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

function StepB({ onNext, onBack, id }: StepBProps) {
  const { data: charterApplication } = useRetrieveCharterApplicationQuery(
    id ?? skipToken
  );
  const [createCharterApplication, { isLoading: isCreating }] =
    useCreateCharterApplicationMutation();
  const [patchCharterApplication, { isLoading: isPatching }] =
    usePatchCharterApplicationMutation();
  const isLoading = isCreating || isPatching;

  const stepBInitialValues: FormValues = {
    has_provisional_license:
      charterApplication?.has_provisional_license || false,
    provisional_license: charterApplication?.provisional_license ?? null,
    provisional_license_issue_date:
      charterApplication?.provisional_license_issue_date
        ? new Date(charterApplication.provisional_license_issue_date)
        : null,
    amount_of_land_owned: charterApplication?.amount_of_land_owned || null,
    land_title: charterApplication?.land_title ?? null,
    land_in_use: charterApplication?.land_in_use || null,
    land_for_future_use: charterApplication?.land_for_future_use || null,
    year_obtained: charterApplication?.year_obtained || null,
    leased_or_rented: charterApplication?.leased_or_rented || false,
    lease_or_rent_agreement:
      charterApplication?.lease_or_rent_agreement ?? null,
  };
  const stepBValidation = Yup.object({
    has_provisional_license: Yup.boolean().required("This field is required"),
    provisional_license: Yup.mixed().when(
      "has_provisional_license",
      (has_provisional_license: any, schema: any) => {
        return has_provisional_license
          ? schema.required("Please attach the provisional license document")
          : schema.notRequired();
      }
    ),
    provisional_license_issue_date: Yup.date().when(
      "has_provisional_license",
      (has_provisional_license: any, schema: any) => {
        return has_provisional_license
          ? schema.required("Please provide the provisional license issue date")
          : schema.notRequired();
      }
    ),
    amount_of_land_owned: Yup.number()
      .required("This field is required")
      .min(0, "Amount of land cannot be negative"),
    land_title: Yup.mixed().required("Please attach the land title deed"),
    land_in_use: Yup.number()
      .required("This field is required")
      .min(0, "Land in use cannot be negative"),
    land_for_future_use: Yup.number()
      .required("This field is required")
      .min(0, "Land for future use cannot be negative"),
    year_obtained: Yup.string().required("This field is required"),
    leased_or_rented: Yup.boolean().required("Specify if the land is leased or rented"),
    lease_or_rent_agreement: Yup.mixed().when(
      "leased_or_rented",
      (leased_or_rented: any, schema: any) => {
        return leased_or_rented === true
          ? schema.required("Please attach the lease or rent agreement")
          : schema.notRequired();
      }
    ),
  });
  const onSubmit = async (values: FormValues) => {
    console.log(values, "form values");
    const formData = new FormData();

    // Define file fields that should be handled differently
    const fileFields = [
      "provisional_license",
      "land_title",
      "lease_or_rent_agreement",
    ];

    // Helper function to append non-null values
    const appendIfExists = (key: string, value: any) => {
      if (value !== null && value !== undefined) {
        if (fileFields.includes(key) && value instanceof File) {
          formData.append(key, value);
        } else if (!fileFields.includes(key)) {
          // Handle special date formatting
          if (value instanceof Date) {
            formData.append(key, value.toISOString().split("T")[0]);
          } else {
            formData.append(key, String(value));
          }
        }
      }
    };

    // Process all form values
    Object.entries(values).forEach(([key, value]) => {
      appendIfExists(key, value);
    });

    try {
      let response;
      if (id) {
        response = await patchCharterApplication({
          id,
          data: formData,
        }).unwrap();
        toast.success("Charter application updated successfully");
      } else {
        response = await createCharterApplication(formData).unwrap();
        toast.success("Charter application created successfully");
      }
      onNext(response);
    } catch (error) {
      toast.error(
        "An error occurred while submitting the form. Please try again."
      );
    }
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
          LOCATION AND LAND
        </h2>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
        <div className="sm:col-span-full">
           <RadioInputField name="has_provisional_license" label="Has Provisional License?" options={options} />
        
        </div>

        <div className="sm:col-span-3">
          <DatePicker
            name="provisional_license_issue_date"
            label="Provisional License Issue Date"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <FileField
            name="provisional_license"
            label="Attach a Photocopy of the Licence "
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="amount_of_land_owned"
            label="Amount of Land Owned  (acres)"
            placeholder="Enter land area"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <FileField
            name="land_title"
            label="Attach Land Title Deed"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="land_in_use"
            label="Amount of land in the current use (acres)"
            placeholder="Enter land in use"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="land_for_future_use"
            label="Amount of land for future use (acres)"
            placeholder="Enter land for future use"
            required
          />
        </div>
        <div className="sm:col-span-full">
          <InputField
            name="year_obtained"
            label="Year(s) when all above piece(s) of land was/were acquired"
            placeholder="Enter year obtained"
            required
          />
        </div>
        <div className="sm:col-span-full">
          <RadioInputField
            name="leased_or_rented"
            label="Is the land leased or rented?"
            options={options}
            required
            orientation="vertical"
          />
        </div>
        <div className="sm:col-span-full">
          <FileField
            name="lease_or_rent_agreement"
            label="Attach Lease or Rent Agreement"
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
  );
}

export default StepB;
