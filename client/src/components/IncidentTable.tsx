import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { IncidentGroup } from "../services/groupLogs";

const levelVariant = (lvl: string) =>
  lvl === "ERROR" ? "destructive" : lvl === "WARN" ? "secondary" : "outline";

const IncidentTable = ({ incidents }: { incidents: IncidentGroup[] }) => {
  if (!incidents.length) {
    return (
      <div className="flex h-32 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
        No incidents detected yet.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Level</TableHead>
            <TableHead>Signature</TableHead>
            <TableHead className="w-24 text-right">Count</TableHead>
            <TableHead className="w-40">First seen</TableHead>
            <TableHead className="w-40">Last seen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.map((i) => (
            <TableRow key={i.id}>
              <TableCell>
                <Badge variant={levelVariant(i.level) as any}>{i.level}</Badge>
              </TableCell>
              <TableCell className="max-w-md truncate font-mono text-xs">
                {i.signature}
              </TableCell>
              <TableCell className="text-right font-mono">{i.frequency}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {i.firstSeen ?? "—"}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {i.lastSeen ?? "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IncidentTable;
