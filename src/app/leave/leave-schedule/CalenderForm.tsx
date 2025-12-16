"use client";
import { DatePicker, AppForm as Form, InputField, SelectField, SubmitButton } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { useDropdownData } from "@/hooks";
import { useCreateLeaveScheduleMutation } from '@/redux/features/leave-api-slice';
import { toast } from "react-toastify";
import * as Yup from "yup";

interface CalenderFormProps {
  start: Date;
  end: Date;
  onCancel: () => void;
}

function CalenderForm({ start, end, onCancel }: CalenderFormProps) {
    // Format dates to datetime-local format
    const { leave_types } = useDropdownData();
    const [createSchedule] = useCreateLeaveScheduleMutation()
    
    const formatDateTimeLocal = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const intialValues = {
        leave_type: '',
        start_date: formatDateTimeLocal(start),
        end_date: formatDateTimeLocal(end),
        leave_days: 0,
      };

    const validationSchema = Yup.object().shape({
        leave_type: Yup.string().required("Leave type is required"),
        start_date: Yup.string().required("Start date is required"),
        end_date: Yup.string().required("End date is required"),
        leave_days: Yup.number().required("Leave days is required").min(1, "Leave days must be at least 1"),
      });
    
    const handleSubmit = (values: LeaveSchedule) => {
      console.log("Original Form Values:", values);
      
      // Ensure dates are in YYYY-MM-DD format
      const formatToYYYYMMDD = (dateValue: string | Date) => {
        let date: Date;
        
        if (typeof dateValue === 'string') {
          // Handle various string formats
          if (dateValue.includes('T')) {
            // Remove time part if present (YYYY-MM-DDTHH:mm:ss)
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
        ...values,
        start_date: formatToYYYYMMDD(values.start_date),
        end_date: formatToYYYYMMDD(values.end_date),
      };
      
      console.log("Formatted Values for Backend:", formattedValues);
      
      createSchedule(formattedValues).then(() => {
        onCancel();
        toast.success("Leave schedule created successfully");
      }).catch((error) => {
        console.error("Error creating leave schedule:", error);
        toast.error("Failed to create leave schedule");
      });
    };
  return (
 <Form initialValues={intialValues} onSubmit={handleSubmit} validationSchema={validationSchema} >
                <SelectField
                    name="leave_type"
                    label="Leave Type"
                    required
                    options={leave_types ? leave_types.map((type) => ({
                      label: type.name,
                      value: type.id?.toString() || '',
                    })) : []}
                />

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
                <InputField
                    name="leave_days"
                    label="Leave Days"
                    required
                    type="number"
                />

                  <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <SubmitButton isLoading={false} title="Submit" />
        </div>
                </Form>
  )
}

export default CalenderForm
