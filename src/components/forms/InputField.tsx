"use client" 
import { useField } from 'formik';
import Link from 'next/link';
import React from 'react';

interface Props {
	name: string,
    label: string,
    type?: string,
    required?: boolean,
    link?: {
		linkText: string;
		linkUrl: string;
	};
    Id?: string,
    value?: string,
    children?: React.ReactNode,
     autoComplete?: string,

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
							className='font-semibold text-indigo-600 hover:text-indigo-500'
							href={props.link.linkUrl}
						>
							{props.link.linkText}
						</Link>
					</div>
				)}
                    <div className="mt-2">
                      <input
                        id={props.Id}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        {...field} {...props}
                      />
                    </div>
                    {meta.touched && meta.error ? (
               <small className='text-sm text-red-600'>{meta.error}</small>
			

				) : null}
                  </div>
  )
}

export default InputField