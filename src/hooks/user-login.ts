"use client"
import { useLoginMutation } from "@/redux/features/authApiSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from 'yup';

function Uselogin() {
    const [login, {isLoading}] = useLoginMutation()
    const router = useRouter()
    
    
    const intialValues = {
      username: '',
      password: '',
    
    }
    const validationSchema = Yup.object({
      username: Yup.string().email().required('Username is required'),
      password: Yup.string().required('Password is required'),
    })
  
  
    const onSubmit = (values: LoginUser) => {
     // event.preventDefault();
  
      login(values).unwrap().then((res) => {
      
        router.push(`/auth/login/confirm/${res.ephemeral_token}`)
        toast.success("Please check email for verification code")
        
      }
      ).catch(() => {
        //toast.error(err.data.detail)
        toast.error("Incorrect username or password")
      })
     
    }
  
    
  return{
    onSubmit,
    intialValues,
    isLoading,
    validationSchema
  }
}

export default Uselogin