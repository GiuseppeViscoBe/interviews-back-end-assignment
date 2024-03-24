import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import router from "./routes/products"
import connectDb from "./config/dbConnection";
import app from "./config/app"

dotenv.config();

const port = process.env.PORT || 8000;

app.listen(port, async () => {
  console.log(`now listening on port ${port}`); 

  await connectDb(); 
});