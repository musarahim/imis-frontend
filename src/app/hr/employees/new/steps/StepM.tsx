"use client";
import {
    AppForm,
    FileField,
    InputField,
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

type DocumentEntry = {
  id?: number;
  name: string;
  document: File | string | null;
};

type FormValues = {
  documents: DocumentEntry[];
};

const emptyDocument: DocumentEntry = {
  name: "",
  document: "",
};

function StepM({ onBack, data }: StepProps) {
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();

  const router = useRouter();

  const initialValues: FormValues = {
    documents: data?.documents?.length
      ? data.documents.map((d) => ({
          id: d.id,
          name: d.name ?? "",
          document: d.document ?? "",
        }))
      : [],
  };

  const validationSchema = Yup.object({
    documents: Yup.array().of(
      Yup.object({
        name: Yup.string().required("Name is required"),
        document: Yup.string().required("Document is required"),
      }),
    ),
  });

  const onSubmit = async (values: FormValues) => {
    const formdata = new FormData();
    const meta = values.documents.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ document: _, ...rest }) => rest,
    );
    formdata.append("documents", JSON.stringify(meta));
    values.documents.forEach((doc, idx) => {
      if (doc.document instanceof File) {
        formdata.append(`doc_file_${idx}`, doc.document);
      }
    });

    await updateEmployee({ id: data?.id ? Number(data.id) : 0, data: formdata })
      .unwrap()
      .then((res) => {
        router.push(`/hr/employees/${res.id}/details`);
      })
      .catch((err) => {
        toast.error(
          err?.data?.message || "Failed to save documents. Please try again.",
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
          Contracts & Documents
        </h2>
      </div>

      <FieldArray name="documents">
        {({ push, remove, form }) => (
          <div className="mt-3 space-y-4">
            {form.values.documents.map((_: DocumentEntry, index: number) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6 border border-gray-200 dark:border-gray-700 rounded-md p-4"
              >
                <div className="sm:col-span-full flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Documents {index + 1}
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
                    name={`documents[${index}].name`}
                    label="Document Name"
                    required
                  />
                </div>
                <div className="sm:col-span-3">
                  <FileField
                    name={`documents[${index}].document`}
                    label="Upload Document"
                    required
                    accept=".pdf"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => push({ ...emptyDocument })}
              className="flex items-center gap-2 text-sky-600 hover:text-sky-800 text-sm font-medium mt-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add Document
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

export default StepM;
