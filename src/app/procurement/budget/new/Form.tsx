"use client";
import {
    AmountField,
    AppForm,
    SelectField,
    SubmitButton,
} from "@/components/forms";
import { useGetFinancialYearsQuery } from "@/redux/features/commonApiSlice";
import { useGetDepartmentsQuery } from "@/redux/features/hr-api-slice";
import {
    useCreateProcurementBudgetMutation,
    useGetProcurementBudgetByIdQuery,
    useGetProcurementItemsDropdownQuery,
    useUpdateProcurementBudgetMutation,
} from "@/redux/features/procurement-api-slice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

type Props = {
  budget_id?: number;
};

type FormValues = {
  item: string;
  department: string;
  fiscal_year: string;
  amount: string;
};

function Form({ budget_id }: Props) {
  const [createProcurementBudget, { isLoading }] =
    useCreateProcurementBudgetMutation();
  const { data: itemsDropdown } = useGetProcurementItemsDropdownQuery();
  const itemOptions =
    itemsDropdown?.map((item) => ({
      value: String(item.id),
      label: item.name,
    })) || [];
  const { data: departmentsDropdown } = useGetDepartmentsQuery();
  const departmentOptions =
    departmentsDropdown?.map((department) => ({
      value: String(department.id),
      label: department.name,
    })) || [];
  const { data: financialYearsDropdown } = useGetFinancialYearsQuery();
  const fiscalYearOptions =
    financialYearsDropdown?.map((year) => ({
      value: String(year.id),
      label: year.name,
    })) || [];
  const [updateProcurementBudget, { isLoading: isUpdating }] =
    useUpdateProcurementBudgetMutation();
  const { data: budget } = useGetProcurementBudgetByIdQuery(
    budget_id ?? skipToken,
  );
  const router = useRouter();

  const initialValues: FormValues = {
    item: budget?.item || "",
    department: budget?.department || "",
    fiscal_year: budget?.fiscal_year || "",
    amount: budget?.amount ? String(budget.amount) : "",
  };

  const validationSchema = Yup.object().shape({
    item: Yup.string().required("Item is required"),
    department: Yup.string().required("Department is required"),
    fiscal_year: Yup.string().required("Fiscal year is required"),
    amount: Yup.string()
      .required("Amount is required")
      .test("valid-amount", "Amount must be greater than 0", (value) => {
        const amount = Number(value || 0);
        return Number.isFinite(amount) && amount > 0;
      }),
  });

  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData();
    formData.append("item", values.item);
    formData.append("department", values.department);
    formData.append("fiscal_year", values.fiscal_year);
    formData.append("amount", values.amount.replace(/,/g, ""));

    try {
      if (budget_id) {
        await updateProcurementBudget({
          id: budget_id,
          data: formData,
        }).unwrap();
        toast.success("Budget updated successfully.");
      } else {
        await createProcurementBudget(formData).unwrap();
        toast.success("Budget created successfully.");
      }
      router.push("/procurement/budget");
    } catch (error) {
      console.error(error);
      toast.error(
        budget_id
          ? "An error occurred while updating the procurement budget."
          : "An error occurred while creating the procurement budget, make sure its not a duplicate entry.",
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
          <SelectField
            name="item"
            label="Budget Item"
            required
            options={itemOptions}
          />
        </div>
        <div className="sm:col-span-full">
          <SelectField
            name="department"
            label="Department"
            required
            options={departmentOptions}
          />
        </div>
        <div className="sm:col-span-full">
          <SelectField
            name="fiscal_year"
            label="Fiscal Year"
            required
            options={fiscalYearOptions}
          />
        </div>
        <div className="sm:col-span-full">
          <AmountField name="amount" label="Amount" required />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <SubmitButton
          isLoading={budget_id ? isUpdating : isLoading}
          title={budget_id ? "Update Budget" : "Submit"}
        />
      </div>
    </AppForm>
  );
}

export default Form;
