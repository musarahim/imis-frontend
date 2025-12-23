"use client";
import { AppForm as Form, RadioInputField, SubmitButton, TextAreaField } from "@/components/forms";
import { useApproveLeaveDelegationMutation } from '@/redux/features/leave-api-slice';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";


interface ApprovalFormProps {
  delegation_accepted: boolean;
  delegatee_remarks: string;
}

const booleanOptions = [
  { label: 'Accept', value: 'true' },
  { label: 'Reject', value: 'false' },
];
function ApprovalForm({ id }: { id: string }) {
    const [approveDelegation, { isLoading }] = useApproveLeaveDelegationMutation();
    const router = useRouter();
    const intialValues = {
        delegation_accepted: true,
        delegatee_remarks: '',
      };

    const validationSchema = Yup.object().shape({
        delegation_accepted: Yup.boolean().required("Decision is required"),
        delegatee_remarks: Yup.string().required("Remarks are required"),
      });
    
    const handleSubmit = (values: ApprovalFormProps) => {
        approveDelegation({
            id: Number(id),
            delegation_accepted: values.delegation_accepted,
            delegatee_remarks: values.delegatee_remarks,
        })
        .unwrap()
        .then(() => {
            // Handle success (e.g., show a success message, redirect, etc.)
            router.push('/leave/delegations');
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
                    name="delegation_accepted"
                    label="Decision"
                    required
                    options={booleanOptions}
                    orientation="horizontal"
                />
                
                 <TextAreaField
                    name="delegatee_remarks"
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