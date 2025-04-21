import express  from 'express';
import dotenv from "dotenv"
import connectDB from './db/connectMongodb.js'
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import cookieParser  from 'cookie-parser';
import notificationRoutes from './routes/notification.route.js';

import {v2 as cloudinary} from 'cloudinary'

dotenv.config()


const app = express();

const PORT = process.env.PORT || 5000

app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/notifications", notificationRoutes)

app.listen(PORT, (req, res) =>{
    console. log(`App is running on port ${PORT}`);
    connectDB();
})
 