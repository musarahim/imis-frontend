import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldDescription, FieldSet } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetInstitutionsQuery } from "@/redux/features/institution-api-slice";
import { FileDisplay } from "@/utils/fileUtils";
type StepDProps = {
  data?: UniversityProvisionalLicense;
  onStepClick: (step: string) => void;
};
function Preview({ data, onStepClick }: StepDProps) {
    const { data: institutions, isLoading: isLoadingInstitutions } =
        useGetInstitutionsQuery(undefined, { refetchOnMountOrArgChange: true });
      const institution = institutions?.results[0];
  return (
    <>
      <div className="border-t  border-gray-900/10  dark:border-gray-400">
        <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">
          PREVIEW APPLICATION
        </h2>
      </div>
       <Card className="w-full">
        <CardHeader>
          <CardTitle>Institute Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table-fixed rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Institution Name
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {institution?.name}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Acronym</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {institution?.acroynm}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Postal Address
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {institution?.postal_address}{" "}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Website Address{" "}
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {institution?.website}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Landline{" "}
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {institution?.landline}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Mobile </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {institution?.phone}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Region </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {institution?.region}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  District{" "}
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {institution?.district}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Location{" "}
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {institution?.location}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Button variant="default" onClick={() => onStepClick("A")}>
            Edit
          </Button>
        </CardFooter>
        <Separator />
        <CardHeader>
          <CardTitle>LOCATION AND LAND</CardTitle>
        </CardHeader>
        <CardContent>
         <Table className="table-fixed rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Amount of land owned 
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.amount_of_land} acres
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Amount of land in current use</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.land_in_use} acres
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Amount of land for future use
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.land_for_future_use} acres
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Years of acquisition
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.year_obtained}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Leased or rented{" "}
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.leased_or_rented} 
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Lease or rent agreement </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {<FileDisplay file={data?.lease_or_rent_agreement}  />}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
         
          
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Button variant="default" onClick={() => onStepClick("B")}>
            Edit
          </Button>
        </CardFooter>
         <Separator />
          <CardHeader>
          <CardTitle>INFRASTRUCTURE TO SUPPORT THE DELIVERY OF HIGHER EDUCATION</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table-fixed rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Classrooms 
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.classrooms} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Libraries</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.libraries} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Science laboratories
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.science_labs} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Computer laboratories
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.computer_labs} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Staff houses {' '}
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.staff_houses} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Number of staff houses</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.staff_houses} Houses
                </TableCell>
              </TableRow> 
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Total area of administrative staff</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.administrative_staff_area} (sqm)
                </TableCell>
              </TableRow>

                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Total area for staff use</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.area_for_staff_use} (sqm)
                </TableCell>
              </TableRow> 
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Main Building/Administrative</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.administrative_block_area} (sqm)
                </TableCell>
              </TableRow>
                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Student welfare offices</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.student_welfare_offices} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Health Clinic/Sick Bay area</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.sick_bay_area} (sqm)
                </TableCell>
              </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Meeting Hall area</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.meeting_hall_area} (sqm)
                </TableCell>
              </TableRow>  
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Campus master plan</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={data?.master_plan}  />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Ground, physical infrastructure and services/utilities</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {''}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Area of playgrounds </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.area_of_playground} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Types of playgrounds available</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.available_playgrounds}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Area of empty space</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.area_of_empty_space} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Total mileage of roads and paths</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.total_roads_mileage} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Sources of water </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.water_source}
                </TableCell>
              </TableRow>
          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Power Source </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.power_source}
                </TableCell>
              </TableRow> 
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Have suitable for agriculture </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.has_cultivable_land ? 'Yes' : 'No'}
                </TableCell>
              </TableRow>    
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Cultivable land</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.cultivable_land} (acres)
                </TableCell>
              </TableRow> 
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Number of vehicles</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.number_of_vehicles}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Vehicle registration details</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.vehicle_registration}
                </TableCell>
              </TableRow>


            </TableBody>
          </Table>
        </CardContent>
          <CardFooter className="flex items-center justify-end gap-2">
          <Button variant="default" onClick={() => onStepClick("C")}>
            Edit
          </Button>
        </CardFooter>
                <Separator />
        <CardHeader>
          <CardTitle>EDUCATIONAL FACILITIES IN PLACE</CardTitle>
        </CardHeader>
        <CardContent>
      <Table className="table-fixed rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                 Library books
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.library_books}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Textbooks</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.text_books}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Publication Years
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.publication_years}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Student computers
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.computers_in_use}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Computers in the Library{" "}
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.computers_in_library}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Academic staff computers</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.academic_staff_computers}
                </TableCell>
              </TableRow>
               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Computers in Administration</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.administrative_staff_computers}
                </TableCell>
              </TableRow>
                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Library computer program</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.library_computer_software}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
         
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Button variant="default" onClick={() => onStepClick("D")}>
            Edit
          </Button>
        </CardFooter>
         <Separator />
               <CardContent>
        
          <FieldSet>

            <FieldDescription>
  <div className="space-y-4 text-sm leading-relaxed">
    <p className="text-gray-700 dark:text-gray-300">
      Please review all the information provided above. If everything is correct, click "Submit" to finalize your application for the Interim Authority to operate a University. If you need to make any changes, use the "Edit" buttons next to each section.
    </p>
    
    <div className="space-y-2">
      <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md dark:bg-amber-900/20 dark:border-amber-800">
        <div className="flex-shrink-0 w-5 h-5 mt-0.5">
          <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-amber-800 dark:text-amber-200 font-medium">
          <strong>Important:</strong> Once submitted, you will not be able to make further changes to this application.
        </p>
      </div>
      
      <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-md dark:bg-blue-900/20 dark:border-blue-800">
        <div className="flex-shrink-0 w-5 h-5 mt-0.5">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-blue-800 dark:text-blue-200">
          <strong>Payment Information:</strong> A Payment Registration Number (PRN) will be generated after submission for the application processing fee. The PRN expires within 21 days.
        </p>
      </div>
    </div>
  </div>
</FieldDescription>
          </FieldSet>
         
         
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Button variant="secondary" onClick={() => onStepClick("D")}>
            Submit
          </Button>
        </CardFooter>
      </Card>
      
      </>
  )
}

export default Preview