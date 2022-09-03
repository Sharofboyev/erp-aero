import config from "../config";
import mysql from "mysql";
const connection = mysql.createConnection({...config.dbConfig, multipleStatements: true});
console.log("Connection with database created...");

connection.query(
  `CREATE TABLE IF NOT EXISTS users 
    (pkey SERIAL PRIMARY KEY, id VARCHAR(128) UNIQUE, password VARCHAR(72), created_time DATETIME DEFAULT NOW());`
);

connection.query(
  `CREATE TABLE IF NOT EXISTS tokens (token VARCHAR(256), expiration DATETIME)`
);

connection.query(
  `CREATE TABLE IF NOT EXISTS files 
    (pkey SERIAL PRIMARY KEY, id VARCHAR(64) UNIQUE, name VARCHAR(256), extension VARCHAR(128), mime_type VARCHAR (256), 
    size INTEGER, created_time DATETIME DEFAULT NOW())`
);

// This line will immediatly register signal handler. Only one
//connection will serve to the app. Whenever app terminates, connection will be closed.
process.on("SIGINT", () => {
  process.exit();
});

process.on("exit", () => {
  console.log("Connection with database closed...");
  connection.end();
});

export default connection;
