<<<<<<< HEAD
import {
  addFile,
  getFiles,
  getFile,
  deleteFile,
  updateFile
} from "../models/file";
import fs from "fs";

export type CustomFile = Express.Multer.File & { extension?: string };

export default class FileHandler {
  async receiveFile(file: CustomFile) {
    try {
      const originalName = file.originalname.split(".");
      const extension = originalName[originalName.length - 1];
      file = { ...file, extension };
      addFile(file);
      return { success: true };
    } catch (err) {
      return { success: false, message: (err as Error).message };
    }
  }

  async deleteFile(id: string) {
    try {
      await deleteFile(id);
      if (fs.existsSync(`files/${id}`)) fs.unlinkSync(`files/${id}`);
      return { success: true };
    } catch (err) {
      return { success: false, message: (err as Error).message };
    }
  }

  async getFiles({ list_size, page }: { list_size: number; page: number }) {
    const limit = list_size;
    const offset = list_size * (page - 1);
    let files = await getFiles(limit, offset);
    return files;
  }

  async getFileInfo(id: string) {
    try {
      let files = await getFile(id);
      if (files.length === 0) {
        return { status: 404, message: "File with given id not found" };
      }
      return {
        status: 200,
        data: files[0],
        fileExists: fs.existsSync(`files/${files[0].id}`)
      };
    } catch (err) {
      return { status: 500, message: (err as Error).message };
    }
  }

  async updateFile(file: CustomFile, id: string) {
    try {
      await new Promise((resolve, reject) => {
        fs.unlink(`files/${id}`, (err) => {
          if (err) reject(err);
          fs.rename(`files/${file.filename}`, `files/${id}`, (err) => {
            if (err) reject(err);
            resolve(true);
          });
        });
      });

      const originalName = file.originalname.split(".");
      const extension = originalName[originalName.length - 1];
      file = { ...file, extension, filename: id };
      updateFile(file);
      return { success: true };
    } catch (err) {
      return { success: false, message: (err as Error).message };
    }
  }
}
=======
import { addFile } from "../models/file";

export type CustomFile = Express.Multer.File & {extension?: string};

export default class FileHandler{
    async receiveFile(file: CustomFile){
        try {
            const originalName = file.originalname.split(".");
            const extension = originalName[originalName.length - 1];
            file = {...file, extension};
            addFile(file)
            return {success: true}
        }
        catch (err){
            return {success: false, message: (err as Error).message};
        }
    }

    async deleteFile(file: File){
        try {
            
            return {success: true}
        }
        catch (err){
            return {success: false, message: (err as Error).message};
        }
    }
}
>>>>>>> 82b42829dd4754092e032e1ebffb54623428b449
