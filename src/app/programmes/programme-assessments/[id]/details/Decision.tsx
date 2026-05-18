"use client";
import {
    FileField,
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
import { usePatchProgrammeAccreditationMutation } from "@/redux/features/programme-api-slice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface DecisionProps {
  applicationID: number;
}

const status_options = [
  { label: "Progress to Directorate", value: "progressed_to_director" },
  {
    label: "Return to Assessor for Re-evaluation",
    value: "return_to_assessor",
  },
];
function Decision({ applicationID }: DecisionProps) {
  const [patchProgrammeAccreditation, { isLoading }] =
    usePatchProgrammeAccreditationMutation();
  const router = useRouter();

  const intialValues = {
    status: "",
    pod_comment: "",
    dep_meeting_minutes: null,
  };

  const validationSchema = Yup.object().shape({
    status: Yup.string().required("Status is required"),
    pod_comment: Yup.string().required("Comment is required"),
  });

  const handleSubmit = async (values: typeof intialValues) => {
    try {
      const formData = new FormData();
      formData.append("status", values.status);
      formData.append("pod_comment", values.pod_comment);
      if (values.dep_meeting_minutes) {
        formData.append("dep_meeting_minutes", values.dep_meeting_minutes);
      }

      await patchProgrammeAccreditation({
        id: applicationID,
        data: formData,
      }).unwrap();
      toast.success("Decision submitted successfully");
      router.push("/programmes/programme-accreditation");
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
              required
            />
            <TextAreaField
              name="pod_comment"
              label="Comments from Programme Head"
              placeholder="Enter your comments here..."
              required
            />
            <FileField
              name="dep_meeting_minutes"
              label="Upload Department Meeting Minutes (optional)"
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
