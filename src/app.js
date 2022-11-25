import express from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js"
import companiesRoutes from "./routes/company.routes.js"
import inventoryRoutes from "./routes/inventory.routes.js"
import  cors  from "cors";

//init app
const app = express();
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//routes 

app.use('/api/auth',authRoutes);
app.use('/api/companies',companiesRoutes);
app.use('/api/inventory',inventoryRoutes);


app.use(morgan('dev'))

export default app;