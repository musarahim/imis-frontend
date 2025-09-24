import Link from 'next/link';
import { Badge } from './badge';

interface LinkAsBadgeProps {
  href: string;
  text: string;
  className?: string;
}
function LinkAsBadge({href, text, className}: LinkAsBadgeProps) {
  return (
     <Badge asChild  className={`${className}`}>
      <Link href={href}>{text}</Link>
    </Badge>
  )
}

export { LinkAsBadge };
