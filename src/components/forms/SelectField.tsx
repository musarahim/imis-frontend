"use client";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useField, useFormikContext } from "formik";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

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

function SelectField({
  name,
  label,
  required = false,
  options,
  id,
  placeholder,
}: Props) {
  const [open, setOpen] = useState(false);
  const [field, meta] = useField<string>(name);
  const { setFieldValue, setFieldTouched } =
    useFormikContext<Record<string, unknown>>();

  const selectedLabel = options.find(
    (opt) => opt.value === String(field.value ?? ""),
  )?.label;

  return (
    <div className="w-full">
      <label
        htmlFor={id ?? name}
        className="block text-sm/6 font-medium text-gray-900 dark:text-white"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="mt-2">
        <Popover
          open={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) setFieldTouched(name, true, true);
          }}
        >
          <PopoverTrigger asChild>
            <Button
              id={id ?? name}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-required={required}
              aria-invalid={!!(meta.touched && meta.error)}
              className={cn(
                "w-full justify-between font-normal",
                !selectedLabel && "text-muted-foreground",
              )}
            >
              {selectedLabel ?? placeholder ?? "Select…"}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[--radix-popover-trigger-width] p-0 ">
            <Command>
              <CommandInput placeholder="Search…" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {options.map((opt) => (
                    <CommandItem
                      key={opt.value}
                      value={opt.label}
                      onSelect={() => {
                        setFieldValue(name, opt.value);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value === opt.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {opt.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {meta.touched && meta.error ? (
        <small className="text-sm text-red-600">{meta.error}</small>
      ) : null}
    </div>
  );
}

export default SelectField;
