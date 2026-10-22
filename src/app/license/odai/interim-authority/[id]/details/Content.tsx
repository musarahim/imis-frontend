"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetInstitutionsQuery } from "@/redux/features/institution-api-slice";
import { useRetrieveODAIInterimAuthorityQuery } from "@/redux/features/license-api-slice";
import { useGetPaymentPRNsQuery } from "@/redux/features/payment-api-slice";
import { parseProvisionalObjectives } from "@/utils/provisionalObjectives";
import { FileDisplay } from "@/utils/fileUtils";
import ExportPdfButton from "./ExportPdfButton";

const renderFileOrHtml = (value?: string | File) => {
  if (typeof value === "string" && /<[^>]+>/.test(value)) {
    return <div dangerouslySetInnerHTML={{ __html: value }} />;
  }
  return <FileDisplay file={value} />;
};

function Content({ id }: { id: string }) {
  const { data: institutions } = useGetInstitutionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const institution = institutions?.results[0];

  const { data } = useRetrieveODAIInterimAuthorityQuery(Number(id), {
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
              <TableCell className="font-medium w-[100px]">
                Application Code
              </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {data?.application_code}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-[100px]">Status</TableCell>

              <TableCell className="text-right capitalize text-gray-800 dark:text-gray-100">
                {data?.status}
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
              <TableCell className="font-medium w-[100px]">Landline </TableCell>

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
              <TableCell className="font-medium w-[100px]">District </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {institution?.district}
              </TableCell>
            </TableRow>
<TableRow><TableCell className="font-medium">County</TableCell><TableCell className="whitespace-normal break-words">{institution?.county_name || "Not provided"}</TableCell></TableRow>
<TableRow><TableCell className="font-medium">Sub-county</TableCell><TableCell className="whitespace-normal break-words">{institution?.sub_county_name || "Not provided"}</TableCell></TableRow>
<TableRow><TableCell className="font-medium">Parish</TableCell><TableCell className="whitespace-normal break-words">{institution?.parish_name || "Not provided"}</TableCell></TableRow>
<TableRow><TableCell className="font-medium">Village</TableCell><TableCell className="whitespace-normal break-words">{institution?.village_name || "Not provided"}</TableCell></TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-[100px]">Location </TableCell>

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
              <TableCell className="font-medium w-[200px]">
                Has Title Deed
              </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {data?.has_title_deed ? "Yes" : "No"}
              </TableCell>
            </TableRow>
<TableRow><TableCell className="font-medium">Geographical location</TableCell><TableCell className="whitespace-normal break-words">{data?.geographical_location || "Not provided"}</TableCell></TableRow><TableRow><TableCell className="font-medium">Land size (acres)</TableCell><TableCell className="whitespace-normal break-words">{data?.land_size ?? "Not provided"}</TableCell></TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-[200px]">
                Title Deed
              </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {<FileDisplay file={data?.title_deed} />}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-[200px]">
                Existing Infrastructure
              </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.infrastructure || "",
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-[200px]">
                University Promoters
              </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                {data?.promoters_details?.length ? (
                  <ul className="list-disc pl-5 space-y-1 text-left">
                    {data.promoters_details.map((promoter, index) => (
                      <li key={promoter.id ?? `${promoter.name}-${index}`}>
                        {promoter.name} - {promoter.phone}
                        {promoter.email ? ` (${promoter.email})` : ""}
                        <div>Nationality: {promoter.nationality_name || "Not provided"}</div>
                        {promoter.id_passport_document && (
                          <a href={promoter.id_passport_document} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                            View ID / Passport document
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>No promoter provided</>
                )}
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
              <TableCell className="font-medium w-[200px]">Vision</TableCell>

              <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                {data?.vision}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-[200px]">Mission</TableCell>

              <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                {data?.mission}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-[200px]">
                Objectives
              </TableCell>

              <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                {parseProvisionalObjectives(data?.objectives).length ? <ol className="list-decimal space-y-1 pl-5">{parseProvisionalObjectives(data?.objectives).map((objective, index) => <li key={index} className="whitespace-pre-wrap">{objective}</li>)}</ol> : "No objectives provided"}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-[200px]">
                Philosophy
              </TableCell>

              <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                {data?.philosophy}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-[200px]">
                Governance Structures
              </TableCell>

              <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                {renderFileOrHtml(data?.governance_structure)}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-[200px]">
                Human Resources
              </TableCell>

              <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                {renderFileOrHtml(data?.human_resources)}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-[200px]">
                Source of Finance
              </TableCell>

              <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                {data?.source_of_finance}
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-[200px]">
                Action Plan
              </TableCell>

              <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.action_plan || "",
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-[200px]">
                Planned Programmes of Study
              </TableCell>

              <TableCell className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
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
              <TableCell className="font-medium w-[100px]">
                Names and Signatures of the promoters
              </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                <FileDisplay file={data?.promoters} />
              </TableCell>
            </TableRow>
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-medium w-[100px]">
                Project Proposal
              </TableCell>

              <TableCell className="text-right text-gray-800 dark:text-gray-100">
                <FileDisplay file={data?.project_proposal} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Supporting documents</TableCell>
              <TableCell>
                {data?.supporting_documents?.length ? data.supporting_documents.map((document) => (
                  <div key={document.id} className="mb-3">
                    <p className="font-medium">{document.title}</p>
                    <FileDisplay file={document.document} />
                  </div>
                )) : "No supporting documents uploaded"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Content;
