import express from "express"
import Metrics from "../models/metrics.js";
const router=express.Router();

router.post("/savemetrics",async (req,res)=>
{
    try
    {
    const newMetrics= new Metrics(req.body);
    await newMetrics.save();
    res.status(200).json({metrics:newMetrics});
    }
    catch(err)
    {
        res.status(500).send(`Error saving metrics ${err}`);
    }
})

export default router;