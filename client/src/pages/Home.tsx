import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

import LogInput from "@/components/LogInput";
import ResultCard from "@/components/ResultCard";
import DashboardHeader, { type DashboardHeaderProps } from "@/components/DashboardHeader";
import IncidentTable from "@/components/IncidentTable";
import type { IncidentGroup } from "@/services/groupLogs";
import findAnalysis ,{type AnalysisResult} from "@/services/analyzeLogs";

const EMPTY_METRICS: DashboardHeaderProps = {
  total_logs: 0,
  total_errors: 0,
  total_warnings: 0,
  unique_incidents: 0,
};

function Dashboard() {
    useEffect(() => {
    document.title = "RootCause AI";
  }, []);

  const [metrics, setMetrics] = useState<DashboardHeaderProps>(EMPTY_METRICS);
  const [incidents, setIncidents] = useState<IncidentGroup[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (logs: string) => {
    setLoading(true);
    try {
      const groups: IncidentGroup[] = JSON.parse(logs);
      setIncidents(groups);
      const analysis = await findAnalysis(logs);
      setResult(analysis);
     
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setIncidents([]);
    setMetrics(EMPTY_METRICS);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">RootCause AI</h1>
            <p className="text-xs text-muted-foreground">
              AI-assisted triage & root cause analysis
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-6 py-6">
        <section>
          <DashboardHeader {...metrics} />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Upload Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <LogInput onSubmit={handleSubmit} onMetrics={setMetrics} loading={loading} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Root Cause Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResultCard result={result} onReset={handleReset} />
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <IncidentTable incidents={incidents} />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
