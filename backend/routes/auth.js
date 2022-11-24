import express from 'express';
import { currentUser, forgotPassowrd, getUser, resetPassowrd, sendMail, signIn, signOut, signUp } from '../controllers/auth.js';
import {requireSignin, verifyToken} from '../middlewares/index.js';

const route = express.Router();


route.post('/signin', signIn);
route.post('/signup', signUp);
route.get('/signout', signOut);
route.get('/current-user', requireSignin, getUser);
route.get('/send-mail', sendMail);
route.post('/forgot-password', forgotPassowrd);
route.post('/reset-password', resetPassowrd);

export default route;