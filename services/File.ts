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