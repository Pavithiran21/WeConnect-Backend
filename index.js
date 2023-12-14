import express  from "express";
import cors from "cors";
import {Server} from 'socket.io';
import * as http from 'http';
import dotenv from "dotenv";
import User from './Models/UserModel.js';
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


const addUsers =(userId,socketId)=>{
  const existing = users.find(user =>user.userId === userId);
  if(!existing){
    users.push({socketId,userId});
  }
}

const removeUsers = (socketId) =>{
  users.filter((user) => user.socketId !== socketId);
}

const getUsers = (userId) =>{
  return users.find((user)=>user.userId === userId);
}


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
    socket.on('sendMessage', ({ sender, message, chatId}) => {
        // Find the sockets of the sender and receiver
        
        const senderSocket = users.find((users) => users.id === sender)?.(socket.id);
        // const receiverSocket = users.find((user) => user.id === receiverId)?.socketId;
        console.log(senderSocket);
      
        if (senderSocket) {
          io.to(senderSocket).emit('getMessage', {
            sender,
            message,
            chatId,
          });

          io.to(receiverSocket).emit('getMessage', {
            sender,
            message,
            chatId,
          });
        } else {
          console.log('Sender or receiver not found.');
        }
    });
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('getUsers', users);
    });
});






