"use client";
import {
    AppForm as Form,
    SelectField,
    SubmitButton,
    TextAreaField,
} from "@/components/forms";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAddDirectorateDecisionMutation } from "@/redux/features/programme-api-slice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface DecisionProps {
  applicationID: number;
}

const status_options = [
  { label: "Progress to Management", value: "progressed_to_management" },
  {
    label: "Reject Application",
    value: "rejected",
  },
];
function Decision({ applicationID }: DecisionProps) {
  const [addDirectorateDecision, { isLoading }] =
    useAddDirectorateDecisionMutation();
  const router = useRouter();

  const intialValues = {
    status: "",
    comment: "",
  };

  const validationSchema = Yup.object().shape({
    status: Yup.string().required("Status is required"),
    comment: Yup.string().required("Comment is required"),
  });

  const handleSubmit = async (values: typeof intialValues) => {
    try {
      await addDirectorateDecision({
        id: applicationID,
        data: values,
      }).unwrap();
      toast.success("Decision submitted successfully");
      router.push("/programmes/progressed-to-management");
    } catch (error) {
      console.log("Error submitting decision:", error); // Debug log
      toast.error("Failed to submit decision");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>
          Choose whether to progress the application to the Directorate for
          further processing or to return it to the assessor for re-evaluation
          based on the comments provided.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form
          initialValues={intialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Separator className="my-4" />
          <div className="flex flex-col gap-6">
            <SelectField
              name="status"
              label="Decision"
              options={status_options}
            />
            <TextAreaField
              name="comment"
              label="Comment"
              placeholder="Enter your comments here..."
            />
          </div>
          <SubmitButton
            isLoading={isLoading}
            className="w-full mt-4"
            title="Submit Decision"
          />
        </Form>
      </CardContent>
    </Card>
  );
}

export default Decision;
