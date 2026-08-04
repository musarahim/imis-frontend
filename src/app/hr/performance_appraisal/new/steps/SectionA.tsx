"use client";
import { AppForm as Form } from "@/components/forms";
import DatePicker from "@/components/forms/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    useCreateAdditionalQualificationMutation,
    useCreateAppraisalMutation,
    useCreateInitialQualificationMutation,
    useCreateTrainingMutation,
    useGetAppraisalByIdQuery,
    useUpdateAppraisalMutation,
} from "@/redux/features/appraisal-api-slice";
import { skipToken } from "@reduxjs/toolkit/query";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

type QualRow = {
  date_period: string;
  institution: string;
  qualification_attained: string;
};

type TrainingRow = {
  date_period: string;
  organiser: string;
  attainment: string;
};

type FormValues = {
  start_date: string;
  end_date: string;
};

type Props = {
  onNext: (data?: PerformanceAppraisal) => void;
  id?: number;
};

const EMPTY_QUAL_ROW: QualRow = {
  date_period: "",
  institution: "",
  qualification_attained: "",
};

function SectionA({ onNext, id }: Props) {
  const { data: appraisal } = useGetAppraisalByIdQuery(id ?? skipToken);
  const [createAppraisal] = useCreateAppraisalMutation();
  const [updateAppraisal] = useUpdateAppraisalMutation();
  const [createInitialQual] = useCreateInitialQualificationMutation();
  const [createAdditionalQual] = useCreateAdditionalQualificationMutation();
  const [createTraining] = useCreateTrainingMutation();

  const [initialQuals, setInitialQuals] = useState<QualRow[]>([EMPTY_QUAL_ROW]);
  const [additionalQuals, setAdditionalQuals] = useState<QualRow[]>([]);
  const [trainings, setTrainings] = useState<TrainingRow[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!appraisal) return;

    setInitialQuals(
      appraisal.initial_qualifications?.length
        ? appraisal.initial_qualifications.map((q) => ({
            date_period: q.date_period || "",
            institution: q.institution || "",
            qualification_attained: q.qualification_attained || "",
          }))
        : [EMPTY_QUAL_ROW],
    );

    setAdditionalQuals(
      appraisal.additional_qualifications?.map((q) => ({
        date_period: q.date_period || "",
        institution: q.institution || "",
        qualification_attained: q.qualification_attained || "",
      })) || [],
    );

    setTrainings(
      appraisal.trainings?.map((t) => ({
        date_period: t.date_period || "",
        organiser: t.organiser || "",
        attainment: t.attainment || "",
      })) || [],
    );
  }, [appraisal]);

  const initialValues: FormValues = {
    start_date: appraisal?.start_date || "",
    end_date: appraisal?.end_date || "",
  };

  const validationSchema = Yup.object({
    start_date: Yup.string().required("Start date is required"),
    end_date: Yup.string().required("End date is required"),
  });

  const updateRow = <T,>(arr: T[], i: number, key: keyof T, val: string) =>
    arr.map((r, idx) => (idx === i ? { ...r, [key]: val } : r));

  const handleSubmit = async (values: FormValues) => {
    setSaving(true);
    try {
      const payload: Partial<PerformanceAppraisal> = {
        start_date: values.start_date,
        end_date: values.end_date,
      };

      const savedAppraisal = id
        ? await updateAppraisal({ id, data: payload }).unwrap()
        : await createAppraisal(payload).unwrap();

      const appraisalId = savedAppraisal.id;
      if (!appraisalId) throw new Error("Missing appraisal id");

      const filledInitial = initialQuals.filter(
        (q) => q.institution || q.qualification_attained || q.date_period,
      );
      const filledAdditional = additionalQuals.filter(
        (q) => q.institution || q.qualification_attained || q.date_period,
      );
      const filledTrainings = trainings.filter(
        (t) => t.organiser || t.attainment || t.date_period,
      );

      await Promise.all([
        ...filledInitial.map((q) =>
          createInitialQual({ ...q, appraisal: appraisalId }).unwrap(),
        ),
        ...filledAdditional.map((q) =>
          createAdditionalQual({ ...q, appraisal: appraisalId }).unwrap(),
        ),
        ...filledTrainings.map((t) =>
          createTraining({ ...t, appraisal: appraisalId }).unwrap(),
        ),
      ]);

      toast.success("Section A saved.");
      onNext(savedAppraisal);
    } catch {
      toast.error("Failed to save Section A. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <section className="bg-muted/40 rounded-md py-4 px-6 text-sm">
        <h3 className="font-semibold text-primary mb-2">
          A.1 Period of Assessment
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DatePicker name="start_date" label="Start Date" required />
          <DatePicker name="end_date" label="End Date" required />
        </div>
      </section>

      <section className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-primary">
            A.2 Qualifications (Academic, Technical, Professional)
          </h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setInitialQuals([...initialQuals, EMPTY_QUAL_ROW])}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Row
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date / Period</TableHead>
              <TableHead>Institution</TableHead>
              <TableHead>Qualification Attained</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialQuals.map((q, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Input
                    value={q.date_period}
                    onChange={(e) =>
                      setInitialQuals(
                        updateRow(
                          initialQuals,
                          i,
                          "date_period",
                          e.target.value,
                        ),
                      )
                    }
                    placeholder="e.g. 2010-2014"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={q.institution}
                    onChange={(e) =>
                      setInitialQuals(
                        updateRow(
                          initialQuals,
                          i,
                          "institution",
                          e.target.value,
                        ),
                      )
                    }
                    placeholder="Institution name"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={q.qualification_attained}
                    onChange={(e) =>
                      setInitialQuals(
                        updateRow(
                          initialQuals,
                          i,
                          "qualification_attained",
                          e.target.value,
                        ),
                      )
                    }
                    placeholder="e.g. Bachelor of Science"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      setInitialQuals(
                        initialQuals.filter((_, idx) => idx !== i),
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

      <section className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-primary">
            A.3 Additional Qualifications During the Year Under Review
          </h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              setAdditionalQuals([...additionalQuals, EMPTY_QUAL_ROW])
            }
          >
            <Plus className="h-4 w-4 mr-1" /> Add Row
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date / Period</TableHead>
              <TableHead>Institution</TableHead>
              <TableHead>Qualification Attained</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {additionalQuals.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground py-4"
                >
                  No entries. Click &quot;Add Row&quot; to add.
                </TableCell>
              </TableRow>
            )}
            {additionalQuals.map((q, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Input
                    value={q.date_period}
                    onChange={(e) =>
                      setAdditionalQuals(
                        updateRow(
                          additionalQuals,
                          i,
                          "date_period",
                          e.target.value,
                        ),
                      )
                    }
                    placeholder="e.g. 2024"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={q.institution}
                    onChange={(e) =>
                      setAdditionalQuals(
                        updateRow(
                          additionalQuals,
                          i,
                          "institution",
                          e.target.value,
                        ),
                      )
                    }
                    placeholder="Institution name"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={q.qualification_attained}
                    onChange={(e) =>
                      setAdditionalQuals(
                        updateRow(
                          additionalQuals,
                          i,
                          "qualification_attained",
                          e.target.value,
                        ),
                      )
                    }
                    placeholder="e.g. Postgraduate Diploma"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      setAdditionalQuals(
                        additionalQuals.filter((_, idx) => idx !== i),
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

      <section className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-primary">
            A.4 Additional Trainings / Seminars / Conferences / Short Courses
          </h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              setTrainings([
                ...trainings,
                { date_period: "", organiser: "", attainment: "" },
              ])
            }
          >
            <Plus className="h-4 w-4 mr-1" /> Add Row
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date / Period</TableHead>
              <TableHead>Institution / Organiser</TableHead>
              <TableHead>Attainment</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trainings.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground py-4"
                >
                  No trainings added.
                </TableCell>
              </TableRow>
            )}
            {trainings.map((t, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Input
                    value={t.date_period}
                    onChange={(e) =>
                      setTrainings(
                        updateRow(trainings, i, "date_period", e.target.value),
                      )
                    }
                    placeholder="e.g. Jan 2024"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={t.organiser}
                    onChange={(e) =>
                      setTrainings(
                        updateRow(trainings, i, "organiser", e.target.value),
                      )
                    }
                    placeholder="Organiser / Institution"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={t.attainment}
                    onChange={(e) =>
                      setTrainings(
                        updateRow(trainings, i, "attainment", e.target.value),
                      )
                    }
                    placeholder="e.g. Certificate in Project Management"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      setTrainings(trainings.filter((_, idx) => idx !== i))
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

      <div className="mt-6 flex items-center justify-end">
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save and Next: Section B
        </Button>
      </div>
    </Form>
  );
}

export default SectionA;
