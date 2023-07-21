import express, { Express } from "express"
const server: Express = express()
import v1 from "./routes/v1";

server.use("/api/v1", v1);

server.listen(process.env.PORT || 3000, () => {
    console.log(`[SERVER]: Listening on port ${process.env.PORT || 3000}`)
});

export default server;
