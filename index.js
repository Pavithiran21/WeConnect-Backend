import express  from "express";
import cors from "cors";
import {Server} from 'socket.io';
import * as http from 'http';
import dotenv from "dotenv";
import { connectDB } from "./Middlewares/DB.js";
import userRoute from './Routes/userRoute.js';
import chatRoute from './Routes/chatRoute.js';
import messageRoute from './Routes/messageRoute.js'
dotenv.config();

const PORT=process.env.PORT || 4553;
// const ORGIN=process.env.orgin;
const app=express();
app.use(cors());


connectDB();
const server= http.createServer(app);



app.use(express.json());
app.use('/api/users',userRoute)
app.use('/api/message',messageRoute)
app.use('/api/chat',chatRoute)

server.listen(PORT, () => {
  console.log(`Server running at Port  ${PORT}`);
});

const io = new Server(server,{
  cors: {
    origin: 'http://localhost:3000',
  },
});

let users = [];





io.on('connection', socket => {
    console.log('User connected', socket.id);

    socket.on('addChat', id => {
        const isUserExist = users.find(user => user.id === id);
        console.log(isUserExist);
        if (!isUserExist) {
            const user = { id, socketId: socket.id };
            users.push(user);
            io.emit('getUsers', users);
        }
    });

});






