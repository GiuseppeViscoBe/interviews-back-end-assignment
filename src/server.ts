import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import router from "./routes/products"
import connectDb from "./config/dbConnection";
import errorHandler from "./middleware/errorHandler";
dotenv.config();

connectDb(); 
const app: Express = express();

const port = process.env.PORT || 8000;

app.use("/api/products", router);
app.use(errorHandler) 

app.listen(port, () => {
  console.log(`now listening on port ${port}`); 
});