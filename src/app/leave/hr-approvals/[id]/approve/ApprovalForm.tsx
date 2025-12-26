"use client";
import { AppForm as Form, RadioInputField, SubmitButton, TextAreaField } from "@/components/forms";
import { useApproveLeaveHrMutation } from '@/redux/features/leave-api-slice';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface ApprovalFormProps {
  hr_approved: boolean;
  hr_comments: string;
}

const booleanOptions = [
  { label: 'Accept', value: 'true' },
  { label: 'Reject', value: 'false' },
];
function ApprovalForm({ id }: { id: string }) {
    const [approveHr, { isLoading }] = useApproveLeaveHrMutation();
    const router = useRouter();
    const intialValues = {
        hr_approved: true,
        hr_comments: '',
      };

    const validationSchema = Yup.object().shape({
        hr_approved: Yup.boolean().required("Decision is required"),
        hr_comments: Yup.string().required("Remarks are required"),
      });
    
    const handleSubmit = (values: ApprovalFormProps) => {
        approveHr({
            id: Number(id),
            hr_approved: values.hr_approved,
            hr_comments: values.hr_comments,
        })
        .unwrap()
        .then(() => {
            // Handle success (e.g., show a success message, redirect, etc.)
            router.push('/leave/hr-approvals');
        })
        .catch((error) => {
            // Handle error (e.g., show an error message)
            console.error(error);
            toast.error("An error occurred while submitting the approval.");
        });
       
    };
  return (
    <div className="w-full max-w-lg h-full">
    <Form initialValues={intialValues} onSubmit={handleSubmit} validationSchema={validationSchema} >
                <RadioInputField
                    name="hr_approved"
                    label="Decision"
                    required
                    options={booleanOptions}
                    orientation="horizontal"
                />
                
                 <TextAreaField
                    name="hr_comments"
                    label="Remarks"
                    required
                    type="text"
                />

               

            
             

                  <div className="flex justify-end space-x-2">
          
          <SubmitButton isLoading={isLoading} title="Submit" />
        </div>
                </Form>
    </div>
  )
}

export default ApprovalForm