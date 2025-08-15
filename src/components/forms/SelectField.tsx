"use client";
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useField, useFormikContext } from 'formik';

interface Option {
  value: string;
  label: string;
}

interface Props {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options: Array<Option>;
  Id?: string;
}

function SelectField({ name, label, required = false, options, Id }: Props) {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue(name, event.target.value);
  };

  const selectOptions = [{ value: "", label: 'Please Select' }, ...options];

  return (
    <>
      <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2 grid grid-cols-1">
        <select
          id={Id}
          {...field}
          onChange={handleOnChange}
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
        >
          {selectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        />
      </div>
      {meta.touched && meta.error ? (
        <small className="text-sm text-red-600">{meta.error}</small>
      ) : null}
    </>
  );
}

export default SelectField;