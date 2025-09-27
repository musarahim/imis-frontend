import { ArrowRightIcon } from "@heroicons/react/24/solid"
import Spinner from "../Spinner"
interface Props {
    isLoading: boolean,
    title : string,
    className?: string
    }

function SubmitButton({isLoading, title, className}: Props) {
  return (
    <button
  type="submit"
  className={
    className
      ? className
      : "flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
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
                    </button>
  )
}

export default SubmitButton