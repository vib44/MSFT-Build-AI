import express from "express"
import {analyzeLogs} from "../services/logAnalyzer.js";
import multer from "multer";
import fs from 'fs/promises' 

const router= express.Router();

const upload = multer({dest: "src/uploads/",
     limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/analyze",async (req,res)=>
{
    try {
       
        const result= await analyzeLogs(req.body.logs);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({message:`Cant analyze logs ${error}`})
          }
})


router.post("/upload",upload.single("upload_file"),async (req, res) => {
    const filePath = req.file?.path;
    try
    {
    
    const content= await fs.readFile(req.file!.path, "utf-8")
    res.status(200).json({file: req.file, content: content});
    }
    catch(error)
        {res.status(404).json({message: `Unable to upload file ${error})`})}
    finally {
      if (filePath) {
        try {
          await fs.unlink(filePath);
          console.log("Deleted:", filePath);
        } catch (err) {
          console.error("Delete failed:", err);
        }
      }
      }
}
);
export default router;