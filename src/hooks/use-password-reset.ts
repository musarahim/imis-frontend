
import { useResetPasswordMutation } from "@/redux/features/authApiSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from 'yup';

function UsePasswordReset() {
    const [resetPassword, {isLoading}] = useResetPasswordMutation()
    const router = useRouter()
    
    const intialValues = {
      email: '',
     
    }
    const validationSchema = Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
    })
  
  
    const onSubmit = (values: UserEmail) => {
     // event.preventDefault();
  
     resetPassword(values).unwrap().then((res) => {
       
        toast.success("Request sent successfully, please check email to reset password")
        router.push("/dashboard")
      }
      ).catch((err) => {
        toast.error("failed to send request, please try again")
      })
     
    }
  
    
  return{
    onSubmit,
    intialValues,
    isLoading,
    validationSchema
  }
}

export default UsePasswordReset