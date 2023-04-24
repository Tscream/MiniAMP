import mysql from "mysql"

interface MysqlCredentials {
    host: string
    socketPath?: string
    user: string
    password: string
    database: string
}

let dbCredentials = {
    host: "localhost",
    user: "root",
    password: "",
    database: "example",
}

interface iPlayer {
    id: number,
    name?: string,
    head?: string,
    body?: string,
    legs?: string,
    xPos?: number,
    yPos?: number
}

const db =  mysql.createConnection(dbCredentials);

try{
    db.connect();
}catch(e){
    console.error(e)
}


