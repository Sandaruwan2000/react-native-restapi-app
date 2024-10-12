import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import cartRoutes from './routes/cart.route.js';
import binRoutes from './routes/bin.route.js';
import conditionRoutes from './routes/condition.route.js';
import notificationRoutes from './routes/notification.route.js';
import plasticRoutes from './routes/plastic.route.js';
import taskRoutes from './routes/task.route.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();


mongoose.connect(process.env.MONGO).then(() => {

    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

  

const app = express();

app.use(express.json());

app.use(cookieParser()) ;




const allowedOrigins = ['http://localhost:8081', 'http://172.28.2.41:8081'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.listen(3000, () => {
    console.log('Server is runing on port 3000');
  }
  );

  app.use('/backend/auth', authRoutes);
  app.use('/backend/user', userRoutes);
  app.use('/backend/cart', cartRoutes);
  app.use('/backend/bin', binRoutes);
  app.use('/backend/condition', conditionRoutes);
  app.use('/backend/notification', notificationRoutes);
  app.use('/backend/plastic', plasticRoutes);
  app.use('/backend/task', taskRoutes);





  


  app.use( (err ,req,res ,next)=>{
    const statusCode = err.statusCode || 500 ;
    const message = err.message || 'Internal Server Error' ;
    return res.status(statusCode).json({
     success: false ,
     statusCode ,
     message,
    })
  }); 
   