import express from 'express';
import {profile} from '../controllers/user.js'

const route = express.Router();

route.get('/profile', profile)

export default route;