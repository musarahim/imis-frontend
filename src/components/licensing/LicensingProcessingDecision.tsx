"use client";

import { useEffect, useRef, useState } from "react";
import { ErrorMessage, useFormikContext } from "formik";
import { toast } from "react-toastify";
import { ClipboardCheck } from "lucide-react";
import * as Yup from "yup";
import {
  AppForm as Form,
  CheckboxInput,
  InputField,
  SelectField,
  SubmitButton,
  TextAreaField,
} from "@/components/forms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProcessingMember, ProcessingState, processingError, processingLabel } from "@/lib/licensing-processing";
import { useSaveLicensingProcessingMutation } from "@/redux/features/license-api-slice";
import { LicensingApplicationType } from "@/lib/licensing";
import CommitteeEditor from "./LicensingProcessingCommittee";

interface DecisionValues {
  action: string;
  occurred_on: string;
  notes: string;
  confirmed: boolean;
  evidence: Record<string, unknown>;
}

function DecisionFields({ data }: { data: ProcessingState }) {
  const { values, setFieldValue } = useFormikContext<DecisionValues>();
  const selected = data.actions.find((item) => item.action === values.action);
  const previousAction = useRef(values.action);

  useEffect(() => {
    if (previousAction.current !== values.action) {
      previousAction.current = values.action;
      void setFieldValue("evidence", {}, false);
      void setFieldValue("confirmed", false, false);
    }
  }, [values.action, setFieldValue]);

  return (
    <div className="flex flex-col gap-6">
      <SelectField
        name="action"
        label="Decision / Next Step"
        required
        options={data.actions.map((item) => ({ value: item.action, label: processingLabel(item.action) }))}
      />
      {selected && (
        <>
          <InputField name="occurred_on" label="Decision / Action Date" type="date" required />
          {selected.fields.map((field) => (
            <div key={field.name}>
              {field.kind === "team" ? (
                <>
                  <p className="mb-2 text-sm font-medium">{field.label}</p>
                  <CommitteeEditor
                    value={(values.evidence[field.name] as ProcessingMember[]) ?? []}
                    onChange={(members) => void setFieldValue(`evidence.${field.name}`, members)}
                  />
                </>
              ) : (
                <InputField
                  name={`evidence.${field.name}`}
                  label={field.label}
                  type={field.kind === "date" ? "date" : "text"}
                  required
                />
              )}
            </div>
          ))}
          <ErrorMessage name="evidence" component="p" className="text-sm text-red-600" />
          <TextAreaField name="notes" label="Comment / Reasons for Decision" placeholder="Enter findings, reasons and instructions for the next office..." />
          <CheckboxInput name="confirmed" label="I confirm this action has taken place and the evidence references are correct." />
        </>
      )}
    </div>
  );
}

export default function LicensingProcessingDecision({ data, applicationType, id, onSaved }: {
  data: ProcessingState;
  applicationType: LicensingApplicationType;
  id: number;
  onSaved: () => void;
}) {
  const [saveDecision, { isLoading }] = useSaveLicensingProcessingMutation();
  const [error, setError] = useState("");
  const initialValues: DecisionValues = {
    action: "", occurred_on: "", notes: "", confirmed: false, evidence: {},
  };
  const validationSchema = Yup.object().shape({
    action: Yup.string().required("Select a decision or next step"),
    occurred_on: Yup.string().required("Action date is required"),
    notes: Yup.string().trim().required("Comment is required"),
    confirmed: Yup.boolean().oneOf([true], "Confirm the action before submitting"),
    evidence: Yup.object().test("required-evidence", "Provide all required evidence references and committee members", function (value) {
      const action = data.actions.find((item) => item.action === this.parent.action);
      return !!action && action.fields.every((field) => {
        const entry = (value as Record<string, unknown>)[field.name];
        return field.kind === "team" ? Array.isArray(entry) && entry.length >= 5 : typeof entry === "string" && entry.trim().length > 0;
      });
    }),
  });

  const handleSubmit = async (values: DecisionValues) => {
    if (isLoading) return;
    setError("");
    const action = data.actions.find((item) => item.action === values.action);
    const evidence = Object.fromEntries((action?.fields ?? []).map((field) => [field.name, values.evidence[field.name]]));
    try {
      await saveDecision({ applicationType, id, data: { ...values, evidence, revision: data.revision } }).unwrap();
      toast.success("Decision submitted successfully");
      onSaved();
    } catch (failure) {
      const message = processingError(failure);
      setError(message);
      toast.error(message);
    }
  };

  return (
    <Card className="w-full overflow-hidden border-primary/15 shadow-sm">
      <CardHeader className="border-b border-primary/10 bg-primary/[0.03] pb-5">
        <CardTitle className="flex items-center gap-2 text-base"><ClipboardCheck className="h-5 w-5 text-primary" />Decision / Next Step</CardTitle>
        <CardDescription>
          Review the application and previous findings before submitting your decision.
          The available decisions depend on the current stage and your permissions.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {data.actions.length ? (
          <Form initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <fieldset disabled={isLoading}>
              <DecisionFields data={data} />
            </fieldset>
            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
            <fieldset disabled={isLoading}>
              <SubmitButton isLoading={isLoading} className="mt-4 w-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 sm:w-auto sm:min-w-56" title="Submit Decision" />
            </fieldset>
          </Form>
        ) : (
          <p className="text-sm text-muted-foreground">No decisions are available for your role at this stage. You can review the application and processing history.</p>
        )}
      </CardContent>
    </Card>
  );
}
