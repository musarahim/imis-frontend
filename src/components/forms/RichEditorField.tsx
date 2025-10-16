"use client";

import { useField } from "formik";

type Props = {
  name: string;
  label: string;
  required?: boolean;
  id?: string;
  children?: React.ReactNode;
};



export default function RichEditorField({ name, label, required }: Props) {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { setValue, setTouched } = helpers;

  

  return (
    <div>
      <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
}