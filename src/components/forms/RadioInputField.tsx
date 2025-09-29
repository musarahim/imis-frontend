import { ErrorMessage, useField } from "formik";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface Props {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  required?: boolean;
  id?: string;
}

function RadioInputField({ name, label, options, required, id }: Props) {
  const [field, meta, helpers] = useField<string>(name);

  return (
    <div>
      {/* For accessibility, consider a <fieldset><legend>…</legend></fieldset> pattern */}
      <Label htmlFor={id || name} className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <RadioGroup
        id={id || name}
        name={field.name}
        className="mt-2"
        value={field.value ?? ""}                 // controlled value
        onValueChange={(val) => helpers.setValue(val)} // tell Formik
        onBlur={() => helpers.setTouched(true)}   // mark touched
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
            <Label htmlFor={`${name}-${option.value}`} className="text-sm/6 text-gray-900 dark:text-gray-50">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {meta.touched && meta.error ? (
        <ErrorMessage name={name} component="div" className="text-sm text-red-600" />
      ) : null}
    </div>
  );
}

export default RadioInputField;
