import circuitRouter from "./circuit";
import { Router } from "express";

const router = Router();

router.use("/circuit", circuitRouter);

export default router;
