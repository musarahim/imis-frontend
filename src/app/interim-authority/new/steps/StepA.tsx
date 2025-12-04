"use client"
import { AppForm, InputField, PhoneNumberInput, SelectField, SubmitButton, TextAreaField } from "@/components/forms";
import { useGetDistrictsQuery, useGetRegionsQuery } from "@/redux/features/commonApiSlice";
import { useGetInstitutionsQuery, usePatchInstitutionMutation } from "@/redux/features/institution-api-slice";
import { toast } from "react-toastify";
import * as Yup from "yup";
type StepAProps = {
  onNext: () => void;
}

type FormValues = {
  name: string;
  acroynm: string;
  postal_address: string;
  website: string;
  landline: string;
  phone: string;
  location: string;
  region?: string;
  district?: string;
}
function StepA({ onNext }: StepAProps) {
  const [patchInstitution, {isLoading}] = usePatchInstitutionMutation();
  const {data: institutions, isLoading: isLoadingInstitutions} = useGetInstitutionsQuery(undefined, { refetchOnMountOrArgChange: true });
  const {data: districts} = useGetDistrictsQuery();
  const {data: regions} = useGetRegionsQuery();
  const districts_options: Option[] = (districts || []).map(opt => ({
  value: String(opt.id),
  label: opt.name,
  }));

  const regions_options: Option[] = (regions || []).map(opt => ({
  value: String(opt.id),
  label: opt.name,
}));
  

  if(isLoadingInstitutions) return <div>Loading...</div>
  const institution = (institutions?.results[0])
  //get initial value of regions option
  const getRegionId = () => {
  if (!institution) return "";
  const id = regions?.find(r => r.name === institution.region)?.id; // if API gave a name
  return id ? String(id) : "";
};
 //get initial value of district options
 const getDistrictId = () => {
  if (!institution) return "";
  const id = districts?.find(d => d.name === institution.district)?.id; // if API gave a name
  return id ? String(id) : "";
}


   const stepAInitialValues = {
        name: institution?.name || "",
        acroynm: institution?.acroynm || "",
        postal_address: institution?.postal_address || "",
        website: institution?.website || "",
        landline: institution?.landline || "",
        phone: institution?.phone || "",
        location: institution?.location || "",
        region: getRegionId(), // must be a string
        district: getDistrictId(), // must be a string

      }
  const stepAValidation = Yup.object({
              name: Yup.string().required("Institution name is required"),
              acroynm: Yup.string().required("Acronym is required"),
              postal_address: Yup.string().required("Post address is required"),
              website: Yup.string().url("Invalid website Link").required("Website is required"),
              landline: Yup.string().required("Landline is required"),
              phone: Yup.string().required("Phone number is required"),
              location: Yup.string().required("Location is required"),
              district: Yup.string().required("District is required").notOneOf([''], 'Please select an option'),
              region: Yup.string().required("Region is required").notOneOf([''], 'Please select an option'),
  });
  
  

   const onSubmit = async (values: FormValues) => {
        
         await patchInstitution({id: institution?.id as number, data: {
            ...values
         }}).unwrap().then((res) => {
          console.log(res);
          onNext();
         }).catch((err) => {
          console.log(err);
          toast.error("Error updating institution details");
         });
    };  
  return (
    <AppForm initialValues={stepAInitialValues} onSubmit={onSubmit} validationSchema={stepAValidation} >
     <div className="border-t  border-gray-900/10  dark:border-gray-400">
      <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">Institute Details</h2>
      </div>
    <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <InputField name="name" label="Proposed Name of the Institution" required />
              
        </div>
        <div className="sm:col-span-3">
        
        <InputField name="acroynm" label="Acronym" required />
        </div>
        <div className="sm:col-span-3">
        
        <InputField name="postal_address" label="Postal Address" required />
        </div>
         <div className="sm:col-span-3">
        
        <InputField name="website" label="Website Address" required />
        </div>
    
         <div className="sm:col-span-3">
        
        <PhoneNumberInput name="landline" label="Landline" required />
        </div>
         <div className="sm:col-span-3">
        
        <PhoneNumberInput name="phone" label="Mobile" required />
        </div>
          <div className="sm:col-span-3">
            <SelectField
              name="region"
              label="Region"
              required
              options={regions_options}
            />
          </div>
          <div className="sm:col-span-3">
            <SelectField
              name="district"
              label="District"
              required
              options={districts_options}
            />
          </div>
           <div className="sm:col-span-full">
        
        <TextAreaField name="location" type="text" label="Location of the Institution"  required />
        </div>


      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6 border-t  border-gray-900/10  dark:border-gray-400">
             
           <SubmitButton isLoading={isLoading} title="Save & Continue" className="rounded-md flex min-w-32  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-sky-500"/>
            </div>
     </AppForm>
   
  )
}

export default StepA