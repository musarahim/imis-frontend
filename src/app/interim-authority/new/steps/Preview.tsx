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
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@/components/ui/table";
import { useGetInstitutionsQuery } from "@/redux/features/institution-api-slice";

type StepDProps = {
  data?: IntrimAuthority;
  onStepClick: (step: string) => void;
}
function Preview({ data, onStepClick }: StepDProps) {
    const {data: institutions, isLoading: isLoadingInstitutions} = useGetInstitutionsQuery(undefined, { refetchOnMountOrArgChange: true });
    const institution = (institutions?.results[0])
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
        
   <Table className="table-fixed rounded-2xl">
    
      <TableBody>
        
          <TableRow  className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-[100px]">Institution Name</TableCell>


            <TableCell className="text-right text-gray-800 dark:text-gray-100">{institution?.name}</TableCell>
          </TableRow>
           <TableRow  className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-[100px]">Acronym</TableCell>


            <TableCell className="text-right text-gray-800 dark:text-gray-100">{institution?.acroynm}</TableCell>
          </TableRow>
           <TableRow  className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-[100px]">Postal Address</TableCell>


            <TableCell className="text-right text-gray-800 dark:text-gray-100">{institution?.postal_address} </TableCell>
          </TableRow>
           <TableRow  className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-[100px]">Website Address </TableCell>


            <TableCell className="text-right text-gray-800 dark:text-gray-100">{institution?.website}</TableCell>
          </TableRow>
          <TableRow  className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-[100px]">Landline </TableCell>


            <TableCell className="text-right text-gray-800 dark:text-gray-100">{institution?.landline}</TableCell>
          </TableRow>
          <TableRow  className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-[100px]">Mobile </TableCell>


            <TableCell className="text-right text-gray-800 dark:text-gray-100">{institution?.phone}</TableCell>
          </TableRow>
            <TableRow  className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-[100px]">Region </TableCell>


            <TableCell className="text-right text-gray-800 dark:text-gray-100">{institution?.region}</TableCell>
          </TableRow>
        <TableRow  className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-[100px]">District </TableCell>


            <TableCell className="text-right text-gray-800 dark:text-gray-100">{institution?.district}</TableCell>
          </TableRow>
          <TableRow  className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-[100px]">Location </TableCell>


            <TableCell className="text-right text-gray-800 dark:text-gray-100">{institution?.location}</TableCell>
          </TableRow>
      </TableBody>
   
    </Table>
      
     
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2">
         
          <Button variant="default" onClick={() => onStepClick('A')}>Edit</Button>
        
      </CardFooter>
      <Separator />
       <CardHeader>
        <CardTitle>LOCATION AND LAND</CardTitle>
       </CardHeader>
      <CardContent>
        <FieldSet>
  <FieldLegend>Has Title Deed</FieldLegend>
  <FieldDescription>{data?.has_title_deed ? 'Yes' : 'No'}</FieldDescription>
  </FieldSet>
  <FieldSet>
  <FieldLegend>Title Deed</FieldLegend>
  <FieldDescription>{
    (() => {
      const td = data?.title_deed;
      if (!td) return '-';
      if (typeof td === 'string') return td;
      if (td instanceof File) return td.name;
      return String(td);
    })()
  }</FieldDescription>
  </FieldSet>
        </CardContent>
      <CardFooter className="flex items-center justify-end gap-2">
         
          <Button variant="default" onClick={() => onStepClick('B')}>Edit</Button>
        
      </CardFooter>
    </Card>
    

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