import { Request, Response } from "express";
import File from "../services/File";
import { validateFile, validateFileQuery } from "../utils/validator";
const fileService = new File();

export async function receiveFile(req: Request, res: Response){
    const {success, message} = await fileService.receiveFile(req.file as Express.Multer.File);
    if (!success) {
        console.error("Error in receive file. Error message: ", message);
        return res.status(500).send("Internal server error");
    }
    return res.send({fileId: req.file?.filename});
}

export async function deleteFile(req: Request, res: Response){

}

export async function getFiles(req: Request, res: Response){
    const result = validateFileQuery(req.params);
    if (!result.ok) return res.status(400).send(result.message);
    try {
        const files = await fileService.getFiles(result.value);
        return res.send(files);
    } catch(err){
        console.error("Error in receive file. Error message: ", (err as Error).message);
        return res.status(500).send("Internal server error");
    }
}

export async function getFile(req: Request, res: Response){
    const result = validateFile(req.params);
    if (!result.ok) return res.status(400).send(result.message);
    const {status, message, data} = await fileService.getFile(result.value.id);
    if (status === 200){
        return res.send(data);
    }
    res.status(status).send(message);
}