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
    useAssignAssessorsMutation,
    useGetProgrammesReadyForAccessmentQuery,
    useGetProgrammeAssessorsQuery,
    useGetAssessmentApplicationFilterOptionsQuery,
} from "@/redux/features/programme-api-slice";
import { useField } from "formik";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

type FormValues = {
  assessor: string;
  applications: string[];
};

function AssessorSelection({
  assessors,
  selectedCount,
  disabled = false,
}: {
  assessors: ProgrammeAssessor[];
  selectedCount: number;
  disabled?: boolean;
}) {
  const [field, meta, helpers] = useField<string>("assessor");
  const [assessorSearch, setAssessorSearch] = React.useState("");
  const matchingAssessors = assessors.filter((assessor) =>
    assessor.name.toLowerCase().includes(assessorSearch.trim().toLowerCase()),
  );
  const selectedAssessor = assessors.find((assessor) => String(assessor.id) === field.value);
  const rangeMax = Math.max(
    1,
    ...assessors.map(
      (assessor) =>
        assessor.assigned_application_count +
        (String(assessor.id) === field.value ? selectedCount : 0),
    ),
  );

  return (
    <fieldset className="min-w-0 space-y-3" disabled={disabled}>
      <legend className="font-semibold">Select Assessor</legend>
      <p className="text-sm text-muted-foreground">
        Assigned programmes with no assessment by the assigned assessor. Shared
        range: 0–{rangeMax}.
      </p>
      <p className="text-sm">
        {selectedCount} application{selectedCount === 1 ? "" : "s"} selected for
        assignment.
      </p>
      <div className="space-y-2">
        <label htmlFor="assessor-search" className="text-sm font-medium">Search assessors</label>
        <Input id="assessor-search" type="search" value={assessorSearch}
          placeholder="Search by assessor name"
          onChange={(event) => setAssessorSearch(event.target.value)}
          onKeyDown={(event) => { if (event.key === "Enter") event.preventDefault(); }} />
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {matchingAssessors.length} of {assessors.length} assessors shown
        </p>
        {selectedAssessor && <p className="text-sm font-medium">Selected: {selectedAssessor.name}</p>}
      </div>
      <div className="max-h-[min(28rem,55dvh)] space-y-3 overflow-y-auto overscroll-contain pr-1"
        role="region" aria-label="Available assessors" tabIndex={0}>
      {matchingAssessors.map((assessor) => {
        const selected = field.value === String(assessor.id);
        const assigned = assessor.assigned_application_count;
        const projected = assigned + (selected ? selectedCount : 0);
        return (
          <label
            key={assessor.id}
            className={`block cursor-pointer space-y-2 rounded-md border p-3 ${selected ? "border-sky-600 bg-sky-50 dark:bg-sky-950/40" : ""}`}
          >
            <span className="flex items-center gap-2">
              <input
                type="radio"
                name={field.name}
                value={String(assessor.id)}
                checked={selected}
                onChange={() => {
                  void helpers.setValue(String(assessor.id));
                  void helpers.setTouched(true, false);
                }}
                onBlur={field.onBlur}
                aria-describedby={
                  meta.touched && meta.error ? "assessor-error" : undefined
                }
                className="h-4 w-4 accent-sky-600"
              />
              <span className="font-medium">{assessor.name}</span>
            </span>
            <span className="block text-sm">
              {assigned} application{assigned === 1 ? "" : "s"} awaiting their
              assessment
            </span>
            <span
              role="progressbar"
              aria-label={`${assessor.name} applications awaiting their assessment${selected ? " after this assignment" : ""}`}
              aria-valuemin={0}
              aria-valuemax={rangeMax}
              aria-valuenow={projected}
              aria-valuetext={`${assigned} awaiting their assessment${selected ? `; ${projected} after this assignment` : ""}`}
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
      {matchingAssessors.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">No assessors match your search.</p>}
      </div>
      {assessors.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Blue: awaiting their assessment. Amber: selected applications to add.
        </p>
      )}
      {meta.touched && meta.error && (
        <p id="assessor-error" className="text-sm text-red-600">
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
  const [tierDiscipline, setTierDiscipline] = React.useState("");
  const {
    data: filterOptions,
    isLoading: isLoadingFilters,
    isError: isFilterError,
    refetch: refetchFilters,
  } = useGetAssessmentApplicationFilterOptionsQuery(undefined, {
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
  } = useGetProgrammesReadyForAccessmentQuery({
    search: debouncedSearch,
    page,
    pageSize: 25,
    institution,
    programme_category: category,
    tier_displine: tierDiscipline,
  }, { refetchOnMountOrArgChange: true });
  const applications = data?.results ?? [];
  const isSearching = isFetching || search.trim() !== debouncedSearch;
  const {
    data: assessors,
    isLoading: isLoadingAssessors,
    isError: isAssessorError,
    refetch: refetchAssessors,
  } = useGetProgrammeAssessorsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [assignAssessors, { isLoading: isAssigning }] =
    useAssignAssessorsMutation();

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
    assessor: "",
    applications: [],
  };

  const validationSchema = Yup.object().shape({
    assessor: Yup.string().required("Assessor is required"),
  });

  const handleSubmit = (values: FormValues) => {
    if (
      isAssigning ||
      isLoadingAssessors ||
      isAssessorError ||
      isSearching ||
      isError
    )
      return;
    if (selectedRows.size === 0) {
      setApplicationError("Please select at least one application.");
      return;
    }

    setApplicationError("");

    const selectedAssessor = assessors?.find(
      (assessor) => String(assessor.id) === values.assessor,
    );

    const selectedApplicationIds = [...selectedRows].map(Number);
    const selectedAssessorId = selectedAssessor?.id ?? null;

    if (selectedAssessorId) {
      assignAssessors({
        userId: selectedAssessorId,
        applications: selectedApplicationIds,
      })
        .unwrap()
        .then(() => {
          void refetchAssessors();
          toast.success(
            `Assessor ${selectedAssessor?.name} assigned successfully`,
          );
          router.push(`/programmes/programme-accreditation`);
        })
        .catch((error) => {
          const blocked = error?.data?.blocked_programmes as { programme_name: string; application_number: string; invoices: { invoice_number: string; outstanding_balance: string }[] }[] | undefined;
          const message = blocked?.length
            ? blocked.map((programme) => `${programme.programme_name} (${programme.application_number}): ${programme.invoices.length ? programme.invoices.map((invoice) => `${invoice.invoice_number}, balance UGX ${Number(invoice.outstanding_balance).toLocaleString()}`).join("; ") : "No cleared desk review invoice"}`).join(". ")
            : error?.data?.detail || `Unable to assign assessor ${selectedAssessor?.name}.`;
          setApplicationError(message);
          toast.error("Assignment could not be completed. Review the payment details below.");
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
        Assign Assessor
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
                disabled={isAssigning || !(institution || category || tierDiscipline || search)}
                onClick={() => {
                  setInstitution("");
                  setCategory("");
                  setTierDiscipline("");
                  setSearch("");
                  setPage(1);
                }}
              >
                Reset filters
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
              <div className="min-w-0 space-y-2">
                <label htmlFor="tier-discipline-filter" className="text-sm font-medium">Tier discipline</label>
                <select id="tier-discipline-filter" value={tierDiscipline}
                  disabled={isAssigning || isLoadingFilters || isFilterError}
                  onChange={(event) => { setTierDiscipline(event.target.value); setPage(1); }}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50">
                  <option value="">All tier disciplines</option>
                  {filterOptions?.tier_disciplines.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
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
                <TableHead>Tier discipline</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isSearching ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-6 text-center">
                    Loading applications...
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-6 text-center">
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
                  <TableCell colSpan={6} className="py-6 text-center">
                    {debouncedSearch || institution || category || tierDiscipline
                      ? "No applications match your filters."
                      : "No programmes with fully verified desk review payment are awaiting assignment."}
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
                    <TableCell>{row.tier_displine_display || "\u2014"}</TableCell>
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
            {isLoadingAssessors ? (
              <p>Loading assessor workloads...</p>
            ) : isAssessorError ? (
              <div className="space-y-2">
                <p className="text-sm text-red-600">
                  Could not load assessors and their workloads.
                </p>
                <button
                  type="button"
                  onClick={() => void refetchAssessors()}
                  className="text-sm text-primary"
                >
                  Retry
                </button>
              </div>
            ) : assessors?.length ? (
              <AssessorSelection
                assessors={assessors}
                selectedCount={selectedRows.size}
                disabled={isAssigning}
              />
            ) : (
              <p>No programme assessors are available.</p>
            )}
            <fieldset
              disabled={
                isAssigning ||
                isLoadingAssessors ||
                isAssessorError ||
                !assessors?.length ||
                isSearching ||
                isError
              }
              className="mt-6 disabled:opacity-50"
            >
              <SubmitButton
                isLoading={isAssigning}
                title="Assign Assessor"
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
