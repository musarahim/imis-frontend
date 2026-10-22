"use client";

import {
    LicensingApplicationRow,
    LicensingReviewer,
    licensingWorkloadProjection,
} from "@/lib/licensing";
import { useField } from "formik";

export default function LicensingReviewerSelection({
  reviewers,
  selectedApplications,
  disabled = false,
}: {
  reviewers: LicensingReviewer[];
  selectedApplications: LicensingApplicationRow[];
  disabled?: boolean;
}) {
  const [field, meta, helpers] = useField<string>("reviewer");
  const rangeMax = Math.max(
    1,
    ...reviewers.map((reviewer) => {
      const workload = licensingWorkloadProjection(
        reviewer,
        selectedApplications,
      );
      return String(reviewer.id) === field.value
        ? workload.projected
        : workload.assigned;
    }),
  );

  return (
    <fieldset className="space-y-3" disabled={disabled}>
      <legend className="font-semibold">Select Reviewer</legend>

      <p className="text-sm text-muted-foreground">
        Applications under preliminary review across all institution licensing
        types. Shared range: 0–{rangeMax}.
      </p>
      <p className="text-sm">
        {selectedApplications.length} application
        {selectedApplications.length === 1 ? "" : "s"} selected for assignment.
      </p>
      {reviewers.map((reviewer) => {
        const selected = field.value === String(reviewer.id);
        const { assigned, additions, projected } = licensingWorkloadProjection(
          reviewer,
          selectedApplications,
        );
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
              {assigned} application{assigned === 1 ? "" : "s"} under
              preliminary review
            </span>
            <span
              role="progressbar"
              aria-label={`${reviewer.name} licensing workload${selected ? " after this assignment" : ""}`}
              aria-valuemin={0}
              aria-valuemax={rangeMax}
              aria-valuenow={selected ? projected : assigned}
              aria-valuetext={`${assigned} currently assigned${selected ? `; ${projected} after this assignment` : ""}`}
              className="flex h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"
            >
              <span
                className="bg-sky-600 transition-all"
                style={{ width: `${(assigned / rangeMax) * 100}%` }}
              />
              {selected && (
                <span
                  className="bg-amber-400 transition-all"
                  style={{ width: `${(additions / rangeMax) * 100}%` }}
                />
              )}
            </span>
            {selected && (
              <span aria-live="polite" className="block text-sm font-medium">
                After assignment: {projected} ({assigned} current + {additions}{" "}
                to add)
              </span>
            )}
            {selected && additions < selectedApplications.length && (
              <span className="block text-xs text-muted-foreground">
                Applications already assigned to this reviewer are included in
                their current workload.
              </span>
            )}
          </label>
        );
      })}
      {reviewers.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Blue: current assignments. Amber: selected applications to add.
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
