import express from "express";
import {
  deleteFile,
  receiveFile,
  getFiles,
  getFile,
  downloadFile,
  updateFile
} from "../controllers/file";

const router = express.Router();

router.post("/upload", receiveFile);
router.get("/list", getFiles);
router.delete("/delete/:id", deleteFile);
router.get("/:id", getFile);
router.get("/download/:id", downloadFile);
router.put("/update/:id", updateFile);

export default router;
