import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { ReactNode } from "react";
import * as Yup from "yup";

interface FormikWrapperProps<T extends FormikValues = FormikValues> {
  initialValues: T;
  validationSchema: Yup.ObjectSchema<Record<string, unknown>>; // Replaced `any` with `Record<string, unknown>`
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<void>;
  onError?: () => void;
  children: ReactNode;
}

export default function FormikWrapper<T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  onError,
}: FormikWrapperProps<T>) {
  return (
    <Formik<T>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
      
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}  className="space-y-4"  encType="multipart/form-data">
          {children}
        </Form>
      )}
    </Formik>
  );
}