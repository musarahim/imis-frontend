
import { Input } from '@/components/ui/input';
import { ErrorMessage, useField, useFormikContext } from 'formik';
import React, { useState } from 'react';
interface Props {
    name: string,
    label: string,
    required?: boolean,
    id?: string,
    value?: string,
    children?: React.ReactNode,

}
function FileField({...props}: Props) {
     const [field, meta] = useField(props.name);
    const { setFieldValue } = useFormikContext();
    const [file, setFile] = useState<File | null>(null);
     const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);

        if (selectedFile) {
        setFieldValue(props.name, selectedFile);
        } else {
        setFieldValue(props.name, null);
        }
    };
  return (
    <div>
         <label htmlFor={props.name} className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50">
                      {props.label} {props.required && <span className="text-red-500">*</span>}
                    </label>
                     <div className="mt-2">
                      
                      <Input
                        id={props.id}
                        type="file"
                        onChange={handleOnChange}
                        {...props}
                      />
                    </div>
                    {meta.touched && meta.error ? (
               <ErrorMessage name={props.name} component="div" className="text-sm text-red-600" />
			

				) : null}
    </div>
  )
}

export default FileField