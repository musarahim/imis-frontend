"use client";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useField } from 'formik';
import React, { useState } from 'react';

interface Props {
    name: string,
    label: string,
    type?: string,
    required?: boolean,
    rows?: number,
    id?: string,
    value?: string,
    hint?: string,
    children?: React.ReactNode,
    autoComplete?: string,
}

function PasswordInput({...props}: Props) {
    const [field, meta] = useField(props.name);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <label htmlFor={props.name} className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                {props.label}  {props.required && <span className="text-red-500">*</span>}
            </label>
            <div className="mt-2 relative">
                <input
                    id={props.id}
                    type={showPassword ? 'text' : 'password'}
                    className="block w-full rounded-md border-0 py-1.5 px-1.5 shadow-sm ring-1 ring-inset dark:bg-white/5 ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-white dark:text-white focus:ring-2 focus:ring-inset focus:ring-green-300 focus:border-green-600 focus:outline-none sm:text-sm sm:leading-6"
                    {...field} {...props}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <button type="button" onClick={togglePasswordVisibility} className="focus:outline-none">
                        {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5 text-gray-500 dark:text-gray-100" aria-hidden="true" />
                        ) : (
                            <EyeIcon className="h-5 w-5 text-gray-500 dark:text-gray-100" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>
            {meta.touched && meta.error ? (
                <small className='text-sm text-red-600'>{meta.error}</small>
            ) : null}
        </div>
    );
}

export default PasswordInput;