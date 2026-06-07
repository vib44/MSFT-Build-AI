import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

type Props = {
  result: {
    summary: string;
    frequency: number;
    severity: string;
    suggestedFix: string;
  } | null;
  onReset: () => void;
};

const severityTone = (sev: string) => {
  const s = sev.toUpperCase();
  if (s === "ERROR" || s === "FATAL") return "destructive" as const;
  if (s === "WARN" || s === "WARNING") return "secondary" as const;
  return "outline" as const;
};

const ResultCard = ({ result, onReset }: Props) => {
  if (!result) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-md border border-dashed text-center">
        <Sparkles className="mb-2 h-6 w-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Upload or paste logs to see AI root cause analysis.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={severityTone(result.severity)}>Severity: {result.severity}</Badge>
        <Badge variant="outline">Frequency: {result.frequency}×</Badge>
      </div>

      <div className="space-y-3 rounded-md border bg-muted/40 p-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Summary
          </p>
          <p className="mt-1 text-sm leading-relaxed">{result.summary}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Recommended Actions
          </p>
          <p className="mt-1 text-sm leading-relaxed">{result.suggestedFix}</p>
        </div>
      </div>

      <Button variant="outline" size="sm" onClick={onReset}>
        Clear analysis
      </Button>
    </div>
  );
};

export default ResultCard;
