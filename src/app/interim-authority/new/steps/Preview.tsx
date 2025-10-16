import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    FieldDescription,
    FieldLegend,
    FieldSet
} from "@/components/ui/field";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
   
    totalAmount: "$300.00hghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhj",
   
  },
]
type StepDProps = {
  data?: IntrimAuthority;
  onStepClick: (step: string) => void;
}
function Preview({ data, onStepClick }: StepDProps) {
    console.log("Preview data:", data);
  return (
    <>
     <div className="border-t  border-gray-900/10  dark:border-gray-400">
      <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">PREVIEW APPLICATION</h2>
    </div>
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Institute Details</CardTitle>
       
      </CardHeader>
      <CardContent>
        <FieldSet>
  <FieldLegend>Profile</FieldLegend>
  <FieldDescription>This appears on invoices and emails.</FieldDescription>
  </FieldSet>
  <FieldSet>
  <FieldLegend>Profile</FieldLegend>
  <FieldDescription>This appears on invoices and emails.</FieldDescription>
  </FieldSet>
   <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
         
         
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            
            
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
      
     
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2">
         
          <Button variant="default" onClick={() => onStepClick('A')}>Edit</Button>
        
      </CardFooter>
    </Card>

    <Button variant="link" className="p-0 mb-4" onClick={() => onStepClick('A')}>Edit Step A</Button>
    <Button variant="link" className="p-0 mb-4" onClick={() => onStepClick('B')}>Edit Step B</Button>
    <Button variant="link" className="p-0 mb-4" onClick={() => onStepClick('C')}>Edit Step C</Button>
    <Button variant="link" className="p-0 mb-4" onClick={() => onStepClick('D')}>Edit Step D</Button>
    <div className="space-y-6">
      <div className="border-b border-gray-900/10 pb-4 dark:border-gray-400">
        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">Preview Application</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">Please review your application details below before submission. If you need to make any changes, click the "Edit" button next to the relevant section.</p>
      </div>
      </div>
    </>
  )
}

export default Preview