"use client"
import { AppForm, FileField, InputField, SelectField, SubmitButton } from "@/components/forms";
import { useCreateProgrammeAccreditationMutation } from "@/redux/features/programme-api-slice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";
const applicationTypes = [
  { label: "New", value: "new" },
  { label: "Renewal", value: "renewal" },
];
const programmeLevels = [
    { value: 'higher_education_certificate', label: 'Higher Education Certificate' },
    { value: 'certificate', label: 'Certificate' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelor', label: 'Bachelors' },
    { value: 'post_graduate_diploma', label: 'Post Graduate Diploma' },
    { value: 'masters', label: 'Masters' },
    { value: 'phd', label: 'PhD' },
    { value: 'other', label: 'Other' },
];
function AccreditationForm() {
    const [createProgrammeAccreditation, { isLoading }] = useCreateProgrammeAccreditationMutation();
    const router = useRouter();
  const initialValues = {
    application_type: "",
    programme_level: "",
    programme_name: "",
    duration_semester: 0,
    campus: "",
    programme_structure: "" as string | File,
    letter_of_submission: "" as string | File
  }
  const validation = Yup.object().shape({
    application_type: Yup.string().required("Application Type is required"),
    programme_level: Yup.string().required("Programme Level is required"),
    programme_name: Yup.string().required("Programme Name is required"),
    duration_semester: Yup.number().required("Duration Semester is required").min(1, "Must be at least 1 semester"),
    campus: Yup.string().required("Campus is required"),
    programme_structure: Yup.mixed().required("Programme Structure is required"),
    letter_of_submission: Yup.mixed().required("Letter of Submission is required"),
  });
  const onSubmit = async (values: typeof initialValues) => {
    const formData = new FormData();
    formData.append('application_type', values.application_type);
    formData.append('programme_level', values.programme_level);
    formData.append('programme_name', values.programme_name);
    formData.append('duration_semester', String(values.duration_semester));
    formData.append('campus', values.campus);
    if (values.programme_structure instanceof File) {
      formData.append('programme_structure', values.programme_structure);
    }
    if (values.letter_of_submission instanceof File) {
      formData.append('letter_of_submission', values.letter_of_submission);
    }

    await createProgrammeAccreditation(formData)
      .unwrap()
      .then(() => {
        toast.success("Programme Accreditation Application created successfully");
        
        router.push("/accreditation-applications");
      })
      .catch((err) => {
        console.error("Error creating Programme Accreditation Application:", err);
        toast.error("Error creating Programme Accreditation Application");
      });
  };
  return (
    <AppForm initialValues={initialValues} onSubmit={onSubmit} validationSchema={validation} >
        {/* Form fields go here */}
         <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <InputField name="programme_name" label="Programme Name" required />
                      
                </div>              
                <div className="sm:col-span-3">
                <SelectField name="application_type" label="Application Type" required options={applicationTypes} />
                </div>
                <div className="sm:col-span-3">
                <SelectField name="programme_level" label="Programme Level" required options={programmeLevels} />
                </div>
                <div className="sm:col-span-3">
                <InputField name="duration_semester" label="Duration of the Programme (in semesters)" required type="number" />
                      
                </div>                
                <div className="sm:col-span-3">
                <InputField name="campus" label="Campus where Programme is to be run" required />
                      
                </div>
                <div className="sm:col-span-full">
                  <FileField name="programme_structure" label="Programme Structure" required />
                </div>
                <div className="sm:col-span-full">
                  <FileField name="letter_of_submission" label="Letter of Submission" required />
                  </div>

                </div>
                 <div className="mt-6 flex items-center justify-end gap-x-6">

                                          <SubmitButton isLoading={isLoading} title="Submit" className="rounded-md flex min-w-32  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-sky-600"/>
                                      </div>
    </AppForm>
  )
}

export default AccreditationForm