import Link from "next/link";
import { useEffect, useState } from "react";

export interface FileDisplayInfo {
  filename: string | null;
  href: string | null;
  isClickable: boolean;
}

export function useFileDisplay(file: string | File | null | undefined): FileDisplayInfo {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      setObjectUrl(url);
      return () => {
        URL.revokeObjectURL(url);
        setObjectUrl(null);
      };
    } else {
      setObjectUrl(null);
    }
  }, [file]);

  if (!file) {
    return { filename: null, href: null, isClickable: false };
  }

  if (file instanceof File) {
    return {
      filename: file.name,
      href: objectUrl,
      isClickable: !!objectUrl,
    };
  }

  if (typeof file === "string") {
    // Check if it's a URL or file path
    const isUrl = /^(https?:\/\/|\/|blob:)/i.test(file);
    const filename = file.split("/").pop() || file;
    
    return {
      filename,
      href: isUrl ? file : null,
      isClickable: isUrl,
    };
  }

  return {
    filename: String(file),
    href: null,
    isClickable: false,
  };
}

// Reusable component for displaying files
interface FileDisplayProps {
  file: string | File | null | undefined;
  className?: string;
  fallbackText?: string;
}

export function FileDisplay({ 
  file, 
  className = "underline text-primary-600 dark:text-primary-400",
  fallbackText = "-" 
}: FileDisplayProps) {
  const { filename, href, isClickable } = useFileDisplay(file);

  if (!filename) {
    return <span>{fallbackText}</span>;
  }

  if (isClickable && href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {filename}
      </Link>
    );
  }

  return <span>{filename}</span>;
}