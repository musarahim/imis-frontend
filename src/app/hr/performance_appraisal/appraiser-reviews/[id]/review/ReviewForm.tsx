"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
    useCreateCompetencyMutation,
    useCreateImprovementAreaMutation,
    useCreateNextYearPlanMutation,
    useGetAppraisalByIdQuery,
    useSubmitAppraiserReviewMutation,
    useUpdateOutputMutation,
} from "@/redux/features/appraisal-api-slice";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SCORES = [1, 2, 3, 4, 5];

const COMPETENCIES = [
  { number: 1, name: "Technical / Job Knowledge" },
  { number: 2, name: "Financial Management" },
  { number: 3, name: "Creativity, Personal Drive and Initiative" },
  { number: 4, name: "Customer Relations (Client Service)" },
  { number: 5, name: "Leadership and Motivational Ability" },
  { number: 6, name: "Team Work" },
  { number: 7, name: "Attendance and Punctuality" },
  { number: 8, name: "Communication" },
  { number: 9, name: "Integrity / Honesty" },
  { number: 10, name: "Confidentiality" },
];

const COMPETENCY_DESCRIPTIONS: Record<number, Record<number, string>> = {
  1: {
    1: "Lacks knowledge/skills; excessive training needed",
    2: "Little grasp of job; needs improvement",
    3: "Grasps job; minimal supervision needed",
    4: "Good grasp; rarely requires assistance",
    5: "Exceptional grasp of all facets of the job",
  },
  2: {
    1: "Rarely meets fiscal requirements",
    2: "Occasionally meets fiscal requirements",
    3: "Routinely meets fiscal requirements",
    4: "Frequently meets fiscal requirements",
    5: "Consistently exceeds fiscal requirements",
  },
  3: {
    1: "No initiative; always reactive",
    2: "Hardly innovative; depends on others",
    3: "Fairly innovative; adds value",
    4: "Highly innovative; adds value",
    5: "Exceptionally innovative; always adds value",
  },
  4: {
    1: "Rarely attends to clients; often rude",
    2: "Strives to meet client expectations",
    3: "Largely meets client expectations",
    4: "Very good service; friendly and helpful",
    5: "Exceptional service; exceptionally friendly",
  },
  5: {
    1: "Cannot inspire subordinates",
    2: "Rarely inspires team",
    3: "Moderately inspires team",
    4: "High ability to inspire team",
    5: "Exceptional ability to inspire team",
  },
  6: {
    1: "Always uncooperative",
    2: "Generally uncooperative",
    3: "Occasionally uncooperative",
    4: "Very cooperative and flexible",
    5: "Works extremely well; enthusiastic",
  },
  7: {
    1: "Frequently late/absent",
    2: "Absence/lateness higher than average",
    3: "Good attendance; generally punctual",
    4: "Very good attendance; rarely late",
    5: "Always on time; rarely absent",
  },
  8: {
    1: "Unacceptable verbal and written communication",
    2: "Sometimes confusing",
    3: "Meets communication expectations",
    4: "Consistently concise and clear",
    5: "Exceptionally effective communicator",
  },
  9: {
    1: "Unethical; does not comply with policies",
    2: "Occasionally questionable behavior",
    3: "Complies with policies most of the time",
    4: "High level of integrity",
    5: "Exceedingly demonstrates Council values",
  },
  10: {
    1: "Total disregard for confidentiality",
    2: "Lack of concern for confidentiality",
    3: "High level of confidentiality",
    4: "Consistently promotes confidentiality",
    5: "Exceptionally respects confidentiality",
  },
};

type OutputScoreRow = {
  id: number;
  output: string;
  performance_indicator: string;
  performance_target: string;
  self_score: number | null;
  appraiser_score: number | null;
  agreed_score: number | null;
};

type ImprovementRow = {
  performance_gap: string;
  agreed_action: string;
  time_frame: string;
};
type NextYearRow = {
  key_output: string;
  performance_indicator: string;
  target: string;
};

function ReviewForm({ id }: { id: string }) {
  const router = useRouter();
  const { data: appraisal } = useGetAppraisalByIdQuery(Number(id), {
    refetchOnMountOrArgChange: true,
  });

  const [outputRows, setOutputRows] = useState<OutputScoreRow[]>([]);
  const [competencyScores, setCompetencyScores] = useState<
    Record<number, number>
  >({});
  const [supervisorRemarks, setSupervisorRemarks] = useState("");
  const [improvements, setImprovements] = useState<ImprovementRow[]>([
    { performance_gap: "", agreed_action: "", time_frame: "" },
  ]);
  const [nextYearPlans, setNextYearPlans] = useState<NextYearRow[]>([
    { key_output: "", performance_indicator: "", target: "" },
  ]);
  const [saving, setSaving] = useState(false);

  const [updateOutput] = useUpdateOutputMutation();
  const [createCompetency] = useCreateCompetencyMutation();
  const [createImprovement] = useCreateImprovementAreaMutation();
  const [createNextYearPlan] = useCreateNextYearPlanMutation();
  const [submitAppraiserReview] = useSubmitAppraiserReviewMutation();

  useEffect(() => {
    if (appraisal?.outputs) {
      setOutputRows(
        appraisal.outputs.map((o) => ({
          id: o.id!,
          output: o.output,
          performance_indicator: o.performance_indicator,
          performance_target: o.performance_target,
          self_score: o.self_score ?? null,
          appraiser_score: o.appraiser_score ?? null,
          agreed_score: o.agreed_score ?? null,
        })),
      );
    }
  }, [appraisal]);

  // Score preview
  const agreedScores = outputRows
    .map((o) => o.agreed_score ?? o.appraiser_score)
    .filter((s): s is number => s !== null);
  const outputTotal = agreedScores.reduce((a, b) => a + b, 0);
  const outputMax = outputRows.length * 5;
  const outputWeighted =
    outputMax > 0 ? ((outputTotal / outputMax) * 70).toFixed(1) : "—";

  const compScores = Object.values(competencyScores).filter(Boolean);
  const compTotal = compScores.reduce((a, b) => a + b, 0);
  const compMax = compScores.length * 5;
  const compWeighted =
    compMax > 0 ? ((compTotal / compMax) * 30).toFixed(1) : "—";

  const handleSubmit = async () => {
    setSaving(true);
    try {
      // 1. Save appraiser/agreed scores for each output
      await Promise.all(
        outputRows.map((o) =>
          updateOutput({
            id: o.id,
            data: {
              appraiser_score: o.appraiser_score ?? undefined,
              agreed_score: o.agreed_score ?? undefined,
            },
          }).unwrap(),
        ),
      );

      // 2. Save competency ratings
      const competencyEntries = Object.entries(competencyScores).filter(
        ([, s]) => s > 0,
      );
      await Promise.all(
        competencyEntries.map(([num, score]) =>
          createCompetency({
            appraisal: Number(id),
            competency_number: Number(num),
            score,
          }).unwrap(),
        ),
      );

      // 3. Save improvement areas
      const filledImprovements = improvements.filter(
        (i) => i.performance_gap || i.agreed_action,
      );
      await Promise.all(
        filledImprovements.map((imp) =>
          createImprovement({ ...imp, appraisal: Number(id) }).unwrap(),
        ),
      );

      // 4. Save next year plans
      const filledPlans = nextYearPlans.filter(
        (p) => p.key_output || p.performance_indicator,
      );
      await Promise.all(
        filledPlans.map((plan) =>
          createNextYearPlan({ ...plan, appraisal: Number(id) }).unwrap(),
        ),
      );

      // 5. Submit and advance status
      await submitAppraiserReview({
        id: Number(id),
        supervisor_remarks: supervisorRemarks,
      }).unwrap();
      toast.success("Appraiser review submitted successfully.");
      router.push("/hr/performance_appraisal/appraiser-reviews");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Section B — Appraiser Scores */}
      <section>
        <h3 className="text-sm font-semibold text-primary mb-2">
          Section B — Appraiser &amp; Agreed Scores
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Section B carries <strong>70%</strong> of total score.
        </p>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">No.</TableHead>
                <TableHead>Output</TableHead>
                <TableHead className="text-center">Self Score</TableHead>
                <TableHead className="text-center">Appraiser Score</TableHead>
                <TableHead className="text-center">Agreed Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {outputRows.map((o, i) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell className="text-sm">{o.output}</TableCell>
                  <TableCell className="text-center font-semibold text-muted-foreground">
                    {o.self_score ?? "—"}
                  </TableCell>
                  <TableCell>
                    <select
                      className="border rounded p-1 text-sm w-full"
                      value={o.appraiser_score ?? ""}
                      onChange={(e) =>
                        setOutputRows((prev) =>
                          prev.map((r, idx) =>
                            idx === i
                              ? {
                                  ...r,
                                  appraiser_score: e.target.value
                                    ? Number(e.target.value)
                                    : null,
                                }
                              : r,
                          ),
                        )
                      }
                    >
                      <option value="">—</option>
                      {SCORES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell>
                    <select
                      className="border rounded p-1 text-sm w-full"
                      value={o.agreed_score ?? ""}
                      onChange={(e) =>
                        setOutputRows((prev) =>
                          prev.map((r, idx) =>
                            idx === i
                              ? {
                                  ...r,
                                  agreed_score: e.target.value
                                    ? Number(e.target.value)
                                    : null,
                                }
                              : r,
                          ),
                        )
                      }
                    >
                      <option value="">—</option>
                      {SCORES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                </TableRow>
              ))}
              {outputRows.length > 0 && (
                <TableRow className="bg-muted/40 font-semibold">
                  <TableCell colSpan={3} className="text-right">
                    Weighted Score (70%):
                  </TableCell>
                  <TableCell colSpan={2} className="text-center">
                    {outputWeighted}%
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Section C — Competencies */}
      <section>
        <h3 className="text-sm font-semibold text-primary mb-1">
          Section C — Competencies
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Section C carries <strong>30%</strong> of total score.
        </p>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Competency</TableHead>
                <TableHead className="text-center w-16">1 Poor</TableHead>
                <TableHead className="text-center w-16">2 Fair</TableHead>
                <TableHead className="text-center w-16">3 Good</TableHead>
                <TableHead className="text-center w-20">4 V.Good</TableHead>
                <TableHead className="text-center w-20">5 Excellent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMPETENCIES.map((c) => (
                <TableRow key={c.number}>
                  <TableCell>
                    <p className="font-medium text-sm">
                      {c.number}. {c.name}
                    </p>
                    {competencyScores[c.number] && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {
                          COMPETENCY_DESCRIPTIONS[c.number]?.[
                            competencyScores[c.number]
                          ]
                        }
                      </p>
                    )}
                  </TableCell>
                  {SCORES.map((s) => (
                    <TableCell key={s} className="text-center">
                      <input
                        type="radio"
                        name={`comp_${c.number}`}
                        value={s}
                        checked={competencyScores[c.number] === s}
                        onChange={() =>
                          setCompetencyScores((prev) => ({
                            ...prev,
                            [c.number]: s,
                          }))
                        }
                        className="h-4 w-4 accent-primary"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow className="bg-muted/40 font-semibold">
                <TableCell className="text-right">
                  Weighted Score (30%):
                </TableCell>
                <TableCell colSpan={5} className="text-center">
                  {compWeighted}%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Section D — Overall score preview */}
      <section className="border rounded-md p-4 bg-muted/30">
        <h3 className="text-sm font-semibold text-primary mb-2">
          Section D — Overall Performance Preview
        </h3>
        <div className="text-sm space-y-1">
          <div>
            Output Weighted Score: <strong>{outputWeighted}%</strong>
          </div>
          <div>
            Competency Weighted Score: <strong>{compWeighted}%</strong>
          </div>
          {outputWeighted !== "—" && compWeighted !== "—" && (
            <div>
              Final Score (1–5):{" "}
              <strong>
                {(
                  ((Number(outputWeighted) + Number(compWeighted)) / 100) *
                  5
                ).toFixed(2)}
              </strong>
            </div>
          )}
        </div>
      </section>

      {/* Section E — Improvement Areas */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-primary">
            Section E.a — Areas of Improvement
          </h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              setImprovements([
                ...improvements,
                { performance_gap: "", agreed_action: "", time_frame: "" },
              ])
            }
          >
            <Plus className="h-4 w-4 mr-1" /> Add Row
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Performance Gap</TableHead>
              <TableHead>Agreed Action</TableHead>
              <TableHead>Time Frame</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {improvements.map((imp, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Textarea
                    rows={2}
                    value={imp.performance_gap}
                    onChange={(e) =>
                      setImprovements((prev) =>
                        prev.map((r, idx) =>
                          idx === i
                            ? { ...r, performance_gap: e.target.value }
                            : r,
                        ),
                      )
                    }
                    placeholder="Describe performance gap"
                  />
                </TableCell>
                <TableCell>
                  <Textarea
                    rows={2}
                    value={imp.agreed_action}
                    onChange={(e) =>
                      setImprovements((prev) =>
                        prev.map((r, idx) =>
                          idx === i
                            ? { ...r, agreed_action: e.target.value }
                            : r,
                        ),
                      )
                    }
                    placeholder="Agreed action"
                  />
                </TableCell>
                <TableCell>
                  <Textarea
                    rows={2}
                    value={imp.time_frame}
                    onChange={(e) =>
                      setImprovements((prev) =>
                        prev.map((r, idx) =>
                          idx === i ? { ...r, time_frame: e.target.value } : r,
                        ),
                      )
                    }
                    placeholder="e.g. 3 months"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      setImprovements(
                        improvements.filter((_, idx) => idx !== i),
                      )
                    }
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Section E — Next Year Plans */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-primary">
            Section E.b — Performance Plan for Next Financial Year
          </h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              setNextYearPlans([
                ...nextYearPlans,
                { key_output: "", performance_indicator: "", target: "" },
              ])
            }
          >
            <Plus className="h-4 w-4 mr-1" /> Add Row
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key Output</TableHead>
              <TableHead>Performance Indicator</TableHead>
              <TableHead>Target</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nextYearPlans.map((p, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Textarea
                    rows={2}
                    value={p.key_output}
                    onChange={(e) =>
                      setNextYearPlans((prev) =>
                        prev.map((r, idx) =>
                          idx === i ? { ...r, key_output: e.target.value } : r,
                        ),
                      )
                    }
                    placeholder="Key output"
                  />
                </TableCell>
                <TableCell>
                  <Textarea
                    rows={2}
                    value={p.performance_indicator}
                    onChange={(e) =>
                      setNextYearPlans((prev) =>
                        prev.map((r, idx) =>
                          idx === i
                            ? { ...r, performance_indicator: e.target.value }
                            : r,
                        ),
                      )
                    }
                    placeholder="Performance indicator"
                  />
                </TableCell>
                <TableCell>
                  <Textarea
                    rows={2}
                    value={p.target}
                    onChange={(e) =>
                      setNextYearPlans((prev) =>
                        prev.map((r, idx) =>
                          idx === i ? { ...r, target: e.target.value } : r,
                        ),
                      )
                    }
                    placeholder="Target"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      setNextYearPlans(
                        nextYearPlans.filter((_, idx) => idx !== i),
                      )
                    }
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Section F — Supervisor Remarks + Appraiser Comment */}
      <section className="border-t pt-6 space-y-4">
        <h3 className="text-base font-semibold text-primary">
          Section F — Comments &amp; Recommendations (Appraiser)
        </h3>
        <div>
          <Label htmlFor="supervisor_remarks" className="text-sm font-medium">
            Supervisor&apos;s Remarks on Overall Performance
          </Label>
          <Textarea
            id="supervisor_remarks"
            rows={4}
            className="mt-2"
            value={supervisorRemarks}
            onChange={(e) => setSupervisorRemarks(e.target.value)}
            placeholder="Overall remarks on the appraisee's performance during the review period..."
          />
        </div>
        <div>
          <Label htmlFor="appraiser_comment" className="text-sm font-medium">
            Comments of the Appraiser (Section F)
          </Label>
          <p className="text-xs text-muted-foreground mb-1">
            Use this section to comment about the job, career development, and
            any other relevant information.
          </p>
        </div>
      </section>

      <div className="flex justify-end pt-4">
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="min-w-40"
        >
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Appraiser Review
        </Button>
      </div>
    </div>
  );
}

export default ReviewForm;
