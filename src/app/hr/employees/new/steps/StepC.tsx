"use client";
import {
    AppForm,
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
  district_of_origin: string | "";
  county_of_origin: string | "";
  sub_county_of_origin: string | "";
  parish_of_origin: string | "";
  village_of_origin: string | "";
  address_of_origin: string | "";
};

function CountySelect() {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const prev = useRef(values.district_of_origin);

  const { data: counties } = useGetCountiesQuery(
    values.district_of_origin
      ? { district_id: values.district_of_origin }
      : skipToken,
  );

  useEffect(() => {
    if (prev.current !== values.district_of_origin) {
      setFieldValue("county_of_origin", "");
      prev.current = values.district_of_origin;
    }
  }, [values.district_of_origin, setFieldValue]);

  const options =
    counties?.map((c) => ({ label: c.name, value: c.id.toString() })) || [];
  return (
    <SelectField
      name="county_of_origin"
      label="County of Origin"
      options={options}
      required
    />
  );
}

function SubCountySelect() {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const prev = useRef(values.county_of_origin);

  const { data: subCounties } = useGetSubCountiesQuery(
    values.county_of_origin
      ? { county_id: values.county_of_origin }
      : skipToken,
  );

  useEffect(() => {
    if (prev.current !== values.county_of_origin) {
      setFieldValue("sub_county_of_origin", "");
      prev.current = values.county_of_origin;
    }
  }, [values.county_of_origin, setFieldValue]);

  const options =
    subCounties?.map((s) => ({ label: s.name, value: s.id.toString() })) || [];
  return (
    <SelectField
      name="sub_county_of_origin"
      label="Sub-county of Origin"
      options={options}
      required
    />
  );
}

function ParishSelect() {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const prev = useRef(values.sub_county_of_origin);

  const { data: parishes } = useGetParishesQuery(
    values.sub_county_of_origin
      ? { sub_county_id: values.sub_county_of_origin }
      : skipToken,
  );

  useEffect(() => {
    if (prev.current !== values.sub_county_of_origin) {
      setFieldValue("parish_of_origin", "");
      prev.current = values.sub_county_of_origin;
    }
  }, [values.sub_county_of_origin, setFieldValue]);

  const options =
    parishes?.map((p) => ({ label: p.name, value: p.id.toString() })) || [];
  return (
    <SelectField
      name="parish_of_origin"
      label="Parish of Origin"
      options={options}
      required
    />
  );
}

function VillageSelect() {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const prev = useRef(values.parish_of_origin);

  const { data: villages } = useGetVillagesQuery(
    values.parish_of_origin
      ? { parish_id: values.parish_of_origin }
      : skipToken,
  );

  useEffect(() => {
    if (prev.current !== values.parish_of_origin) {
      setFieldValue("village_of_origin", "");
      prev.current = values.parish_of_origin;
    }
  }, [values.parish_of_origin, setFieldValue]);

  const options =
    villages?.map((v) => ({ label: v.name, value: v.id.toString() })) || [];
  return (
    <SelectField
      name="village_of_origin"
      label="Village of Origin"
      options={options}
      required
    />
  );
}

function StepC({ onNext, onBack, data }: StepProps) {
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();
  console.log("StepB data:", data);
  const { data: districts } = useGetDistrictsQuery();

  const districtOptions = districts?.map((district) => ({
    label: district.name,
    value: district.id.toString(),
  }));

  const stepBInitialValues = {
    district_of_origin: data?.district_of_origin || "",
    county_of_origin: data?.county_of_origin || "",
    sub_county_of_origin: data?.sub_county_of_origin || "",
    parish_of_origin: data?.parish_of_origin || "",
    village_of_origin: data?.village_of_origin || "",
    address_of_origin: data?.address_of_origin || "",
  };

  const stepBValidation = Yup.object({
    district_of_origin: Yup.string().required("District is required"),
    county_of_origin: Yup.string().required("County is required"),
    sub_county_of_origin: Yup.string().required("Sub-county is required"),
    parish_of_origin: Yup.string().required("Parish is required"),
    village_of_origin: Yup.string().required("Village is required"),
    address_of_origin: Yup.string().required("Address is required"),
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
          Area of Origin
        </h2>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <SelectField
            name="district_of_origin"
            label="District of Origin"
            options={districtOptions || []}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <CountySelect />
        </div>
        <div className="sm:col-span-2">
          <SubCountySelect />
        </div>
        <div className="sm:col-span-3">
          <ParishSelect />
        </div>
        <div className="sm:col-span-3">
          <VillageSelect />
        </div>

        <div className="sm:col-span-full">
          <TextAreaField
            name="address_of_origin"
            label="Address of Origin"
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
          isLoading={isUpdating}
          title="Save & Continue"
          className="rounded-md flex min-w-32  justify-center text-sm px-3 my-2 py-1.5 font-semibold leading-6 text-white bg-sky-600"
        />
      </div>
    </AppForm>
  );
}

export default StepC;
