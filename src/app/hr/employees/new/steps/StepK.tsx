
"use client";
import {
    AppForm,
    DatePicker,
    InputField,
    SubmitButton,
    TextAreaField,
} from "@/components/forms";
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

type WorkEntry = {
  id?: number;
  employer: string;
  from_date: string;
  to_date: string;
  position: string;
  responsibilities: string;
};

type FormValues = {
  work_histories: WorkEntry[];
};

const emptyWork: WorkEntry = {
  employer: "",
  from_date: "",
  to_date: "",
  position: "",
  responsibilities: "",
};

function StepK({ onNext, onBack, data }: StepProps) {
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();

  const initialValues: FormValues = {
    work_histories: data?.work_histories?.length
      ? data.work_histories.map((w) => ({
          id: w.id,
          employer: w.employer ?? "",
          from_date: w.from_date ?? "",
          to_date: w.to_date ?? "",
          position: w.position ?? "",
          responsibilities: w.responsibilities ?? "",
        }))
      : [],
  };

  const validationSchema = Yup.object({
    work_histories: Yup.array().of(
      Yup.object({
        employer: Yup.string().required("Employer is required"),
        from_date: Yup.string().required("From date is required"),
        to_date: Yup.string(),
        position: Yup.string().required("Position is required"),
        responsibilities: Yup.string(),
      }),
    ),
  });

  const onSubmit = async (values: FormValues) => {
    const formdata = new FormData();
    formdata.append("work_histories", JSON.stringify(values.work_histories));

    await updateEmployee({ id: data?.id ? Number(data.id) : 0, data: formdata })
      .unwrap()
      .then((res) => { onNext(res); })
      .catch((err) => {
        toast.error(
          err?.data?.message || "Failed to save work history. Please try again.",
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
          Work History
        </h2>
      </div>

      <FieldArray name="work_histories">
        {({ push, remove, form }) => (
          <div className="mt-3 space-y-4">
            {form.values.work_histories.map((_: WorkEntry, index: number) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6 border border-gray-200 dark:border-gray-700 rounded-md p-4"
              >
                <div className="sm:col-span-full flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Entry {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="sm:col-span-full">
                  <InputField
                    name={`work_histories[${index}].employer`}
                    label="Employer / Organization"
                    required
                  />
                </div>
                <div className="sm:col-span-full">
                  <InputField
                    name={`work_histories[${index}].position`}
                    label="Position / Title"
                    required
                  />
                </div>
                <div className="sm:col-span-3">
                  <DatePicker
                    name={`work_histories[${index}].from_date`}
                    label="From Date"
                    required
                  />
                </div>
                <div className="sm:col-span-3">
                  <DatePicker
                    name={`work_histories[${index}].to_date`}
                    label="To Date"
                  />
                </div>
                <div className="sm:col-span-full">
                  <TextAreaField
                    name={`work_histories[${index}].responsibilities`}
                    label="Responsibilities"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => push({ ...emptyWork })}
              className="flex items-center gap-2 text-sky-600 hover:text-sky-800 text-sm font-medium mt-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add Work Entry
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

export default StepK;
