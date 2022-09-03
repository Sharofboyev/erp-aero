import { Request, Response } from "express";
import File from "../services/File";
import { validateFile, validateFileQuery } from "../utils/validator";
import path from "path";
const fileService = new File();

export async function receiveFile(req: Request, res: Response) {
  const { success, message } = await fileService.receiveFile(
    req.file as Express.Multer.File
  );
  if (!success) {
    console.error("Error in receive file. Error message: ", message);
    return res.status(500).send("Internal server error");
  }
  return res.send({ fileId: req.file?.filename });
}

export async function deleteFile(req: Request, res: Response) {
  const result = validateFile(req.params);
  if (!result.ok) return res.status(400).send(result.message);
  let { success, message } = await fileService.deleteFile(result.value.id);
  if (success) return res.send("Success");
  return res.status(500).send(message);
}

export async function getFiles(req: Request, res: Response) {
  const result = validateFileQuery(req.params);
  if (!result.ok) return res.status(400).send(result.message);
  try {
    const files = await fileService.getFiles(result.value);
    return res.send(files);
  } catch (err) {
    console.error(
      "Error in receive file. Error message: ",
      (err as Error).message
    );
    return res.status(500).send("Internal server error");
  }
}

export async function getFile(req: Request, res: Response) {
  const result = validateFile(req.params);
  if (!result.ok) return res.status(400).send(result.message);
  const { status, message, data } = await fileService.getFileInfo(
    result.value.id
  );
  if (status === 200) {
    return res.send(data);
  }
  res.status(status).send(message);
}

export async function downloadFile(req: Request, res: Response) {
  const result = validateFile(req.params);
  if (!result.ok) return res.status(400).send(result.message);
  const { status, message, data, fileExists } = await fileService.getFileInfo(
    result.value.id
  );
  if (status === 200) {
    if (fileExists) {
      return res.sendFile(path.resolve(__dirname + `/../../files/${data.id}`));
    } else return res.status(500).send("File deleted from local storage");
  }
  res.status(status).send(message);
}

export async function updateFile(req: Request, res: Response) {
  const result = validateFile(req.params);
  if (!result.ok) return res.status(400).send(result.message);
  const { success, message } = await fileService.updateFile(
    req.file as Express.Multer.File,
    result.value.id
  );
  if (!success) {
    console.error("Error in updating file. Error message: ", message);
    return res.status(500).send("Internal server error");
  }
  return res.send("Success");
}
