import config from "../config";
import mysql from "mysql";
const connection = mysql.createConnection(config.dbConfig);
connection.query(`CREATE TABLE IF NOT EXISTS users (id VARCHAR(1024), password VARCHAR(1024))`)
connection.query(`CREATE TABLE IF NOT EXISTS tokens (token VARCHAR(2096), expiration DATETIME)`)

// This line will immediatly register signal handler. Only one
//connection will serve to the app. Whenever app terminates, connection will be closed.
process.on("SIGINT", () => {
  process.exit();
});

process.on("exit", () => {
  connection.end();
});

export function getUser(id: string) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE id = ?",
      [id],
      (error, results) => {
        if (error) reject(error);
        if (results.length > 0) return resolve(results[0]);
        reject(new Error("No user with given id"));
      }
    );
  });
}

export function insertUser(id: string, password: string) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO users (id, password) VALUES (?, ?) ",
      [id, password],
      (error, results) => {
        if (error) return reject(error);
        return resolve(results.insertId);
      }
    );
  });
}

export function addToken(token: string): Promise<void | string> {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO tokens (token) VALUES (?)",
      [token],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve();
      }
    );
  });
}

export function validateToken(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) AS counter FROM tokens WHERE token = ?",
        [token],
        (error, result) => {
          if (error) {
            reject(error);
          }
          else if (result[0].counter > 0){
            reject(new Error("This token is no more valid"));
          }
          resolve();
        }
      );
    });
  }