"use client"
import { AppForm, FileField, InputField, SelectField, SubmitButton } from "@/components/forms";
import { useCreateProvisionalLicenseMutation, usePatchProvisionalLicenseMutation, useRetrieveProvisionalLicenseQuery } from "@/redux/features/license-api-slice";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import * as Yup from "yup";
type StepBProps = {
  onNext: (data?: any) => void;
  onBack: () => void;
  id?:number
}
type FormValues = { 
    amount_of_land :number
    land_title :string | File,
    land_in_use :number,
    land_for_future_use :number,
    year_obtained :string,
    leased_or_rented :string,
    lease_or_rent_agreement :string | File,
}
const options = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
]
const rent_lease_options = [
    { label: "Rent", value: "rent" },
    { label: "Lease", value: "lease" },
]
function StepB({ onNext, onBack, id }: StepBProps) {
  const [createProvisionalLicense, { isLoading: isCreating }] = useCreateProvisionalLicenseMutation();
  const [patchIntrimAuthority, { isLoading: isPatching }] = usePatchProvisionalLicenseMutation();
  //fetch initial values if id is provided
  const { data: initialValues } = useRetrieveProvisionalLicenseQuery(id ?? skipToken);
  const isLoading = isCreating || isPatching;

  const stepBInitialValues: FormValues = {
        amount_of_land: initialValues?.amount_of_land || 0,
        land_title: initialValues?.land_title ?? "",
        land_in_use: initialValues?.land_in_use || 0,
        land_for_future_use: initialValues?.land_for_future_use || 0,
        year_obtained: initialValues?.year_obtained || "",
        leased_or_rented: initialValues?.leased_or_rented || "",
        lease_or_rent_agreement: initialValues?.lease_or_rent_agreement ?? "",
      }
  const stepBValidation = Yup.object({
        amount_of_land: Yup.number().required("This field is required").min(0, "Amount of land cannot be negative"),
        land_title: Yup.mixed().required("Please attach the land title deed"),
        land_in_use: Yup.number().required("This field is required").min(0, "Land in use cannot be negative"),
        land_for_future_use: Yup.number().required("This field is required").min(0, "Land for future use cannot be negative"),
        year_obtained: Yup.string().required("This field is required"),
        leased_or_rented: Yup.string().required("This field is required"),
       lease_or_rent_agreement: Yup.mixed().when('leased_or_rented', (leased_or_rented: any, schema: any) => {
        return (leased_or_rented === "rent" || leased_or_rented === "lease")
          ? schema.required('Please attach the lease or rent agreement')
          : schema.notRequired();
       }),
  });
  const onSubmit = async (values: FormValues) => {
        const formData = new FormData();
        formData.append('amount_of_land', String(values.amount_of_land));
        if (values.land_title instanceof File) {
          formData.append('land_title', values.land_title);
        }
        formData.append('land_in_use', String(values.land_in_use));
        formData.append('land_for_future_use', String(values.land_for_future_use));
        formData.append('year_obtained', String(values.year_obtained));
        formData.append('leased_or_rented', values.leased_or_rented);
        if (values.lease_or_rent_agreement instanceof File) {
          formData.append('lease_or_rent_agreement', values.lease_or_rent_agreement);
        } else {
          // If user explicitly removed an existing file, signal backend to remove it
          // (FileField should set the form value to null when user clicks Remove)
          if (values.lease_or_rent_agreement === null && initialValues?.lease_or_rent_agreement) {
            formData.append('lease_or_rent_agreement_remove', '1');
          }
          // If values.lease_or_rent_agreement is a string (existing URL/name), do nothing -> backend keeps existing file
        }
        
          try {
            let res;
            if (id) {
              res = await patchIntrimAuthority({ id, data: formData }).unwrap();
            } else {
              res = await createProvisionalLicense(formData).unwrap();
            }
            if (res) {
                   onNext(res); // pass response object back to parent
                 } else {
                   toast.error("No response from server");
                 }
               } catch (err) {
                 console.error(err);
                 toast.error("Error submitting details, please try again later");
               }
  };
      const handlePreviousStep = () => {
          onBack();
      };
  return (
     <AppForm initialValues={stepBInitialValues} onSubmit={onSubmit} validationSchema={stepBValidation} onError={() => toast.error("Please fix the errors in the form")}>
        <div className="border-t  border-gray-900/10  dark:border-gray-400">
      <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">LOCATION AND LAND</h2>
    </div>
    <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
   
     <div className="sm:col-span-full">
      <InputField name="amount_of_land" label="The amount of land owned by the proposed university (in acres)" type="number" required />
     </div>
      <div className="sm:col-span-full">
      <FileField name="land_title" label="Please attach a copy of the land title" required />
     </div>
      <div className="sm:col-span-3">
      <InputField name="land_in_use" label="Amount of land currently in use (in acres)" type="number" required />
     </div>
      <div className="sm:col-span-3">
      <InputField name="land_for_future_use" label="Amount of land reserved for future use (in acres)" type="number" required />
     </div>
      <div className="sm:col-span-3">
      <InputField name="year_obtained" label="Year(s) when all above piece(s) of land was/were acquired" type="text" required />
     </div>
      <div className="sm:col-span-3">
        <SelectField name="leased_or_rented" label="Is the land leased/rented or owned?" options={rent_lease_options} required />
     </div>
      <div className="sm:col-span-full">
      <FileField name="lease_or_rent_agreement" label="Attach lease or rent agreement"  />
     </div>
            

    </div>
         <div className="mt-6 flex items-center justify-end gap-x-6">
                      
                          <button type="button" className="rounded-md flex  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-red-500" onClick={handlePreviousStep}>
                              Previous
                          </button>
                  
                         
                          <SubmitButton isLoading={isLoading} title="Save & Continue" className="rounded-md flex min-w-32  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-sky-600"/>
                     
                     
          
                      </div>

     </AppForm>
  )
}

export default StepB