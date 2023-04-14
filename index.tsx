import express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

import bodyParser from 'body-parser';
import db from './dbconnections';

const app = express();
const port = 1337;

app.use(bodyParser.json());

const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });

interface SocketRequest {
    type: string,
    data: any
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

webSocketServer.on('connection', (webSocket: WebSocket) => {

    webSocket.on('message', (message: string) => {

        try {
            let request = JSON.parse(message);

            if (request.type) {

                console.log("Request type :: ", request.type);
                console.log("Request data :: ", request.data);

                switch (request.type) {

                    // case "get_PlayerName": {
                    //     db.query(`SELECT name FROM player WHERE id = ? LIMIT 1`, [request.data], function (err: any, result: [{ name: string }], fields: any) {

                    //         let names = result.map((res) => { return res.name })

                    //         if (err) throw err;
                    //         webSocket.send(`Player with id ${request.data} has name ${names[0]}`);
                    //         console.log("Result data :: ", names[0])
                    //     });

                    //     break;
                    // }

                    case "get_PlayerName": {
                        db.query(`SELECT name FROM player WHERE id = ?`, [request.data], function (err, result) {

                            if (err) throw err;
                            webSocket.send(`Player with id ${request.data} has name ${result[0].name}`);
                            console.log("Result data :: ", result[0].name);
                        });

                        break;
                    }

                    case "create_Player": {
                        db.query(`INSERT INTO player (name) VALUES (?)`, [request.data], function (err, result) {
                            if (err) throw err;
                            webSocket.send(`Player created with id ${result.insertId} and name ${request.data}`);
                            console.log("Result data :: ", result.insertId)
                        });

                        break;
                    }

                    case "echo": {
                        webSocket.send(`Echo:: ${request.data}`);
                        break;
                    }

                    default: {
                        console.log(request)
                        break;
                    }

                }

            }
            else {
                throw "No type"
            }

        }
        catch (e) {
            console.error(e)
            webSocket.send(`Error ${e}`);
        }

    });

    webSocket.send("Connected..");

});

server.listen(port, () => {
    console.log(`listening on ${port}`)
});