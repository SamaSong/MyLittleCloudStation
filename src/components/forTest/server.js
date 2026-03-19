import { WebSocketServer } from 'ws';

const server = new WebSocketServer({ port: 3000 });
server.on('connection', ws => {
  console.log('Client connected');
  ws.on('message', message => console.log('Received:', message.toString()));
  ws.send('Hello from server');
});
console.log('WebSocket server running at ws://localhost:3000');
