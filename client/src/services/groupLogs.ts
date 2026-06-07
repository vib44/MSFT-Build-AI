import type { NormalizedLogs } from "./normalizeLogs";

export type IncidentGroup = {
  id: string;
  signature: string;
  level: NormalizedLogs["level"];
  frequency: number;
  firstSeen?: string;
  lastSeen?: string;
  samples: string[];
};

// Create a signature by stripping volatile tokens (numbers, hex, uuids, quoted strings).
const signatureOf = (msg: string) =>
  msg
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, "<uuid>")
    .replace(/0x[0-9a-f]+/gi, "<hex>")
    .replace(/\b\d+\b/g, "<n>")
    .replace(/"[^"]*"/g, '"<str>"')
    .replace(/'[^']*'/g, "'<str>'")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);

const groupLogs = (logs: NormalizedLogs[]): IncidentGroup[] => {
  const map = new Map<string, IncidentGroup>();
  for (const log of logs) {
    if (log.level !== "ERROR" && log.level !== "WARN") continue;
    const sig = signatureOf(log.message);
    const key = `${log.level}::${sig}`;
    const existing = map.get(key);
    if (existing) {
      existing.frequency += 1;
      existing.lastSeen = log.timestamp ?? existing.lastSeen;
      if (existing.samples.length < 3) existing.samples.push(log.message);
    } else {
      map.set(key, {
        id: key,
        signature: sig,
        level: log.level,
        frequency: 1,
        firstSeen: log.timestamp,
        lastSeen: log.timestamp,
        samples: [log.message],
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.frequency - a.frequency);
};

export default groupLogs;
