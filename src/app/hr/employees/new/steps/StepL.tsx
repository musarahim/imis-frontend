"use client";
import {
    AppForm,
    InputField,
    PhoneNumberInput,
    SubmitButton,
} from "@/components/forms";
import { useUpdateEmployeeMutation } from "@/redux/features/hr-api-slice";
import { FieldArray } from "formik";
import { PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";

type StepProps = {
  onBack: () => void;
  data?: Employee;
};

type RefereeEntry = {
  id?: number;
  name: string;
  place_of_work: string;
  position: string;
  telephone: string;
  email: string;
};

type FormValues = {
  referees: RefereeEntry[];
};

const emptyReferee: RefereeEntry = {
  name: "",
  place_of_work: "",
  position: "",
  telephone: "",
  email: "",
};

function StepL({ onBack, data }: StepProps) {
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();

  const router = useRouter();

  const initialValues: FormValues = {
    referees: data?.referees?.length
      ? data.referees.map((r) => ({
          id: r.id,
          name: r.name ?? "",
          place_of_work: r.place_of_work ?? "",
          position: r.position ?? "",
          telephone: r.telephone ?? "",
          email: r.email ?? "",
        }))
      : [],
  };

  const validationSchema = Yup.object({
    referees: Yup.array().of(
      Yup.object({
        name: Yup.string().required("Name is required"),
        place_of_work: Yup.string().required("Place of work is required"),
        position: Yup.string().required("Position is required"),
        telephone: Yup.string(),
        email: Yup.string().email("Invalid email"),
      }),
    ),
  });

  const onSubmit = async (values: FormValues) => {
    const formdata = new FormData();
    formdata.append("referees", JSON.stringify(values.referees));

    await updateEmployee({ id: data?.id ? Number(data.id) : 0, data: formdata })
      .unwrap()
      .then((res) => {
        router.push(`/hr/employees/${res.id}/details`);
      })
      .catch((err) => {
        toast.error(
          err?.data?.message || "Failed to save referees. Please try again.",
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
          Referees
        </h2>
      </div>

      <FieldArray name="referees">
        {({ push, remove, form }) => (
          <div className="mt-3 space-y-4">
            {form.values.referees.map((_: RefereeEntry, index: number) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6 border border-gray-200 dark:border-gray-700 rounded-md p-4"
              >
                <div className="sm:col-span-full flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Referee {index + 1}
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
                    name={`referees[${index}].name`}
                    label="Full Name"
                    required
                  />
                </div>
                <div className="sm:col-span-3">
                  <InputField
                    name={`referees[${index}].position`}
                    label="Position"
                    required
                  />
                </div>
                <div className="sm:col-span-full">
                  <InputField
                    name={`referees[${index}].place_of_work`}
                    label="Place of Work"
                    required
                  />
                </div>
                <div className="sm:col-span-3">
                  <PhoneNumberInput
                    name={`referees[${index}].telephone`}
                    label="Telephone"
                  />
                </div>
                <div className="sm:col-span-3">
                  <InputField
                    name={`referees[${index}].email`}
                    label="Email"
                    type="email"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => push({ ...emptyReferee })}
              className="flex items-center gap-2 text-sky-600 hover:text-sky-800 text-sm font-medium mt-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add Referee
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
          title="Submit"
          className="rounded-md flex min-w-32 justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-sky-600"
        />
      </div>
    </AppForm>
  );
}

export default StepL;
