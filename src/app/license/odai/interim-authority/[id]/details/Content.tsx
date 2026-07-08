"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetInstitutionsQuery } from "@/redux/features/institution-api-slice";
import { useRetrieveInterimAuthorityQuery } from "@/redux/features/license-api-slice";
import { useGetPaymentPRNsQuery } from "@/redux/features/payment-api-slice";
import { FileDisplay } from "@/utils/fileUtils";
import ExportPdfButton from "./ExportPdfButton";

function Content({ id }: { id: string }) {
  const { data: institutions } = useGetInstitutionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const institution = institutions?.results[0];

  const { data } = useRetrieveInterimAuthorityQuery(Number(id), {
    refetchOnMountOrArgChange: true,
  });
  const { data: paymentPRNs } = useGetPaymentPRNsQuery(
    { application_code: data?.application_code || "" },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const paymentPRN = paymentPRNs?.results[0];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Application Details</CardTitle>
        <ExportPdfButton
          licenseData={data}
          institution={institution}
          paymentPRN={paymentPRN}
        />
      </CardHeader>
      <CardContent>
        <Table className="table-fixed rounded-2xl">
          <TableBody>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">
                Application Code
              </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {data?.application_code}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">Status</TableCell>

              <TableCell className="text-right capitalize text-gray-800 dark:text-gray-100">
                {data?.status}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">PRN</TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {paymentPRN?.prn}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">Search Code</TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {paymentPRN?.searchCode}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">PRN Amount</TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                UGX: {paymentPRN?.amount}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">
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
              <TableCell className="font-medium w-25">
                Institution Name
              </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {institution?.name}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">Acronym</TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {institution?.acroynm}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">Postal Address</TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {institution?.postal_address}{" "}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">
                Website Address{" "}
              </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {institution?.website}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">Landline </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {institution?.landline}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">Mobile </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {institution?.phone}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">Region </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {institution?.region}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">District </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {institution?.district}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">Location </TableCell>

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
              <TableCell className="font-medium w-25">Has Title Deed</TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {data?.has_title_deed ? "Yes" : "No"}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">Title Deed</TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {<FileDisplay file={data?.title_deed} />}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">
                Existing Infrastructure
              </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.infrastructure || "",
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">
                University Promoters
              </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {data?.names_of_promoters}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>

      <Separator className="bg-amber-800" />
      <CardHeader>
        <CardTitle>VISION, MISSION, OBJECTIVES AND PHILOSOPHY</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="table-fixed rounded-2xl">
          <TableBody>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-50">Vision</TableCell>

              <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                {data?.vision}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-50">Mission</TableCell>

              <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                {data?.mission}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-50">Objectives</TableCell>

              <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                {data?.objectives}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-50">Philosophy</TableCell>

              <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                {data?.philosophy}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-50">
                Governance Structures
              </TableCell>

              <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.governance_structure || "",
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-50">
                Human Resources
              </TableCell>

              <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.human_resources || "",
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-50">
                Source of Finance
              </TableCell>

              <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                {data?.source_of_finance}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-50">Action Plan</TableCell>

              <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.action_plan || "",
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-50">
                Planned Programmes
              </TableCell>

              <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap wrap-break-word">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.programmes || "",
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>

      <Separator className="bg-amber-800" />
      <CardHeader>
        <CardTitle>OTHER DOCUMENTS</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="table-fixed rounded-2xl">
          <TableBody>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">
                Names and Signatures of the promoters
              </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                <FileDisplay file={data?.promoters} />
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-25">
                Project Proposal
              </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                <FileDisplay file={data?.project_proposal} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Content;
