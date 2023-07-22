import mongoose from "mongoose";
import { config } from "dotenv";
import path from "node:path";

config({
    "path": path.resolve(__dirname, "../.env")
});

console.log(process.env.MONGO_URI);
export default async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/digisim")
    } catch(e: any) {
        throw new Error(`[ERROR]: Can't connect to the database debug message: ${e.message}`)
    };
};