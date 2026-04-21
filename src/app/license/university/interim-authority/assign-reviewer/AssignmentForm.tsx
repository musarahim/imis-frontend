"use client";

import { AppForm, SelectField, SubmitButton } from "@/components/forms";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAssignInterimAuthorityReviewersMutation,
  useGetDeskReviewersQuery,
  useGetIntrimAuthoritiesQuery,
} from "@/redux/features/license-api-slice";

import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

type FormValues = {
  reviewer: string;
  applications: string[];
};

function AssignmentForm() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetIntrimAuthoritiesQuery({});
  const { data: reviewers } = useGetDeskReviewersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [assignReviewers, { isLoading: isAssigning }] =
    useAssignInterimAuthorityReviewersMutation();

  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(
    new Set(),
  );
  const [applicationError, setApplicationError] = React.useState("");

  const selectAll =
    (data?.results?.length ?? 0) > 0 &&
    selectedRows.size === (data?.results?.length ?? 0);

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    const isChecked = checked === true;

    if (isChecked) {
      setSelectedRows(
        new Set((data?.results ?? []).map((row) => String(row.id))),
      );
      setApplicationError("");
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: string, checked: boolean | "indeterminate") => {
    const isChecked = checked === true;

    setSelectedRows((prev) => {
      const newSelected = new Set(prev);

      if (isChecked) {
        newSelected.add(id);
        setApplicationError("");
      } else {
        newSelected.delete(id);
      }

      return newSelected;
    });
  };

  const initialValues: FormValues = {
    reviewer: "",
    applications: [],
  };

  const validationSchema = Yup.object().shape({
    reviewer: Yup.string().required("Reviewer is required"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const handleSubmit = (values: FormValues) => {
    if (selectedRows.size === 0) {
      setApplicationError("Please select at least one application.");
      return;
    }

    setApplicationError("");

    const selectedApplications =
      data?.results?.filter((row) => selectedRows.has(String(row.id))) ?? [];

    const selectedReviewer = reviewers?.find(
      (reviewer) => String(reviewer.id) === values.reviewer,
    );

    const selectedApplicationIds = selectedApplications
      .map((app) => app.id)
      .filter((id): id is number => id !== undefined);
    const selectedReviewerId = selectedReviewer?.id ?? null;

    if (selectedReviewerId) {
      assignReviewers({
        userId: selectedReviewerId,
        applications: selectedApplicationIds,
      })
        .unwrap()
        .then(() => {
          toast.success(
            `Reviewer ${selectedReviewer?.name} assigned successfully`,
          );
          router.push(`/license/university/interim-authority/submitted`);
        })
        .catch((error) => {
          // Handle error, e.g., show an error message
          console.error("Error assigning reviewer:", error);
          toast.error(`Error assigning reviewer ${selectedReviewer?.name}`);
        });
    }
  };

  return (
    <AppForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <div className="mb-4 mt-1.5 text-lg font-semibold">
        Assign Preliminary Reviewer
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col lg:flex-row gap-4 h-full">
        <div className="flex-1 lg:w-3/4 rounded-lg border p-2 h-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">
                  <Checkbox
                    id="select-all-checkbox"
                    name="select-all-checkbox"
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Application Code</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Application Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.results?.map((row: InterimAuthority) => (
                <TableRow
                  key={row.id}
                  data-state={
                    selectedRows.has(String(row.id)) ? "selected" : undefined
                  }
                >
                  <TableCell>
                    <Checkbox
                      id={`row-${row.id}-checkbox`}
                      name={`application-${row.id}`}
                      checked={selectedRows.has(String(row.id))}
                      onCheckedChange={(checked) =>
                        handleSelectRow(String(row.id), checked)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {row?.application_code}
                  </TableCell>
                  <TableCell>{row?.institution}</TableCell>
                  <TableCell>{row?.application_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {applicationError && (
            <p className="mt-2 text-sm text-red-600">{applicationError}</p>
          )}
        </div>

        <div className="lg:w-1/4 w-full h-40">
          <div className="bg-white dark:bg-gray-950 rounded-lg border p-2 h-full">
            <SelectField
              name="reviewer"
              label="Select Reviewer"
              options={
                reviewers?.map((reviewer) => ({
                  label: reviewer.name,
                  value: String(reviewer.id),
                })) ?? []
              }
            />
            <div className="mt-6">
              <SubmitButton
                isLoading={isAssigning}
                title="Assign Reviewer"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </AppForm>
  );
}

export default AssignmentForm;
