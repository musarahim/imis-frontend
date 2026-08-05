"use client";
import {
    AmountField,
    AppForm,
    SelectField,
    SubmitButton,
    TextAreaField,
} from "@/components/forms";
import {
    useCreateProcurementExpenditureMutation,
    useGetProcurementBudgetsDropdownQuery,
    useGetProcurementExpenditureByIdQuery,
    useUpdateProcurementExpenditureMutation,
} from "@/redux/features/procurement-api-slice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

type Props = {
  expenditure_id?: number;
};

type FormValues = {
  budget: string;
  procurement_subject: string;
  amount: string;
};

function Form({ expenditure_id }: Props) {
  const [createProcurementExpenditure, { isLoading }] =
    useCreateProcurementExpenditureMutation();
  const { data: budgetsDropdown } = useGetProcurementBudgetsDropdownQuery();
  const budgetOptions =
    budgetsDropdown?.map((budget) => ({
      value: String(budget.id),
      label: budget.name,
    })) || [];

  const [updateProcurementExpenditure, { isLoading: isUpdating }] =
    useUpdateProcurementExpenditureMutation();
  const { data: expenditure } = useGetProcurementExpenditureByIdQuery(
    expenditure_id ?? skipToken,
  );
  const router = useRouter();

  const initialValues: FormValues = {
    budget: expenditure?.budget?.id ? String(expenditure.budget.id) : "",
    procurement_subject: expenditure?.procurement_subject || "",
    amount: expenditure?.amount ? String(expenditure.amount) : "",
  };

  const validationSchema = Yup.object().shape({
    budget: Yup.string().required("Budget is required"),
    procurement_subject: Yup.string().required(
      "Procurement subject is required",
    ),
    amount: Yup.string()
      .required("Amount is required")
      .test("valid-amount", "Amount must be greater than 0", (value) => {
        const amount = Number(value || 0);
        return Number.isFinite(amount) && amount > 0;
      })
      .test(
        "within-budget-balance",
        "Amount cannot be greater than the selected budget balance",
        function (value) {
          const enteredAmount = Number(value || 0);
          const selectedBudgetId = this.parent?.budget;

          if (!selectedBudgetId || !Number.isFinite(enteredAmount)) {
            return true;
          }

          const selectedBudgetBalance =
            getSelectedBudgetBalance(selectedBudgetId);

          // If dropdown data is not yet available, skip this test for now.
          if (!selectedBudgetBalance && selectedBudgetBalance !== 0) {
            return true;
          }

          return enteredAmount <= selectedBudgetBalance;
        },
      ),
  });

  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData();
    formData.append("budget", values.budget);
    formData.append("procurement_subject", values.procurement_subject);
    formData.append("amount", values.amount.toString());

    try {
      if (expenditure_id) {
        await updateProcurementExpenditure({
          id: expenditure_id,
          data: formData,
        }).unwrap();
        toast.success("Expenditure updated successfully.");
      } else {
        await createProcurementExpenditure(formData).unwrap();
        toast.success("Expenditure created successfully.");
      }
      router.push("/procurement/expenditure");
    } catch (error) {
      console.error(error);
      toast.error(
        expenditure_id
          ? "An error occurred while updating the procurement expenditure."
          : "An error occurred while creating the procurement expenditure.",
      );
    }
  };

  const getSelectedBudgetBalance = (budgetId: string) => {
    const selectedBudget = budgetsDropdown?.find(
      (budget) => String(budget.id) === budgetId,
    );
    return Number(selectedBudget?.balance ?? 0);
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
            name="budget"
            label="Budget Item"
            required
            options={budgetOptions}
          />
        </div>
        <div className="sm:col-span-full">
          <TextAreaField
            name="procurement_subject"
            label="Subject of Procurement"
            required
          />
        </div>

        <div className="sm:col-span-full">
          <AmountField name="amount" label="Amount" required />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <SubmitButton
          isLoading={expenditure_id ? isUpdating : isLoading}
          title={expenditure_id ? "Update Expenditure" : "Submit"}
        />
      </div>
    </AppForm>
  );
}

export default Form;
