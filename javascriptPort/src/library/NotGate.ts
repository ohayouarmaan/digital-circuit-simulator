import Gate from "./gate";

class NotGate extends Gate {
    values: number[] | undefined;
    constructor() {
        super(1, 1, "NotGate");
    }
    process() {
        if (Object.keys(this.inputs).length < this.nr_inputs) {
            throw new Error("inputs underflow error");
        } else {
            if (this.inputs[0].leftNode === 0) {
                this.values = [1];
                this.send(1);
            } else {
                this.values = [0];
                this.send(0);
            }
        }
    }
}


export default NotGate