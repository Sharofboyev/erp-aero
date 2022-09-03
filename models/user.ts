import connection from "./connection";

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

export function addToken(token: string, expiration: Date): Promise<void | string> {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM tokens WHERE expiration < NOW();
        INSERT INTO tokens (token, expiration) VALUES (?, ?)`,
      [token, expiration],
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
        } else if (result[0].counter > 0) {
          reject(new Error("This token is no more valid"));
        }
        resolve();
      }
    );
  });
}
