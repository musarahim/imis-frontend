"use client";
import {
  AppForm,
  FileField,
  InputField,
  SelectField,
  SubmitButton,
  TextAreaField
} from "@/components/forms";
import { usePatchProvisionalLicenseMutation } from "@/redux/features/license-api-slice";
import { toast } from "react-toastify";
import * as Yup from "yup";

type StepCProps = {
  onBack: () => void;
  onNext: (data?: UniversityProvisionalLicense) => void;
  data?: UniversityProvisionalLicense;
};
type FormValues = {
  classrooms: number | 0;
  libraries: number | 0;
  science_labs: number | 0;
  computer_labs: number | 0;
  staff_houses: number | 0;
  administrative_staff_area: number | 0;
  area_for_staff_use: number | 0;
  administrative_block_area: number | 0;
  student_Welfare_offices: number | 0;
  sick_bay_area: number | 0;
  hostels_area: number | 0;
  meeting_hall_area: number | 0;
  master_plan: string | File | null;
   area_of_playground: number | 0;
    available_playgrounds: string | '';
    area_of_empty_space: number | 0;
    total_roads_mileage: number | 0;
    water_source: string | '';
    power_source: string | '';
    has_cultivable_land: boolean | false;
    cultivable_land: number | 0;
    number_of_vehicles: number | 0;
    vehicle_registration: string | '';
};
const options = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
]
function StepC({ onBack, onNext, data }: StepCProps) {
  const [patchProvisionalLicense, { isLoading }] =
    usePatchProvisionalLicenseMutation();
  const stepCInitialValues = {
    classrooms: data?.classrooms || 0,
    libraries: data?.libraries || 0,
    science_labs: data?.science_labs || 0,
    computer_labs: data?.computer_labs || 0,
    staff_houses: data?.staff_houses || 0,
    administrative_staff_area: data?.administrative_staff_area || 0,
    area_for_staff_use: data?.area_for_staff_use || 0,
    administrative_block_area: data?.administrative_block_area || 0,
    student_Welfare_offices: data?.student_welfare_offices || 0,
    sick_bay_area: data?.sick_bay_area || 0,
    hostels_area: data?.hostels_area || 0,
    meeting_hall_area: data?.meeting_hall_area || 0,
    master_plan: data?.master_plan || null,
    area_of_playground: data?.area_of_playground || 0,
    available_playgrounds: data?.available_playgrounds || '',
    area_of_empty_space: data?.area_of_empty_space || 0,
    total_roads_mileage: data?.total_roads_mileage || 0,
    water_source: data?.water_source || '',
    power_source: data?.power_source || '',
    has_cultivable_land: data?.has_cultivable_land || false,
    cultivable_land: data?.cultivable_land || 0,
    number_of_vehicles: data?.number_of_vehicles || 0,
    vehicle_registration: data?.vehicle_registration || '',
  };
  const stepCValidation = Yup.object().shape({
    classrooms: Yup.number().min(0).required(),
    libraries: Yup.number().min(0).required(),
    science_labs: Yup.number().min(0).required(),
    computer_labs: Yup.number().min(0).required(),
    staff_houses: Yup.number().min(0).required(),
    administrative_staff_area: Yup.number().min(0).required(),
    area_for_staff_use: Yup.number().min(0).required(),
    administrative_block_area: Yup.number().min(0).required(),
    student_Welfare_offices: Yup.number().min(0).required(),
    sick_bay_area: Yup.number().min(0).required(),
    hostels_area: Yup.number().min(0).required(),
    meeting_hall_area: Yup.number().min(0).required(),
    master_plan: Yup.mixed().required(),

  });
  const onSubmit = async (values: FormValues) => {
    const formdata = new FormData();
      // Handle file fields specially
  const fileFields: (keyof FormValues)[] = ["master_plan"];

  Object.entries(values).forEach(([key, value]) => {
    if (fileFields.includes(key as keyof FormValues)) {
      // Handle file field
      if (value instanceof File) {
        // User selected/replaced a file -> send it
        formdata.append(key, value);
      } else if (value === null && stepCInitialValues[key as keyof FormValues]) {
        // User removed an existing file -> signal backend to delete
        formdata.append(`${key}_remove`, "1");
      }
      // If value is a string (existing URL/name) -> do nothing (keep existing file)
    } else {
      // Handle non-file fields
      if (value !== undefined && value !== null && value !== "") {
        formdata.append(
          key,
          typeof value === "number" || typeof value === "boolean" ? value.toString() : value
        );
      }
    }
  });

    console.log("Form data:", formdata);
    await patchProvisionalLicense({
      id: data?.id ? Number(data.id) : 0,
      data: formdata,
    })
      .unwrap()
      .then((res) => {
        if (res) {
          onNext(res);
        }
      })
      .catch((err) => {
        toast.error("Error saving Step C data");
        console.error("Error:", err);
      });
  };
  const handlePreviousStep = () => {
    onBack();
  };

  return (
    <AppForm
      initialValues={stepCInitialValues}
      onSubmit={onSubmit}
      validationSchema={stepCValidation}
    >
      <div className="border-t  border-gray-900/10  dark:border-gray-400">
        <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">
          INFRASTRUCTURE TO SUPPORT THE DELIVERY OF HIGHER EDUCATION
        </h2>
      </div>
      <h3 className="text-base/8 mt-2 text-gray-800 dark:text-gray-200">
        Buildings - State the total square meters of the following buildings
      </h3>

      <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <InputField
            name="classrooms"
            label="Classrooms"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="libraries"
            label="Libraries"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="science_labs"
            label="Science Labs"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="computer_labs"
            label="Computer Labs"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="staff_houses"
            label="Staff Houses"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="administrative_staff_area"
            label="Administrative Staff Area (in sqm)"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="area_for_staff_use"
            label="Area for Staff Use (in sqm)"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="administrative_block_area"
            label="Administrative Block Area (in sqm)"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="student_Welfare_offices"
            label="Student Welfare Offices (in sqm)"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="sick_bay_area"
            label="Sick Bay Area (in sqm)"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="hostels_area"
            label="Hostels Area (in sqm)"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="meeting_hall_area"
            label="Meeting Hall Area (in sqm)"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-full">
          <FileField
            name="master_plan"
            label="Provide a master plan of your campus showing how buildings relate to one another to create an attractive academic atmosphere"
            required
          />
        </div>
      </div>
       <h3 className="text-base/8 mt-2 text-gray-800 dark:text-gray-200">
       Ground, physical infrastructure and services/utilities
      </h3>
      <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
        <div className="sm:col-span-full">
          <InputField
            name="area_of_playground"
            label="Area of playgrounds (in sqm)"
            type="number"
            required
          />
        </div>
         <div className="sm:col-span-full">
          <InputField
            name="available_playgrounds"
            label="The types of playgrounds available (e.g. tennis courts, swimming pool etc.)"
            type="text"
            required
          />
        </div> 
        <div className="sm:col-span-full">
          <InputField
            name="area_of_empty_space"
            label="Area of empty space (and within the campus dedicated to aesthetic and recreation use) (in sqm)"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-full">
          <InputField
            name="total_roads_mileage"
            label="Total mileage of roads and paths within the campus (in km)"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-full">
          <InputField
            name="water_source"
            label="What are the sources of water for the university community?"
            type="text"
            required
          />
        </div>
        <div className="sm:col-span-full">
          <InputField
            name="power_source"
            label="Indicate the supply of power you are to use"
            type="text"
            required
          />
        </div>
        <div className="sm:col-span-full">
          <SelectField
            name="has_cultivable_land"
            label="Do you have cultivable land?"
            options={options}
            required
          />
        </div>
        <div className="sm:col-span-full">
          <InputField
            name="cultivable_land"
            label="If yes, state the area of cultivable land (in acres)"
            type="number"
            required
          />  
        </div>
        </div>
      <h3 className="text-base/8 mt-2 text-gray-800 dark:text-gray-200">
       Transport - State the number and registration of vehicles the university has
      </h3>
      <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
        <div className="sm:col-span-full">
          <InputField
            name="number_of_vehicles"
            label="Number of vehicles"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-full">
          <TextAreaField
            name="vehicle_registration"
            label="Vehicle registration details"
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

export default StepC;
