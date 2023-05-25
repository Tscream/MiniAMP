import mysql from "mysql";

enum ObjectType
{
    PLAYER = "player",
    CLOTHING = "clothing"
}

interface MyCredentials {
    host: string,
    user: string,
    password: string,
    database: string
}

interface iPlayer {
    id?: number,
    name?: string,
    head?: string,
    body?: string,
    legs?: string,
    xPos?: number,
    yPos?: number
}

interface iClothes {
    id?: number,
    name?: string,
    path?: string,
    type?: string,
    winter?: boolean,
    summer?: boolean
}

let MyCredentials: MyCredentials = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "MiniAMP"
}

const db = mysql.createConnection(MyCredentials);

try {
    db.connect(()=>{
        db.query(`
            CREATE TABLE IF NOT EXISTS \`player\` (
                \`id\` INT NOT NULL AUTO_INCREMENT,
                \`name\` VARCHAR(255) DEFAULT 'noname',
                \`head\` TEXT DEFAULT '',
                \`body\` TEXT DEFAULT '',
                \`legs\` TEXT DEFAULT '',
                \`xPos\` INT DEFAULT 0,
                \`yPos\` INT DEFAULT 0,
                PRIMARY KEY (id)
            );`
        );
        
        db.query(`
            CREATE TABLE IF NOT EXISTS \`clothing\` (
                \`id\` INT NOT NULL AUTO_INCREMENT,
                \`name\` VARCHAR(255) DEFAULT 'noname',
                \`path\` TEXT DEFAULT '',
                \`type\` TEXT DEFAULT '',
                \`path\` TEXT DEFAULT '',
                \`winter\` BOOLEAN DEFAULT false,
                \`summer\` BOOLEAN DEFAULT false,
                PRIMARY KEY (id)
            );`
        );
    });
} catch (error) {
    console.log("Error: Could not connect", error)
    throw "NO DB CONNECTION"
}

export async function CreatePlayer(player: iPlayer): Promise<any> {
    let queryString = `INSERT into player (name) VALUES (?)`;
    return new Promise((resolve, reject) => {
        db.query(queryString, [player.name], (err, result) => {
            if (err) reject(err);
            resolve(result)
        })
    })
}

export async function CreateClothing(clothing: iClothes): Promise<any> {
    let queryString = `INSERT into clothing (name, type, winter, summer) VALUES (?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
        db.query(queryString, [clothing.name, clothing.type, clothing.winter, clothing.summer], (err, result) => {
            if (err) reject(err);
            resolve(result)
        })
    })
}

export async function GetAllPlayers(): Promise<Array<iPlayer>> {
    let queryString = `SELECT * FROM player LIMIT 100`;
    return new Promise((resolve, reject) => {
        db.query(queryString, (err, result) => {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}

export async function GetPlayer(id:number): Promise<iPlayer> {
    if(id <  1)
        id = 1;
    let queryString = `SELECT * FROM player WHERE id = ? LIMIT 1`;
    return new Promise((resolve, reject) => {
        db.query(queryString, [id], (err, result) => {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result[0]) //return obj here json stringify it in the route
        })
    })
}

export async function GetClothing(id:number): Promise<iClothes> {
    if(id <  1)
        id = 1;
    let queryString = `SELECT * FROM clothing WHERE id = ? LIMIT 1`;
    return new Promise((resolve, reject) => {
        db.query(queryString, [id], (err, result) => {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result[0]) //return obj here json stringify it in the route
        })
    })
}

export async function GetObject<T>(id:number, type:ObjectType): Promise<T> {
    if(id <  1)
        id = 1;
    let queryString = `SELECT * FROM ${type} WHERE id = ? LIMIT 1`;
    return new Promise((resolve, reject) => {
        db.query(queryString, [id], (err, result) => {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result[0]) //return obj here json stringify it in the route
        })
    })
}

export default db