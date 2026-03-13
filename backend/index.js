import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { userRouter } from './Routes/useroute.js';
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { VerifyToken } from './Middlewares/verifyToken.js';
import { SocketRoutes } from './Sockets/userSocketRoute.js';
const app  = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, { cors: { origin: [
  'http://localhost:5173'
] } });

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
export const Users = []

io.on('connection', (socket) => {
  console.log(`socket connected`, socket.id)
  socket.on('disconnect', () => {
      for (const userId in Users) {
        if (Users[userId] === socket.id) {
          delete Users[userId];
          break;
        }
      }
      console.log('user disconnected', Users);
    })
    socket.on("register-user", (userId) => {
      Users[userId] = socket.id;
      socket.emit(`registered-user-successfully`, userId)
    });
    SocketRoutes(socket, io)
});


app.use(cookieParser())
app.use(cors({
    origin: `http://localhost:5173`,
    credentials: true
}));
app.use(express.urlencoded({extended:true, limit: "50mb"}))
app.use(bodyParser.json());
app.use(express.static(`/frontend`))
app.use(`/api/users`,userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!');
});


mongoose.connect(process.env.MONGO_URI,)
.then(()=>{
  console.log(`Mongoose connected`)
  httpServer.listen(3000, () => {
    console.log('Server is running on port 3000');
  });  
})
.catch(err=>{console.log(err)})