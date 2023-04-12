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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
let MyCredentials;
MyCredentials = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "MiniAMP"
};
const dbConnections = mysql_1.default.createConnection(MyCredentials);
try {
    dbConnections.connect();
}
catch (error) {
    console.log("Error: Could not connect", error);
}
function createName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        let queryString = `INSERT into player (name) VALUES (${mysql_1.default.escape(name)})`;
        return new Promise((resolve, reject) => {
            dbConnections.query(queryString, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    });
}
function GetAllData() {
    return __awaiter(this, void 0, void 0, function* () {
        let queryString = `SELECT * FROM player`;
        return new Promise((resolve, reject) => {
            dbConnections.query(queryString, (err, result) => {
                if (err)
                    reject(err);
                resolve(JSON.parse(JSON.stringify(result[2]))); //gets row from index (if: no index "returns all rows")
            });
        });
    });
}
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const WebSocket = __importStar(require("ws"));
const app = (0, express_1.default)();
const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });
webSocketServer.on('connection', (webSocket) => {
    webSocket.on('message', (message) => {
        console.log("Message from client :: " + message);
        webSocket.send("Echo :: " + message);
    });
    webSocket.send("Welcome to chat !!");
});
server.listen(process.env.PORT || 8080, () => {
    console.log('Server started');
});
exports.default = {
    mysql: dbConnections,
    createName,
    GetAllData
};
//# sourceMappingURL=dbconnections.js.map