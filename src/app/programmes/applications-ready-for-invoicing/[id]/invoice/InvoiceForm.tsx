"use client";
import { AppForm as Form, InputField, SubmitButton } from "@/components/forms";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    useAddInvoiceMutation,
    useInvoiceItemTypesQuery,
} from "@/redux/features/programme-api-slice";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

type InvoiceItemFormValue = {
  item_type: {
    id: number;
  };
  item_type_name: string;
  persons_number: number;
  number_of_days: number;
  rate: number;
};

type InvoiceFormValues = {
  invoice_items: InvoiceItemFormValue[];
};

function InvoiceForm() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [addInvoice, { isLoading }] = useAddInvoiceMutation();
  const { data: invoiceItemTypes } = useInvoiceItemTypesQuery();

  const invoiceItemOptions = useMemo(
    () =>
      (invoiceItemTypes ?? []).map((itemType) => ({
        label: itemType.name,
        value: Number(itemType.id ?? 0),
        defaultRate: Number(itemType.default_rate ?? 0),
      })),
    [invoiceItemTypes],
  );

  const intialValues = useMemo<InvoiceFormValues>(
    () => ({
      invoice_items: invoiceItemOptions.map((itemType) => ({
        item_type: {
          id: itemType.value,
        },
        item_type_name: itemType.label,
        persons_number: 1,
        number_of_days: 1,
        rate: itemType.defaultRate,
      })),
    }),
    [invoiceItemOptions],
  );

  const validationSchema = Yup.object().shape({
    invoice_items: Yup.array()
      .of(
        Yup.object().shape({
          item_type: Yup.object()
            .shape({
              id: Yup.number().required("Item type is required"),
            })
            .required("Item type is required"),
          persons_number: Yup.number()
            .typeError("Number of persons must be a number")
            .required("Number of persons is required")
            .min(1, "Number of persons must be at least 1"),
          number_of_days: Yup.number()
            .typeError("Number of days must be a number")
            .required("Number of days is required")
            .min(1, "Number of days must be at least 1"),
          rate: Yup.number()
            .typeError("Rate must be a number")
            .required("Rate is required")
            .min(0, "Rate must be at least 0"),
        }),
      )
      .min(1, "At least one invoice item is required"),
  });

  const handleSubmit = async (values: InvoiceFormValues) => {
    const normalizedInvoiceItems = values.invoice_items.map((item) => ({
      item_type: item.item_type.id,
      persons_number: Number(item.persons_number),
      number_of_days: Number(item.number_of_days),
      rate: Number(item.rate),
    }));

    try {
      await addInvoice({
        id: Number(id),
        data: {
          application: id,
          invoice_items: normalizedInvoiceItems,
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
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Invoice Items
              </div>
              {(intialValues.invoice_items.length > 0
                ? intialValues.invoice_items
                : [
                    {
                      item_type: { id: 0 },
                      item_type_name: "",
                      persons_number: 1,
                      number_of_days: 1,
                      rate: 0,
                    },
                  ]
              ).map((item, index) => (
                <div
                  key={`${item.item_type.id}-${index}`}
                  className="grid grid-cols-1 gap-3 rounded-md border p-3 md:grid-cols-2"
                >
                  <InputField
                    name={`invoice_items[${index}].item_type_name`}
                    label="Item"
                    disabled
                  />
                  <InputField
                    name={`invoice_items[${index}].persons_number`}
                    label="Number of Persons"
                    type="number"
                    required
                  />
                  <InputField
                    name={`invoice_items[${index}].number_of_days`}
                    label="Number of Days"
                    type="number"
                    required
                  />
                  <InputField
                    name={`invoice_items[${index}].rate`}
                    label="Rate"
                    type="number"
                    required
                  />
                </div>
              ))}
            </div>
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
