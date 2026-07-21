"use client";
import {
    AppForm,
    DatePicker,
    InputField,
    SelectField,
    SubmitButton,
} from "@/components/forms";
import { useGetRelationshipsQuery } from "@/redux/features/commonApiSlice";
import { useUpdateEmployeeMutation } from "@/redux/features/hr-api-slice";
import { FieldArray } from "formik";
import { PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import * as Yup from "yup";

type StepProps = {
  onBack: () => void;
  onNext: (data?: Employee) => void;
  data?: Employee;
};

type DependentEntry = {
  id?: number;
  name: string;
  relationship: string;
  date_of_birth: string;
  gender: string;
};

type FormValues = {
  dependents: DependentEntry[];
};

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const emptyDependent: DependentEntry = {
  name: "",
  relationship: "",
  date_of_birth: "",
  gender: "",
};

function StepI({ onNext, onBack, data }: StepProps) {
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();
  const { data: relationships = [] } = useGetRelationshipsQuery();

  const relationshipOptions = relationships.map((r) => ({
    value: String(r.id),
    label: r.name,
  }));

  const initialValues: FormValues = {
    dependents: data?.dependents?.length
      ? data.dependents.map((d) => ({
          id: d.id,
          name: d.name,
          relationship: String(d.relationship ?? ""),
          date_of_birth: d.date_of_birth ?? "",
          gender: d.gender?.toLowerCase() ?? "",
        }))
      : [],
  };

  const validationSchema = Yup.object({
    dependents: Yup.array().of(
      Yup.object({
        name: Yup.string().required("Name is required"),
        relationship: Yup.string().required("Relationship is required"),
        date_of_birth: Yup.string().required("Date of birth is required"),
        gender: Yup.string().required("Gender is required"),
      }),
    ),
  });

  const onSubmit = async (values: FormValues) => {
    const formdata = new FormData();
    formdata.append("dependents", JSON.stringify(values.dependents));

    await updateEmployee({
      id: data?.id ? Number(data.id) : 0,
      data: formdata,
    })
      .unwrap()
      .then((res) => {
        onNext(res);
      })
      .catch((err) => {
        toast.error(
          err?.data?.message || "Failed to save dependants. Please try again.",
        );
      });
  };

  return (
    <AppForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <div className="border-t border-gray-900/10 dark:border-gray-400">
        <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">
          Dependants Information
        </h2>
      </div>

      <FieldArray name="dependents">
        {({ push, remove, form }) => (
          <div className="mt-3 space-y-4">
            {form.values.dependents.map((_: DependentEntry, index: number) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6 border border-gray-200 dark:border-gray-700 rounded-md p-4"
              >
                <div className="sm:col-span-full flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Dependant {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="sm:col-span-3">
                  <InputField
                    name={`dependents[${index}].name`}
                    label="Full Name"
                    required
                  />
                </div>
                <div className="sm:col-span-3">
                  <SelectField
                    name={`dependents[${index}].relationship`}
                    label="Relationship"
                    options={relationshipOptions}
                    required
                  />
                </div>
                <div className="sm:col-span-3">
                  <DatePicker
                    name={`dependents[${index}].date_of_birth`}
                    label="Date of Birth"
                    required
                  />
                </div>
                <div className="sm:col-span-3">
                  <SelectField
                    name={`dependents[${index}].gender`}
                    label="Gender"
                    options={genderOptions}
                    required
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => push({ ...emptyDependent })}
              className="flex items-center gap-2 text-sky-600 hover:text-sky-800 text-sm font-medium mt-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add Dependant
            </button>
          </div>
        )}
      </FieldArray>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="rounded-md flex justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-red-500"
          onClick={onBack}
        >
          Previous
        </button>
        <SubmitButton
          isLoading={isUpdating}
          title="Save & Continue"
          className="rounded-md flex min-w-32 justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-sky-600"
        />
      </div>
    </AppForm>
  );
}

export default StepI;
