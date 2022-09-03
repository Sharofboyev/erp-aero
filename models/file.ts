import connection from "./connection";
import { CustomFile } from "../services/File";

export function addFile(file: CustomFile): Promise<void> {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO files (id, name, extension, mime_type, size) VALUES (?, ?, ?, ?, ?)",
      [
        file.filename,
        file.originalname,
        file.extension,
        file.mimetype,
        file.size
      ],
      (err) => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
}

export function deleteFile(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM files WHERE id = ?", [id], (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

export function getFiles(limit: number, offset: number): Promise<void> {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM files ORDER BY pkey ASC LIMIT ? OFFSET ?",
      [limit, offset],
      (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

export function getFile(id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM files WHERE id = ?",
      [id],
      (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

export function updateFile(file: CustomFile): Promise<void> {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE files SET name = ?, extension = ?, mime_type = ?, size = ? WHERE id = ?",
      [
        file.originalname,
        file.extension,
        file.mimetype,
        file.size,
        file.filename
      ],
      (err) => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
}
