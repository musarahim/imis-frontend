"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProcessingMember, processingLabel } from "@/lib/licensing-processing";

export default function CommitteeEditor({ value, onChange }: { value: ProcessingMember[]; onChange: (members: ProcessingMember[]) => void }) {
  const update = (index: number, changes: Partial<ProcessingMember>) => onChange(value.map((member, i) => i === index ? { ...member, ...changes } : member));
  return <div className="space-y-3"><p className="text-sm">One leader (10 years in higher education management), up to eight other members (7 years each). Include finance, law, education management and engineering. Use a civil engineer for provisional verification and a structural engineer for charter inspection.</p>
    {value.map((member, index) => <fieldset key={index} className="grid gap-2 rounded border p-3 md:grid-cols-2"><legend>Member {index + 1}</legend>
      <Input aria-label={`Member ${index + 1} name`} placeholder="Full name" value={member.name} onChange={(event) => update(index, { name: event.target.value })} />
      <select aria-label={`Member ${index + 1} role`} className="rounded border bg-background p-2" value={member.role} onChange={(event) => update(index, { role: event.target.value })}>
        {["leader", "finance", "law", "education_management", "engineer", "other"].map((role) => <option key={role} value={role}>{processingLabel(role)}</option>)}
      </select>
      <label>Years of relevant experience<Input type="number" min={0} max={80} value={member.experience} onChange={(event) => update(index, { experience: Number(event.target.value) })} /></label>
      <div><label className="block"><input type="checkbox" checked={member.conflict_declared} onChange={(event) => update(index, { conflict_declared: event.target.checked })} /> Conflict declaration recorded</label>
        <label className="block"><input type="checkbox" checked={member.has_conflict} onChange={(event) => update(index, { has_conflict: event.target.checked })} /> Has a conflict of interest</label></div>
      <Button type="button" variant="outline" onClick={() => onChange(value.filter((_, i) => i !== index))}>Remove member</Button>
    </fieldset>)}
    <Button type="button" variant="secondary" disabled={value.length >= 9} onClick={() => onChange([...value, { name: "", role: "other", experience: 7, conflict_declared: false, has_conflict: false }])}>Add member</Button>
  </div>;
}

