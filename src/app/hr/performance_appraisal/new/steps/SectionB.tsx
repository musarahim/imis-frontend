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
    useCreateOutputMutation,
    useUpdateAppraisalMutation,
} from "@/redux/features/appraisal-api-slice";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const SCORES = [1, 2, 3, 4, 5];
const RATING_LABELS: Record<number, string> = {
  5: "Excellent – exceeded targets",
  4: "Very Good – met all targets",
  3: "Good – met most targets",
  2: "Fair – minimal achievement",
  1: "Poor – did not meet targets",
};

type OutputRow = {
  output: string;
  performance_indicator: string;
  performance_target: string;
  self_score: number | null;
  comments: string;
};

type Props = {
  onBack: () => void;
  data?: PerformanceAppraisal;
};

function SectionB({ onBack, data }: Props) {
  const appraisalId = data?.id;
  const [outputs, setOutputs] = useState<OutputRow[]>([
    {
      output: "",
      performance_indicator: "",
      performance_target: "",
      self_score: null,
      comments: "",
    },
  ]);
  const [additionalTasks, setAdditionalTasks] = useState("");
  const [skillsNeeded, setSkillsNeeded] = useState("");
  const [challenges, setChallenges] = useState("");
  const [appraiseeComment, setAppraiseeComment] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const [createOutput] = useCreateOutputMutation();
  const [updateAppraisal] = useUpdateAppraisalMutation();

  const updateRow = (
    i: number,
    key: keyof OutputRow,
    val: string | number | null,
  ) =>
    setOutputs((prev) =>
      prev.map((r, idx) => (idx === i ? { ...r, [key]: val } : r)),
    );

  const handleSaveAndNext = async () => {
    if (!appraisalId) {
      toast.error("Save Section A first before continuing.");
      return;
    }
    const filled = outputs.filter((o) => o.output || o.performance_indicator);
    if (filled.length === 0) {
      toast.error("Add at least one agreed output.");
      return;
    }
    setSaving(true);
    try {
      await Promise.all(
        filled.map((o) =>
          createOutput({ ...o, appraisal: appraisalId }).unwrap(),
        ),
      );
      await updateAppraisal({
        id: appraisalId,
        data: {
          additional_tasks: additionalTasks,
          skills_needed: skillsNeeded,
          challenges,
        },
      }).unwrap();
      toast.success("Appraisal submitted successfully.");
      router.push(`/hr/performance_appraisal/`);
    } catch {
      toast.error("Failed to save outputs.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-base font-semibold text-primary mb-1">
          Section B: Assessment of the Level of Achievement
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Section B carries <strong>70%</strong> of the total score. Maximum 10
          outputs.
        </p>
        <div className="grid grid-cols-5 gap-1 text-xs mb-4 border rounded-md p-3 bg-muted/30">
          {Object.entries(RATING_LABELS)
            .reverse()
            .map(([s, lbl]) => (
              <div key={s} className="text-center">
                <span className="font-bold block">{s}</span>
                <span className="text-muted-foreground">{lbl}</span>
              </div>
            ))}
        </div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">
            B.a — Agreed Outputs, KPIs and Targets
          </p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              setOutputs([
                ...outputs,
                {
                  output: "",
                  performance_indicator: "",
                  performance_target: "",
                  self_score: null,
                  comments: "",
                },
              ])
            }
            disabled={outputs.length >= 10}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Output ({outputs.length}/10)
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">No.</TableHead>
                <TableHead>Agreed Output</TableHead>
                <TableHead>Performance Indicator</TableHead>
                <TableHead>Performance Target</TableHead>
                <TableHead className="text-center w-28">Self Score</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {outputs.map((o, i) => (
                <TableRow key={i} className="align-top">
                  <TableCell className="pt-3 font-medium">{i + 1}</TableCell>
                  <TableCell>
                    <Textarea
                      rows={2}
                      value={o.output}
                      onChange={(e) => updateRow(i, "output", e.target.value)}
                      placeholder="Describe the agreed output"
                      className="min-w-40"
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea
                      rows={2}
                      value={o.performance_indicator}
                      onChange={(e) =>
                        updateRow(i, "performance_indicator", e.target.value)
                      }
                      placeholder="How performance will be measured"
                      className="min-w-40"
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea
                      rows={2}
                      value={o.performance_target}
                      onChange={(e) =>
                        updateRow(i, "performance_target", e.target.value)
                      }
                      placeholder="Minimum performance level"
                      className="min-w-36"
                    />
                  </TableCell>
                  <TableCell>
                    <select
                      className="border rounded-md p-1 text-sm w-full"
                      value={o.self_score ?? ""}
                      onChange={(e) =>
                        updateRow(
                          i,
                          "self_score",
                          e.target.value ? Number(e.target.value) : null,
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
                    <Textarea
                      rows={2}
                      value={o.comments}
                      onChange={(e) => updateRow(i, "comments", e.target.value)}
                      placeholder="Comments"
                      className="min-w-28"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        setOutputs(outputs.filter((_, idx) => idx !== i))
                      }
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <Label className="text-sm font-medium">
          B.b — Tasks undertaken outside your schedule of duties during the
          period under review
        </Label>
        <Textarea
          rows={4}
          className="mt-2"
          value={additionalTasks}
          onChange={(e) => setAdditionalTasks(e.target.value)}
          placeholder="e.g. developing work plans, working on special committees..."
        />
      </section>
      <section>
        <Label className="text-sm font-medium">
          B.c — Additional knowledge, skills and attitudes needed
        </Label>
        <Textarea
          rows={4}
          className="mt-2"
          value={skillsNeeded}
          onChange={(e) => setSkillsNeeded(e.target.value)}
          placeholder="What additional knowledge, skills and attitudes do you need..."
        />
      </section>
      <section>
        <Label className="text-sm font-medium">
          B.d — Challenges faced and suggestions for correcting functional
          bottlenecks
        </Label>
        <Textarea
          rows={4}
          className="mt-2"
          value={challenges}
          onChange={(e) => setChallenges(e.target.value)}
          placeholder="What were the challenges faced? Suggest ways of correcting functional bottlenecks..."
        />
      </section>

      {/* Section F — Appraisee Comment */}
      <section className="border-t pt-6">
        <h3 className="text-base font-semibold text-primary mb-1">
          Section F — Your Comments (Appraisee)
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          Use this section to comment about the job, your career, or any other
          relevant information. Signing/submitting is confirmation that the
          appraisal process took place.
        </p>
        <Label htmlFor="appraisee_comment" className="text-sm font-medium">
          Comments of the Appraisee
        </Label>
        <Textarea
          id="appraisee_comment"
          rows={4}
          className="mt-2"
          value={appraiseeComment}
          onChange={(e) => setAppraiseeComment(e.target.value)}
          placeholder="Your overall comments on the appraisal process, your performance, career aspirations..."
        />
      </section>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back: Section A
        </Button>
        <Button type="button" onClick={handleSaveAndNext} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save & Submit Self-Assessment
        </Button>
      </div>
    </div>
  );
}

export default SectionB;
