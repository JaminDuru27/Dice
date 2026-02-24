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
const app  = express();
const httpServer = createServer(app);
// const io = new Server(httpServer, { cors: { origin: '*' } });

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