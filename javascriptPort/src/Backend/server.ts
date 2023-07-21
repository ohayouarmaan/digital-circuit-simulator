import express, { Express } from "express"
import cors from "cors";
import morgan from "morgan";
const server: Express = express()
import v1 from "./routes/v1";

const corsOrigin = process.env.ORIGIN?.split(" ") ? process.env.ORIGIN : ["*"];

server.use(cors({
    origin: corsOrigin
}));
server.use(morgan("dev"));
server.use("/api/v1", v1);

export default server;
