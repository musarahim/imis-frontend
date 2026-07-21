"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useField } from "formik";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  name: string;
  label: string;
  required?: boolean;
};

function toYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseYMD(value: string): Date | undefined {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return undefined;
  const date = new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
  );
  return isNaN(date.getTime()) ? undefined : date;
}

function DatePicker({ name, label, required }: Props) {
  const [field, meta, helpers] = useField(name);
  const [open, setOpen] = useState(false);
  const currentDate = field.value ? parseYMD(String(field.value)) : undefined;
  const [month, setMonth] = useState<Date>(currentDate ?? new Date());

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={name} className="px-1">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </Label>
      <div className="relative flex gap-2">
        <Input
          id={name}
          name={field.name}
          value={field.value ? String(field.value) : ""}
          placeholder="YYYY-MM-DD"
          className="bg-background pr-10"
          onChange={(e) => {
            const inputValue = e.target.value;
            helpers.setValue(inputValue);
            const parsed = parseYMD(inputValue);
            if (parsed) setMonth(parsed);
          }}
          onBlur={field.onBlur}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
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
              fromYear={1900}
              toYear={new Date().getFullYear() + 10}
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                if (date) {
                  helpers.setValue(toYMD(date));
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
  );
}

export default DatePicker;
