import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/database.js';
import userRouter from "./Routes/userRoutes.js"
import cors from 'cors';
import { globalErrorHandler, routeNotFound } from './middleware/GlobalErrorHandler.js';
import catagoryRouter from './Routes/catagoriesRouter.js';
import postRouter from './Routes/postRoute.js';
import commentRouter from './Routes/commentsRoute.js';

dotenv.config();
let app = express();
let port = process.env.PORT|| 5000
app.use(express.json());
app.use(cors())


app.use("/api/v1/posts",postRouter)
app.use("/api/v1/users",userRouter);
app.use("/api/v1/categories",catagoryRouter)
app.use("/api/v1/comments",commentRouter)




//route not found
app.use(routeNotFound)
//global error handler
app.use(globalErrorHandler)


app.listen(port,()=>{
    connectDb();
    console.log(`Server is running on port ${port}`);
})