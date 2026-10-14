"use client";

import { AppForm, SubmitButton } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
    useAssignReviewersMutation,
    useGetProgrammeAccreditationsQuery,
    useGetProgrammeReviewersQuery,
    useGetSubmittedApplicationFilterOptionsQuery,
} from "@/redux/features/programme-api-slice";
import { useField } from "formik";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

type FormValues = {
  reviewer: string;
  applications: string[];
};

function ReviewerSelection({
  reviewers,
  selectedCount,
}: {
  reviewers: ProgrammeReviewer[];
  selectedCount: number;
}) {
  const [field, meta, helpers] = useField<string>("reviewer");
  const rangeMax = Math.max(
    1,
    ...reviewers.map(
      (reviewer) =>
        reviewer.assigned_application_count +
        (String(reviewer.id) === field.value ? selectedCount : 0),
    ),
  );

  return (
    <fieldset className="space-y-3">
      <legend className="font-semibold">Select Reviewer</legend>
      <p className="text-sm text-muted-foreground">
        Assigned applications with no review by the assigned reviewer. Shared
        range: 0–{rangeMax}.
      </p>
      <p className="text-sm">
        {selectedCount} application{selectedCount === 1 ? "" : "s"} selected for
        assignment.
      </p>
      {reviewers.map((reviewer) => {
        const selected = field.value === String(reviewer.id);
        const assigned = reviewer.assigned_application_count;
        const projected = assigned + (selected ? selectedCount : 0);
        return (
          <label
            key={reviewer.id}
            className={`block cursor-pointer space-y-2 rounded-md border p-3 ${selected ? "border-sky-600 bg-sky-50 dark:bg-sky-950/40" : ""}`}
          >
            <span className="flex items-center gap-2">
              <input
                type="radio"
                name={field.name}
                value={String(reviewer.id)}
                checked={selected}
                onChange={() => {
                  void helpers.setValue(String(reviewer.id));
                  void helpers.setTouched(true, false);
                }}
                onBlur={field.onBlur}
                aria-describedby={
                  meta.touched && meta.error ? "reviewer-error" : undefined
                }
                className="h-4 w-4 accent-sky-600"
              />
              <span className="font-medium">{reviewer.name}</span>
            </span>
            <span className="block text-sm">
              {assigned} application{assigned === 1 ? "" : "s"} awaiting their
              review
            </span>
            <span
              role="progressbar"
              aria-label={`${reviewer.name} applications awaiting their review${selected ? " after this assignment" : ""}`}
              aria-valuemin={0}
              aria-valuemax={rangeMax}
              aria-valuenow={projected}
              aria-valuetext={`${assigned} awaiting their review${selected ? `; ${projected} after this assignment` : ""}`}
              className="flex h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"
            >
              <span
                className="bg-sky-600 transition-all"
                style={{ width: `${(assigned / rangeMax) * 100}%` }}
              />
              {selected && (
                <span
                  className="bg-amber-400 transition-all"
                  style={{ width: `${(selectedCount / rangeMax) * 100}%` }}
                />
              )}
            </span>
            {selected && (
              <span aria-live="polite" className="block text-sm font-medium">
                After assignment: {projected} ({assigned} current +{" "}
                {selectedCount} selected)
              </span>
            )}
          </label>
        );
      })}
      {reviewers.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Blue: awaiting their review. Amber: selected applications to add.
        </p>
      )}
      {meta.touched && meta.error && (
        <p id="reviewer-error" className="text-sm text-red-600">
          {meta.error}
        </p>
      )}
    </fieldset>
  );
}

function AssignmentForm() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [institution, setInstitution] = React.useState("");
  const [category, setCategory] = React.useState("");
  const {
    data: filterOptions,
    isLoading: isLoadingFilters,
    isError: isFilterError,
    refetch: refetchFilters,
  } = useGetSubmittedApplicationFilterOptionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  React.useEffect(() => {
    if (search.trim() === debouncedSearch) return;
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, debouncedSearch]);
  const {
    currentData: data,
    isFetching,
    isError,
    refetch,
  } = useGetProgrammeAccreditationsQuery({
    search: debouncedSearch,
    page,
    pageSize: 25,
    institution,
    programme_category: category,
  });
  const applications = data?.results ?? [];
  const isSearching = isFetching || search.trim() !== debouncedSearch;
  const {
    data: reviewers,
    isLoading: isLoadingReviewers,
    isError: isReviewerError,
    refetch: refetchReviewers,
  } = useGetProgrammeReviewersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [assignReviewers, { isLoading: isAssigning }] =
    useAssignReviewersMutation();

  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(
    new Set(),
  );
  const [applicationError, setApplicationError] = React.useState("");

  const selectAll =
    applications.length > 0 &&
    applications.every((row) => selectedRows.has(String(row.id)));
  const someSelected = applications.some((row) =>
    selectedRows.has(String(row.id)),
  );

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    const isChecked = checked === true;

    if (isChecked) {
      setSelectedRows(
        (previous) =>
          new Set([...previous, ...applications.map((row) => String(row.id))]),
      );
      setApplicationError("");
    } else {
      setSelectedRows((previous) => {
        const remaining = new Set(previous);
        applications.forEach((row) => remaining.delete(String(row.id)));
        return remaining;
      });
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

  const handleSubmit = (values: FormValues) => {
    if (
      isAssigning ||
      isLoadingReviewers ||
      isReviewerError ||
      isSearching ||
      isError
    )
      return;
    if (selectedRows.size === 0) {
      setApplicationError("Please select at least one application.");
      return;
    }

    setApplicationError("");

    const selectedReviewer = reviewers?.find(
      (reviewer) => String(reviewer.id) === values.reviewer,
    );

    const selectedApplicationIds = [...selectedRows].map(Number);
    const selectedReviewerId = selectedReviewer?.id ?? null;

    if (selectedReviewerId) {
      assignReviewers({
        userId: selectedReviewerId,
        applications: selectedApplicationIds,
      })
        .unwrap()
        .then(() => {
          void refetchReviewers();
          toast.success(
            `Reviewer ${selectedReviewer?.name} assigned successfully`,
          );
          router.push(`/programmes/programme-accreditation`);
        })
        .catch((error) => {
          // Handle error, e.g., show an error message
          console.error("Error assigning reviewer:", error);
          toast.error(`Error assigning reviewer ${selectedReviewer?.name}`);
        });
    }

    console.log("Selected Application IDs:", selectedApplicationIds);
    console.log("Selected Reviewer ID:", selectedReviewerId);
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
        <div className="min-w-0 flex-1 rounded-lg border p-4 h-full">
          <div className="mb-4 space-y-4 rounded-lg border bg-muted/30 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold">Filter applications</h2>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={isAssigning || !(institution || category || search)}
                onClick={() => {
                  setInstitution("");
                  setCategory("");
                  setSearch("");
                  setPage(1);
                }}
              >
                Reset filters
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="min-w-0 space-y-2">
                <label
                  htmlFor="institution-filter"
                  className="text-sm font-medium"
                >
                  Institution
                </label>
                <select
                  id="institution-filter"
                  value={institution}
                  disabled={isAssigning || isLoadingFilters || isFilterError}
                  onChange={(event) => {
                    setInstitution(event.target.value);
                    setPage(1);
                  }}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                >
                  <option value="">All institutions</option>
                  {filterOptions?.institutions.map((option) => (
                    <option key={option.id} value={String(option.id)}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="min-w-0 space-y-2">
                <label
                  htmlFor="category-filter"
                  className="text-sm font-medium"
                >
                  Programme category
                </label>
                <select
                  id="category-filter"
                  value={category}
                  disabled={isAssigning || isLoadingFilters || isFilterError}
                  onChange={(event) => {
                    setCategory(event.target.value);
                    setPage(1);
                  }}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                >
                  <option value="">All categories</option>
                  {filterOptions?.programme_categories.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {isLoadingFilters && (
              <p className="text-sm text-muted-foreground">
                Loading filter options...
              </p>
            )}
            {isFilterError && (
              <p className="text-sm text-red-600">
                Could not load filter options.{" "}
                <button
                  type="button"
                  onClick={() => void refetchFilters()}
                  className="text-primary"
                >
                  Retry
                </button>
              </p>
            )}
            <div className="space-y-2">
              <label
                htmlFor="application-search"
                className="text-sm font-medium"
              >
                Search applications
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  id="application-search"
                  type="search"
                  value={search}
                  disabled={isAssigning}
                  placeholder="Institution, programme, application number or level"
                  onChange={(event) => setSearch(event.target.value)}
                  className="bg-white"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") event.preventDefault();
                  }}
                />
                {search && (
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={isAssigning}
                    onClick={() => setSearch("")}
                  >
                    Clear search
                  </Button>
                )}
              </div>
            </div>
          </div>
          <Table className="border-collapse border border-border [&_th]:border [&_th]:border-border [&_td]:border [&_td]:border-border">
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">
                  <Checkbox
                    id="select-all-checkbox"
                    name="select-all-checkbox"
                    checked={
                      selectAll ? true : someSelected ? "indeterminate" : false
                    }
                    onCheckedChange={handleSelectAll}
                    disabled={
                      isSearching ||
                      isAssigning ||
                      isError ||
                      applications.length === 0
                    }
                    aria-label="Select all applications on this page"
                  />
                </TableHead>
                <TableHead>Application number</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Programme</TableHead>
                <TableHead>Level</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isSearching ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-6 text-center">
                    Loading applications...
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-6 text-center">
                    Could not load applications.{" "}
                    <button
                      type="button"
                      onClick={() => void refetch()}
                      className="text-primary"
                    >
                      Retry
                    </button>
                  </TableCell>
                </TableRow>
              ) : applications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-6 text-center">
                    {debouncedSearch || institution || category
                      ? "No applications match your filters."
                      : "No applications are awaiting assignment."}
                  </TableCell>
                </TableRow>
              ) : (
                applications.map((row: ProgrammeAccreditation) => (
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
                        disabled={isAssigning}
                        aria-label={`Select ${row.application_number ?? row.programme_name}`}
                        onCheckedChange={(checked) =>
                          handleSelectRow(String(row.id), checked)
                        }
                      />
                    </TableCell>
                    <TableCell>{row.application_number}</TableCell>
                    <TableCell className="font-medium">
                      {row?.institution}
                    </TableCell>
                    <TableCell>{row?.programme_name}</TableCell>
                    <TableCell>{row?.program_level}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="space-y-1">
              <p aria-live="polite">
                {selectedRows.size} selected
                {!isSearching &&
                  !isError &&
                  ` · ${data?.count ?? applications.length} matching applications`}
              </p>
              <p className="text-xs text-muted-foreground">
                Selections are kept across searches, filters and pages.
              </p>
              {selectedRows.size > 0 && (
                <button
                  type="button"
                  disabled={isAssigning}
                  onClick={() => setSelectedRows(new Set())}
                  className="text-primary"
                >
                  Clear selection
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={
                  isSearching || isAssigning || isError || !data?.previous
                }
                onClick={() => setPage((current) => current - 1)}
              >
                Previous
              </Button>
              <span>Page {page}</span>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={isSearching || isAssigning || isError || !data?.next}
                onClick={() => setPage((current) => current + 1)}
              >
                Next
              </Button>
            </div>
          </div>

          {applicationError && (
            <p className="mt-2 text-sm text-red-600">{applicationError}</p>
          )}
        </div>

        <div className="w-full lg:w-1/3 lg:shrink-0">
          <div className="bg-white dark:bg-gray-950 rounded-lg border p-4">
            {isLoadingReviewers ? (
              <p>Loading reviewer workloads...</p>
            ) : isReviewerError ? (
              <div className="space-y-2">
                <p className="text-sm text-red-600">
                  Could not load reviewers and their workloads.
                </p>
                <button
                  type="button"
                  onClick={() => void refetchReviewers()}
                  className="text-sm text-primary"
                >
                  Retry
                </button>
              </div>
            ) : reviewers?.length ? (
              <ReviewerSelection
                reviewers={reviewers}
                selectedCount={selectedRows.size}
              />
            ) : (
              <p>No preliminary reviewers are available.</p>
            )}
            <fieldset
              disabled={
                isAssigning ||
                isLoadingReviewers ||
                isReviewerError ||
                !reviewers?.length ||
                isSearching ||
                isError
              }
              className="mt-6 disabled:opacity-50"
            >
              <SubmitButton
                isLoading={isAssigning}
                title="Assign Reviewer"
                className="w-full"
              />
            </fieldset>
          </div>
        </div>
      </div>
    </AppForm>
  );
}

export default AssignmentForm;
