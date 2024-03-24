import express, {Application} from 'express'
import router from "../routes/products"
import errorHandler from '../middleware/errorHandler';

const app:Application = express()

app.use(express.json())
app.use("/api/products", router);
app.use(errorHandler) 

export default app;