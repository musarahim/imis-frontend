"use client";
import {
    AppForm,
    DatePicker,
    InputField,
    SelectField,
    SubmitButton,
    TextAreaField,
} from "@/components/forms";
import {
    useGetNationalitiesQuery,
    useGetReligionsQuery,
    useGetTitlesQuery,
    useGetTribesQuery,
} from "@/redux/features/commonApiSlice";
import {
    useCreateEmployeeMutation,
    useGetDepartmentsQuery,
    useGetDesignationsQuery,
    useGetDirectoratesQuery,
    useGetEmployeeDetailsQuery,
    useGetSupervisorDropdownQuery,
    useGetUserDropdownQuery,
    useUpdateEmployeeMutation,
} from "@/redux/features/hr-api-slice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useFormikContext } from "formik";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
type StepProps = {
  onNext: (data?: Employee) => void;
  id?: number;
};

type FormValues = {
  title: string;
  system_account: string;
  directorate: string;
  department: string;
  designation: string;
  employee_number: string;
  nssf_number: string;
  tin_number: string;
  date_of_birth: string;
  gender: "male" | "female";
  nationality: string;
  religion: string;
  tribe: string;
  marital_status: string;
  spouse_name: string;
  blood_group: string;
  allergies: string;
  joining_date: string;
  supervisor: string;
};
const gender_options = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const marital_status_options = [
  { label: "Single", value: "single" },
  { label: "Married", value: "married" },
  { label: "Divorced", value: "divorced" },
  { label: "Widow", value: "widow" },
  { label: "Widower", value: "widower" },
  { label: "Separated", value: "separated" },
];
const blood_group_options = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];

function DepartmentSelect() {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const prevDirectorateRef = useRef(values.directorate);

  const { data: departments } = useGetDepartmentsQuery(
    values.directorate ? { directorate_id: values.directorate } : skipToken,
  );

  useEffect(() => {
    if (prevDirectorateRef.current !== values.directorate) {
      setFieldValue("department", "");
      prevDirectorateRef.current = values.directorate;
    }
  }, [values.directorate, setFieldValue]);

  const departmentOptions =
    departments?.map((dept) => ({
      label: dept.name,
      value: dept.id?.toString() || "",
    })) || [];

  return (
    <SelectField
      name="department"
      label="Department"
      required
      options={departmentOptions}
    />
  );
}

function StepA({ onNext, id }: StepProps) {
  const [createEmployee, { isLoading: isCreating }] =
    useCreateEmployeeMutation();
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();
  const isCreatingNew = !id;
  const isLoading = isCreatingNew ? isCreating : isUpdating;

  const { data: initialValues } = useGetEmployeeDetailsQuery(id ?? skipToken);
  console.log("initialValues", initialValues?.gender);
  const { data: titles } = useGetTitlesQuery();
  const titleOptions =
    titles?.map((title) => ({
      label: title.name,
      value: title.id?.toString() || "",
    })) || [];
  const { data: nationalities } = useGetNationalitiesQuery();
  const nationalityOptions =
    nationalities?.map((nationality) => ({
      label: nationality.name,
      value: nationality.id?.toString() || "",
    })) || [];
  const { data: users } = useGetUserDropdownQuery();
  const userOptions =
    users?.map((user) => ({
      label: `${user.name}`,
      value: user.id?.toString() || "",
    })) || [];

  const { data: directorates } = useGetDirectoratesQuery();
  const { data: designations } = useGetDesignationsQuery();

  const directorateOptions =
    directorates?.map((directorate) => ({
      label: directorate.name,
      value: directorate.id?.toString() || "",
    })) || [];

  const designationOptions =
    designations?.map((designation) => ({
      label: designation.name,
      value: designation.id?.toString() || "",
    })) || [];

  const { data: religions } = useGetReligionsQuery();
  const religionOptions =
    religions?.map((religion) => ({
      label: religion.name,
      value: religion.id?.toString() || "",
    })) || [];
  const { data: tribes } = useGetTribesQuery();
  const tribeOptions =
    tribes?.map((tribe) => ({
      label: tribe.name,
      value: tribe.id?.toString() || "",
    })) || [];

  const { data: supervisors } = useGetSupervisorDropdownQuery();
  const supervisorOptions =
    supervisors?.map((supervisor) => ({
      label: `${supervisor.full_name}`,
      value: supervisor.id?.toString() || "",
    })) || [];

  const stepAInitialValues: FormValues = {
    title: initialValues?.title || "",
    system_account: initialValues?.system_account || "",
    directorate: initialValues?.directorate || "",
    department: initialValues?.department || "",
    designation: initialValues?.designation || "",
    employee_number: initialValues?.employee_number || "",
    nssf_number: initialValues?.nssf_number || "",
    tin_number: initialValues?.tin_number || "",
    date_of_birth: initialValues?.date_of_birth || "",
    gender: initialValues?.gender || "male",
    nationality: initialValues?.nationality || "",
    religion: initialValues?.religion || "",
    tribe: initialValues?.tribe || "",
    marital_status: initialValues?.marital_status || "",
    spouse_name: initialValues?.spouse_name || "",
    blood_group: initialValues?.blood_group || "",
    allergies: initialValues?.allergies || "",
    joining_date: initialValues?.joining_date || "",
    supervisor: initialValues?.supervisor || "",
  };

  const stepAValidation = Yup.object({
    title: Yup.string().required("This field is required"),
    system_account: Yup.string().required("This field is required"),
    directorate: Yup.string().required("This field is required"),
    department: Yup.string().required("This field is required"),
    designation: Yup.string().required("This field is required"),
    employee_number: Yup.string().required("This field is required"),
    nssf_number: Yup.string(),
    tin_number: Yup.string(),
    date_of_birth: Yup.string().required("This field is required"),
    gender: Yup.string().required("This field is required"),
    nationality: Yup.string().required("This field is required"),
    religion: Yup.string().required("This field is required"),
    tribe: Yup.string().required("This field is required"),
    marital_status: Yup.string().required("This field is required"),
    spouse_name: Yup.string(),
    blood_group: Yup.string(),
    allergies: Yup.string(),
    joining_date: Yup.string().required("This field is required"),
    supervisor: Yup.string(),
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
    try {
      if (id) {
        // If id is provided, update the existing employee
        const result = await updateEmployee({ id, data: formdata }).unwrap();
        onNext(result);
      } else {
        // If no id is provided, create a new employee
        const result = await createEmployee(formdata).unwrap();
        onNext(result);
      }
    } catch (error) {
      console.error("Error submitting Step A:", error);
      toast.error(
        "An error occurred while submitting the form. Please try again.",
      );
    }
  };

  return (
    <AppForm
      initialValues={stepAInitialValues}
      onSubmit={onSubmit}
      validationSchema={stepAValidation}
    >
      <div className="border-t  border-gray-900/10  dark:border-gray-400">
        <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">
          Personal Information
        </h2>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <SelectField
            name="system_account"
            label="System Account"
            required
            options={userOptions}
          />
        </div>
        <div className="sm:col-span-3">
          <SelectField
            name="title"
            label="Title"
            required
            options={titleOptions}
          />
        </div>
        <div className="sm:col-span-3">
          <SelectField
            name="directorate"
            label="Directorate"
            required
            options={directorateOptions}
          />
        </div>
        <div className="sm:col-span-3">
          <DepartmentSelect />
        </div>
        <div className="sm:col-span-3">
          <SelectField
            name="designation"
            label="Designation"
            required
            options={designationOptions}
          />
        </div>
        <div className="sm:col-span-3">
          <InputField name="employee_number" label="Employee Number" required />
        </div>
        <div className="sm:col-span-3">
          <InputField name="nssf_number" label="NSSF Number" />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="tin_number"
            label="Tax Identification Number (TIN)"
          />
        </div>
        <div className="sm:col-span-3">
          <DatePicker name="date_of_birth" label="Date of Birth" required />
        </div>
        <div className="sm:col-span-3">
          <SelectField
            name="gender"
            label="Gender"
            required
            options={gender_options}
          />
        </div>
        <div className="sm:col-span-3">
          <SelectField
            name="nationality"
            label="Nationality"
            required
            options={nationalityOptions}
          />
        </div>
        <div className="sm:col-span-3">
          <SelectField
            name="religion"
            label="Religion"
            required
            options={religionOptions}
          />
        </div>
        <div className="sm:col-span-3">
          <SelectField
            name="tribe"
            label="Tribe"
            required
            options={tribeOptions}
          />
        </div>
        <div className="sm:col-span-3">
          <SelectField
            name="marital_status"
            label="Marital Status"
            required
            options={marital_status_options}
          />
        </div>
        <div className="sm:col-span-3">
          <InputField name="spouse_name" label="Spouse Name" />
        </div>
        <div className="sm:col-span-3">
          <SelectField
            name="blood_group"
            label="Blood Group"
            options={blood_group_options}
          />
        </div>

        <div className="sm:col-span-full">
          <TextAreaField name="allergies" label="Allergies" />
        </div>

        <div className="sm:col-span-3">
          <DatePicker name="joining_date" label="Joining Date" required />
        </div>
        <div className="sm:col-span-3">
          <SelectField
            name="supervisor"
            label="Reports To (Supervisor)"
            options={supervisorOptions}
          />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <SubmitButton
          isLoading={isLoading}
          title="Save & Continue"
          className="rounded-md flex min-w-32  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-sky-600"
        />
      </div>
    </AppForm>
  );
}

export default StepA;
