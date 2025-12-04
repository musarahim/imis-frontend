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

      if (isLoadingInstitutions) {
    return <div>Loading...</div>;
  }
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
                <TableCell className="font-medium w-[300px]">
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
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Students will have access to computers</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.students_have_access ? "Yes" : "No"}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">University has internet access</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.has_internet_access ? "Yes" : "No"}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Number of library seats</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.library_seats}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Number of classroom seats</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.classroom_seats}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Number of laboratories seats</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.laboratories_seats}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Administration block seats</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.administration_block_seats}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Student Accommodation Facilities</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.student_facilities}
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
          <CardHeader>
          <CardTitle>STAFF INFORMATION</CardTitle>
        </CardHeader>
        <CardContent>
      <Table className="table-fixed rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-semibold w-[100px]">
                Academic Staff
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Full time academic staff</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.intended_full_time_academic_staff}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Part time academic staff
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.intended_part_time_academic_staff}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-semibold w-[100px]">
                  Administrative And Support Staff
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Full time administrative staff
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.intended_full_time_admin_staff}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Academic staff support</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.intended_support_staff}
                </TableCell>
              </TableRow>
               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Proposed Council Members</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  
                  <div dangerouslySetInnerHTML={{ __html: data?.council_members || '' }}/>
                </TableCell>
              </TableRow>
                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Proposed Chancellor</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.proposed_chancellor}
                </TableCell>
              </TableRow>                
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]"> Proposed Vice Chancellor/Rector</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.proposed_vice_chancellor}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Proposed University Secretary</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.proposed_university_secretary}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Proposed Academic Registrar</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.proposed_academic_registrar}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Deans of each of the faculties</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                
                   <div dangerouslySetInnerHTML={{ __html: data?.heads_of_faculties || '' }}/>
                </TableCell>
              </TableRow>
             
             
         

            </TableBody>
          </Table>
         
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Button variant="default" onClick={() => onStepClick("E")}>
            Edit
          </Button>
        </CardFooter>
         <Separator />
           
          <CardHeader>
          <CardTitle> OWNERSHIP OF THE UNIVERSITY</CardTitle>
        </CardHeader>
        <CardContent>
      <Table className="table-fixed rounded-2xl">
            <TableBody>
               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">Owners of the proposed university</TableCell>

                <TableCell className="text-left text-gray-800 dark:text-gray-100 p-3 flex-1">
                  
                  <div dangerouslySetInnerHTML={{ __html: data?.institution_ownership || '' }}/>
                </TableCell>
              </TableRow>
               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">Promoters of the university</TableCell>

                <TableCell className="text-left text-gray-800 dark:text-gray-100 p-3 flex-1">
                  
                  <div dangerouslySetInnerHTML={{ __html: data?.university_promoters || '' }}/>
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
         
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Button variant="default" onClick={() => onStepClick("F")}>
            Edit
          </Button>
        </CardFooter>
         <Separator />
          <CardHeader>
          <CardTitle> FINANCES AND THEIR MANAGEMENT</CardTitle>
        </CardHeader>
        <CardContent>
      <Table className="table-fixed rounded-2xl">
            <TableBody>
               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">Other Assets</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">

                  {data?.other_assets || ''}
                </TableCell>
              </TableRow>
               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">Proposed Annual Budget</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">

                  {data?.annual_budget || ''}
                </TableCell>
              </TableRow> 
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">Fee Structure</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">

                  <FileDisplay file={data?.fee_structure}  />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">% Budget Derived from fees</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">

                  {data?.fees_percent_budget}
                </TableCell>
              </TableRow> 
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">Other Sources of Revenue</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">

                  {data?.other_income_sources}
                </TableCell>
              </TableRow>              
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">Infrastructure Development Allocation</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">

                  {data?.infrastructure_development}
                </TableCell>
              </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">Research Development Allocation</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">

                  {data?.research_development}
                </TableCell>
              </TableRow> 
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">Computer Hardware and Software Allocation</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">

                  {data?.computer_hardware_software}
                </TableCell>
              </TableRow>
               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">Science Lab Equipment Allocation</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">

                  {data?.science_lab_equipment}
                </TableCell>
              </TableRow>
               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">Library Equipment Allocation</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">

                  {data?.library_equipment}
                </TableCell>
              </TableRow>
               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">Staff Development Allocation</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">

                  {data?.staff_development}
                </TableCell>
              </TableRow> 
               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">% Budget for Staff Salaries</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">

                  {data?.staff_salaries}
                </TableCell>
              </TableRow> 
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">Current Bankers</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">

                  {data?.current_bankers}
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
         
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Button variant="default" onClick={() => onStepClick("G")}>
            Edit
          </Button>
        </CardFooter>
         <Separator />
         <CardHeader>
          <CardTitle>VISION AND MISSION OF THE UNIVERSITY</CardTitle>
        </CardHeader>
        <CardContent>
      <Table className="table-fixed rounded-2xl">
            <TableBody>
               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">Vision</TableCell>

                <TableCell className="text-left text-gray-800 dark:text-gray-100 p-3 flex-1">

                  {data?.vision || ''}
                </TableCell>
              </TableRow>
               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">Mission</TableCell>

                <TableCell className="text-left text-gray-800 dark:text-gray-100 p-3 flex-1">
                  
                  {data?.mission || '' }
                </TableCell>
              </TableRow>  
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">Objectives</TableCell>

                <TableCell className="text-left text-gray-800 dark:text-gray-100 p-3 flex-1">
                  
                  {data?.specific_objectives || '' }
                </TableCell>
              </TableRow>
               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">Strategic Plan</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">

                  <FileDisplay file={data?.stractegic_plan}  />
                </TableCell>
              </TableRow> 
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">University Programmes</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">

                  <FileDisplay file={data?.programmes}  />
                </TableCell>
              </TableRow> 
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">Area of Competence</TableCell>

                <TableCell className="text-left text-gray-800 dark:text-gray-100 p-3 flex-1">
                  
                  <div dangerouslySetInnerHTML={{ __html: data?.area_of_competence || '' }}/>
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">Future Planned Programmes</TableCell>

                <TableCell className="text-left text-gray-800 dark:text-gray-100 p-3 flex-1">
                  
                  <div dangerouslySetInnerHTML={{ __html: data?.feature_programmes || '' }}/>
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
         
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Button variant="default" onClick={() => onStepClick("H")}>
            Edit
          </Button>
        </CardFooter>
         <Separator />
          <CardHeader>
          <CardTitle> STUDENT POPULATION DISTRIBUTION</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table-fixed rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Total number of students
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.total_number_of_students}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-semibold w-[100px]">Programme Distribution of Students</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Arts (%)
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.arts_percentage}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Social Sciences (%)
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.social_sciences_percentage}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Basic Sciences (%)
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.basic_sciences_percentage}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">Arts Education (Teaching) (%) </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.arts_education_percentage}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">Agriculture (%) </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.agriculture_percentage}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                 Engineering/ Technology (%)
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.engineering_percentage}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Medicine (Medicine Pharmacy, dentistry) (%)
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.medicine_percentage}
                </TableCell>
              </TableRow> 
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Veterinary medicine (%)
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {data?.veterinary_percentage}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Button variant="default" onClick={() => onStepClick("I")}>
            Edit
          </Button>
        </CardFooter>
        <Separator />
          <CardHeader>
          <CardTitle> Required Attachments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table-fixed rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Signatures of the Officers
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={data?.signatures}  />
                </TableCell>
              </TableRow>
        
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  CVs of the Members
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={data?.member_cvs}  />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Financial Control Mechanism
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={data?.finance_control}  />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Programmes Details
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={data?.detailed_programmes}  />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">Physical and Educational Facilities </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={data?.physical_education_facilities}  />
                </TableCell>
              </TableRow>
           
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Button variant="default" onClick={() => onStepClick("J")}>
            Edit
          </Button>
        </CardFooter>
        <Separator />
               <CardContent>
        
          <FieldSet>

            <FieldDescription>
  <div className="space-y-4 text-sm leading-relaxed">
    <p className="text-gray-700 dark:text-gray-300">
      Please review all the information provided above. If everything is correct, click &quot;Submit&quot; to finalize your application for the Interim Authority to operate a University. If you need to make any changes, use the &quot;Edit&quot; buttons next to each section.
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