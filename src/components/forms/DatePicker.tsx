"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useField } from 'formik';
import { CalendarIcon } from "lucide-react";
import { useState } from 'react';

type Props = {
  name: string;
  label: string;
  required?: boolean;
};

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

function DatePicker({name, label, required}: Props) {
  const [field, meta, helpers] = useField(name);
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(field.value ? new Date(field.value) : new Date());
  
  // Get the current date value from Formik
  const currentDate = field.value ? new Date(field.value) : undefined;
  const displayValue = formatDate(currentDate);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={name} className="px-1">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </Label>
      <div className="relative flex gap-2">
        <Input
          id={name}
          name={field.name}
          value={displayValue}
          placeholder="June 01, 2025"
          className="bg-background pr-10"
          onChange={(e) => {
            const inputValue = e.target.value;
            const date = new Date(inputValue);
            
            if (isValidDate(date)) {
              helpers.setValue(date);
              setMonth(date);
            } else {
              // Allow typing but don't set invalid dates
              helpers.setValue(inputValue);
            }
          }}
          onBlur={field.onBlur}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={currentDate}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                if (date) {
                  helpers.setValue(date);
                  setMonth(date);
                }
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm px-1">{meta.error}</div>
      )}
    </div>
  )
}

export default DatePicker