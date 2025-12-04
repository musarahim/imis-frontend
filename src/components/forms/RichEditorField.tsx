"use client";

import { Editor } from "@hugerte/hugerte-react"; // if you're actually using TinyMCE: '@tinymce/tinymce-react'
import { useField } from "formik";
import { useEffect, useMemo, useRef } from "react";

type Props = {
  name: string;
  label: string;
  required?: boolean;
  height?: number;
};

export default function RichEditorField({
  name,
  label,
  required,
  height = 300,
}: Props) {
  const [field, meta, helpers] = useField<string>(name);
  const { setValue, setTouched } = helpers;

  const editorRef = useRef<{ getContent: () => string; setContent: (content: string) => void } | null>(null);

  // Only compute once on mount so the editor can manage its own state afterward.
  const initial = useMemo(() => (field.value ?? "") as string, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEditorChange = (content: string) => {
    if (content !== field.value) {
      setValue(content, true); // mark as touched/validate on change
    }
  };

  const handleBlur = () => {
    setTouched(true, true);
  };

  // If Formik value changes externally (e.g., resetForm), push it into the editor.
  useEffect(() => {
    const ed = editorRef.current;
    if (!ed || typeof ed.getContent !== "function" || typeof ed.setContent !== "function") return;

    const current = ed.getContent() ?? "";
    const next = (field.value ?? "") as string;
    if (current !== next) {
      ed.setContent(next);
    }
  }, [field.value]);
  const isDark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm/6 font-medium text-gray-900 dark:text-gray-50 mb-2"
      >
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
    <div className="rounded-md border border-input dark:bg-gray-900 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition">
      <Editor
        key={name}                 // tie this instance to the specific field
        id={name}
        onInit={(_, editor) => {
          editorRef.current = editor;
        }}
        initialValue={initial}     // load once; DO NOT pass a `value` prop
        onEditorChange={handleEditorChange}
        onBlur={handleBlur}
        //TODO:fix dark mode color
          init={{
    height,
    menubar: false,
    plugins:
      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
    toolbar:
      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
    skin: isDark ? "oxide-dark" : "oxide",
    content_css: isDark ? "dark" : "default",
    content_style: `
      /* ShadCN / Tailwind style override */
      body {
        font-family: var(--font-sans, system-ui);
        color: hsl(var(--foreground)) dark:hsl(var(--foreground));
        background-color: hsl(var(--background));
        line-height: 1.6;
        padding: 0.75rem;
      }

      p, li, td {
        color: hsl(var(--foreground));
      }

      a {
        color: hsl(var(--primary));
        text-decoration: underline;
      }

      strong {
        color: hsl(var(--foreground));
        font-weight: 600;
      }

      h1, h2, h3, h4, h5, h6 {
        color: hsl(var(--foreground));
        font-weight: 600;
      }
    `,
  }}
      />
</div>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
}
