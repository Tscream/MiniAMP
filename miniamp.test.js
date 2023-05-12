const { WebSocket } = require('ws');
const conn = new WebSocket('ws://localhost:1337');

conn.on('error', console.error);

conn.on('open', ()=>{
    console.log('Connected to socket');
    conn.send(JSON.stringify({
        type: 'get_PlayerName',
        data: "0"
    }));
})

conn.on('message', (msg)=>{
    console.log(`Message recv: ${msg}`)
});