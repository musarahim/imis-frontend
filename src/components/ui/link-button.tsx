import Link from 'next/link';
import { Button } from './button';

interface LinkButtonProps {
  href: string;
  linkText?: string;
}

function LinkButton({href, linkText}: LinkButtonProps) {
  return (
     <Button asChild>
      <Link href={href}>{linkText}</Link>
    </Button>
  )
}

export { LinkButton };
