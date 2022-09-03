import { Request, Response } from "express";
import File from "../services/File";
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