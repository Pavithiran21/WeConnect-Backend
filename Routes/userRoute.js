import express from 'express';
import {  forgot, login, register, reset, search } from '../Controllers/userController.js';
import { Authenticate } from '../Middlewares/Authenticate.js';


const router = express.Router();

router.post('/signup',register);
router.post('/reset',forgot);
router.put('/reset/:resetToken',reset);
router.post('/login',login);
router.get('/search-user',Authenticate,search);


export default router;
