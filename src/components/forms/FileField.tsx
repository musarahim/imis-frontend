"use client"
import { Input } from '@/components/ui/input';
import { ErrorMessage, useField, useFormikContext } from 'formik';
import React, { useState } from 'react';
import { Button } from '../ui/button';
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
     const [showReplace, setShowReplace] = useState(false);
     const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);

        if (selectedFile) {
        setFieldValue(props.name, selectedFile);
        } else {
        setFieldValue(props.name, null);
        }
    };

    const existingUrl = typeof field.value === "string" && field.value ? (field.value as string) : null;

    const handleRemoveExisting = () => {
    // clear both Formik value and local file state
        setFieldValue(props.name, null);
        setFile(null);
        setShowReplace(false);
    }
    const handleClearSelected = () => {
        setFile(null);
        setFieldValue(props.name, null);
    }
  return (
    <div>
         <label htmlFor={props.name} className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50">
                      {props.label} {props.required && <span className="text-red-500">*</span>}
                    </label>
                     <div className="mt-2">
                      
                      {/* <Input
                        id={props.id}
                        type="file"
                        onChange={handleOnChange}
                        {...props}
                      /> */}
                      {existingUrl && !showReplace && !file ? (
                        <div className="flex items-center gap-3">
                          <a href={existingUrl} target="_blank" rel="noreferrer"
                             className="text-sm underline text-primary-700 dark:text-primary-300">
                            View existing file
                          </a>
                          <button type="button" onClick={() => setShowReplace(true)} className="text-sm text-gray-600 hover:underline">
                            Replace
                          </button>
                          <button type="button" onClick={handleRemoveExisting} className="text-sm text-red-600 hover:underline">
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Input
                            id={props.id}
                            type="file"
                            onChange={handleOnChange}
                            {...props}
                          />
                          {/* show selected filename and clear */}
                          {file && (
                            <>
                              <span className="text-sm text-gray-700">{file.name}</span>
                              <Button type="button" onClick={handleClearSelected} className="text-sm text-white hover:underline">
                                Clear
                              </Button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    {meta.touched && meta.error ? (
               <ErrorMessage name={props.name} component="div" className="text-sm text-red-600" />
			

				) : null}
    </div>
  )
}

export default FileField