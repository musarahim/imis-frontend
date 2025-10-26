"use client";
import { AppForm, InputField, MultiSelectField, SelectField, SubmitButton, TextAreaField } from "@/components/forms";
import { usePatchProvisionalLicenseMutation } from "@/redux/features/license-api-slice";
import { toast } from "react-toastify";
import * as Yup from "yup";
type StepCProps = {
  onBack: () => void;
  onNext: (data?: any) => void;
  data?: UniversityProvisionalLicense;
};

type FormValues = {
    library_books: number | 0;
    text_books: number | 0;
    publication_years: number[] | [];
    computers_in_use: number | 0;
    computers_in_library: number | 0;
    academic_staff_computers: number | 0;
    administrative_staff_computers: number | 0;
    library_computer_software: string;
    students_have_access: boolean | false;
    has_internet_access: boolean | false;
    library_seats: number | 0;
    classroom_seats: number | 0;
    laboratories_seats: number | 0;
    administration_block_seats: number | 0;
    student_facilities: string | "";
};
const publicationYearOptions = Array.from({ length: 30 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
});

const yes_no_options = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

function StepD({ onBack, onNext, data }: StepCProps) {
  const [patchProvisionalLicense, { isLoading }] =
    usePatchProvisionalLicenseMutation();

  const stepDInitialValues = {
    library_books: data?.library_books || 0,
    text_books: data?.text_books || 0,
    publication_years: data?.publication_years
      ? data.publication_years.map((item) => item?.year).filter(year => year !== undefined && year !== null)
      : [],
    computers_in_use: data?.computers_in_use || 0,
    computers_in_library: data?.computers_in_library || 0,
    academic_staff_computers: data?.academic_staff_computers || 0,
    administrative_staff_computers: data?.administrative_staff_computers || 0,
    library_computer_software: data?.library_computer_software || "",
    students_have_access: data?.students_have_access || false,
    has_internet_access: data?.has_internet_access || false,
    library_seats: data?.library_seats || 0,
    classroom_seats: data?.classroom_seats || 0,
    laboratories_seats: data?.laboratories_seats || 0,
    administration_block_seats: data?.administration_block_seats || 0,
    student_facilities: data?.student_facilities || "",
  };

  const stepDValidation = Yup.object().shape({
    library_books: Yup.number()
      .min(0, "Must be at least 0")
      .required("Total number of Library books is required"),
    text_books: Yup.number()
      .min(0, "Must be at least 0")
      .required("Total number of textbooks is required"),
    publication_years: Yup.array()
      .of(Yup.number())
      .min(1, "Select at least one publication year")
      .required("Publication years are required"),
    computers_in_use: Yup.number()
      .min(0, "Must be at least 0")
      .required("Total number of computers for student use is required"),
    computers_in_library: Yup.number()
      .min(0, "Must be at least 0")
      .required("Total number of computers in the Library is required"),
    academic_staff_computers: Yup.number()
      .min(0, "Must be at least 0")
      .required("Total number of computers for academic staff use is required"),
    administrative_staff_computers: Yup.number()
      .min(0, "Must be at least 0")
      .required("Total number of computers for administration is required"),
    library_computer_software: Yup.string()
      .required("Library computer software is required"),
    students_have_access: Yup.boolean().required(
      "Please specify if students have access"
    ),
    has_internet_access: Yup.boolean().required(
      "Please specify if there is internet access"
    ),
    library_seats: Yup.number()
      .min(0, "Must be at least 0")
      .required("Number of library seats is required"),
    classroom_seats: Yup.number()
      .min(0, "Must be at least 0")
      .required("Number of classroom seats is required"),
    laboratories_seats: Yup.number()
      .min(0, "Must be at least 0")
      .required("Number of laboratories seats is required"),
    administration_block_seats: Yup.number()
      .min(0, "Must be at least 0")
      .required("Number of administration block seats is required"),
    student_facilities: Yup.string().required(
      "Student facilities description is required"
    ),
  });

  const onSubmit = async (values: FormValues) => {
    const formdata = new FormData();
     Object.entries(values).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        // For arrays, append each item individually
        value.forEach((item) => {
          if (item !== null && item !== undefined) {
            formdata.append(key, item.toString());
          }
        });
      } else {
        formdata.append(key, value.toString());
      }
    }
  });
   console.log("Submitting Step D with data:", values);
    await patchProvisionalLicense({
      id: data?.id ? Number(data.id) : 0,
      data: formdata,
    })
      .unwrap()
      .then((res) => {
        //toast.success("Step D data saved successfully");
        onNext(res);
      })
      .catch((err) => {
        toast.error(
          err?.data?.message || "Failed to save Step D data. Please try again."
        );
      });
  };

  const handlePreviousStep = () => {
    onBack();
  };

  return (
    <AppForm
      initialValues={stepDInitialValues}
      onSubmit={onSubmit}
      validationSchema={stepDValidation}
    >
      <div className="border-t  border-gray-900/10  dark:border-gray-400">
        <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">
          EDUCATIONAL FACILITIES IN PLACE
        </h2>
      </div>
       <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <InputField
            name="library_books"
            label="Total number of Library books"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="text_books"
            label="Total number of textbooks"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-full">
          <MultiSelectField
            name="publication_years"
            label="Dates of publication of the majority of books"
            required
            options={publicationYearOptions}
          />
        </div>
         <div className="sm:col-span-3">
          <InputField
            name="computers_in_use"
            label="Total number of computers for student use"
            type="number"
            required
          />
        </div> 
        
        <div className="sm:col-span-3">
          <InputField
            name="computers_in_library"
            label="Total number of computers in the Library"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="academic_staff_computers"
            label="Total number of computers for academic staff use"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="administrative_staff_computers"
            label="Total number of computers for administration "
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-full">
          <TextAreaField
            name="library_computer_software"
            label="What library computer programme do you use to search and retrieve materials in the library and resource centers?"
            required
          />
        </div>
          <div className="sm:col-span-full">
          <SelectField
            name="students_have_access"
            label="Will students have access to computers to locate reading materials in the library?"
            required
            options={yes_no_options}
          />
        </div>
        <div className="sm:col-span-full">
          <SelectField
            name="has_internet_access"
            label="Does the university have internet access?"
            required
            options={yes_no_options}
          />
        </div> 
        <div className="sm:col-span-3">
          <InputField
            name="library_seats"
            label="Number of library seats"
            required
            type="number"
          />
        </div>
         <div className="sm:col-span-3">
          <InputField
            name="classroom_seats"
            label="Number of classroom seats"
            required
            type="number"
          />
        </div> 
        <div className="sm:col-span-3">
          <InputField
            name="laboratories_seats"
            label="Number of laboratories seats"
            required
            type="number"
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="administration_block_seats"
            label="Number of administration block seats"
            required
            type="number"
          />
        </div>
        <div className="sm:col-span-full">
          <TextAreaField
            name="student_facilities"
            label="What facilities for student accommodation do you have?"
            required
          />
        </div>


      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="rounded-md flex  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-red-500"
          onClick={handlePreviousStep}
        >
          Previous
        </button>

        <SubmitButton
          isLoading={isLoading}
          title="Save & Continue"
          className="rounded-md flex min-w-32  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-sky-600"
        />
      </div>
    </AppForm>
  );
}

export default StepD;
