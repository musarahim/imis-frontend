import cn from 'classnames';
import { ImSpinner9 } from "react-icons/im";
interface Props {
	sm?: boolean;
	md?: boolean;
	lg?: boolean;
}

function Spinner({ sm, md, lg }: Props) {
    const className = cn('animate-spin text-white-300 fill-white-300 mr-2', {
		'w-4 h-4': sm,
		'w-6 h-6': md,
		'w-8 h-8': lg,
	});
  return (
    <div role='status'>
    <ImSpinner9 className={className} />
    <span className='sr-only'>Loading...</span>
</div>
  )
}

export default Spinner