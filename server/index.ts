import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import setRouting from "./routers/router";
import { connectDB } from "./models/db";

export const app = express();
app.use(cors());
app.use(bodyParser.json());
connectDB();
setRouting(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
