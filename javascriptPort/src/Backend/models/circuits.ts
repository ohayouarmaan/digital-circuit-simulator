import mongoose from "mongoose"
import ICircuit from "../../types/Circuit"

/**
 * TODO: Create a circuit model
 */

interface ICircuitSchema extends ICircuit {
    dateCreated: Date,
}

const circuitSchema = new mongoose.Schema<ICircuitSchema>({
    nr_inputs: {
        type: Number,
        required: true
    },
    nr_outputs: {
        type: Number,
        required: true
    },
    busses: [
        {
            rightNode: [
                { type: String, required: true }
            ],
            leftNode: Number,
            id: String
        }
    ],
    gates: [
        {
            leftNodes: [
                { type: String, required: true }
            ],
            rightNodes: [
                { type: String, required: true }
            ],
            type: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            }
        }
    ]
});

const circuitModel = mongoose.model<ICircuitSchema>("circuit", circuitSchema);
export default circuitModel;
