import express, {Application} from 'express'
import router from "../routes/apiRoutes"
import errorHandler from '../middleware/errorHandler';

const app:Application = express()

app.use(express.json())
app.use("/api", router);
app.use(errorHandler) 

export default app;