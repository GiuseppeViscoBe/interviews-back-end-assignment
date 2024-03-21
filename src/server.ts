import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO INIT!!!");
});

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});