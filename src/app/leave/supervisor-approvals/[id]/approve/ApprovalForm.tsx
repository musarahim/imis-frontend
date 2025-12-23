"use client";
import { AppForm as Form, RadioInputField, SubmitButton, TextAreaField } from "@/components/forms";
import { useApproveLeaveSupervisorMutation } from '@/redux/features/leave-api-slice';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface ApprovalFormProps {
  supervisor_approved: boolean;
  supervisor_comments: string;
}

const booleanOptions = [
  { label: 'Accept', value: 'true' },
  { label: 'Reject', value: 'false' },
];
function ApprovalForm({ id }: { id: string }) {
    const [approveSupervisor, { isLoading }] = useApproveLeaveSupervisorMutation();
    const router = useRouter();
    const intialValues = {
        supervisor_approved: true,
        supervisor_comments: '',
      };

    const validationSchema = Yup.object().shape({
        supervisor_approved: Yup.boolean().required("Decision is required"),
        supervisor_comments: Yup.string().required("Remarks are required"),
      });
    
    const handleSubmit = (values: ApprovalFormProps) => {
        approveSupervisor({
            id: Number(id),
            supervisor_approved: values.supervisor_approved,
            supervisor_comments: values.supervisor_comments,
        })
        .unwrap()
        .then(() => {
            // Handle success (e.g., show a success message, redirect, etc.)
            router.push('/leave/supervisor-approvals');
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
                    name="supervisor_approved"
                    label="Decision"
                    required
                    options={booleanOptions}
                    orientation="horizontal"
                />
                
                 <TextAreaField
                    name="supervisor_comments"
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