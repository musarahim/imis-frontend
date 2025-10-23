"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useField, useFormikContext } from "formik";
import { ChevronDown, X } from "lucide-react";
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

function MultiSelectField({ name, label, required = false, options, id, placeholder }: Props) {
  const [field, meta] = useField<string[]>(name);
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();
  const [open, setOpen] = useState(false);

  const selectedValues = Array.isArray(field.value) ? field.value : [];
  
  const handleToggleOption = (optionValue: string) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(val => val !== optionValue)
      : [...selectedValues, optionValue];
    
    setFieldValue(name, newValues);
    setFieldTouched(name, true);
  };

  const handleRemoveOption = (optionValue: string) => {
    const newValues = selectedValues.filter(val => val !== optionValue);
    setFieldValue(name, newValues);
  };

  const getSelectedLabels = () => {
    return selectedValues
      .map(val => options.find(opt => opt.value === val)?.label)
      .filter(Boolean);
  };

  return (
    <div className="w-full">
      <label
        htmlFor={id ?? name}
        className="block text-sm/6 font-medium text-gray-900 dark:text-white"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="mt-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between h-auto min-h-10 p-2"
              id={id ?? name}
            >
              <div className="flex flex-wrap gap-1 flex-1">
                {selectedValues.length === 0 ? (
                  <span className="text-muted-foreground">{placeholder || "Select options..."}</span>
                ) : (
                  getSelectedLabels().map((label, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {label}
                      <X
                        className="ml-1 h-3 w-3 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          const valueToRemove = selectedValues[index];
                          handleRemoveOption(valueToRemove);
                        }}
                      />
                    </Badge>
                  ))
                )}
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          
          <PopoverContent className="w-full p-0" align="start">
            <div className="max-h-60 overflow-auto p-1">
              {options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 p-2 hover:bg-accent hover:text-accent-foreground rounded-sm cursor-pointer"
                  onClick={() => handleToggleOption(option.value)}
                >
                  <Checkbox
                    checked={selectedValues.includes(option.value)}
                    onChange={() => handleToggleOption(option.value)}
                  />
                  <span className="flex-1">{option.label}</span>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {meta.touched && meta.error ? (
        <small className="text-sm text-red-600">{meta.error}</small>
      ) : null}
    </div>
  );
}

export default MultiSelectField;