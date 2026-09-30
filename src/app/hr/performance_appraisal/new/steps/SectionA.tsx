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
    useDeleteAdditionalQualificationMutation,
    useDeleteInitialQualificationMutation,
    useDeleteTrainingMutation,
    useUpdateAdditionalQualificationMutation,
    useUpdateInitialQualificationMutation,
    useUpdateTrainingMutation,
    useGetAppraisalByIdQuery,
    useUpdateAppraisalMutation,
} from "@/redux/features/appraisal-api-slice";
import { useGetMyBiodataQuery } from "@/redux/features/hr-api-slice";
import { skipToken } from "@reduxjs/toolkit/query";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

type QualRow = {
  id?: number;
  date_period: string;
  institution: string;
  qualification_attained: string;
};

type TrainingRow = {
  id?: number;
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
  const { data: biodata } = useGetMyBiodataQuery();
  const terms = appraisal?.employment_terms || biodata?.employment_terms;
  const [createAppraisal] = useCreateAppraisalMutation();
  const [updateAppraisal] = useUpdateAppraisalMutation();
  const [createInitialQual] = useCreateInitialQualificationMutation();
  const [updateInitialQual] = useUpdateInitialQualificationMutation();
  const [createAdditionalQual] = useCreateAdditionalQualificationMutation();
  const [updateAdditionalQual] = useUpdateAdditionalQualificationMutation();
  const [createTraining] = useCreateTrainingMutation();
  const [updateTraining] = useUpdateTrainingMutation();
  const [deleteInitialQual] = useDeleteInitialQualificationMutation();
  const [deleteAdditionalQual] = useDeleteAdditionalQualificationMutation();
  const [deleteTraining] = useDeleteTrainingMutation();

  const [initialQuals, setInitialQuals] = useState<QualRow[]>([EMPTY_QUAL_ROW]);
  const [additionalQuals, setAdditionalQuals] = useState<QualRow[]>([]);
  const [trainings, setTrainings] = useState<TrainingRow[]>([]);
  const [removedInitial, setRemovedInitial] = useState<number[]>([]);
  const [removedAdditional, setRemovedAdditional] = useState<number[]>([]);
  const [removedTrainings, setRemovedTrainings] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!appraisal) return;

    setInitialQuals(
      appraisal.initial_qualifications?.length
        ? appraisal.initial_qualifications.map((q) => ({
            id: q.id,
            date_period: q.date_period || "",
            institution: q.institution || "",
            qualification_attained: q.qualification_attained || "",
          }))
        : [EMPTY_QUAL_ROW],
    );

    setAdditionalQuals(
      appraisal.additional_qualifications?.map((q) => ({
        id: q.id,
        date_period: q.date_period || "",
        institution: q.institution || "",
        qualification_attained: q.qualification_attained || "",
      })) || [],
    );

    setTrainings(
      appraisal.trainings?.map((t) => ({
        id: t.id,
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
    end_date: Yup.string().required("End date is required").test(
      "period", "End date must follow the start date and be within three months for probation or one year otherwise",
      (value, context) => {
        const start = context.parent.start_date;
        if (!value || !start) return true;
        const days = (Date.parse(value) - Date.parse(start)) / 86400000;
        return days >= 0 && days <= (terms === "probation" ? 92 : 366);
      },
    ),
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

      if ([...filledInitial, ...filledAdditional].some((q) => !q.institution.trim() || !q.qualification_attained.trim()) ||
          filledTrainings.some((t) => !t.date_period.trim() || !t.organiser.trim() || !t.attainment.trim())) {
        toast.error("Complete every qualification and training row before continuing.");
        return;
      }

      await Promise.all([
        ...removedInitial.map((rowId) => deleteInitialQual(rowId).unwrap()),
        ...removedAdditional.map((rowId) => deleteAdditionalQual(rowId).unwrap()),
        ...removedTrainings.map((rowId) => deleteTraining(rowId).unwrap()),
      ]);

      await Promise.all([
        ...filledInitial.map((q) =>
          q.id
            ? updateInitialQual({ id: q.id, data: q }).unwrap()
            : createInitialQual({ ...q, appraisal: appraisalId }).unwrap(),
        ),
        ...filledAdditional.map((q) =>
          q.id
            ? updateAdditionalQual({ id: q.id, data: q }).unwrap()
            : createAdditionalQual({ ...q, appraisal: appraisalId }).unwrap(),
        ),
        ...filledTrainings.map((t) =>
          t.id
            ? updateTraining({ id: t.id, data: t }).unwrap()
            : createTraining({ ...t, appraisal: appraisalId }).unwrap(),
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
        <p className="mb-3 text-muted-foreground">The appraisal cycle runs July to June. Use a three month period for probation or a twelve month period for confirmed staff.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DatePicker name="start_date" label="Start Date" required />
          <DatePicker name="end_date" label="End Date" required />
        </div>
      </section>

      <section className="mt-6 rounded-md bg-muted/40 p-4 text-sm">
        <h3 className="mb-2 font-semibold text-primary">A.1 Personal information</h3>
        <p className="mb-3 text-muted-foreground">These details come from employee biodata. HR can correct them there.</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <p>Appraisee: {biodata?.names || appraisal?.appraisee_name || "—"}</p>
          <p>Date of birth: {biodata?.date_of_birth || appraisal?.appraisee_birth_date || "—"}</p>
          <p>Job title: {biodata?.designation_name || appraisal?.appraisee_designation || "—"}</p>
          <p>Directorate: {biodata?.directorate_name || appraisal?.appraisee_directorate || "—"}</p>
          <p>Department / unit: {biodata?.department_name || appraisal?.appraisee_department || "—"}</p>
          <p>Date of present appointment: {biodata?.present_appointment_date || appraisal?.present_appointment_date || "—"}</p>
          <p>Terms of employment: {biodata?.employment_terms_name || terms || "—"}</p>
          <p>Salary scale: {biodata?.grade_scale_code || appraisal?.appraisee_salary_scale || "—"}</p>
          <p>Appraiser: {biodata?.supervisor_name || appraisal?.appraiser_name || "—"}</p>
          <p>Appraiser job title: {biodata?.supervisor_designation_name || appraisal?.appraiser_designation || "—"}</p>
          <p>Appraiser salary scale: {biodata?.supervisor_grade_scale_code || appraisal?.appraiser_salary_scale || "—"}</p>
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
                    onClick={() => {
                      if (q.id) setRemovedInitial((ids) => [...ids, q.id!]);
                      setInitialQuals(initialQuals.filter((_, idx) => idx !== i));
                    }}
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
                    onClick={() => {
                      if (q.id) setRemovedAdditional((ids) => [...ids, q.id!]);
                      setAdditionalQuals(additionalQuals.filter((_, idx) => idx !== i));
                    }}
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
                    onClick={() => {
                      if (t.id) setRemovedTrainings((ids) => [...ids, t.id!]);
                      setTrainings(trainings.filter((_, idx) => idx !== i));
                    }}
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
