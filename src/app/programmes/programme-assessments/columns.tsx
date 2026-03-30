"use client";
import { DataTableColumnHeader } from "@/components/common/data-table-column-header";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkAsBadge } from "@/components/ui/link-as-badge";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

const recommendationBadgeClass: Record<string, string> = {
  "Accredit as is":
    "bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-600",
  "Accredit with Minor Corrections":
    "bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600",
  "Accredit After Major Corrections":
    "bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-600",
  "Don't Accredit": "bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-700",
};

function getRecommendationBadgeClass(recommendation?: string | null): string {
  if (!recommendation) {
    return "bg-slate-500 text-white hover:bg-slate-600 dark:bg-slate-600";
  }

  return (
    recommendationBadgeClass[recommendation] ??
    "bg-slate-500 text-white hover:bg-slate-600 dark:bg-slate-600"
  );
}

// Actions cell component that can properly use hooks
function ActionCell({ application }: { application: ProgrammeAssessment }) {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 ">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/programmes/programme-assessments/${application.id}/details`,
              )
            }
          >
            Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ProgrammeAssessment>[] = [
  {
    accessorKey: "institution",
    header: "Institution",
  },
  {
    accessorKey: "application_number",
    header: "Application Code",
    cell: ({ row }) => {
      return <div>{row.original.application_number}</div>;
    },
  },
  {
    accessorKey: "programme",
    header: "Programme Name",
  },
  //   {
  //     accessorKey: "application_type",
  //     header: "Application Type",
  //   },

  {
    accessorKey: "assessment_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assessment Date" />
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Recommendation</div>,
    cell: ({ row }) => {
      const recommendation = row.original.recommendation;

      return (
        <div className="flex justify-center items-center">
          <LinkAsBadge
            href={`/programmes/programme-assessments/${row.original.id}/details`}
            text={recommendation ?? ""}
            className={`${getRecommendationBadgeClass(recommendation)} ms-3`}
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => <ActionCell application={row.original} />,
  },
];
