import express from 'express';
import { getMessages, sendMessage } from '../Controllers/messageController.js';
import { Authenticate } from '../Middlewares/Authenticate.js';



const router = express.Router();

router.post('/send-message',Authenticate,sendMessage);
router.get('/all-message/:chatId',Authenticate,getMessages);

export default router;
