import Bus from "./bus";
import Gate from "./gate";
import AND_GATE from "./AndGate";
import NotGate from "./NotGate";

class NandGate extends Gate {
    values: (number | Gate | null)[] | undefined;

    constructor() {
        super(2, 1);
    }
    process() {
        let b1 = new Bus();
        let b2 = new Bus();
        let b3 = new Bus();
        let b4 = new Bus();
        let g = new AND_GATE();
        let n = new NotGate();
        g.appendInput(b1);
        g.appendInput(b2);
        g.appendOutput(b3);
        n.appendInput(b3);
        n.appendOutput(b4);
        b1.appendRight(g);
        b2.appendRight(g);
        b3.appendRight(n);
        if(this.inputs[0].leftNode && this.inputs[1].leftNode){
            b1.recieveLeft((this.inputs[0].leftNode));
            b2.recieveLeft(this.inputs[1].leftNode);
        }
        g.process();
        n.process();
        this.values = Array.from([ b4.leftNode ]);
        this.send( (b4.leftNode as number) );
    }
}


export default NandGate