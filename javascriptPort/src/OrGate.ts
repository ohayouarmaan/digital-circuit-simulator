import Gate from "./gate";
import Bus from "./bus";
import NandGate from "./NandGate";
import NotGate from "./NotGate";

class OrGate extends Gate {
    values: (number | Gate | null)[] | undefined;
    constructor() {
        super(2, 1);
    }
    process() {
        let b1 = new Bus();
        let b2 = new Bus();
        let b3 = new Bus();
        let b4 = new Bus();
        let b5 = new Bus();
        let n1 = new NotGate();
        let n2 = new NotGate();
        let nand = new NandGate();
        n1.appendInput(b1);
        n2.appendInput(b2);
        n1.appendOutput(b3);
        n2.appendOutput(b4);
        nand.appendInput(b3);
        nand.appendInput(b4);
        nand.appendOutput(b5);
        b1.appendRight(n1);
        b2.appendRight(n2);
        b3.appendRight(nand);
        b4.appendRight(nand);
        if(this.inputs[0].leftNode && this.inputs[1].leftNode){
            b1.recieveLeft(this.inputs[0].leftNode);
            b2.recieveLeft(this.inputs[1].leftNode);
        }
        n1.process();
        n2.process();
        nand.process();
        this.values = [b5.leftNode];
        this.send((b5.leftNode as number));
    }
}
