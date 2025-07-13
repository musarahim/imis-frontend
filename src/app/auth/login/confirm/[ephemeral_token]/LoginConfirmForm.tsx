"use client";
import { AppForm as Form, InputField, SubmitButton } from '@/components/forms';
import { UseLoginConfirm } from '@/hooks';
import Link from 'next/link';

interface Props{
    ephemeral_token:string
}
const LoginConfirmForm: React.FC<Props> = ({ ephemeral_token }) => {
    const { onSubmit, intialValues, isLoading,validationSchema } = UseLoginConfirm(ephemeral_token);

  return (
    <Form initialValues={intialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    <InputField
      name="code"
      label="Code"
      type="text"
      Id='id_code'
      required
    />
     <p className="mt-3 mb-2 text-sm leading-6 text-right text-gray-500 dark:text-gray-100">
     Token is invalid or expired?{' '}
            <Link href="/auth/login" className="font-semibold text-green-600 hover:text-green-500">
             Login
            </Link>
          </p>
    <SubmitButton isLoading={isLoading} title="Submit" />
  </Form>
  )
}

export default LoginConfirmForm