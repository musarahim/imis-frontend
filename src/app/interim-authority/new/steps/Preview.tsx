import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldDescription, FieldLegend, FieldSet } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetInstitutionsQuery } from "@/redux/features/institution-api-slice";
import { FileDisplay } from "@/utils/fileUtils";

type StepDProps = {
  data?: InterimAuthority;
  onStepClick: (step: string) => void;
};
function Preview({ data, onStepClick }: StepDProps) {
  const { data: institutions } = useGetInstitutionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
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
                <TableCell className="font-medium w-25">
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
          <FieldSet>
            <FieldLegend>Has Title Deed</FieldLegend>
            <FieldDescription>
              {data?.has_title_deed ? "Yes" : "No"}
            </FieldDescription>
          </FieldSet>
          <FieldSet>
            <FieldLegend>Title Deed</FieldLegend>
            <FieldDescription>
              {<FileDisplay file={data?.title_deed} className="pb-3 mb-3" />}
            </FieldDescription>
          </FieldSet>
          <FieldSet>
            <FieldLegend>Existing Infrastructure</FieldLegend>
            <FieldDescription>
              <div
                dangerouslySetInnerHTML={{ __html: data?.infrastructure || "" }}
              />
            </FieldDescription>
          </FieldSet>
          <FieldSet>
            <FieldLegend>University Promoters</FieldLegend>
            <FieldDescription>{data?.names_of_promoters}</FieldDescription>
          </FieldSet>
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Button variant="default" onClick={() => onStepClick("B")}>
            Edit
          </Button>
        </CardFooter>
        <Separator />
        <CardHeader>
          <CardTitle>VISION, MISSION, OBJECTIVES AND PHILOSOPHY</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldSet>
            <FieldLegend>University Vision</FieldLegend>
            <FieldDescription>{data?.vision}</FieldDescription>
          </FieldSet>
          <FieldSet>
            <FieldLegend>Mission</FieldLegend>
            <FieldDescription>{data?.mission}</FieldDescription>
          </FieldSet>
          <FieldSet>
            <FieldLegend>Objectives</FieldLegend>
            <FieldDescription>{data?.objectives}</FieldDescription>
          </FieldSet>
          <FieldSet>
            <FieldLegend>Philosophy</FieldLegend>
            <FieldDescription>{data?.philosophy}</FieldDescription>
          </FieldSet>
          <FieldSet>
            <FieldLegend>Governance Structures</FieldLegend>
            <FieldDescription className="p-3">
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.governance_structure || "",
                }}
              />
            </FieldDescription>
          </FieldSet>
          <FieldSet>
            <FieldLegend>Human Resources</FieldLegend>
            <FieldDescription className="p-3">
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.human_resources || "",
                }}
              />
            </FieldDescription>
          </FieldSet>
          <FieldSet>
            <FieldLegend>Source of Finance</FieldLegend>
            <FieldDescription>{data?.source_of_finance}</FieldDescription>
          </FieldSet>
          <FieldSet>
            <FieldLegend>Action Plan</FieldLegend>
            <FieldDescription className="p-3">
              <div
                dangerouslySetInnerHTML={{ __html: data?.action_plan || "" }}
              />
            </FieldDescription>
          </FieldSet>
          <FieldSet>
            <FieldLegend>Planned Programmes of Study</FieldLegend>
            <FieldDescription className="p-3">
              <div
                dangerouslySetInnerHTML={{ __html: data?.programmes || "" }}
              />
            </FieldDescription>
          </FieldSet>
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Button variant="default" onClick={() => onStepClick("C")}>
            Edit
          </Button>
        </CardFooter>
        <Separator />
        <CardHeader>
          <CardTitle>OTHER DOCUMENTS</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldSet>
            <FieldLegend>Names and Signatures of the promoters</FieldLegend>
            <FieldDescription>
              {<FileDisplay file={data?.promoters} className="pb-3 mb-3" />}
            </FieldDescription>
          </FieldSet>
          <FieldSet>
            <FieldLegend>project proposal</FieldLegend>
            <FieldDescription>
              {
                <FileDisplay
                  file={data?.project_proposal}
                  className="pb-3 mb-3"
                />
              }
            </FieldDescription>
          </FieldSet>
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
                  Please review all the information provided above. If
                  everything is correct, click &quot;Submit&quot; to finalize
                  your application for the Interim Authority to operate a
                  University. If you need to make any changes, use the
                  &quot;Edit&quot; buttons next to each section.
                </p>

                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md dark:bg-amber-900/20 dark:border-amber-800">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                      <svg
                        className="w-5 h-5 text-amber-600 dark:text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-amber-800 dark:text-amber-200 font-medium">
                      <strong>Important:</strong> Once submitted, you will not
                      be able to make further changes to this application.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-md dark:bg-blue-900/20 dark:border-blue-800">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                      <svg
                        className="w-5 h-5 text-blue-600 dark:text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-blue-800 dark:text-blue-200">
                      <strong>Payment Information:</strong> A Payment
                      Registration Number (PRN) will be generated after
                      submission for the application processing fee. The PRN
                      expires within 21 days.
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
  );
}

export default Preview;
