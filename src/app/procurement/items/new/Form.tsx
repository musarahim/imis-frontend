"use client";
import {
    AppForm,
    InputField,
    SubmitButton,
    TextAreaField,
} from "@/components/forms";
import {
    useCreateProcurementItemMutation,
    useGetProcurementItemByIdQuery,
    useUpdateProcurementItemMutation,
} from "@/redux/features/procurement-api-slice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

type Props = {
  item_id?: number;
};

type FormValues = {
  name: string;
  description: string;
};

function Form({ item_id }: Props) {
  const [createProcurementItem, { isLoading }] =
    useCreateProcurementItemMutation();
  const [updateProcurementItem, { isLoading: isUpdating }] =
    useUpdateProcurementItemMutation();
  const { data: item } = useGetProcurementItemByIdQuery(item_id ?? skipToken);
  const router = useRouter();

  const initialValues: FormValues = {
    name: item?.name || "",
    description: item?.description || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);

    try {
      if (item_id) {
        await updateProcurementItem({ id: item_id, data: formData }).unwrap();
        toast.success("Procurement item updated successfully.");
      } else {
        await createProcurementItem(formData).unwrap();
        toast.success("Procurement item created successfully.");
      }
      router.push("/procurement/items");
    } catch (error) {
      console.error(error);
      toast.error(
        item_id
          ? "An error occurred while updating the procurement item."
          : "An error occurred while creating the procurement item.",
      );
    }
  };

  return (
    <AppForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
        <div className="sm:col-span-full">
          <InputField name="name" label="Name" required />
        </div>
        <div className="sm:col-span-full">
          <TextAreaField name="description" label="Description" required />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <SubmitButton
          isLoading={item_id ? isUpdating : isLoading}
          title={item_id ? "Update Item" : "Submit"}
        />
      </div>
    </AppForm>
  );
}

export default Form;
