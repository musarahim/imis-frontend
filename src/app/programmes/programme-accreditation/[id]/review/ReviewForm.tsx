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
function ReviewForm({ id }: ReviewFormProps) {
  const [createPreliminaryReview, { isLoading }] =
    useCreatePreliminaryReviewMutation();
  const router = useRouter();

  const intialValues = {
    application: id,
    type_of_entry_summary: "",
    type_of_entry_comments: "",
    entry_requirements_summary: "",
    entry_requirements_comments: "",
    human_resource_summary: "",
    human_resource_comments: "",
    facilities_summary: "",
    facilities_comments: "",
    programme_duration_summary: "",
    programme_duration_comments: "",
    minimum_graduation_load_summary: "",
    minimum_graduation_load_comments: "",
    day_students: 0,
    evening_students: 0,
    weekend_students: 0,
    student_comment: "",
    expert_progression: "",
  };

  const validationSchema = Yup.object().shape({
    type_of_entry_summary: Yup.string().required(
      "Type of entry summary is required",
    ),
    type_of_entry_comments: Yup.string().required(
      "Type of entry comments are required",
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
    programme_duration_summary: Yup.string().required(
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
        <RichEditorField
          name="type_of_entry_summary"
          label="1. Type of Entry (Summary of Content in Proposed Curriculum)"
        />
        <TextAreaField
          name="type_of_entry_comments"
          label="Comments on Type of Entry"
        />
        <RichEditorField
          name="entry_requirements_summary"
          label="2. Entry Requirements (Summary of Content in Proposed Curriculum)"
        />
        <TextAreaField
          name="entry_requirements_comments"
          label="Comments on Entry Requirements"
        />
        <RichEditorField
          name="human_resource_summary"
          label="3. Human Resource (Summary of Content in Proposed Curriculum)"
        />
        <TextAreaField
          name="human_resource_comments"
          label="Comments on Human Resource"
        />
        <RichEditorField
          name="facilities_summary"
          label="4. Facilities (Summary of Content in Proposed Curriculum)"
        />
        <TextAreaField
          name="facilities_comments"
          label="Comments on Facilities"
        />
        <RichEditorField
          name="programme_duration_summary"
          label="5. Programme Duration (Summary of Content in Proposed Curriculum)"
        />
        <TextAreaField
          name="programme_duration_comments"
          label="Comments on Programme Duration"
        />
        <RichEditorField
          name="minimum_graduation_load_summary"
          label="6. Minimum Graduation Load (Summary of Content in Proposed Curriculum)"
        />
        <TextAreaField
          name="minimum_graduation_load_comments"
          label="Comments on Minimum Graduation Load"
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
          label="7. Student Comments (Summary of Content in Proposed Curriculum)"
        />
        <SelectField
          name="expert_progression"
          label="8. Do you recommend progression to experts?"
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
