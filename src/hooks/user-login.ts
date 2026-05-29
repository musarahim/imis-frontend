"use client";
import { useLoginMutation } from "@/redux/features/authApiSlice";
import { setAuth } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

function Uselogin() {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const intialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = (values: LoginUser) => {
    // event.preventDefault();

    login(values)
      .unwrap()
      .then(() => {
        dispatch(setAuth());
        router.push("/dashboard");
        toast.success("Login successful");
      })
      .catch(() => {
        //toast.error(err.data.detail)
        toast.error("Incorrect username or password");
      });
  };

  return {
    onSubmit,
    intialValues,
    isLoading,
    validationSchema,
  };
}

export default Uselogin;
