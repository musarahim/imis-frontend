"use client";
import {
    AppForm,
    DatePicker,
    FileField,
    InputField,
    SelectField,
    SubmitButton,
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

type EducationEntry = {
  id?: number;
  institution: string;
  from_year: string;
  to_year: string;
  qualification: string;
  award_date: string;
  certificate_document: File | string | null;
};

type FormValues = {
  education_histories: EducationEntry[];
};

const emptyEducation: EducationEntry = {
  institution: "",
  from_year: "",
  to_year: "",
  qualification: "",
  award_date: "",
  certificate_document: null,
};

const yearOptions = Array.from({ length: 100 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: String(year), label: String(year) };
});

function StepJ({ onNext, onBack, data }: StepProps) {
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();

  const initialValues: FormValues = {
    education_histories: data?.education_histories?.length
      ? data.education_histories.map((e) => ({
          id: e.id,
          institution: e.institution ?? "",
          from_year: String(e.from_year ?? ""),
          to_year: String(e.to_year ?? ""),
          qualification: e.qualification ?? "",
          award_date: e.award_date ?? "",
          certificate_document: e.certificate_document ?? null,
        }))
      : [],
  };

  const validationSchema = Yup.object({
    education_histories: Yup.array().of(
      Yup.object({
        institution: Yup.string().required("Institution is required"),
        from_year: Yup.string().required("From year is required"),
        to_year: Yup.string().required("To year is required"),
        qualification: Yup.string().required("Qualification is required"),
        award_date: Yup.string(),
        certificate_document: Yup.mixed(),
      }),
    ),
  });

  const onSubmit = async (values: FormValues) => {
    const formdata = new FormData();
    const meta = values.education_histories.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ certificate_document: _, ...rest }) => rest,
    );
    formdata.append("education_histories", JSON.stringify(meta));
    values.education_histories.forEach((edu, idx) => {
      if (edu.certificate_document instanceof File) {
        formdata.append(`edu_cert_${idx}`, edu.certificate_document);
      }
    });

    await updateEmployee({ id: data?.id ? Number(data.id) : 0, data: formdata })
      .unwrap()
      .then((res) => {
        onNext(res);
      })
      .catch((err) => {
        toast.error(
          err?.data?.message ||
            "Failed to save education history. Please try again.",
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
          Education History
        </h2>
      </div>

      <FieldArray name="education_histories">
        {({ push, remove, form }) => (
          <div className="mt-3 space-y-4">
            {form.values.education_histories.map(
              (_: EducationEntry, index: number) => (
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
                      name={`education_histories[${index}].institution`}
                      label="Institution / School"
                      required
                    />
                  </div>
                  <div className="sm:col-span-full">
                    <InputField
                      name={`education_histories[${index}].qualification`}
                      label="Qualification / Award"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <SelectField
                      options={yearOptions}
                      name={`education_histories[${index}].from_year`}
                      label="From Year"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <SelectField
                      options={yearOptions}
                      name={`education_histories[${index}].to_year`}
                      label="To Year"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <DatePicker
                      name={`education_histories[${index}].award_date`}
                      label="Award Date"
                    />
                  </div>
                  <div className="sm:col-span-full">
                    <FileField
                      name={`education_histories[${index}].certificate_document`}
                      label="Certificate Document"
                      accept=".pdf"
                    />
                  </div>
                </div>
              ),
            )}

            <button
              type="button"
              onClick={() => push({ ...emptyEducation })}
              className="flex items-center gap-2 text-sky-600 hover:text-sky-800 text-sm font-medium mt-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add Education Entry
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

export default StepJ;
