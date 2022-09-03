import connection from "./connection";
import {CustomFile} from "../services/File";

export function addFile(file: CustomFile): Promise<void>{
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO files (id, name, extension, mime_type, size) VALUES (?, ?, ?, ?, ?)", 
            [file.filename, file.originalname, file.extension, file.mimetype, file.size], (err) => {
                if (err) return reject(err);
                return resolve();
            })
    })
}

export function deleteFile(file: CustomFile): Promise<void>{
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO files (name, extension, mime_type, size) VALUES (?, ?, ?, ?)", 
            [file.filename, file.extension, file.mimetype, file.size], (err) => {
                if (err) return reject(err);
                return resolve();
            })
    })
}