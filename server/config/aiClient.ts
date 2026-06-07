import {AzureOpenAI} from "openai";

import dotenv from "dotenv";

dotenv.config();

export const aiClient = new AzureOpenAI({
  endpoint: process.env.AZURE_OPENAI_ENDPOINT!,
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
  apiVersion: "2024-12-01-preview",
});
