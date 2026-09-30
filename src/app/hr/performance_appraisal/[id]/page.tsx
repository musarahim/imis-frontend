"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInset } from "@/components/ui/sidebar";
import { useGetAppraisalByIdQuery } from "@/redux/features/appraisal-api-slice";
import { RequireAuth } from "@/utils";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetAppraisalByIdQuery(Number(id));

  return (
    <RequireAuth>
      <SiteHeader items={[{ label: "Home", href: "/" }, { label: "Performance Appraisal", href: "/hr/performance_appraisal" }, { label: "Appraisal details" }]} />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <main className="space-y-4 p-4">
            {isLoading && <p>Loading appraisal...</p>}
            {isError && <p>Unable to load this appraisal.</p>}
            {data && (
              <Card>
                <CardHeader><CardTitle>{data.appraisee_name} — {data.start_date} to {data.end_date}</CardTitle></CardHeader>
                <CardContent className="space-y-6 text-sm">
                  <p>Status: {data.status?.replaceAll("_", " ")}</p>
                  <section><h2 className="font-semibold">Section A — Personal information and qualifications</h2>
                    <p>Appraisee: {data.appraisee_name} · {data.appraisee_designation} · {data.appraisee_department} · {data.appraisee_directorate}</p>
                    <p>Date of birth: {data.appraisee_birth_date || "—"} · Appointment: {data.present_appointment_date || "—"} · Terms: {data.employment_terms || "—"}</p>
                    <p>Salary scale: {data.appraisee_salary_scale || "—"}</p>
                    <p>Appraiser: {data.appraiser_name} · {data.appraiser_designation} · Salary scale: {data.appraiser_salary_scale || "—"}</p>
                    <ul>{data.initial_qualifications?.map((q) => <li key={q.id}>{q.date_period}: {q.qualification_attained}, {q.institution}</li>)}</ul>
                    <ul>{data.additional_qualifications?.map((q) => <li key={q.id}>Additional: {q.date_period}: {q.qualification_attained}, {q.institution}</li>)}</ul>
                    <ul>{data.trainings?.map((t) => <li key={t.id}>Training: {t.date_period}: {t.attainment}, {t.organiser}</li>)}</ul>
                  </section>
                  <section>
                    <h2 className="font-semibold">Section B — Outputs (70%)</h2>
                    <div className="overflow-x-auto"><table className="w-full border-collapse mt-2">
                      <thead><tr>{["Output", "Indicator", "Target", "Self", "Appraiser", "Agreed", "Comments"].map((h) => <th key={h} className="border p-2 text-left">{h}</th>)}</tr></thead>
                      <tbody>{data.outputs?.map((o) => <tr key={o.id}>
                        <td className="border p-2">{o.output}</td><td className="border p-2">{o.performance_indicator}</td><td className="border p-2">{o.performance_target}</td>
                        <td className="border p-2">{o.self_score ?? "—"}</td><td className="border p-2">{o.appraiser_score ?? "—"}</td><td className="border p-2">{o.agreed_score ?? "—"}</td><td className="border p-2">{o.comments}</td>
                      </tr>)}</tbody>
                    </table></div>
                    <p className="mt-2">Weighted score: {data.output_weighted_score ?? 0}%</p>
                    {data.additional_tasks && <p>Additional tasks: {data.additional_tasks}</p>}
                    {data.skills_needed && <p>Skills needed: {data.skills_needed}</p>}
                    {data.challenges && <p>Challenges: {data.challenges}</p>}
                  </section>
                  <section><h2 className="font-semibold">Section C — Competencies (30%)</h2>
                    <ul>{data.competencies?.map((c) => <li key={c.id}>Competency {c.competency_number}: {c.score}/5</li>)}</ul>
                    <p>Weighted score: {data.competency_weighted_score ?? 0}%</p>
                  </section>
                  <section><h2 className="font-semibold">Section D — Overall performance</h2>
                    <p>{data.overall_score ?? 0}/5 {data.overall_level && `(${data.overall_level})`}</p>
                    {data.supervisor_remarks && <p>Supervisor remarks: {data.supervisor_remarks}</p>}
                  </section>
                  <section><h2 className="font-semibold">Section E — Improvement and next year plan</h2>
                    <ul>{data.improvement_areas?.map((a) => <li key={a.id}>{a.performance_gap}: {a.agreed_action} ({a.time_frame})</li>)}</ul>
                    <ul>{data.next_year_plans?.map((p) => <li key={p.id}>{p.key_output}: {p.performance_indicator} — {p.target}</li>)}</ul>
                  </section>
                  <section><h2 className="font-semibold">Section F — Comments</h2>
                    <ul>{data.comments?.map((c) => <li key={c.id}><strong>{c.commenter_role}:</strong> {c.comment}</li>)}</ul>
                  </section>
                </CardContent>
              </Card>
            )}
          </main>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}
