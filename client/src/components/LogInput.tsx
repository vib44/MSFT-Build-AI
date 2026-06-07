import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { ingestlog } from "../services/analyzeLogs";
import normalizeLogs from "../services/normalizeLogs";
import groupLogs from "../services/groupLogs";
import type { DashboardHeaderProps } from "./DashboardHeader";

export const findMetrics = (
  normalizedContent: any[],
  groupedResponse: any[],
): DashboardHeaderProps => ({
  total_logs: normalizedContent.length,
  total_errors: normalizedContent.filter((l) => l.level === "ERROR").length,
  total_warnings: normalizedContent.filter((l) => l.level === "WARN").length,
  unique_incidents: groupedResponse?.length ?? 0,
});

type Props = {
  onSubmit: (logs: string) => void;
  onMetrics?: (metrics: DashboardHeaderProps) => void;
  loading?: boolean;
};

const LogInput = ({ onSubmit, onMetrics, loading }: Props) => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const ipflag = !!file;

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
  };

  const handleSubmit = async () => {
    try {
      let response;
      if (file) {
        response = await ingestlog(file);
      } else {
        if (!value.trim()) return;
        response = { data: { content: value, file: { originalname: "text" } } };
      }
      const normalizedContent = await normalizeLogs(response);
      const groupedResponse = groupLogs(normalizedContent);
      const metrics = findMetrics(normalizedContent, groupedResponse);
      onSubmit(JSON.stringify(groupedResponse));
      onMetrics?.(metrics);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    setValue("");
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="log-text" className="text-xs uppercase tracking-wider text-muted-foreground">
          Paste raw logs
        </Label>
        <Textarea
          id="log-text"
          className="h-64 resize-none font-mono text-xs"
          placeholder={`2026-06-06T10:12:00Z ERROR upstream timed out after 5000ms\n2026-06-06T10:12:01Z WARN retrying request\n...`}
          value={value}
          disabled={ipflag || loading}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="uploadfile" className="text-xs uppercase tracking-wider text-muted-foreground">
          Or upload a log file
        </Label>
        <div className="flex items-center gap-2">
          <Input
            ref={fileRef}
            id="uploadfile"
            type="file"
            accept=".log,.txt,.json,text/*"
            onChange={fileChange}
            disabled={value.trim() !== "" || loading}
            className="cursor-pointer file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1 file:text-secondary-foreground"
          />
          {file && (
            <span className="flex items-center gap-1 truncate text-xs text-muted-foreground">
              <Upload className="h-3 w-3" />
              {file.name}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleSubmit} disabled={loading || (!file && !value.trim())} className="flex-1">
          {loading ? "Analyzing..." : "Analyze Logs"}
        </Button>
        <Button variant="outline" onClick={handleReset} disabled={loading}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default LogInput;
