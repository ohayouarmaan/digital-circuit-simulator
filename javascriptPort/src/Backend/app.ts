import http from "http"
import server from "./server"

const httpServer = http.createServer(server);

httpServer.listen(process.env.PORT || 8000, () => {
    console.log(`[APPLICATION]: app running on port ${8000}`);
});
