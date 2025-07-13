"use client";
import { AppForm as Form, InputField, PasswordInput, SubmitButton } from "@/components/forms";
import { useLogin } from "@/hooks";
import Link from 'next/link';
function LoginForm() {
    const { onSubmit, intialValues, isLoading,validationSchema } = useLogin()
  return (
      <Form initialValues={intialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                <InputField
                    name="username"
                    label="Email"
                    required
                    type="email"
                    autoComplete="username"
                />

                  
                        <PasswordInput
                        name="password"
                        label="Password"
                        required
                        autoComplete="current-password"
                        />
                  

                  <div className="flex items-center justify-between my-3">
                    <div className="flex gap-3">
                     
                     
                    </div>

                    <div className="text-sm/6">
                      <Link href="/forgot-password" className="font-semibold text-sky-600 hover:text-sky-500">
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <SubmitButton isLoading={isLoading} title="Sign in" />
                  </div>
                </Form>
  )
}

export default LoginForm