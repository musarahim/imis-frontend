"use client";
import {
    AppForm as Form,
    RichEditorField,
    SelectField,
    SubmitButton,
    TextAreaField,
} from "@/components/forms";
import { Separator } from "@/components/ui/separator";
import { useCreateProgrammeAssessmentMutation } from "@/redux/features/programme-api-slice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

type AssessmentFormProps = {
  id: string;
};
const yes_no_options = [
  { label: "Accredit as is", value: "accredit" },
  { label: "Accredit with Minor Corrections", value: "minor" },
  { label: "Accredit After Major Corrections", value: "major" },
  { label: "Don't Accredit", value: "reject" },
];
function AssessmentForm({ id }: AssessmentFormProps) {
  const [createAssessment, { isLoading }] =
    useCreateProgrammeAssessmentMutation();
  const router = useRouter();

  const intialValues = {
    application: id,
    programme_development_process: "",
    rationale: "",
    programme_objectives: "",
    competences: "",
    learning_outcomes: "",
    entry_requirements: "",
    duration: "",
    grading_system: "",
    curriculum_structure: "",
    staffing_levels: "",
    infrastructure: "",
    cbe_allignment: "",
    other_comments: "",
    // course
    course_name: "",
    course_code: "",
    course_level: "",
    contact_hours: "",
    credit_units: "",
    course_description: "",
    course_objectives: "",
    course_learning_outcomes: "",
    detailed_course_content: "",
    instructional_materials: "",
    delivery_modes: "",
    assessment_modes: "",
    reading_list: "",
    writing_styles_and_grammar: "",
    minimum_standards: "",
    // overall comments and recommendation
    institution_comments: "",
    nche_comments: "",
    conclusions: "",
    recommendation: "",
  };

  const validationSchema = Yup.object().shape({
    programme_development_process: Yup.string().required(
      "Programme development process is required",
    ),
    rationale: Yup.string().required("Programme Rationale is required"),
    programme_objectives: Yup.string().required(
      "Programme objectives are required",
    ),
    competences: Yup.string().required("Competences are required"),
    learning_outcomes: Yup.string().required("Learning outcomes are required"),
    entry_requirements: Yup.string().required(
      "Entry requirements are required",
    ),
    duration: Yup.string().required("Duration is required"),
    grading_system: Yup.string().required("Grading system is required"),
    curriculum_structure: Yup.string().required(
      "Curriculum structure is required",
    ),
    staffing_levels: Yup.string().required("Staffing levels are required"),
    infrastructure: Yup.string().required("Infrastructure is required"),
    cbe_allignment: Yup.string().required("CBE alignment is required"),
    other_comments: Yup.string(),
    // course
    course_name: Yup.string().required("Course name is required"),
    course_code: Yup.string().required("Course code is required"),
    course_level: Yup.string().required("Course level is required"),
    contact_hours: Yup.string().required("Contact hours are required"),
    credit_units: Yup.string().required("Credit units are required"),
    course_description: Yup.string().required("Course description is required"),
    course_objectives: Yup.string().required("Course objectives are required"),
    course_learning_outcomes: Yup.string().required(
      "Course learning outcomes are required",
    ),
    detailed_course_content: Yup.string().required(
      "Detailed course content is required",
    ),
    instructional_materials: Yup.string().required(
      "Instructional materials are required",
    ),
    delivery_modes: Yup.string().required("Delivery modes are required"),
    assessment_modes: Yup.string().required("Assessment modes are required"),
    writing_styles_and_grammar: Yup.string().required(
      "Writing styles and grammar comments are required",
    ),
    minimum_standards: Yup.string().required(
      "Minimum standards comments are required",
    ),
    reading_list: Yup.string().required("Reading list is required"),
    // overall comments and recommendation
    institution_comments: Yup.string().required(
      "Institution comments are required",
    ),
    nche_comments: Yup.string().required("NCHE comments are required"),
    conclusions: Yup.string().required("Conclusions are required"),
    recommendation: Yup.string().required("Recommendation is required"),
  });

  const handleSubmit = (values: ProgrammeAssessment) => {
    createAssessment(values)
      .unwrap()
      .then(() => {
        toast.success("Assessment submitted successfully");
        router.push(`/programmes/programme-assessments`);
      })
      .catch((error) => {
        console.error("Failed to submit assessment:", error);
        toast.error("Failed to submit assessment");
      });
  };
  return (
    <div className="w-full  h-full">
      <Form
        initialValues={intialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {/* Form fields go here */}
        <Separator className="my-4" />
        <label className="text-sm font-semibold my-3">
          ASSESSOR’S COMMENTS
        </label>
        <RichEditorField
          name="programme_development_process"
          label="1. Programme Development Process"
        />

        <RichEditorField
          name="rationale"
          label="2. Programme Rationale/ Justification (e.g., Purpose, Relevance, Broad based)"
        />

        <RichEditorField
          name="programme_objectives"
          label="3. Programme Objectives"
        />
        <RichEditorField name="competences" label="4. Competences" />

        <RichEditorField
          name="learning_outcomes"
          label="5. Programme Learning Outcomes (Use of K/S/A/V) (Knowledge/Skills/Attitudes/Values) framework"
        />

        <RichEditorField
          name="entry_requirements"
          label="6. Entry Requirements"
        />
        <RichEditorField
          name="duration"
          label="7. Duration (Minimum and Maximum)"
        />
        <RichEditorField name="grading_system" label="8. Grading System" />
        <RichEditorField
          name="curriculum_structure"
          label="8. Curriculum Structure (General Overview of Programme Matrix)"
        />
        <RichEditorField
          name="staffing_levels"
          label="9. Staffing Levels (e.g. Availability of core staff)"
        />
        <RichEditorField
          name="infrastructure"
          label="10. Infrastructure:Lecture space, Computer Laboratory, Library and others."
        />

        <RichEditorField
          name="cbe_allignment"
          label="11. CBE Alignment
-Student-centred learning-teaching philosophy
-Shift from content-based instruction to competency development.
-Modes of Assessment - practical applications (Formative & summative)
-Articulation of Generic/Graduate Employability Skills (e.g. Communication, critical thinking, problem-solving, team-work etc.)"
        />
        <RichEditorField name="other_comments" label="12. Other Comments" />
        <Separator className="my-4" />
        <label className="text-sm font-semibold my-3">B) COURSE</label>
        <TextAreaField name="course_name" label="Course Name" />
        <TextAreaField name="course_code" label="Course Code" />
        <TextAreaField name="course_level" label="Course Level" />
        <TextAreaField name="contact_hours" label="Contact Hours" />
        <TextAreaField name="credit_units" label="Credit Units" />
        <TextAreaField
          name="course_description"
          label="Brief Course Description"
        />
        <TextAreaField name="course_objectives" label="Course Objectives" />
        <TextAreaField
          name="course_learning_outcomes"
          label="Course Learning Outcomes"
        />
        <TextAreaField
          name="detailed_course_content"
          label="Detailed Course Contents with corresponding hours"
        />
        <TextAreaField
          name="instructional_materials"
          label="Study/Instructional Materials"
        />
        <TextAreaField name="delivery_modes" label="Modes of Delivery" />
        <TextAreaField name="assessment_modes" label="Modes of Assessment" />
        <TextAreaField name="reading_list" label="Reading List" />
        <TextAreaField
          name="writing_styles_and_grammar"
          label="Writing Styles and Grammar"
        />
        <TextAreaField
          name="minimum_standards"
          label="Minimum Standards (NCHE)"
        />
        <Separator className="my-4" />
        <label className="text-sm font-semibold my-3">
          C) OVERALL COMMENTS AND RECOMMENDATION
        </label>
        <TextAreaField
          name="institution_comments"
          label="Comments for the Institution"
        />
        <TextAreaField name="nche_comments" label="Comments for NCHE" />

        <TextAreaField name="conclusions" label="Conclusions" />
        <SelectField
          name="recommendation"
          label="Recommendation"
          options={yes_no_options}
        />
        <div className="text-right">
          <SubmitButton
            isLoading={isLoading}
            title="Submit"
            className="w-1/2"
          />
        </div>
      </Form>
    </div>
  );
}

export default AssessmentForm;
