import { Router, Request, Response, NextFunction } from "express";
import CircuitModel from "../models/circuits";
import ICircuit from "../../types/Circuit";
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

router.post("/", async (req: Request<{}, {}, {
    circuit: ICircuit
}>, res: Response, next: NextFunction) => {
    const newC = new CircuitModel({
        ...req.body.circuit,
    })
    try{
        await newC.save()
        return res.json(newC);
    } catch(e: any) {
        console.log(e.message);
        return res.json({
            message: "Error creating circuit"
        });
    };
});

export default router;
