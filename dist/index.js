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
const testpage_1 = __importDefault(require("../testpage"));
// const ip = require("ip");
const bodyParser = require('body-parser');
// const addr = ip.address();
const app = (0, express_1.default)();
const port = 1337;
// const multer = require('multer');
// const upload = multer();
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", testpage_1.default);
app.listen(port);
// console.log(`Server started and running on http://${addr}:${port}`)
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
//# sourceMappingURL=index.js.map