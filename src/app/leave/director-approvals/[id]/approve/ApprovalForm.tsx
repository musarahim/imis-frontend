"use client";
import { AppForm as Form, RadioInputField, SubmitButton, TextAreaField } from "@/components/forms";
import { useApproveLeaveDirectorMutation } from '@/redux/features/leave-api-slice';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface ApprovalFormProps {
  director_approved: boolean;
  director_comments: string;
}

const booleanOptions = [
  { label: 'Accept', value: 'true' },
  { label: 'Reject', value: 'false' },
];
function ApprovalForm({ id }: { id: string }) {
    const [approveDirector, { isLoading }] = useApproveLeaveDirectorMutation();
    const router = useRouter();
    const intialValues = {
        director_approved: true,
        director_comments: '',
      };

    const validationSchema = Yup.object().shape({
        director_approved: Yup.boolean().required("Decision is required"),
        director_comments: Yup.string().required("Remarks are required"),
      });
    
    const handleSubmit = (values: ApprovalFormProps) => {
        approveDirector({
            id: Number(id),
            director_approved: values.director_approved,
            director_comments: values.director_comments,
        })
        .unwrap()
        .then(() => {
            // Handle success (e.g., show a success message, redirect, etc.)
            router.push('/leave/director-approvals');
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
                    name="director_approved"
                    label="Decision"
                    required
                    options={booleanOptions}
                    orientation="horizontal"
                />
                
                 <TextAreaField
                    name="director_comments"
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