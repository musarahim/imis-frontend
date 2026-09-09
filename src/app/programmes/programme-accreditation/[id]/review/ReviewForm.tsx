"use client";
import {
    AppForm as Form,
    InputField,
    RichEditorField,
    SelectField,
    SubmitButton,
    TextAreaField,
} from "@/components/forms";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCreatePreliminaryReviewMutation } from "@/redux/features/programme-api-slice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";
type ReviewFormProps = {
  id: string;
};
const yes_no_options = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];
const entry_options = [
  { label: "Direct", value: "direct" },
  { label: "Diploma", value: "diploma" },
  { label: "Mature", value: "mature" },
  { label: "HEAC", value: "heac" },
  { label: "Others", value: "other" },
];
const tier_displine_options = [
  { label: "Agriculture", value: "agriculture" },
  { label: "Applied Sciences", value: "applied_sciences" },
  { label: "Pure Sciences", value: "pure_sciences" },
  { label: "Business", value: "business" },
  { label: "Computing", value: "computing" },
  { label: "Education- Arts", value: "education_arts" },
  { label: "Education – Sciences", value: "education_sciences" },
  { label: "Library studies", value: "library_studies" },
  { label: "Laws", value: "laws" },
  { label: "Engineering", value: "engineering" },
  { label: "Journalism and Languages", value: "journalism_languages" },
  { label: "Social Sciences", value: "social_sciences" },
  { label: "Art, Fashion and Design", value: "afd" },
  { label: "Human Health", value: "human_health" },
  { label: "Animal Health", value: "animal_health" },
  { label: "Theology", value: "theology" },
];
function ReviewForm({ id }: ReviewFormProps) {
  const [createPreliminaryReview, { isLoading }] =
    useCreatePreliminaryReviewMutation();
  const router = useRouter();

  const intialValues = {
    application: id,
    type_of_entry: "",
    type_of_entry_comments: "",
    entry_requirements_summary: "",
    entry_requirements_comments: "",
    human_resource_summary: "",
    human_resource_comments: "",
    facilities_summary: "",
    facilities_comments: "",
    align_with_cbet: "",
    align_with_cbet_comments: "",
    assessment_structure: "",
    assessment_structure_comments: "",
    programme_duration: "",
    programme_duration_comments: "",
    minimum_graduation_load_summary: "",
    minimum_graduation_load_comments: "",
    day_students: 0,
    evening_students: 0,
    weekend_students: 0,
    student_comment: "",
    expert_progression: "",
    tier_displine: "",
  };

  const validationSchema = Yup.object().shape({
    type_of_entry: Yup.string().required("Type of entry is required"),
    type_of_entry_comments: Yup.string().required(
      "Type of entry comments are required",
    ),
    align_with_cbet: Yup.string().required("Alignment with CBET is required"),
    align_with_cbet_comments: Yup.string().required(
      "Alignment with CBET comments are required",
    ),
    assessment_structure: Yup.string().required(
      "Assessment structure is required",
    ),
    assessment_structure_comments: Yup.string().required(
      "Assessment structure comments are required",
    ),
    entry_requirements_summary: Yup.string().required(
      "Entry requirements summary is required",
    ),
    entry_requirements_comments: Yup.string().required(
      "Entry requirements comments are required",
    ),
    human_resource_summary: Yup.string().required(
      "Human resource summary is required",
    ),
    human_resource_comments: Yup.string().required(
      "Human resource comments are required",
    ),
    facilities_summary: Yup.string().required("Facilities summary is required"),
    facilities_comments: Yup.string().required(
      "Facilities comments are required",
    ),
    programme_duration: Yup.string().required(
      "Programme duration summary is required",
    ),
    programme_duration_comments: Yup.string().required(
      "Programme duration comments are required",
    ),
    minimum_graduation_load_summary: Yup.string().required(
      "Minimum graduation load summary is required",
    ),
    minimum_graduation_load_comments: Yup.string().required(
      "Minimum graduation load comments are required",
    ),
    day_students: Yup.number()
      .required("Number of day students is required")
      .min(0, "Number of day students cannot be negative"),
    evening_students: Yup.number()
      .required("Number of evening students is required")
      .min(0, "Number of evening students cannot be negative"),
    weekend_students: Yup.number()
      .required("Number of weekend students is required")
      .min(0, "Number of weekend students cannot be negative"),
    student_comment: Yup.string().required("Student comment is required"),
    tier_displine: Yup.string().required("Tier discipline is required"),
    expert_progression: Yup.string().required(
      "Expert progression recommendation is required",
    ),
  });

  const handleSubmit = (values: PreliminaryReview) => {
    createPreliminaryReview(values)
      .unwrap()
      .then(() => {
        toast.success("Preliminary review submitted successfully");
        router.push(`/programmes/reviewed-applications`);
      })
      .catch((error) => {
        console.error("Failed to submit preliminary review:", error);
        toast.error("Failed to submit preliminary review");
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
        <SelectField
          name="tier_displine"
          label="Tier Discipline"
          options={tier_displine_options}
        />
        <SelectField
          name="type_of_entry"
          label="1. Type of Entry"
          options={entry_options}
        />
        <TextAreaField
          name="type_of_entry_comments"
          label="Remarks on Type of Entry"
        />
        <RichEditorField
          name="entry_requirements_summary"
          label="2. Entry Requirements (Summary of Content in Proposed Curriculum)"
        />
        <TextAreaField
          name="entry_requirements_comments"
          label="Remarks on Entry Requirements"
        />
        <InputField name="programme_duration" label="5. Programme Duration" />
        <TextAreaField
          name="programme_duration_comments"
          label="Remarks on Programme Duration"
        />
        <SelectField
          name="align_with_cbet"
          label="Does the programme align with CBET (Curriculum structure, Mode of assessment, Graduation load, Competences)?"
          options={yes_no_options}
        />
        <TextAreaField
          name="align_with_cbet_comments"
          label="Remarks on Alignment with CBET"
        />
        <InputField
          name="assessment_structure"
          label="Assessment Structure (Summative %, a minimum of 50% for Formative assessment)"
          required
        />
        <TextAreaField
          name="assessment_structure_comments"
          label="Remarks on Assessment Structure"
        />

        <RichEditorField
          name="human_resource_summary"
          label="3. Human Resource (Summary of Content in Proposed Curriculum)"
        />
        <TextAreaField
          name="human_resource_comments"
          label="Remarks on Human Resource"
        />
        <RichEditorField
          name="facilities_summary"
          label="4. Facilities (Summary of Content in Proposed Curriculum)"
        />
        <TextAreaField
          name="facilities_comments"
          label="Remarks on Facilities"
        />

        <RichEditorField
          name="minimum_graduation_load_summary"
          label="Minimum Graduation Load/Credits or 
(Notional Hours)
"
        />
        <TextAreaField
          name="minimum_graduation_load_comments"
          label="Remarks on Minimum Graduation Load"
        />
        <Label className="mt-4">
          7.Proposed Maximum Number of Students to be Registered Per Year Based
          on the Available Resources
        </Label>
        <InputField
          name="day_students"
          label="Number of Day Students"
          type="number"
        />
        <InputField
          name="evening_students"
          label="Number of Evening Students"
          type="number"
        />
        <InputField
          name="weekend_students"
          label="Number of Weekend Students"
          type="number"
        />
        <TextAreaField
          name="student_comment"
          label="Remarks on Student Comments"
        />
        <SelectField
          name="expert_progression"
          label="Do you recommend progression to experts?"
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

export default ReviewForm;
