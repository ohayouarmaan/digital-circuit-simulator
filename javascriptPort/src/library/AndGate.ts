import Gate from "./gate";

class AND_GATE extends Gate {
    values: number[] | undefined;

    constructor() {
        super(2, 1, "AndGate");
    }

    process() {
        if (Object.keys(this.inputs).length < this.nr_inputs) {
            throw new Error("inputs underflow error");
        } else {
            if (this.inputs[0].leftNode === 1 && this.inputs[1].leftNode === 1) {
                this.values = [1];
                this.send(1);
            } else {
                this.values = [0];
                this.send(0);
            }
        }
    }
}

export default AND_GATE