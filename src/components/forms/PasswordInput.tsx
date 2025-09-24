"use client";
import { Input } from '@/components/ui/input';
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
               
                <Input
                    id={props.id}
                    type={showPassword ? 'text' : 'password'}
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