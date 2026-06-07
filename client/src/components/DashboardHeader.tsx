import { Card } from "@/components/ui/card";
import { Activity, AlertTriangle, AlertOctagon, GitBranch } from "lucide-react";

export interface DashboardHeaderProps {
  total_logs: number;
  total_errors: number;
  total_warnings: number;
  unique_incidents: number;
}

const Metric = ({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  tone: "default" | "destructive" | "warning" | "accent";
}) => {
  const toneClass = {
    default: "text-foreground",
    destructive: "text-destructive",
    warning: "text-chart-4",
    accent: "text-chart-2",
  }[tone];
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <Icon className={`h-4 w-4 ${toneClass}`} />
      </div>
      <p className={`mt-2 font-mono text-3xl font-semibold ${toneClass}`}>
        {value?.toLocaleString() ?? 0}
      </p>
    </Card>
  );
};

const DashboardHeader = ({
  total_logs,
  total_errors,
  total_warnings,
  unique_incidents,
}: DashboardHeaderProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <Metric label="Total Logs" value={total_logs ?? 0} icon={Activity} tone="default" />
      <Metric label="Errors" value={total_errors ?? 0} icon={AlertOctagon} tone="destructive" />
      <Metric label="Warnings" value={total_warnings ?? 0} icon={AlertTriangle} tone="warning" />
      <Metric
        label="Unique Incidents"
        value={unique_incidents ?? 0}
        icon={GitBranch}
        tone="accent"
      />
    </div>
  );
};

export default DashboardHeader;
