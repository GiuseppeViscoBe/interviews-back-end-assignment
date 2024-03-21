import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import router from "./routes/products"
import connectDb from "./config/dbConnection";
dotenv.config();

connectDb(); 
const app: Express = express();

const port = process.env.PORT || 8000;

app.use("/api/products", router);

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO INIT!!!");
});
 

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});