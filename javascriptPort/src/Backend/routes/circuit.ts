import { Router, Request, Response, NextFunction } from "express";
import CircuitModel from "../models/circuits";
const router = Router();

router.get("/", async (req: Request<{from: number}, {}, {}>, res: Response, next: NextFunction) => {
    try{
        const foundCircuits = await CircuitModel.find({}).skip(req.params.from).limit(req.params.from + 10);
        return res.json(foundCircuits);
    } catch(e) {
        return res.json({
            "message": "Error."
        });
    };
});

export default router;
