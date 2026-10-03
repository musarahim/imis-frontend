"use client";

import { Button } from "@/components/ui/button";
import { useGetEmployeeByIdQuery } from "@/redux/features/hr-api-slice";
import { skipToken } from "@reduxjs/toolkit/query";
import CompletionSummary from "./CompletionSummary";

export default function ProfileProgress({ employeeId, onSelectSection }: {
  employeeId?: number;
  onSelectSection: (section: string) => void;
}) {
  const { data: employee, isLoading, isError, refetch } = useGetEmployeeByIdQuery(employeeId ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });
  if (!employeeId) return null;
  if (isLoading) return <p role="status">Loading profile completion...</p>;
  if (isError || !employee) return (
    <div role="alert" className="mb-4 space-y-2">
      <p>We couldn&apos;t load profile completion.</p>
      <Button variant="outline" onClick={() => refetch()}>Try again</Button>
    </div>
  );
  return <CompletionSummary employee={employee} onSelectSection={onSelectSection} />;
}
