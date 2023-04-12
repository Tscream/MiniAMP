import { rejects } from "assert/strict";
import mysql from "mysql";
import { resolve } from "path";

interface MyCredentials {
    host: string,
    user: string,
    password: string,
    database: string
}

interface dbModel {
    id: number,
    name?: string,
    head: string,
    body: string,
    legs: string,
    xPos: number,
    yPos: number
}

let MyCredentials: MyCredentials
MyCredentials = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "MiniAMP"
}

const dbConnections = mysql.createConnection(MyCredentials);

try {
    dbConnections.connect();
} catch (error) {
    console.log("Error: Could not connect", error)
}

async function createName(name: string) {
    let queryString = `INSERT into player (name) VALUES (${mysql.escape(name)})`
    return new Promise((resolve, reject) => {
        dbConnections.query(queryString, (err, result) => {
            if (err) reject(err);
            resolve(result)
        })
    })
}

async function GetAllData(): Promise<dbModel> {
    let queryString = `SELECT * FROM player`
    return new Promise((resolve, reject) => {
        dbConnections.query(queryString, (err, result) => {
            if (err) reject(err)
            resolve(JSON.parse(JSON.stringify(result[2]))) //gets row from index (if: no index "returns all rows")
        })
    })

}







export default
    {
        mysql: dbConnections,
        createName,
        GetAllData
    }