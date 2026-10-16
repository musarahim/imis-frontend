"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";

type Props = Omit<React.ComponentProps<typeof Input>, "value" | "onChange" | "type" | "ref"> & {
  value: string;
  onValueChange: (value: string) => void;
};

export default function DeskReviewFeeInput({ value, onValueChange, ...props }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.setCustomValidity(value && !(Number(value) > 0 && Number(value) <= 90909090.90)
      ? "Enter a fee between UGX 0.01 and UGX 90,909,090.90." : "");
  }, [value]);
  const [whole, fraction] = value.split(".");
  const formatted = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (fraction === undefined ? "" : `.${fraction}`);

  return <Input {...props} ref={inputRef} type="text" inputMode="decimal" value={formatted}
    pattern="[0-9,]+(\.[0-9]{1,2})?"
    onChange={(event) => {
      const input = event.currentTarget;
      const raw = input.value.replaceAll(",", "");
      if (!/^\d*(\.\d{0,2})?$/.test(raw)) return;
      const caret = input.selectionStart ?? input.value.length;
      const charactersBeforeCaret = input.value.slice(0, caret).replaceAll(",", "").length;
      onValueChange(raw);
      // Keep the cursor beside the edited digit when grouping adds or removes commas.
      requestAnimationFrame(() => {
        let position = 0;
        let characters = 0;
        while (position < input.value.length && characters < charactersBeforeCaret) {
          if (input.value[position] !== ",") characters++;
          position++;
        }
        input.setSelectionRange(position, position);
      });
    }} />;
}
