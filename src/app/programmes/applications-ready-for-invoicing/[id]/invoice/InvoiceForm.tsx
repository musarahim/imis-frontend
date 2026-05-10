"use client";
import {
    FileField,
    AppForm as Form,
    InputField,
    SubmitButton,
} from "@/components/forms";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAddInvoiceMutation } from "@/redux/features/programme-api-slice";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";

function InvoiceForm() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [addInvoice, { isLoading }] = useAddInvoiceMutation();

  const intialValues = {
    invoice_number: "",
    invoice_amount: 0,
    invoice_file: "",
  };
  const validationSchema = Yup.object().shape({
    invoice_number: Yup.string().required("Invoice number is required"),
    invoice_amount: Yup.number()
      .typeError("Invoice amount must be a number")
      .required("Invoice amount is required")
      .positive("Invoice amount must be positive"),
    invoice_file: Yup.mixed()
      .required("Invoice Attachment is required")
      .test("fileSize", "File size must be less than 5MB", function (value) {
        if (value instanceof File) {
          return value.size <= 5 * 1024 * 1024; // 5MB in bytes
        }
        return true; // If it's a string (existing file), skip validation
      }),
  });

  const handleSubmit = async (values: typeof intialValues) => {
    try {
      await addInvoice({
        id: Number(id),
        data: {
          invoice_number: values.invoice_number,
          invoice_amount: Number(values.invoice_amount),
          invoice_file: values.invoice_file,
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
          initialValues={intialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Separator />
          <div className="flex flex-col gap-4">
            {/* Form fields go here */}
            <InputField name="invoice_number" label="Invoice Number" required />
            <InputField
              name="invoice_amount"
              label="Invoice Amount"
              type="number"
              required
            />
            <FileField name="invoice_file" label="Invoice File" required />
          </div>
          <div className="flex justify-end mt-4">
            <SubmitButton isLoading={isLoading} title="Submit Invoice" />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}

export default InvoiceForm;
