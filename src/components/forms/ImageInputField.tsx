import { useField, useFormikContext } from 'formik';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface ImageUploaderProps {
  className?: string;
  label?: string;
  name: string;
}

function ImageInputField({ className, label, name }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext<unknown>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (field.value && typeof field.value !== "string") {
      const url = URL.createObjectURL(field.value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [field.value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue(name, file);
    }
  };

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
    className={`relative border-2 border-dashed border-gray-300 rounded-lg p-2 text-center cursor-pointer
                hover:bg-gray-50 hover:border-sky-400 transition-colors duration-300 dark:hover:bg-gray-800
                flex items-center justify-center max-w-32 h-32 ${className}`}
    onClick={handleBoxClick}
  >
    {/* Hidden file input */}
    <input
      type="file"
      ref={fileInputRef}
      onChange={handleFileChange}
      accept="image/*"
      className="hidden"
    />

    {previewUrl ? (
      <div className="relative w-28 h-28 mx-auto">
        <Image
      src={previewUrl}
      alt="Image Preview"
      width={500}
      height={500}
      sizes="112px"
      style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
      className="rounded-md"
    />
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 mb-1 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <p className="text-xs font-medium">{label}</p>
        <p className="text-xs text-gray-400 mt-1">PNG, JPG to 1MB</p>
      </div>
    )}
    {meta.touched && meta.error ? (
      <small className="absolute left-0 bottom-0 text-xs text-red-600">{meta.error}</small>
    ) : null}
  </div>
  );
}

export default ImageInputField;