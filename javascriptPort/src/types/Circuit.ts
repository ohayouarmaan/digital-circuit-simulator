import IBus from "./Bus"
import IGate from "./Gate"

export default interface ICircuit {
    nr_inputs: number,
    nr_outputs: number,
    busses: Array<IBus>,
    gates: Array<IGate>,
};