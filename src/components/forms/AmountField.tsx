"use client";
import { Input } from "@/components/ui/input";
import { ErrorMessage, useField } from "formik";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  link?: {
    linkText: string;
    linkUrl: string;
  };
  id?: string;
  value?: string;
  children?: React.ReactNode;
  autoComplete?: string;
  disabled?: boolean;
}
function formatThousands(value: string) {
  if (!value) return "";
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function AmountField({ ...props }: Props) {
  const [field, meta, helpers] = useField<string>(props.name);
  const rawValue = field.value || "";
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50"
      >
        {props.label}{" "}
        {props.required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2">
        <Input
          id={props.id}
          {...field}
          {...props}
          type="text"
          inputMode="numeric"
          value={formatThousands(rawValue)}
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/[^\d]/g, "");
            helpers.setValue(digitsOnly);
          }}
          onBlur={() => helpers.setTouched(true)}
          placeholder="e.g. 1,000,000"
        />
      </div>
      {meta.touched && meta.error ? (
        <ErrorMessage
          name={props.name}
          component="div"
          className="text-sm text-red-600"
        />
      ) : null}
    </div>
  );
}

export default AmountField;
