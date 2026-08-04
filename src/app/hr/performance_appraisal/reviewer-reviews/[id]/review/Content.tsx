"use client";
import { useGetAppraisalByIdQuery } from "@/redux/features/appraisal-api-slice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { CalendarIcon, UserIcon } from "lucide-react";

const COMPETENCY_NAMES: Record<number, string> = {
  1: "Technical / Job Knowledge", 2: "Financial Management", 3: "Creativity, Personal Drive and Initiative",
  4: "Customer Relations", 5: "Leadership and Motivational Ability", 6: "Team Work",
  7: "Attendance and Punctuality", 8: "Communication", 9: "Integrity / Honesty", 10: "Confidentiality",
};

function AppraisalSummary({ id }: { id: string }) {
  const { data, isLoading, isError } = useGetAppraisalByIdQuery(Number(id), { refetchOnMountOrArgChange: true });
  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading appraisal.</div>;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Item variant="muted" asChild><div><ItemContent><ItemTitle><UserIcon className="inline h-4 w-4 mr-1" />Appraisee</ItemTitle><ItemDescription>{data.appraisee_name}</ItemDescription></ItemContent></div></Item>
        <Item variant="muted" asChild><div><ItemContent><ItemTitle><UserIcon className="inline h-4 w-4 mr-1" />Appraiser</ItemTitle><ItemDescription>{data.appraiser_name}</ItemDescription></ItemContent></div></Item>
        <Item variant="muted" asChild><div><ItemContent><ItemTitle><CalendarIcon className="inline h-4 w-4 mr-1" />Period</ItemTitle><ItemDescription>{data.start_date} — {data.end_date}</ItemDescription></ItemContent></div></Item>
        <Item variant="muted" asChild><div><ItemContent><ItemTitle>Overall Score</ItemTitle><ItemDescription>{data.overall_score ?? "—"} — {data.overall_level ?? "—"}</ItemDescription></ItemContent></div></Item>
      </div>

      <div className="bg-muted/30 rounded-md p-3 text-sm space-y-1">
        <div>Output Weighted Score: <strong>{data.output_weighted_score ?? "—"}%</strong></div>
        <div>Competency Weighted Score: <strong>{data.competency_weighted_score ?? "—"}%</strong></div>
        <div>Overall Score (1–5): <strong>{data.overall_score ?? "—"}</strong></div>
      </div>

      {(data.outputs?.length ?? 0) > 0 && (
        <section>
          <h4 className="text-sm font-semibold text-primary mb-2">Section B — Outputs</h4>
          <Table>
            <TableHeader><TableRow><TableHead>No.</TableHead><TableHead>Output</TableHead><TableHead className="text-center">Self</TableHead><TableHead className="text-center">Appraiser</TableHead><TableHead className="text-center">Agreed</TableHead></TableRow></TableHeader>
            <TableBody>
              {data.outputs?.map((o, i) => (
                <TableRow key={o.id}><TableCell>{i + 1}</TableCell><TableCell>{o.output}</TableCell><TableCell className="text-center">{o.self_score ?? "—"}</TableCell><TableCell className="text-center">{o.appraiser_score ?? "—"}</TableCell><TableCell className="text-center font-bold">{o.agreed_score ?? "—"}</TableCell></TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}

      {(data.competencies?.length ?? 0) > 0 && (
        <section>
          <h4 className="text-sm font-semibold text-primary mb-2">Section C — Competencies</h4>
          <Table>
            <TableHeader><TableRow><TableHead>Competency</TableHead><TableHead className="text-center">Score</TableHead></TableRow></TableHeader>
            <TableBody>
              {data.competencies?.map((c) => (
                <TableRow key={c.id}><TableCell>{COMPETENCY_NAMES[c.competency_number]}</TableCell><TableCell className="text-center font-bold">{c.score}</TableCell></TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}

      {data.supervisor_remarks && (
        <section><h4 className="text-sm font-semibold text-primary mb-1">Supervisor Remarks</h4><p className="text-sm">{data.supervisor_remarks}</p></section>
      )}

      {(data.comments?.length ?? 0) > 0 && (
        <section>
          <h4 className="text-sm font-semibold text-primary mb-2">Previous Comments</h4>
          {data.comments?.map((c) => (
            <div key={c.id} className="border rounded p-2 mb-2 text-sm">
              <span className="font-medium capitalize">{c.commenter_role}:</span> {c.comment}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default AppraisalSummary;
