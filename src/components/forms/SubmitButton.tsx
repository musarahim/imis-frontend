import { ArrowRightIcon } from "@heroicons/react/24/solid"
import Spinner from "../Spinner"
import { Button } from "../ui/button"
interface Props {
    isLoading: boolean,
    title : string,
    className?: string
    }

function SubmitButton({isLoading, title, className}: Props) {
  return (
    <Button
  type="submit"
  className={
    className
      
  }
>
                       {isLoading ? (
    <Spinner md />
) : (
    <>
        {title}
        <ArrowRightIcon className="ml-5 h-5 w-5 text-white text-lg relative transition-all right-0 group-hover:-right-1" aria-hidden="true" />
    </>
)}
                    </Button>
  )
}

export default SubmitButton