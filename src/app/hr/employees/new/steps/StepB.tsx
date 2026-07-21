"use client";
import {
    AppForm,
    InputField,
    SelectField,
    SubmitButton,
    TextAreaField,
} from "@/components/forms";
import {
    useGetCountiesQuery,
    useGetDistrictsQuery,
    useGetParishesQuery,
    useGetSubCountiesQuery,
    useGetVillagesQuery,
} from "@/redux/features/commonApiSlice";
import { useUpdateEmployeeMutation } from "@/redux/features/hr-api-slice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useFormikContext } from "formik";
import { useEffect, useRef } from "react";

import { toast } from "sonner";
import * as Yup from "yup";

type StepProps = {
  onBack: () => void;
  onNext: (data?: Employee) => void;
  data?: Employee;
};
type FormValues = {
  district: string | "";
  county: string | "";
  sub_county: string | "";
  parish: string | "";
  village: string | "";
  distance_from_work: number | 0;
  address: string | "";
};

function CountySelect() {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const prev = useRef(values.district);

  const { data: counties } = useGetCountiesQuery(
    values.district ? { district_id: values.district } : skipToken,
  );

  useEffect(() => {
    if (prev.current !== values.district) {
      setFieldValue("county", "");
      prev.current = values.district;
    }
  }, [values.district, setFieldValue]);

  const options =
    counties?.map((c) => ({ label: c.name, value: c.id.toString() })) || [];
  return (
    <SelectField name="county" label="County" options={options} required />
  );
}

function SubCountySelect() {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const prev = useRef(values.county);

  const { data: subCounties } = useGetSubCountiesQuery(
    values.county ? { county_id: values.county } : skipToken,
  );

  useEffect(() => {
    if (prev.current !== values.county) {
      setFieldValue("sub_county", "");
      prev.current = values.county;
    }
  }, [values.county, setFieldValue]);

  const options =
    subCounties?.map((s) => ({ label: s.name, value: s.id.toString() })) || [];
  return (
    <SelectField
      name="sub_county"
      label="Sub-county"
      options={options}
      required
    />
  );
}

function ParishSelect() {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const prev = useRef(values.sub_county);

  const { data: parishes } = useGetParishesQuery(
    values.sub_county ? { sub_county_id: values.sub_county } : skipToken,
  );

  useEffect(() => {
    if (prev.current !== values.sub_county) {
      setFieldValue("parish", "");
      prev.current = values.sub_county;
    }
  }, [values.sub_county, setFieldValue]);

  const options =
    parishes?.map((p) => ({ label: p.name, value: p.id.toString() })) || [];
  return (
    <SelectField name="parish" label="Parish" options={options} required />
  );
}

function VillageSelect() {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const prev = useRef(values.parish);

  const { data: villages } = useGetVillagesQuery(
    values.parish ? { parish_id: values.parish } : skipToken,
  );

  useEffect(() => {
    if (prev.current !== values.parish) {
      setFieldValue("village", "");
      prev.current = values.parish;
    }
  }, [values.parish, setFieldValue]);

  const options =
    villages?.map((v) => ({ label: v.name, value: v.id.toString() })) || [];
  return (
    <SelectField name="village" label="Village" options={options} required />
  );
}

function StepB({ onNext, onBack, data }: StepProps) {
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();
  console.log("StepB data:", data);
  const { data: districts } = useGetDistrictsQuery();

  const districtOptions = districts?.map((district) => ({
    label: district.name,
    value: district.id.toString(),
  }));

  const stepBInitialValues = {
    district: data?.district || "",
    county: data?.county || "",
    sub_county: data?.sub_county || "",
    parish: data?.parish || "",
    village: data?.village || "",
    distance_from_work: data?.distance_from_work || 0,
    address: data?.address || "",
  };

  const stepBValidation = Yup.object({
    district: Yup.string().required("District is required"),
    county: Yup.string().required("County is required"),
    sub_county: Yup.string().required("Sub-county is required"),
    parish: Yup.string().required("Parish is required"),
    village: Yup.string().required("Village is required"),
    distance_from_work: Yup.number()
      .typeError("Distance from work must be a number")
      .min(0, "Distance from work cannot be negative")
      .required("Distance from work is required"),
    address: Yup.string().required("Address is required"),
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
    console.log("Submitting Step B with data:", values);
    await updateEmployee({
      id: data?.id ? Number(data.id) : 0,
      data: formdata,
    })
      .unwrap()
      .then((res) => {
        //toast.success("Step B data saved successfully");
        onNext(res);
      })
      .catch((err) => {
        toast.error(
          err?.data?.message || "Failed to save Step B data. Please try again.",
        );
      });
  };

  const handlePreviousStep = () => {
    onBack();
  };

  return (
    <AppForm
      initialValues={stepBInitialValues}
      onSubmit={onSubmit}
      validationSchema={stepBValidation}
    >
      <div className="border-t  border-gray-900/10  dark:border-gray-400">
        <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">
          Residential Address
        </h2>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <SelectField
            name="district"
            label="District"
            options={districtOptions || []}
            required
          />
        </div>
        <div className="sm:col-span-3">
          <CountySelect />
        </div>
        <div className="sm:col-span-3">
          <SubCountySelect />
        </div>
        <div className="sm:col-span-3">
          <ParishSelect />
        </div>
        <div className="sm:col-span-3">
          <VillageSelect />
        </div>
        <div className="sm:col-span-3">
          <InputField
            name="distance_from_work"
            label="Distance from work (in kilometers)"
            type="number"
            required
          />
        </div>
        <div className="sm:col-span-full">
          <TextAreaField name="address" label="Residential Address" required />
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
          isLoading={isUpdating}
          title="Save & Continue"
          className="rounded-md flex min-w-32  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-sky-600"
        />
      </div>
    </AppForm>
  );
}

export default StepB;
