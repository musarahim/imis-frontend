"use client";
import { AppForm as Form, SubmitButton, TextAreaField } from "@/components/forms";
import { useSubmitReviewerCommentMutation } from "@/redux/features/appraisal-api-slice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({ comment: Yup.string().required("Comment is required") });

function ReviewForm({ id }: { id: string }) {
  const [submitComment, { isLoading }] = useSubmitReviewerCommentMutation();
  const router = useRouter();

  const handleSubmit = ({ comment }: { comment: string }) => {
    submitComment({ id: Number(id), comment })
      .unwrap()
      .then(() => {
        toast.success("Reviewer comment submitted.");
        router.push("/hr/performance_appraisal/reviewer-reviews");
      })
      .catch(() => toast.error("Failed to submit comment."));
  };

  return (
    <Form initialValues={{ comment: "" }} onSubmit={handleSubmit} validationSchema={validationSchema}>
      <TextAreaField name="comment" label="Reviewing Officer's Comments" required />
      <div className="flex justify-end mt-4">
        <SubmitButton isLoading={isLoading} title="Submit Comment" />
      </div>
    </Form>
  );
}

export default ReviewForm;
