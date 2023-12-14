import express from 'express';
import { AllChats, DeleteChat, NewChat, viewChat} from '../Controllers/chatController.js';
import { Authenticate } from '../Middlewares/Authenticate.js';


const router = express.Router();

router.post('/chat-dashboard',Authenticate,NewChat);
router.get('/all-chats',Authenticate,AllChats);
router.delete('/delete-chat/:id',Authenticate,DeleteChat);
router.get('/view-chat/:id',Authenticate,viewChat)



export default router;
