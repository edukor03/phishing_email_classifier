import express from "express";
import multer from "multer";
import { Dashboard, Upload, HandleUpload } from "../controllers/dashboardController.js";

const router = express.Router();
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req,file,cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// Define route here
router.get("/", Dashboard);
router.get("/upload", Upload);
router.post("/upload",
    upload.single("dataset"),
    HandleUpload
);

// Export routes
export default router;