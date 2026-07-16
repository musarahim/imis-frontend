"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetInstitutionsQuery } from "@/redux/features/institution-api-slice";
import { useRetrieveCharterApplicationQuery } from "@/redux/features/license-api-slice";

import { useGetPaymentPRNsQuery } from "@/redux/features/payment-api-slice";
import { FileDisplay } from "@/utils/fileUtils";
import ExportPdfButton from "./ExportPdfButton";

function Content({ id }: { id: string }) {
  const { data: license } = useRetrieveCharterApplicationQuery(Number(id));
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
                <TableCell className="font-medium w-[300px]">
                  Has Provisional License?
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.has_provisional_license ? "Yes" : "No"}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Provisional License Issue Date
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.provisional_license_issue_date}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Copy of the Licence
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.provisional_license} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Amount of Land Owned
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.amount_of_land_owned} acres
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Land Title
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.land_title} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Amount of land in the current use
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.land_in_use} acres
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Amount of land for future use
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.land_for_future_use} acres
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Year(s) when the land mentioned earlier was acquired
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.year_obtained}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Land leased or rented?
                </TableCell>

                <TableCell className="text-right text-gray-800 capitalize dark:text-gray-100">
                  {license?.leased_or_rented}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Lease or Rent Agreement
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.lease_or_rent_agreement} />
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
                <TableCell className="font-semibold w-[100px]">
                  Buildings
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100"></TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Classrooms
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.classrooms}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Libraries
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.libraries}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Science laboratories
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.science_labs}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Computer laboratories
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.computer_labs}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Staff houses
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.staff_houses}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Administrative Staff Area
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.administrative_staff_area} sqm
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Area for Staff Use
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.area_for_staff_use} sqm
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Administrative Block Area
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.administrative_block_area} sqm
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Student Welfare Offices
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.student_welfare_offices} sqm
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Health Clinic/Sick Bay area
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.sick_bay_area} sqm
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Hostel/Dormitory area
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.hostels_area} sqm
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Meeting Hall area
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.meeting_hall_area} sqm
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Campus Master plan
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.master_plan} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-semibold w-[100px]">
                  Ground, physical infrastructure and services/utilities
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100"></TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Area of playgrounds
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.area_of_playground} sqm
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Available playgrounds
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.available_playgrounds}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Total Road and paths mileage
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.total_roads_mileage} km
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Water source
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.water_source}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[300px]">
                  Power source
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.power_source}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Has land suitable for Agriculture
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.has_cultivable_land ? "Yes" : "No"}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Total area of cultivable land
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.cultivable_land} acres
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-semibold w-[100px]">
                  Transport
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100"></TableCell>
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
                  Vehicle Registration
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.vehicle_registration}
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
                  Total number of Library books
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.library_books}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Total number of Text books
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.text_books}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Books Publication Years
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.publication_years.map((year) => year).join(", ")}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Computers for Student
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.computers_in_use}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Computers in the Library
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.computers_in_library}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Computers for academic staff
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.academic_staff_computers}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Computers for administration
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.administrative_staff_computers}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Library Computer Softwares
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.library_computer_software}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Students have access to Computers and Library resources
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
                  Library seats
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.library_seats}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Classroom seats
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.classroom_seats}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Laboratories seats
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
                  Student Accommodation facilities
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.student_facilities}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <Separator className="bg-amber-800" />
        <CardHeader>
          <CardTitle>ACADEMIC STAFF</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table-fixed rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Full time academic staff
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.full_time_academic_staff}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Intended number of academic full-time staff
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.intended_full_time_academic_staff}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Details of Academic Staff Qualifications
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay
                    file={license?.full_time_academic_staff_qualifications}
                  />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Part time academic staff
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.part_time_academic_staff}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Details of part-time Academic Staff Qualifications
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay
                    file={license?.part_time_academic_staff_qualifications}
                  />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Number of Ph.D holders
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.phd_holders}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Details of Ph.D holders Discipline
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.phd_holder_discipline} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Number of Master&apos;s holders
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.masters_holders}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Details of Master&apos;s holders Discipline
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.masters_holders_discipline} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Number of Bachelor&apos;s holders
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.bachelor_holders}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Number of Diploma holders
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.diploma_holders}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Average staff/student ratio
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.average_staff_student_ratio}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Staff/student ratio for each of the programmes.
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.programme_staff_student_ratio} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Staff overload
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.staff_overload}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <Separator className="bg-amber-800" />
        <CardHeader>
          <CardTitle>ADMINISTRATIVE AND SUPPORT STAFF</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table-fixed rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Number of administrative staff
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.administrative_staff}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Number of support staff
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.support_staff}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Members of the Governing Council
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.council_members} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Members of the Senate
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.senate_members} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Chancellor
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.chancellor}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Vice Chancellor
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.vice_chancellor}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  University Secretary
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.university_secretary}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  The Academic Registrar
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.academic_registrar}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Vice Academic Registrar
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.vice_registrar}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">Deans</TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.deans} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <Separator className="bg-amber-800" />
        <CardHeader>
          <CardTitle>OWNERSHIP OF THE UNIVERSITY</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table-fixed rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  University ownership
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: license?.ownership || "",
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <Separator className="bg-amber-800" />
        <CardHeader>
          <CardTitle>FINANCES AND THEIR MANAGEMENT</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table-fixed rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Other Assets besides land and buildings
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.other_assets} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  University Annual Budget
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.annual_budget}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Previous Financial Year&apos;s Accounts
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.previous_year_accounts} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Fees Structure
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.fees_structure} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Fees Percentage Budget
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.fees_percentage}%
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Other Sources of Income
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: license?.other_income_source || "",
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Infrastructure development budget
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.infrastructure_budget}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Research & Development budget
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.research_budget}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Computer hardware and software budget
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.computer_budget}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Science laboratory equipment budget
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.science_labs_budget}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Library resources budget
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.library_budget}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Staff development budget
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.staff_development_budget}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Staff salaries percentage budget
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.staff_salary_budget}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Current Bankers
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
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
          <Table className="table-auto rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">Vision</TableCell>

                <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                  {license?.vision}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">Mission</TableCell>

                <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                  {license?.mission}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">
                  Specific Objectives
                </TableCell>

                <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                  {license?.specific_objectives}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Strategic plan
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.university_strategic_plan} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">
                  Current Programmes Offered
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.programmes_offered} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[200px]">
                  Areas of Competence
                </TableCell>

                <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                  <FileDisplay file={license?.areas_of_competence} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Future Planned Programmes
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.future_planned_programmes} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <Separator className="bg-amber-800" />
        <CardHeader>
          <CardTitle>STUDENT POPULATION</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table-fixed rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Total number of students
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.total_students}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-semibold w-[100px]">
                  Programme distribution of students
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100"></TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Arts students
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.arts_students}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Social Sciences students
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.social_science_students}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Basic Sciences students
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.basic_science_students}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Arts Education (Teaching)
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.arts_education_students}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Science Education (Teaching)
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.science_education_students}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Agriculture
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.agriculture_students}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Medicine (Medicine Pharmacy, dentistry)
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.medicine_students}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Veterinary medicine
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.veterinary_students}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Engineering/Technology
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.engineering_students}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-semibold w-[100px]">
                  Regions of origin of students
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100"></TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Eastern Region
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.eastern_region}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Central Region
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.central_region}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Northern Region
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.northern_region}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Western Region
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.western_region}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-semibold w-[100px]">
                  Non-Ugandans
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  East Africans
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.east_africans}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Other International Students
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  {license?.other_regions}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <Separator className="bg-amber-800" />
        <CardHeader>
          <CardTitle>DOCUMENTS/ATTACHMENTS</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="table-auto rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Signatures of the Officers
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.signature_officers} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Institution Member CVs
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.member_cvs} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Financial Control Mechanism
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.financial_control} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Detailed Explanation of Programmes
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.detailed_programmes} />
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-[100px]">
                  Physical and Educational Facilities
                </TableCell>

                <TableCell className="text-right text-gray-800 dark:text-gray-100">
                  <FileDisplay file={license?.facilities} />
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
