import config from "../config"
import mysql from "mysql";


export function getUser(id: Number){
    const connection = mysql.createConnection(config.dbConfig);
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM users WHERE id = ?", [id], (error, results) => {
            connection.end();
            if (error) reject(error);
            if (results.length > 0) resolve(results[0])
            reject("No user with given id");
        })
    })
}

export function insertUser(password: string, callback: Function){
    const connection = mysql.createConnection(config.dbConfig);
    connection.query("INSERT INTO users (password) VALUES (?) ", [password], (error, results) => {
        connection.end()
        if (error) throw error;
        return callback(results.insertId);
    })
}