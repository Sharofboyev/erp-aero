import express from "express";
import {
  deleteFile,
  receiveFile,
  getFiles,
  getFile,
  downloadFile,
  updateFile
} from "../controllers/file";
import multer from "multer";
import fileValidator from "../middlewares/fileValidator";
const upload = multer({ dest: "files/" });

const router = express.Router();

router.post("/upload", fileValidator, upload.single("file"), receiveFile);
router.get("/list", getFiles);
router.delete("/delete/:id", deleteFile);
router.get("/:id", getFile);
router.get("/download/:id", downloadFile);
router.put("/update/:id", upload.single("file"), updateFile);

export default router;
