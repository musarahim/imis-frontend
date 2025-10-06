"use client";

import { Editor } from "@/components/blocks/editor-x/editor";
import { useField } from "formik";
import type { SerializedEditorState } from "lexical";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  label: string;
  required?: boolean;
  id?: string;
  children?: React.ReactNode;
};

export const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

export default function RichEditorField({ name, label,required }: Props) {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { setValue, setTouched } = helpers;

  const [serialized, setSerialized] = useState<SerializedEditorState>(initialValue);
  const [html, setHtml] = useState<string>(value || "");

  // Sync Formik value to local HTML state (e.g., on reset or external update)
  useEffect(() => {
    if (value !== html) {
      setHtml(value || "");
    }
  }, [value]);

  const handleHtmlChange = (newHtml: string) => {
    setHtml(newHtml);     // For local preview
    setValue(newHtml);    // Update Formik field
    setTouched(true);     // Mark field as touched
  };

  return (
    <div>
       <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50 mb-2">
                      {label} {required && <span className="text-red-500">*</span>}
                    </label>
      <Editor
        editorSerializedState={serialized}
        onSerializedChange={setSerialized}
        onHtmlChange={handleHtmlChange}
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
}