import express from 'express';
import cors from 'cors';
import cokieParser from 'cookie-parser';

// create express app
const app =express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}));
// comman express middleware
app.use(express.json({limit: '50mb'}));  // limit the size of the payload to 50mb 
app.use(express.urlencoded({extended: true,limit:"50mb"})); // limit the size of the payload to 50mb 
app.use(express.static('public')); // serve static files from the public directory
app.use(cokieParser()); // parse the cookie header

// import routes
import userRouter from './routes/user.routes.js';


// use routes
app.use('/api/v1/user',userRouter);


export {app}