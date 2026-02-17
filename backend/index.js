import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
const app  = express();
const httpServer = createServer(app);
// const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
});