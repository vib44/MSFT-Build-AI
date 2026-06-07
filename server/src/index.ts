import express from "express";
import cors from "cors";
import connectDb from "../config/dbConfig.js"; 
import dotenv from "dotenv";
import analyze from "./routes/analyze.js"
import saveMetrics from "./routes/saveMetrics.js"
import rateLimit from "express-rate-limit"
import path from "path";
import { fileURLToPath } from "url";

const clientBuildPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../client/dist"
);

const app=express();
dotenv.config();
connectDb();
app.use(cors());

const limiter= rateLimit({
    windowMs: 15*60*1000,
    limit: 100,
    message: "Too many requests , please try again after 15 minutes"
})

app.use(limiter);
app.use(express.json());

app.use("/logs",analyze);
app.use("/logs",saveMetrics);
app.get("/health",(_,res)=>{
    res.send("Server running");
})

app.use(express.static(clientBuildPath));

app.use((req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});


app.listen(5000,()=>{
    console.log("Server started");
})