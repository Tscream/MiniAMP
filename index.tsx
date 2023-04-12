import express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import testpage from './testpage'
// const ip = require("ip");
const bodyParser = require('body-parser');

// const addr = ip.address();
const app = express();
const port = 1337;

// const multer = require('multer');
// const upload = multer();

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", testpage);

app.listen(port)
// console.log(`Server started and running on http://${addr}:${port}`)





// const server = http.createServer(app);
// const webSocketServer = new WebSocket.Server({ server });

// webSocketServer.on('connection', (webSocket: WebSocket) => {
//   webSocket.on('message', (message: string) => {
//     console.log("Message from client :: " + message);
//     // webSocket.send("Echo :: " + message);
//   });

//   // webSocket.send("Welcome to chat !!");

// });

// webSocketServer.on('listening', () =>{
//   console.log('listening on 8080')
// })


// server.listen(process.env.PORT || 8080, () => {
//   console.log('Server started');
// });