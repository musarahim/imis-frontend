"use client"
import { useCreateIntrimAuthorityMutation } from "@/redux/features/license-api-slice";
import { fileToBase64 } from "@/utils";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface IntrimAuthority {
  name: string;
  acroynm: string;
  postal_address: string;
  website: string;
  landline: string;
  phone: string;
  region: string;
  district: string;
  location: string;
  has_title_deed: boolean;
  title_deed: string;
  names_of_promoters: string;
  vision: string;
  mission: string;
  objectives: string;
  philosophy: string;
  governance_structure: string;
  human_resources: string;
  source_of_finance: string;
  action_plan: string;
  infrastructure: string;
  programmes: string | File;
  promoters: string;
  project_proposal: string;
}

function usePostIntrimAuthority() {
    const [create, {isLoading}] = useCreateIntrimAuthorityMutation();
    const router = useRouter();
    
    const initialValues = {
      name: "",
      acroynm: "",
      postal_address: "",
      website: "",
      landline: "",
      phone: "",
      region: "",
      district: "",
      location: "", 
      has_title_deed: false,
      title_deed: "",
      names_of_promoters: "",
      vision: "",
      mission: "",
      objectives: "",
      philosophy: "",
      governance_structure: "",
      human_resources: "",
      source_of_finance: "",
      action_plan: "",
      infrastructure: "",
      programmes: "",
      promoters: "",
      project_proposal: "",
    };
    const stepAInitialValues = {
      name: "",
      acroynm: "",
      postal_address: "",
      website: "",
      landline: "",
      phone: "",
      region: "",
      district: "",
      location: ""
    }
     const stepAValidation = {
        name: Yup.string().required("Institution name is required"),
        acroynm: Yup.string().required("Acronym is required"),
        postal_address: Yup.string().required("Post address is required"),
        website: Yup.string().url("Invalid website Link").required("Website is required"),
        landline: Yup.string().required("Landline is required"),
        phone: Yup.string().required("Phone number is required"),
    }

    const validationSchema : Record<string, Yup.AnyObjectSchema> = {A:Yup.object({

        name: Yup.string().required("Institution name is required"),
        acroynm: Yup.string().required("Acronym is required"),
        postal_address: Yup.string().required("Post address is required"),
        website: Yup.string().url("Invalid website Link").required("Website is required"),
        landline: Yup.string().required("Landline is required"),
        phone: Yup.string().required("Phone number is required"),
    }),
    B: Yup.object({
      district: Yup.string().required("District is required").notOneOf([''], 'Please select an option'),
      region: Yup.string().required("Region is required").notOneOf([''], 'Please select an option'),
      location: Yup.string().required("Location is required").notOneOf([''], 'Please select an option'),
      has_title_deed: Yup.string().required("Has title deed is required").notOneOf([''], 'Please select an option'),
      title_deed: Yup.string().when('has_title_deed', {
    is: (val:boolean) => val === true, // ensure it only runs when strictly true
    then: (schema) => schema.required('Title deed is required when "Has title deed" is yes'),
    otherwise: (schema) => schema.notRequired(),
  }),
      names_of_promoters: Yup.string().required("Names of promoters is required"),
      }),


      C: Yup.object({
        vision: Yup.string().required("Vision is required"),
        mission: Yup.string().required("Mission is required"),
        objectives: Yup.string().required("Objectives is required"),
        philosophy: Yup.string().required("Philosophy is required"),
        governance_structure: Yup.string().required("Governance structure is required"),
        human_resources: Yup.string().required("Human resources is required"),
        source_of_finance: Yup.string().required("Source of finance is required"),
        action_plan: Yup.string().required("Action plan is required"),
        infrastructure: Yup.string().required("Infrastructure is required"),
        promoters: Yup.string().required("Promoters is required"),
        project_proposal: Yup.string().required("Project proposal is required"),
        programmes: Yup.mixed().required('programmes are required')
        .test('fileType', 'Unsupported file format', (value) => {
          // Custom test for file type (e.g., JPEG, PNG)
          if (!value) return true; // Allow empty if not required
          if (value instanceof File) {
            return ['pdf'].includes(value.type);
          }
          return false;
        })
        .test('fileSize', 'File too large', (value) => {
          // Custom test for file size (e.g., less than 2MB)
          if (!value) return true;
          if (value instanceof File) {
            return value.size <= 3000000; // 3 MB
          }
          return false;
        }),
     
      }),

    }
    
    const onSubmit = async (values: IntrimAuthority) => {
      console.log(values);
      let logoBase64 = values.programmes;

      if(values.programmes instanceof File) {
        logoBase64 = await fileToBase64(values.programmes);
      }
      const destructured_object = {
        ...values,
        programmes: logoBase64
      }
      
      // Convert object to FormData
      const formData = new FormData();
      Object.entries(destructured_object).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      
      try {
    await create(formData).unwrap();
    toast.success("Application submitted successful");
    router.push("/intrim-authority");
  } catch (err) {
    console.error("Application submission failed:", err);
    toast.error("Application submission failed, please try again.");
  }
};
  
  return {
    isLoading,
    initialValues,
    validationSchema,
    onSubmit,
    stepAValidation,
stepAInitialValues
  }
}

export default usePostIntrimAuthority;