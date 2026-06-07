import axios from 'axios'
import {API_BASE_URL} from "./config"

const api= axios.create({baseURL:API_BASE_URL
})

export interface AnalysisResult {
  summary: string;
  severity: string;
  suggestedFix: string;
  frequency: number;
}

const findAnalysis = async (values: string): Promise<AnalysisResult> => {
    try {
        const res = await api.post<AnalysisResult>("logs/analyze", { logs: values });
        return res.data;
    } catch(error) {
        console.log("Error analyzing logs");
        throw error;
    }
}

export const ingestlog=async(file:File)=>{
        const formData = new FormData();
          formData.append("upload_file", file);
          const response = await api.post("logs/upload",formData);
          return response;
}

export default findAnalysis