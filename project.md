"The platform ingests operational logs from heterogeneous sources, normalizes them into a common schema, identifies incidents and anomalies, and uses Azure OpenAI to generate root-cause analysis and remediation suggestions."

## How It Works

1. Upload logs or paste log data.
2. Normalize raw logs into a structured format.
3. Group similar errors and incidents.
4. Analyze grouped incidents using Azure OpenAI.
5. Display severity, root-cause summary, and suggested fixes in a dashboard.

By grouping incidents before AI analysis, the application reduces token usage and scales better for large log volumes.

# Longer

## Log Processing Pipeline

The system ingests application logs through direct text input or file uploads. Uploaded log files are parsed line by line and transformed into a normalized structure containing fields such as timestamp, severity level, source, and message.

After normalization, similar log entries are grouped into incident clusters to reduce noise and eliminate duplicate errors. This significantly reduces the amount of data sent to the AI model, improving both performance and cost efficiency.

The grouped incidents are then analyzed using Azure OpenAI to generate:
- A concise summary of the issue
- Severity classification
- Suggested remediation steps

This approach enables efficient analysis of large log datasets while remaining scalable for future integrations with cloud logging platforms such as AWS CloudWatch, Azure Monitor, and other observability systems.