"use client";
import { AppForm as Form, InputField, SubmitButton } from "@/components/forms";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAddProgrammeAssessmentInvoiceMutation } from "@/redux/features/programme-api-slice";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";

function InvoiceForm() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [addInvoice, { isLoading }] =
    useAddProgrammeAssessmentInvoiceMutation();

  const initialValues = {
    desk_review_fee: 0,
  };

  const validationSchema = Yup.object().shape({
    desk_review_fee: Yup.number()
      .required("Desk Review Fee is required")
      .min(0, "Desk Review Fee must be at least 0"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await addInvoice({
        id: Number(id),
        data: {
          desk_review_fee: values.desk_review_fee,
        },
      }).unwrap();
      toast.success("Invoice added successfully");
      router.push("/programmes/applications-ready-for-invoicing");
    } catch (error) {
      console.error("Failed to add invoice:", error);
      toast.error("Error adding invoice");
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="text-lg font-semibold">Add Invoice</div>
      </CardHeader>
      <CardContent>
        <Form
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Separator />
          <div className="flex flex-col gap-4">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Invoice Items
              </div>

              <InputField
                name="desk_review_fee"
                label="Programme Desk Review Fee"
                required
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <SubmitButton isLoading={isLoading} title="Send to Accounts" />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}

export default InvoiceForm;
