"use client"
import { useField } from 'formik';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface Props {
  name: string;
  label: string;
  required?: boolean;
}

function PhoneNumberInput({ name, label, required = false }: Props) {
  const [field, meta, helpers] = useField(name);
  const handleOnChange = (value: string, data: any, event: any, formattedValue: string) => {
    // phone will be in the format +256XXXXXXXXXX
    helpers.setValue(formattedValue);
    
  }

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2 grid grid-cols-1">
        <PhoneInput
          country={'ug'}
          value={field.value}
          prefix='+'
          onChange={handleOnChange}
          inputProps={{
            name: field.name,
            required: required,
            autoFocus: true,
            onBlur: field.onBlur,
            id: name,
          }}
          inputClass="!w-full block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 !focus:outline-2 !focus:-outline-offset-2 !focus:outline-sky-600 sm:text-sm/6"
          containerClass="!w-full"
        />
      </div>
      {meta.touched && meta.error ? (
        <small className='text-sm text-red-600'>{meta.error}</small>
      ) : null}
    </div>
  );
}

export default PhoneNumberInput;