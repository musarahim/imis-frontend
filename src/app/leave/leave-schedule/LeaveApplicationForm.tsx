"use client";
import { DatePicker, AppForm as Form, InputField, SelectField, SubmitButton, TextAreaField } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { useDropdownData } from "@/hooks";
import { usePatchLeaveApplicationMutation } from '@/redux/features/leave-api-slice';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface LeaveApplicationFormProps {
  scheduleData: {
    id: number;
    leave_type: string;
    start_date: string;
    end_date: string;
    leave_days: number;
  };
  onCancel: () => void;
}

function LeaveApplicationForm({ scheduleData, onCancel }: LeaveApplicationFormProps) {
    const { employees_dropdown } = useDropdownData();
    const router = useRouter();

    const [patchApplication, { isLoading }] = usePatchLeaveApplicationMutation();
    
    const formatDateTimeLocal = (dateString: string) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // Calculate return date (next working day after end date)
    const calculateReturnDate = (endDate: string) => {
      const date = new Date(endDate);
      date.setDate(date.getDate() + 1);
      return formatDateTimeLocal(date.toISOString());
    };

    const initialValues = {
        leave_type: scheduleData.leave_type,
        start_date: formatDateTimeLocal(scheduleData.start_date),
        end_date: formatDateTimeLocal(scheduleData.end_date),
        return_date: calculateReturnDate(scheduleData.end_date),
        leave_days: scheduleData.leave_days,
        reason: '',
        delegated_to: '',
      };

    const validationSchema = Yup.object().shape({
        leave_type: Yup.string().required("Leave type is required"),
        start_date: Yup.string().required("Start date is required"),
        end_date: Yup.string().required("End date is required"),
        return_date: Yup.string().required("Return date is required"),
        leave_days: Yup.number().required("Leave days is required").min(1, "Leave days must be at least 1"),
        reason: Yup.string().required("Reason for leave is required"),
        delegated_to: Yup.string().required("Delegation is required - who will handle your duties?"),
      });
    
    const handleSubmit = (values: LeaveApplication) => {
      console.log("Leave Application Values:", values);
      
      // Ensure dates are in YYYY-MM-DD format
      const formatToYYYYMMDD = (dateValue: string | Date | undefined) => {
        if (!dateValue) return '';
        
        let date: Date;
        
        if (typeof dateValue === 'string') {
          if (dateValue.includes('T')) {
            dateValue = dateValue.split('T')[0];
          }
          date = new Date(dateValue);
        } else {
          date = dateValue;
        }
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const formattedValues = {
        id: scheduleData.id,
        //leave_type: scheduleData.leave_type,
        start_date: formatToYYYYMMDD(values.start_date),
        end_date: formatToYYYYMMDD(values.end_date),
        return_date: formatToYYYYMMDD(values.return_date),
        leave_days: values.leave_days,
        reason: values.reason,
        delegated_to: values.delegated_to,
        status: 'submitted',
      };
      
      console.log("Formatted Leave Application for Backend:", formattedValues);
      
      patchApplication(formattedValues)
        .unwrap()
        .then(() => {
          onCancel();
          toast.success("Leave application submitted successfully");
          router.push("/leave/leave-applications");
        })
        .catch((error) => {
          console.error("Error submitting leave application:", error);
          toast.error("Failed to submit leave application");
        });
    };

  return (
    <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      
          <InputField
          name="leave_type"
          label="Leave Type"
          type="text"
          disabled={true}
        />

        <InputField
          name="leave_days"
          label="Leave Days"
          required
          type="number"
        />
      

      <div className="grid grid-cols-2 gap-4">
        <DatePicker
          name="start_date"
          label="Start Date"
          required
        />

        <DatePicker
          name="end_date"
          label="End Date"
          required
        />
      </div>

      <DatePicker
        name="return_date"
        label="Return Date"
        required
      />

      <TextAreaField
        name="reason"
        label="Reason for Leave"
        required
        placeholder="Please provide the reason for your leave..."
      />

      <SelectField
        name="delegated_to"
        label="Delegated To"
        required
        options={employees_dropdown ? employees_dropdown.map((emp) => ({
          label: emp.full_name,
          value: emp.id.toString(),
        })) : []}
      />


      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <SubmitButton isLoading={isLoading} title="Submit Application" />
      </div>
    </Form>
  );
}

export default LeaveApplicationForm;