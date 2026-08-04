"use client";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useGetAppraisalByIdQuery } from "@/redux/features/appraisal-api-slice";
import { CalendarIcon, UserIcon } from "lucide-react";

// const COMPETENCY_NAMES: Record<number, string> = {
//   1: "Technical / Job Knowledge",
//   2: "Financial Management",
//   3: "Creativity, Personal Drive and Initiative",
//   4: "Customer Relations",
//   5: "Leadership and Motivational Ability",
//   6: "Team Work",
//   7: "Attendance and Punctuality",
//   8: "Communication",
//   9: "Integrity / Honesty",
//   10: "Confidentiality",
// };

function Content({ id }: { id: string }) {
  const { data, isLoading, isError } = useGetAppraisalByIdQuery(Number(id), {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading appraisal.</div>;

  return (
    <div className="space-y-6">
      {/* Basic info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Item variant="muted" asChild>
          <div>
            <ItemContent>
              <ItemTitle>
                <UserIcon className="inline h-4 w-4 mr-1" />
                Appraisee
              </ItemTitle>
              <ItemDescription>{data.appraisee_name}</ItemDescription>
            </ItemContent>
          </div>
        </Item>
        <Item variant="muted" asChild>
          <div>
            <ItemContent>
              <ItemTitle>
                <CalendarIcon className="inline h-4 w-4 mr-1" />
                Period
              </ItemTitle>
              <ItemDescription>
                {data.start_date} — {data.end_date}
              </ItemDescription>
            </ItemContent>
          </div>
        </Item>
      </div>

      {/* Section A — Qualifications */}
      {(data.initial_qualifications?.length ?? 0) > 0 && (
        <section>
          <h4 className="text-sm font-semibold text-primary mb-2">
            A.2 Qualifications
          </h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Qualification</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.initial_qualifications?.map((q) => (
                <TableRow key={q.id}>
                  <TableCell>{q.date_period}</TableCell>
                  <TableCell>{q.institution}</TableCell>
                  <TableCell>{q.qualification_attained}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}

      {(data.additional_qualifications?.length ?? 0) > 0 && (
        <section>
          <h4 className="text-sm font-semibold text-primary mb-2">
            A.3 Additional Qualifications (Year Under Review)
          </h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Qualification</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.additional_qualifications?.map((q) => (
                <TableRow key={q.id}>
                  <TableCell>{q.date_period}</TableCell>
                  <TableCell>{q.institution}</TableCell>
                  <TableCell>{q.qualification_attained}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}

      {(data.trainings?.length ?? 0) > 0 && (
        <section>
          <h4 className="text-sm font-semibold text-primary mb-2">
            A.4 Trainings / Seminars
          </h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Organiser</TableHead>
                <TableHead>Attainment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.trainings?.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.date_period}</TableCell>
                  <TableCell>{t.organiser}</TableCell>
                  <TableCell>{t.attainment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}

      {/* Section B — Outputs */}
      {(data.outputs?.length ?? 0) > 0 && (
        <section>
          <h4 className="text-sm font-semibold text-primary mb-2">
            B.a — Agreed Outputs (Self-Assessment)
          </h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Output</TableHead>
                <TableHead>Indicator</TableHead>
                <TableHead>Target</TableHead>
                <TableHead className="text-center">Self Score</TableHead>
                <TableHead>Comments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.outputs?.map((o, i) => (
                <TableRow key={o.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{o.output}</TableCell>
                  <TableCell>{o.performance_indicator}</TableCell>
                  <TableCell>{o.performance_target}</TableCell>
                  <TableCell className="text-center font-semibold">
                    {o.self_score ?? "—"}
                  </TableCell>
                  <TableCell>{o.comments}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}

      {/* Text fields */}
      {data.additional_tasks && (
        <section>
          <h4 className="text-sm font-semibold text-primary mb-1">
            B.b — Additional Tasks
          </h4>
          <p className="text-sm">{data.additional_tasks}</p>
        </section>
      )}
      {data.skills_needed && (
        <section>
          <h4 className="text-sm font-semibold text-primary mb-1">
            B.c — Skills Needed
          </h4>
          <p className="text-sm">{data.skills_needed}</p>
        </section>
      )}
      {data.challenges && (
        <section>
          <h4 className="text-sm font-semibold text-primary mb-1">
            B.d — Challenges
          </h4>
          <p className="text-sm">{data.challenges}</p>
        </section>
      )}
    </div>
  );
}

export default Content;
