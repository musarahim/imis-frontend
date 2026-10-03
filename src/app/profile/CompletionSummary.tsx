import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { completionPercentage, getProfileCompletion } from "./profile-completion";

export default function CompletionSummary({ employee, live = false, activeSection, onSelectSection }: {
  employee: Partial<Employee>;
  live?: boolean;
  activeSection?: string;
  onSelectSection?: (section: string) => void;
}) {
  const progress = getProfileCompletion(employee, live);
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3">
          <span>{live ? "Form completion" : "Profile completion"}</span><span>{progress.percentage}%</span>
        </CardTitle>
        <CardDescription aria-live="polite">
          {progress.completed} of {progress.total} required fields entered.
          {progress.remaining ? ` ${progress.remaining} remaining.` : " All required fields are entered."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div role="progressbar" aria-label={live ? "Form completion" : "Profile completion"} aria-valuemin={0} aria-valuemax={100}
          aria-valuenow={progress.percentage} className="bg-muted h-3 overflow-hidden rounded-full">
          <div className="bg-primary h-full transition-all" style={{ width: `${progress.percentage}%` }} />
        </div>
        <p className="text-muted-foreground text-sm">
          {live ? "Updates as you type. Save each step to keep your changes." : "Based on saved data."}
          {" "}Optional fields and empty optional record sections are excluded.
        </p>
        <details open={live || undefined}>
          <summary className="cursor-pointer font-medium">View section progress and remaining fields</summary>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {progress.sections.map((section) => (
              <div key={section.id} className={`rounded-lg border p-3 ${section.id === activeSection ? "border-primary bg-primary/5" : ""}`}>
                {onSelectSection ? <button type="button" className="text-primary text-left font-medium underline underline-offset-4"
                  onClick={() => onSelectSection(section.id)}>{section.label}</button> : <p className="font-medium">{section.label}</p>}
                <p className="text-muted-foreground mt-1 text-sm">
                  {section.total ? `${completionPercentage(section.completed, section.total)}% complete (${section.completed}/${section.total})` : "Optional: no entries"}
                </p>
                {section.missing.length > 0 && (
                  <p className="mt-2 text-sm">Remaining: {section.missing.join(", ")}.</p>
                )}
              </div>
            ))}
          </div>
        </details>
      </CardContent>
    </Card>
  );
}
