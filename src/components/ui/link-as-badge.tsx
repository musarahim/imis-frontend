import Link from "next/link";
import { ReactNode } from "react";
import { Badge } from "./badge";

interface LinkAsBadgeProps {
  href?: string;
  text?: string;
  children?: ReactNode;
  className?: string;
}

const getSafeHref = (href?: string) =>
  typeof href === "string" && href.trim().length > 0 ? href : "#";

function LinkAsBadge({ href, text, children, className }: LinkAsBadgeProps) {
  const linkLabel = children ?? text ?? "";

  return (
    <Badge asChild className={`${className}`}>
      <Link href={getSafeHref(href)}>{linkLabel}</Link>
    </Badge>
  );
}

export { LinkAsBadge };
