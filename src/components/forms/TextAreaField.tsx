"use client"
import { ErrorMessage, useField } from 'formik';
import React from 'react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface Props {
    name: string,
    label: string,
    type?: string,
    required?: boolean,
    id?: string,
    value?: string,
    children?: React.ReactNode,
     autoComplete?: string,

}
function TextAreaField({...props}: Props) {
    const [field, meta] = useField(props.name);
  return (
    <div>
        <Label htmlFor={props.name} className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50">
            {props.label} {props.required && <span className="text-red-500">*</span>}
        </Label>
        <Textarea
        className='mt-2'
          id={props.id}
        {...field} {...props}
        />
        {meta.touched && meta.error ? (
               <ErrorMessage name={props.name} component="div" className="text-sm text-red-600" />
            

                ) : null}
    </div>
  )
}

export default TextAreaField