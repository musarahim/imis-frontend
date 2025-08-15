import { ImageField, InputField, PasswordInput, SubmitButton } from "@/components/forms";
import { useRegistration } from "@/hooks";
type StepCProps = {
  onBack: () => void;
}
function StepC({ onBack }: StepCProps) {
  const {  isLoading } = useRegistration();
  return (
    <>
     <div className="border-t  border-gray-900/10  dark:border-gray-400">
      <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">System Account</h2>
    </div>
    <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
      <div className="col-span-full">
        <ImageField name="logo" label="Logo"  />
        </div>
      <div className="col-span-full">
        <InputField name="username" label="Username" required />
        </div>
        
         <div className="col-span-full">
        <PasswordInput name="password" label="Password" required />
        </div>
        
            <div className="sm:col-span-full">
                <PasswordInput name="re_password" label="Confirm Password" required />
            </div>
            </div>
       <div className="mt-6 flex items-center justify-end gap-x-6">
            
                <button type="button" className="rounded-md flex  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-red-500 hover:bg-red-600" onClick={onBack}>
                    Previous
                </button>
          
           
                <SubmitButton isLoading={isLoading} className="ml-3 !w-auto btn-small"  title="Submit" />
            

            </div>
    </>
  )
}

export default StepC