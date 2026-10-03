"use client";

import { createContext, useContext, useEffect } from "react";
import { useFormikContext } from "formik";

export const FormValuesObserverContext = createContext<((values: Record<string, unknown>) => void) | null>(null);

export function FormValuesObserver() {
  const onChange = useContext(FormValuesObserverContext);
  const { values } = useFormikContext<Record<string, unknown>>();
  useEffect(() => { onChange?.(values); }, [values, onChange]);
  return null;
}
