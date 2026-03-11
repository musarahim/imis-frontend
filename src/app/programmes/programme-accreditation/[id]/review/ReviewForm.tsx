"use client";
import {
    AppForm as Form,
    RichEditorField,
    SubmitButton,
    TextAreaField,
} from "@/components/forms";
import { useCreatePreliminaryReviewMutation } from "@/redux/features/programme-api-slice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";
type ReviewFormProps = {
  id: string;
};
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
    expert_progression: false,
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
    expert_progression: Yup.boolean().required(
      "Expert progression recommendation is required",
    ),
  });

  const handleSubmit = (values: PreliminaryReview) => {
    createPreliminaryReview(values)
      .unwrap()
      .then(() => {
        toast.success("Preliminary review submitted successfully");
        router.push(`/programmes/programme-accreditation/${id}`);
      })
      .catch((error) => {
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
        <RichEditorField
          name="type_of_entry_summary"
          label="1. Type of Entry (Summary of Content in Proposed Curriculum)"
        />
        <TextAreaField
          name="type_of_entry_comments"
          label="Comments on Type of Entry"
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
