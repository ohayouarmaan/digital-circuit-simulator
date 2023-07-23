import { Router, Request, Response, NextFunction } from "express";
import CircuitModel from "../models/circuits";
import ICircuit from "../../types/Circuit";
const router = Router();

router.get("/", async (req: Request<{}, {}, {}, {from: number}>, res: Response, next: NextFunction) => {
    try{
        const foundCircuits = await CircuitModel.find({}).skip(req.query.from).limit(req.query.from + 10);
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

router.get("/:id", async(req: Request<{ id: string }>, res: Response) => {
    try{
        const _id = req.params.id;
        const foundCircuit = await CircuitModel.find({ _id })
        return res.json(foundCircuit);
    } catch(e: any) {
        console.log(e.message);
        return res.json({
            message: "Error fetching the circuit"
        });
    };
});

export default router;
