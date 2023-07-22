import http from "http"
import server from "./server"
import prerun from "./Helpers/prerun";

(async () => {
    try{
        await prerun();
        const httpServer = http.createServer(server);

        httpServer.listen(process.env.PORT || 8000, () => {
            console.log(`[APPLICATION]: app running on port ${8000}`);
        });
    } catch(e: any) {
        console.log(`[ERROR]: Error occured while creating the http server debug: ${e.message}`);
    }
})()
