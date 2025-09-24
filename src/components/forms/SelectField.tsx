"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useField, useFormikContext } from "formik";

interface Option {
  value: string;
  label: string;
}

interface Props {
  name: string;
  label: string;
  required?: boolean;
  options: Option[];
  id?: string;
  placeholder?: string;
}

function SelectField({ name, label, required = false, options, id, placeholder }: Props) {
  const [field, meta] = useField<string>(name);
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();

  // Convert "" to undefined so Select shows the placeholder
  const selectedValue = field.value ? String(field.value) : undefined;

  return (
    <div className="w-full">
      <label
        htmlFor={id ?? name}
        className="block text-sm/6 font-medium text-gray-900 dark:text-white"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="mt-2">
        <Select
          value={selectedValue}
          onValueChange={(val) => setFieldValue(name, val)}
          onOpenChange={(open) => {
            if (!open) setFieldTouched(name, true, true);
          }}
        >
          <SelectTrigger
            id={id ?? name}
            className="w-full"
            aria-required={required}
            aria-invalid={!!(meta.touched && meta.error)}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>
            {/* No empty-value item here */}
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {meta.touched && meta.error ? (
        <small className="text-sm text-red-600">{meta.error}</small>
      ) : null}
    </div>
  );
}

export default SelectField;
