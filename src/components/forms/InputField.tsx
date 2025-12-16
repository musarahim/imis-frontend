"use client"
import { Input } from '@/components/ui/input';
import { ErrorMessage, useField } from 'formik';
import Link from 'next/link';
import React from 'react';

interface Props {
	name: string,
    label: string,
    placeholder?: string,
    type?: string,
    required?: boolean,
    link?: {
		linkText: string;
		linkUrl: string;
	};
    id?: string,
    value?: string,
    children?: React.ReactNode,
     autoComplete?: string,
     disabled?: boolean

}
function InputField({...props}: Props) {
    const [field, meta] = useField(props.name);
  return (
    <div>
                    <label htmlFor={props.name} className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50">
                      {props.label} {props.required && <span className="text-red-500">*</span>}
                    </label>
                    {props.link && (
					<div className='text-sm'>
						<Link
							className='font-semibold text-sky-600 hover:text-sky-500'
							href={props.link.linkUrl}
						>
							{props.link.linkText}
						</Link>
					</div>
				)}
                    <div className="mt-2">
                      
                      <Input
                        id={props.id}
                        {...field} {...props}
                      />
                    </div>
                    {meta.touched && meta.error ? (
               <ErrorMessage name={props.name} component="div" className="text-sm text-red-600" />
			

				) : null}
                  </div>
  )
}

export default InputField