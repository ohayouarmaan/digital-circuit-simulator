import Gate from "./gate";
import Bus from "./bus";
import NandGate from "./NandGate";
import NotGate from "./NotGate";

class OrGate extends Gate {
    values: (number | Gate | null)[] | undefined;
    b1: Bus;
    b2: Bus;
    b3: Bus;
    b4: Bus;
    b5: Bus;
    n1: NotGate;
    n2: NotGate;
    nand: NandGate;
    constructor() {
        super(2, 1);
        this.b1 = new Bus()
        this.b2 = new Bus()
        this.b3 = new Bus();
        this.b4 = new Bus();
        this.b5 = new Bus();
        this.n1 = new NotGate();
        this.n2 = new NotGate();
        this.nand = new NandGate();
    }
    process() {
        this.n1.appendInput(this.b1);
        this.n2.appendInput(this.b2);
        this.n1.appendOutput(this.b3);
        this.n2.appendOutput(this.b4);
        this.nand.appendInput(this.b3);
        this.nand.appendInput(this.b4);
        this.nand.appendOutput(this.b5);
        this.b1.appendRight(this.n1);
        this.b2.appendRight(this.n2);
        this.b3.appendRight(this.nand);
        this.b4.appendRight(this.nand);
        if(this.inputs[0].leftNode && this.inputs[1].leftNode){
            this.b1.recieveLeft(this.inputs[0].leftNode);
            this.b2.recieveLeft(this.inputs[1].leftNode);
        }
        this.n1.process();
        this.n2.process();
        this.nand.process();
        this.values = [this.b5.leftNode];
        this.send((this.b5.leftNode as number));
    }
}

export default OrGate
