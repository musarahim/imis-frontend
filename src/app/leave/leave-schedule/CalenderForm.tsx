"use client";
import { AppForm as Form, InputField } from "@/components/forms";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";

interface CalenderFormProps {
  start: Date;
  end: Date;
  onSubmit: (data: { title: string; start: string; end: string }) => void;
  onCancel: () => void;
}

function CalenderForm({ start, end, onSubmit, onCancel }: CalenderFormProps) {
    // Format dates to datetime-local format
    const formatDateTimeLocal = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const intialValues = {
        title: "",
        start: formatDateTimeLocal(start),
        end: formatDateTimeLocal(end),
      };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        start: Yup.string().required("Start time is required"),
        end: Yup.string().required("End time is required"),
      });
    
    const handleSubmit = (values: typeof intialValues) => {
        onSubmit(values);
      };
  return (
 <Form initialValues={intialValues} onSubmit={handleSubmit} validationSchema={validationSchema} >
                <InputField
                    name="title"
                    label="Event Title"
                    required
                    type="text"
                />

                  
                        <InputField
                        name="start"
                        label="Start Time"
                        required
                        type="datetime-local"
                        />
                  

                  <InputField
                    name="end"
                    label="End Time"
                    required
                    type="datetime-local"
                />

                  <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
                </Form>
  )
}

export default CalenderForm
