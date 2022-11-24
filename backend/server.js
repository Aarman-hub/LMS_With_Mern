import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import csrf from 'csurf';
dotenv.config();

import connectDB from './config/db.js';

import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';

const app = express();

const csrfProtection = csrf({cookie:true});



connectDB();

//Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser())


//Route
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);


//csrf
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});



const port = process.env.PORT || 8000



app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});

