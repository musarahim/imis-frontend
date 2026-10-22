"use client";
import { parseProvisionalObjectives } from "@/utils/provisionalObjectives";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetInstitutionsQuery } from "@/redux/features/institution-api-slice";
import { useRetrieveODAIProvisionalLicenseQuery } from "@/redux/features/license-api-slice";

import { useGetPaymentPRNsQuery } from "@/redux/features/payment-api-slice";
import { FileDisplay } from "@/utils/fileUtils";
import ExportPdfButton from "./ExportPdfButton";

function Content({ id }: { id: string }) {
  const { data: license } = useRetrieveODAIProvisionalLicenseQuery(Number(id));
  const { data: institutions } = useGetInstitutionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const institution = institutions?.results[0];
  const { data: paymentPRNs } = useGetPaymentPRNsQuery(
    { application_code: license?.application_code || "" },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const paymentPRN = paymentPRNs?.results[0];

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Application Details</CardTitle>
          <ExportPdfButton
            licenseData={license}
            institution={institution}
            paymentPRN={paymentPRN}
          />
        </CardHeader>
        <CardContent>
          <Table className="table-fixed rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Application Code
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.application_code}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">PRN</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {paymentPRN?.prn}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Search Code
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {paymentPRN?.searchCode}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  PRN Amount
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  UGX: {paymentPRN?.amount}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Is PRN Reconciled?
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {paymentPRN?.prn_reconciled}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <Separator className="bg-amber-800" />
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
<TableRow><TableCell className="font-medium">County</TableCell><TableCell className="whitespace-normal break-words">{institution?.county_name || "Not provided"}</TableCell></TableRow>
<TableRow><TableCell className="font-medium">Sub-county</TableCell><TableCell className="whitespace-normal break-words">{institution?.sub_county_name || "Not provided"}</TableCell></TableRow>
<TableRow><TableCell className="font-medium">Parish</TableCell><TableCell className="whitespace-normal break-words">{institution?.parish_name || "Not provided"}</TableCell></TableRow>
<TableRow><TableCell className="font-medium">Village</TableCell><TableCell className="whitespace-normal break-words">{institution?.village_name || "Not provided"}</TableCell></TableRow>
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

        <Separator className="bg-amber-800" />
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
                  {license?.amount_of_land} acres
                </TableCell>
              </TableRow>
<TableRow><TableCell className="font-medium">Geographical location</TableCell><TableCell className="whitespace-normal break-words">{license?.geographical_location || "Not provided"}</TableCell></TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Amount of land in current use
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.land_in_use} acres
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Amount of land for future use
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.land_for_future_use} acres
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Years of acquisition
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.year_obtained}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Leased or rented{" "}
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.leased_or_rented}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Lease or rent agreement{" "}
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {<FileDisplay file={license?.lease_or_rent_agreement} />}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <Separator className="bg-amber-800" />
        <CardHeader>
          <CardTitle>
            INFRASTRUCTURE TO SUPPORT THE DELIVERY OF HIGHER EDUCATION
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table-fixed rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Classrooms
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.classrooms} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Libraries
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.libraries} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Science laboratories
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.science_labs} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Computer laboratories
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.computer_labs} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Staff houses{" "}
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.staff_houses} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Number of staff houses
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.staff_houses} Houses
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Total area of administrative staff
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.administrative_staff_area} (sqm)
                </TableCell>
              </TableRow>

              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Total area for staff use
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.area_for_staff_use} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Main Building/Administrative
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.administrative_block_area} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Student welfare offices
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {(license?.student_Welfare_offices ?? license?.student_welfare_offices)} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Health Clinic/Sick Bay area
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.sick_bay_area} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Meeting Hall area
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.meeting_hall_area} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Campus master plan
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.master_plan} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Ground, physical infrastructure and services/utilities
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {""}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Area of playgrounds{" "}
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.area_of_playground} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Types of playgrounds available
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.available_playgrounds}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Area of empty space
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.area_of_empty_space} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Total mileage of roads and paths
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.total_roads_mileage} (sqm)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Sources of water{" "}
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.water_source}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Power Source{" "}
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.power_source}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Have suitable for agriculture{" "}
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.has_cultivable_land ? "Yes" : "No"}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Cultivable land
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.cultivable_land} (acres)
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Number of vehicles
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.number_of_vehicles}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Vehicle registration details
                </TableCell>

                <TableCell className="whitespace-pre-line text-right text-gray-800 dark:text-gray-100">
                  {license?.vehicles?.length ? <ul>{license.vehicles.map((vehicle) => <li key={vehicle.id}>{vehicle.make} — {vehicle.registration_number}</li>)}</ul> : license?.vehicle_registration}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <Separator className="bg-amber-800" />
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
                  {license?.library_books}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Textbooks
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.text_books}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Publication Years
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.publication_years}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Student computers
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.computers_in_use}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Computers in the Library{" "}
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.computers_in_library}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Academic staff computers
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.academic_staff_computers}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Computers in Administration
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.administrative_staff_computers}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Library computer program
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.library_computer_software}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Students will have access to computers
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.students_have_access ? "Yes" : "No"}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  University has internet access
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.has_internet_access ? "Yes" : "No"}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Internet Service Provider (ISP)
                </TableCell>
                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.ISP_provider || "Not provided"}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Number of library seats
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.library_seats}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Number of classroom seats
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.classroom_seats}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Number of laboratories seats
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.laboratories_seats}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Administration block seats
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.administration_block_seats}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Student Accommodation Facilities
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.student_facilities?.trim() || "No residential / student accommodation proposed"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <Separator className="bg-amber-800" />
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

                <TableCell className="text-right text-gray-800 dark:text-gray-100"></TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Full time academic staff
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.intended_full_time_academic_staff}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Part time academic staff
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.intended_part_time_academic_staff}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-semibold w-[100px]">
                  Administrative And Support Staff
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100"></TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Full time administrative staff
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.intended_full_time_admin_staff}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Academic staff support
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.intended_support_staff}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Proposed Council Members
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: license?.council_members || "",
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Proposed Chancellor
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.proposed_chancellor}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  {" "}
                  Proposed Vice Chancellor/Rector
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.proposed_vice_chancellor}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Proposed University Secretary
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.proposed_university_secretary}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Proposed Academic Registrar
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.proposed_academic_registrar}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Deans of each of the faculties
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: license?.heads_of_faculties || "",
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <Separator className="bg-amber-800" />

        <CardHeader>
          <CardTitle> OWNERSHIP OF THE UNIVERSITY</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table-fixed rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Owners of the proposed university
                </TableCell>

                <TableCell className="text-left text-gray-800 dark:text-gray-100 p-3 flex-1">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: license?.institution_ownership || "",
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Promoters of the university
                </TableCell>

                <TableCell className="text-left text-gray-800 dark:text-gray-100 p-3 flex-1">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: license?.university_promoters || "",
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <Separator className="bg-amber-800" />
        <CardHeader>
          <CardTitle> FINANCES AND THEIR MANAGEMENT</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table-fixed rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Other Assets
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">
                  {license?.other_assets || ""}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Proposed Annual Budget
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">
                  {license?.annual_budget || ""}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Fee Structure
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">
                  <FileDisplay file={license?.fee_structure} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  % Budget Derived from fees
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">
                  {license?.fees_percent_budget}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">
                  Other Sources of Revenue
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">
                  {license?.other_income_sources}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">
                  Infrastructure Development Allocation
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">
                  {license?.infrastructure_development}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">
                  Research Development Allocation
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">
                  {license?.research_development}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">
                  Computer Hardware and Software Allocation
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">
                  {license?.computer_hardware_software}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">
                  Science Lab Equipment Allocation
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">
                  {license?.science_lab_equipment}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">
                  Library Equipment Allocation
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">
                  {license?.library_equipment}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">
                  Staff Development Allocation
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">
                  {license?.staff_development}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">
                  % Budget for Staff Salaries
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">
                  {license?.staff_salaries}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">
                  Current Bankers
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">
                  {license?.current_bankers}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <Separator className="bg-amber-800" />
        <CardHeader>
          <CardTitle>VISION AND MISSION OF THE UNIVERSITY</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table-fixed rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">Vision</TableCell>

                <TableCell className="text-left text-gray-800 dark:text-gray-100 p-3 flex-1">
                  {license?.vision || ""}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">Mission</TableCell>

                <TableCell className="text-left text-gray-800 dark:text-gray-100 p-3 flex-1">
                  {license?.mission || ""}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Objectives
                </TableCell>

                <TableCell className="text-left text-gray-800 dark:text-gray-100 p-3 flex-1">
                  {parseProvisionalObjectives(license?.specific_objectives).length ? (
                    <ol className="list-decimal space-y-2 pl-5 whitespace-normal">
                      {parseProvisionalObjectives(license?.specific_objectives).map((objective, index) => <li key={index} className="whitespace-pre-wrap">{objective}</li>)}
                    </ol>
                  ) : "No objectives provided"}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Strategic Plan
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">
                  <FileDisplay file={license?.stractegic_plan} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  University Programmes
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100 p-3 flex-1">
                  <FileDisplay file={license?.programmes} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Area of Competence
                </TableCell>

                <TableCell className="text-left text-gray-800 dark:text-gray-100 p-3 flex-1">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: license?.area_of_competence || "",
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Future Planned Programmes
                </TableCell>

                <TableCell className="text-left text-gray-800 dark:text-gray-100 p-3 flex-1">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: license?.feature_programmes || "",
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

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
                  {license?.total_number_of_students}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-semibold w-[100px]">
                  Programme Distribution of Students
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100"></TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Arts (%)
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.arts_percentage}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Social Sciences (%)
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.social_sciences_percentage}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Basic Sciences (%)
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.basic_sciences_percentage}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Arts Education (Teaching) (%){" "}
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.arts_education_percentage}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Agriculture (%){" "}
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.agriculture_percentage}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Engineering/ Technology (%)
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.engineering_percentage}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Medicine (Medicine Pharmacy, dentistry) (%)
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.medicine_percentage}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Veterinary medicine (%)
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.veterinary_percentage}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <Separator className="bg-amber-800" />
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
                  <FileDisplay file={license?.signatures} />
                </TableCell>
              </TableRow>

              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  CVs of the Members
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.member_cvs} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Financial Control Mechanism
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.finance_control} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Programmes Details
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.detailed_programmes} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Physical and Educational Facilities{" "}
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.physical_education_facilities} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium w-[300px]">Supporting Documents</TableCell>
                <TableCell className="whitespace-normal break-words">
                  {license?.supporting_documents?.length ? (
                    <ul className="space-y-3">
                      {license.supporting_documents.map((document) => (
                        <li key={document.id}>
                          <p className="font-medium">{document.title}</p>
                          <FileDisplay file={document.document} />
                        </li>
                      ))}
                    </ul>
                  ) : "No supporting documents uploaded"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default Content;
