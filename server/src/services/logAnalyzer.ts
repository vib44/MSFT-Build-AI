import { aiClient } from "../../config/aiClient.js";
import { AzureOpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

export async function analyzeLogs(logs: string | null) {
    const userContent = logs ?? "";

    const response = await aiClient.chat.completions.create({

        messages: [
            {
                role: "system",
                content: "Return ONLY valid JSON with keys: summary, severity,frequency, suggestedFix.Map frquency to count variable seen in the issues provided in logs to frequency.Severity should be one of low, medium, high or critical based on the content of logs.Summary should be concise and less than 500 characters.Suggested fix should be concise and less than 500 characters."
                },
            {
                role: "user",
                content: userContent,
            }
        ],
        model: process.env.AZURE_DEPLOYMENT_NAME!,
        max_completion_tokens: 16384
    });
    
    const content = response.choices[0]?.message?.content ?? "";
    try {
        const parsed = JSON.parse(content);
        const freq = Number(parsed.frequency) || 0;
        
        return ({
            summary: parsed.summary ?? "",
            severity: parsed.severity ?? "",
            suggestedFix: parsed.suggestedFix ?? "",
            frequency: freq
        })
    }
    catch {
        return ({
            summary: "none",
            severity: "unknown",
            suggestedFix: "Failed to parse AI response",
            frequency: 0
        })
    }

}