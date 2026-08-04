"use client";
import { AppForm as Form, SubmitButton, TextAreaField } from "@/components/forms";
import { useSubmitExecutiveCommentMutation } from "@/redux/features/appraisal-api-slice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({ comment: Yup.string().required("Comment is required") });

function ExecutiveReviewForm({ id }: { id: string }) {
  const [submitComment, { isLoading }] = useSubmitExecutiveCommentMutation();
  const router = useRouter();

  const handleSubmit = ({ comment }: { comment: string }) => {
    submitComment({ id: Number(id), comment })
      .unwrap()
      .then(() => {
        toast.success("Executive Director comment submitted. Appraisal completed.");
        router.push("/hr/performance_appraisal/executive-reviews");
      })
      .catch(() => toast.error("Failed to submit comment."));
  };

  return (
    <Form initialValues={{ comment: "" }} onSubmit={handleSubmit} validationSchema={validationSchema}>
      <TextAreaField name="comment" label="Executive Director's Comments" required />
      <div className="flex justify-end mt-4">
        <SubmitButton isLoading={isLoading} title="Submit & Complete Appraisal" />
      </div>
    </Form>
  );
}

export default ExecutiveReviewForm;
