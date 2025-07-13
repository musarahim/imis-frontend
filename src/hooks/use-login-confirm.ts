
import { useTwofactorMutation } from "@/redux/features/authApiSlice";
import { setAuth } from '@/redux/features/authSlice';
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from 'yup';


type UserCode = {
    code: string,

}

function UseLoginConfirm(ephemeral_token:string) {
    const [twofactor, {isLoading}] = useTwofactorMutation()
    const router = useRouter()
    const dispatch = useAppDispatch()
    
    const intialValues = {
      code: '',
    }

    const validationSchema = Yup.object({
        code: Yup.string().required('Please enter a valid code'),
        
    })
  
  
    const onSubmit = ({code}: UserCode) => {
     // event.preventDefault();

     twofactor({ephemeral_token,code}).unwrap().then(() => {
       dispatch(setAuth())
        toast.success("Login Successful")
        router.push("/")
      }
      ).catch(() => {
        toast.error("Token is invalid or expired!")
      })
     
    }
  
    
  return{
    ephemeral_token,
    onSubmit,
    intialValues,
    isLoading,
    validationSchema
  }
}

export default UseLoginConfirm