
"use client";
import { AppForm as Form, InputField, SubmitButton } from '@/components/forms';
import { UsePasswordReset } from '@/hooks';
import Link from 'next/link';

function ResetPasswordForm() {
    const { onSubmit, intialValues, isLoading,validationSchema } = UsePasswordReset();

    return (
      <Form initialValues={intialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      <InputField
        name="email"
        label="Email"
        type="email"
        Id="id_email"
        required
      />
       <p className="my-3 py-3 text-sm leading-6 text-right text-gray-500">
       Remember Password?{' '}
              <Link href="/auth/login" className="font-semibold text-sky-600 hover:text-sky-500">
               Login
              </Link>
            </p>
      <SubmitButton isLoading={isLoading} title="Submit" />
    </Form>
  )
}

export default ResetPasswordForm