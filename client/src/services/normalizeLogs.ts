export interface NormalizedLogs

{   source: string;
    timestamp: string;
    level: "ERROR" | "WARN" | "INFO" | "DEBUG";
    message: string;
}

const normalizeLogs =  (response: { data: 
  { content: string; file: { originalname: string } } }): NormalizedLogs[] => {
  let normalized: NormalizedLogs[] = [];

  const lines : string[] = response.data.content.split(/\r?\n/) ;
  for(let line of lines)
  {
    let level: NormalizedLogs['level'] | undefined;

    if(line.toUpperCase().includes("ERROR"))
      level="ERROR";
    else if(line.toUpperCase().includes("WARN"))
      level="WARN";
    else if(line.toUpperCase().includes("INFO"))
      level="INFO";
    else if(line.toUpperCase().includes("DEBUG"))
      level="DEBUG";
    else
      continue;

    const timestamp= extractTimestamp(line);
    const message = line
    .replace(timestamp, "")
    .replace(level, "")
    .trim();
    normalized.push({
      source: response.data.file.originalname,
      timestamp: timestamp,
      level: level!,
      message: message,
    })
  }
  return normalized;
}

function extractTimestamp(line: string): string {
    const patterns : RegExp[]= [
        /\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?/,
        /\d{2}\/\d{2}\/\d{4}/,
        /\d{2}-\w{3}-\d{4}/, 
    ];

    for (const pattern of patterns) {
        const match = line.match(pattern);

        if (match) {
            return match[0];
        }
    }

    return "";
}
export default normalizeLogs