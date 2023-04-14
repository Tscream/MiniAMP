"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const WebSocket = __importStar(require("ws"));
const body_parser_1 = __importDefault(require("body-parser"));
const dbconnections_1 = __importDefault(require("./dbconnections"));
const app = (0, express_1.default)();
const port = 1337;
app.use(body_parser_1.default.json());
const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });
// interface iPlayer {
//     id: number,
//     name?: string,
//     head: string,
//     body: string,
//     legs: string,
//     xPos: number,
//     yPos: number
// }
webSocketServer.on('connection', (webSocket) => {
    webSocket.on('message', (message) => {
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
                        dbconnections_1.default.query(`SELECT name FROM player WHERE id = ?`, [request.data], function (err, result) {
                            if (err)
                                throw err;
                            webSocket.send(`Player with id ${request.data} has name ${result[0].name}`);
                            console.log("Result data :: ", result[0].name);
                        });
                        break;
                    }
                    case "create_Player": {
                        dbconnections_1.default.query(`INSERT INTO player (name) VALUES (?)`, [request.data], function (err, result) {
                            if (err)
                                throw err;
                            webSocket.send(`Player created with id ${result.insertId} and name ${request.data}`);
                            console.log("Result data :: ", result.insertId);
                        });
                        break;
                    }
                    case "echo": {
                        webSocket.send(`Echo:: ${request.data}`);
                        break;
                    }
                    default: {
                        console.log(request);
                        break;
                    }
                }
            }
            else {
                throw "No type";
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
    console.log(`listening on ${port}`);
});
//# sourceMappingURL=index.js.map