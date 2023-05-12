import express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

import bodyParser from 'body-parser';
import db, { CreatePlayer, GetAllPlayers, GetPlayer } from './dbconnections';

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

    webSocket.on('message', async (message: string) => {

        try {
            let request:SocketRequest = JSON.parse(message);

            if (!request.type) 
                throw "No type";

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
                    if(isNaN(request.data))
                        throw 'not a number';
                    let player = await GetPlayer(request.data);

                    //webSocket.send(`Player with id ${request.data} has name ${player.name}`);
                    webSocket.send(JSON.stringify(player));
                    console.log("Result data :: ", player.name);
                    break;
                }

                case "create_Player": {
                    let player = await CreatePlayer({
                        name: request.data
                    });

                    webSocket.send(`Player created with id ${player.id} and name ${player.name}`);
                    console.log("Result data :: ", player.id)
                    break;
                }

                case "list_Players": {
                    let players = await GetAllPlayers();

                    //webSocket.send(`All players in DB :: ${JSON.stringify(players)}`);
                    webSocket.send(JSON.stringify(players));
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
        catch (e) {
            console.error(e);
            webSocket.send(`Error ${e}`);
        }

    });

    webSocket.send("Connected..");

});

server.listen(port, () => {
    console.log(`listening on ${port}`)
});