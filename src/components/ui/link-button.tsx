import Link from "next/link";
import { Button } from "./button";

interface LinkButtonProps {
  href?: string;
  linkText?: string;
}

const getSafeHref = (href?: string) =>
  typeof href === "string" && href.trim().length > 0 ? href : "#";

function LinkButton({ href, linkText }: LinkButtonProps) {
  return (
    <Button asChild>
      <Link href={getSafeHref(href)}>{linkText}</Link>
    </Button>
  );
}

export { LinkButton };
