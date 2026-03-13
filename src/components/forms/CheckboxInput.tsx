"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useField, useFormikContext } from "formik";
import { Label } from "../ui/label";

interface CheckboxInputProps {
  name: string;
  label: string;
  required?: boolean;
  id?: string;
}

function CheckboxInput({ name, label, id }: CheckboxInputProps) {
  const [field, meta] = useField<boolean>(name);
  const { setFieldValue, setFieldTouched } =
    useFormikContext<Record<string, unknown>>();
  type CheckedState = boolean | "indeterminate";
  const checkboxId = id || name;

  return (
    <div>
      <div className="flex items-center gap-2">
        <Checkbox
          id={checkboxId}
          checked={!!field.value}
          onCheckedChange={(checked: CheckedState) => {
            setFieldValue(name, checked === true);
          }}
          onBlur={() => setFieldTouched(name, true)}
        />
        <Label htmlFor={checkboxId}>{label}</Label>
      </div>

      {meta.touched && meta.error ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default CheckboxInput;
