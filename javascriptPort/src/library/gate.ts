import uuid from "uuid"
import Bus from "./bus";

class Gate {
    nr_inputs: number;
    nr_outputs: number;
    type: null | string;
    id: string;
    inputs: {
        [key: string]: Bus
    };
    inp_values: Array<number | null | string | Gate>;
    outputs: {
        [key: string]: Bus
    } 

    constructor(nr_inputs: number, nr_outputs: number, type = null) {
        this.nr_inputs = nr_inputs;
        this.nr_outputs = nr_outputs;
        this.type = type;
        this.inputs = {};
        this.inp_values = [];
        this.outputs = {};
        this.id = uuid.v4();
    }

    appendInput(b: Bus) {
        b.recieveLeft(this);
        this.inputs[Object.keys(this.inputs).length] = b;
    }

    appendOutput(b: Bus) {
        this.outputs[Object.keys(this.outputs).length] = b;
    }

    recieve(value: (number | Gate)) {
        this.inp_values.push(value);
        if (this.inp_values.length < this.nr_inputs) {
            this.send(value);
        }
    }

    send(y: number | Gate) {
        Object.keys(this.outputs).forEach(x => {
            this.outputs[x].recieveLeft(y);
        });
    }

    toJson() {
        return {
            "leftNodes": Object.keys(this.inputs).map(x => this.inputs[x]).map(x => x.id),
            "rightNodes": Object.keys(this.outputs).map(x => this.outputs[x]).map(x => x.id),
            "type": this.type,
            "id": this.id
        };
    }
}

export default Gate;