import mysql from "mysql";

interface MyCredentials {
    host: string,
    user: string,
    password: string,
    database: string
}

// interface iPlayer {
//     id: number,
//     name?: string,
//     head: string,
//     body: string,
//     legs: string,
//     xPos: number,
//     yPos: number
// }

let MyCredentials: MyCredentials = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "MiniAMP"
}

const db = mysql.createConnection(MyCredentials);

try {
    db.connect();
} catch (error) {
    console.log("Error: Could not connect", error)
    throw "NO DB CONNECTION"
}

// export async function CreatePlayer(player: iPlayer): Promise<any> {
//     let queryString = `INSERT into player (name) VALUES (${mysql.escape(player.name)})`
//     return new Promise((resolve, reject) => {
//         db.query(queryString, (err, result) => {
//             if (err) reject(err);
//             resolve(result)
//         })
//     })
// }

// export async function GetAllPlayers(): Promise<Array<iPlayer>> {
//     let queryString = `SELECT * FROM player`
//     return new Promise((resolve, reject) => {
//         db.query(queryString, (err, result) => {
//             if (err) {
//                 console.error(err)
//                 reject(err)
//             }

//             resolve(result)
//         })
//     })

// }

// export async function GetPlayer(id:number): Promise<iPlayer> {
//     let queryString = `SELECT * FROM player WHERE id = ${mysql.escape(id)} LIMIT 1`
//     return new Promise((resolve, reject) => {
//         db.query(queryString, (err, result) => {
//             if (err) {
//                 console.error(err)
//                 reject(err)
//             }

//             resolve(result[0]) // return obj here json stringify it in the route
//         })
//     })

// }

export default db