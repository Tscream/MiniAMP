import express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

import bodyParser from 'body-parser';
import db, { GetPlayer } from './dbconnections';
import { walkUpBindingElementsAndPatterns } from 'typescript';

const app = express();
const port = 1337;

app.use(bodyParser.json());

const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });

interface SocketRequest {
    type: string,
    data: any
}

webSocketServer.on('connection', (webSocket: WebSocket) => {

    webSocket.on('message', async (message: string) => {

        try {
            let request:SocketRequest = JSON.parse(message);
            
            if (!request.type) 
            throw "No type";
            
            console.log("Request type :: ", request.type);
            console.log("Request data :: ", request.data);
            
            switch (request.type) {
                
                case "get_Player": {
                    if(isNaN(request.data))
                        throw 'not a number';
                    let player = await GetPlayer(request.data);
        
                    webSocket.send(JSON.stringify(player));
                    console.log("Result data :: ", player);
                    break;
                }
                
                
                // case "create_Player": {
                //     let player = await CreatePlayer({
                //         name: request.data
                //     });

                //     webSocket.send(`Player created with id ${player.id} and name ${player.name}`);
                //     console.log("Result data :: ", player.id)
                //     break;
                // }
                
                // case "set_Clothing": {
                //     let clothing = await SetClothing({
                //         name: request.data
                //     });

                //     webSocket.send(`Clothing set with id ${clothing.id} and name ${clothing.name}`);
                //     console.log("Result data :: ", clothing.id)
                //     break;
                // }
                
                // case "get_Clothing": {
                //     if(isNaN(request.data))
                //         throw 'not a number';                    
                //     let clothing = await GetClothing(request.data);

                //     webSocket.send(JSON.stringify(clothing));
                //     console.log("Result data :: ", clothing.name);
                //     break;
                // }



                // case "get_Players": {
                //     let players = await GetAllPlayers();

                //     //webSocket.send(`All players in DB :: ${JSON.stringify(players)}`);
                //     webSocket.send(JSON.stringify(players));
                // }

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
    console.log(`Connected with client`)

});

server.listen(port, () => {
    console.log(`listening on ${port}`)
});