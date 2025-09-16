"use client"
import { useRegisterMutation } from "@/redux/features/authApiSlice";
import { useGetDistrictsQuery } from "@/redux/features/commonApiSlice";
import { fileToBase64 } from "@/utils";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

function useRegistration() {
    const [register, { isLoading }] = useRegisterMutation();
    const { data: districts } = useGetDistrictsQuery();
    const districtOptions = districts?.map((district) => ({
      value: district.id,
      label: district.name,
    }))
    const router = useRouter();
    
    const initialValues = {
      email: "",
      alternative_email: "",
      username: "",
      phone: "",
      alternative_phone_number: "",
      password: "",
      re_password: "",
      name: "",
      district: "",
      institution_type: "",
      landline: "",
      contact_person: "",
      contact_person_phone: "",
    alternative_contact_person: "",
    alternative_contact_person_phone: "",
    logo: "",
    };
    const validationSchema : Record<string, Yup.AnyObjectSchema> = {A:Yup.object({

        name: Yup.string().required("Institution name is required"),
        district: Yup.string().required("District is required").notOneOf([''], 'Please select an option'),
        institution_type: Yup.string().required("Institution type is required").notOneOf([''], 'Please select an option'),
        phone: Yup.string().required("Phone number is required"),
        landline: Yup.string().required("Landline is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        alternative_email: Yup.string()
        .email("Invalid email")
        .required("Alternative email is required")
        .notOneOf([Yup.ref('email')], "Alternative email must be different from primary email"),
      
    }),
    B: Yup.object({
      
     
      alternative_phone_number: Yup.string(),
      contact_person: Yup.string().required("Contact person is required"),
        contact_person_phone: Yup.string().required("Contact person's phone is required"),
        alternative_contact_person: Yup.string().required("Alternative contact person is required"),
        alternative_contact_person_phone: Yup.string().required("Alternative contact person's phone is required"),
        
       
      }),

      C: Yup.object({
        logo: Yup.mixed().required('Image is required')
        .test('fileType', 'Unsupported file format', (value) => {
          // Custom test for file type (e.g., JPEG, PNG)
          if (!value) return true; // Allow empty if not required
          if (value instanceof File) {
            return ['image/jpeg', 'image/png'].includes(value.type);
          }
          return false;
        })
        .test('fileSize', 'File too large', (value) => {
          // Custom test for file size (e.g., less than 2MB)
          if (!value) return true;
          if (value instanceof File) {
            return value.size <= 1000000; // 1 MB
          }
          return false;
        }),
        username: Yup.string().required("Username is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
        re_password: Yup.string()
          .oneOf([Yup.ref('password'), undefined], "Passwords must match")
          .required("Confirm password is required"),
      }),

    }
    
    const onSubmit = async (values: InstitutionForm) => {
      console.log(values.logo);
      let logoBase64 = values.logo;

      if(values.logo instanceof File) {
        logoBase64 = await fileToBase64(values.logo);
      }
      const destructured_object = {
        email:values.email,
        username: values.username,
        phone: values.phone,
        alternative_phone_number: values.alternative_phone_number,
        password: values.password,
        re_password: values.re_password,
        institution:{
        name: values.name,
        alternative_email:values.alternative_email,
        district: values.district,
        institution_type: values.institution_type,
        landline: values.landline,
        contact_person:  values.contact_person,
        contact_person_phone: values.contact_person_phone,
        alternative_contact_person: values.alternative_contact_person,
        alternative_contact_person_phone: values.alternative_contact_person_phone,
        logo: logoBase64, 
        }
      }
      try {
    await register(destructured_object).unwrap();
    toast.success("Registration successful");
    router.push("/auth/login");
  } catch (err) {
    console.error("Registration failed:", err);
    toast.error("Registration failed");
  }
};
  
  return {
    isLoading,
    initialValues,
    validationSchema,
    onSubmit,
    districtOptions
  }
}

export default useRegistration;