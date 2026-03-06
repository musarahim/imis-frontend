"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useRetrieveProgrammeAccreditationQuery } from "@/redux/features/programme-api-slice";
import dynamic from "next/dynamic";
import { useState } from "react";
const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false,
});

function Content({ id }: { id: string }) {
  const { data, isLoading, isError } = useRetrieveProgrammeAccreditationQuery(
    Number(id),
    { refetchOnMountOrArgChange: true },
  );

  const [activeDocument, setActiveDocument] = useState<string | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg border p-2 h-full">
      <h3 className="text-xl font-semibold">{data?.program_name}</h3>
      <Table className="w-full mt-1">
        <TableBody>
          <TableRow>
            <TableCell className="font-semibold text-md" colSpan={3}>
              Application Number:
            </TableCell>

            <TableCell className="text-md">
              {data?.application_number}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-md" colSpan={3}>
              Application Type:
            </TableCell>

            <TableCell className="text-md">{data?.application_type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-md" colSpan={3}>
              Programme Name:
            </TableCell>

            <TableCell className="text-md">{data?.program_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-md" colSpan={3}>
              Programme Level:
            </TableCell>

            <TableCell className="text-md">{data?.program_level}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-md" colSpan={3}>
              Duration (in semesters):
            </TableCell>

            <TableCell className="text-md">{data?.duration_semester}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-md" colSpan={3}>
              Institution:
            </TableCell>

            <TableCell className="text-md">{data?.institution}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-md" colSpan={3}>
              Campus:
            </TableCell>

            <TableCell className="text-md">{data?.campus}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-md" colSpan={3}>
              Date Submitted:
            </TableCell>

            <TableCell className="text-md">{data?.date_submitted}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-md" colSpan={3}>
              Status:
            </TableCell>

            <TableCell className="text-md">{data?.status}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-4">Documents</h4>

        {/* Document Navigation Tabs */}
        <div className="border-b mb-4">
          <div className="flex space-x-4">
            {data?.program_structure && (
              <button
                onClick={() => setActiveDocument("structure")}
                className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                  activeDocument === "structure" ||
                  (!activeDocument && data?.program_structure)
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Programme Structure
              </button>
            )}
            {data?.letter_of_submission && (
              <button
                onClick={() => setActiveDocument("submission")}
                className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                  activeDocument === "submission"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Letter of Submission
              </button>
            )}
          </div>
        </div>

        {/* PDF Viewers */}
        {data?.program_structure &&
          (activeDocument === "structure" || !activeDocument) &&
          typeof data.program_structure === "string" && (
            <>
              <PdfViewer url={data.program_structure} />
            </>
          )}

        {data?.letter_of_submission &&
          activeDocument === "submission" &&
          typeof data.letter_of_submission === "string" && (
            <>
              {/* Debug info - remove in production */}

              <PdfViewer url={data.letter_of_submission} />
            </>
          )}

        {/* No documents message */}
        {!data?.program_structure && !data?.letter_of_submission && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No documents available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Content;
