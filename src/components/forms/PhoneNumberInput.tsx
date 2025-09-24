"use client";

import { PhoneInput } from "@/components/ui/phone-input";
import { useField } from "formik";

interface Props {
  name: string;
  label: string;
  required?: boolean;
}

function PhoneNumberInput({ name, label, required = false }: Props) {
  const [field, meta, helpers] = useField<string>(name);

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm/6 font-medium text-gray-900 dark:text-white"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="mt-2">
        <PhoneInput
          /** react-phone-number-input expects ISO-3166 alpha-2 in UPPERCASE */
          defaultCountry="UG"
          /** value should be an E.164 string like "+256..." or "" */
          value={field.value || ""}
          /** your wrapper already coerces undefined -> "" */
          onChange={(val) => helpers.setValue((val as string) || "")}
          /** forward accessibility / form props to the underlying input */
          name={field.name}
          id={name}
          required={required}
          onBlur={field.onBlur}
          /** optional: let users type with international prefix */
          international
          /** optional: placeholder */
          placeholder="+256 712 345678"
        />
      </div>

      {meta.touched && meta.error ? (
        <small className="text-sm text-red-600">{meta.error}</small>
      ) : null}
    </div>
  );
}

export default PhoneNumberInput;
