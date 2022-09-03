import express from "express";
import {deleteFile, receiveFile} from "../controllers/file";
import multer from "multer";
import fileValidator from "../middlewares/fileValidator"
const upload = multer({dest: "files/"})

const router = express.Router();

router.post("/upload", fileValidator, upload.single("file"), receiveFile);
router.get("/list", );
router.delete("/delete/:id", deleteFile);
router.get("/:id", );
router.get("/download/:id",);
router.put("/update/:id",);

export default router;