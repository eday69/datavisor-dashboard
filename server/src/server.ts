import WebSocket, { WebSocketServer } from 'ws';
import { faker } from '@faker-js/faker';

const PORT = 3000; // Todo: add to .env file
const DEFAULT_INTERVAL = 2000;

// Create a WebSocket server
const wss = new WebSocketServer({
  port: PORT,
});

wss.on("connection", (ws) => {
  console.log("Client connected");

  const generateRandomNumbers = () => {
    if (ws.readyState === WebSocket.OPEN) {
      const data = {
        id: faker.string.uuid(),
        isbn: faker.commerce.isbn({ variant: 13, separator: '' }),
        author: faker.person.fullName(),
        price: faker.commerce.price(),
        timestamp: new Date().toISOString()
      };
      ws.send(JSON.stringify(data));
    }
  };
  // Default interval is 1 second
  let timer = setInterval(generateRandomNumbers, DEFAULT_INTERVAL);
});

console.log(`WebSocket server listening on port ${PORT}`);
