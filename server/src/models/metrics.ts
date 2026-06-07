import mongoose from "mongoose";

const MetricsSchema=new mongoose.Schema({
    totalLogs: Number,
    totalErrors: Number,
    totalWarns: Number,
    uniqueIncidents: Number,

})

const Metrics=mongoose.model("Metrics",MetricsSchema);
export default Metrics;