import { addFile, getFiles, getFile } from "../models/file";

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

    async getFiles({list_size, page}: {list_size: number, page: number}){
        const limit = list_size;
        const offset = list_size * (page - 1);
        let files = await getFiles(limit, offset);
        return files;
    }

    async getFile(id: string){
        try {
            let files = await getFile(id);
            if (files.length === 0){
                return {status: 404, message: "File with given id not found"};
            }
            return {status: 200, data: files[0]}
        }catch (err){
            return {status: 500, message: (err as Error).message};
        }
    }
}