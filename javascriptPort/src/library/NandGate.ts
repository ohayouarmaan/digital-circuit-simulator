import Bus from "./bus";
import Gate from "./gate";
import AND_GATE from "./AndGate";
import NotGate from "./NotGate";

class NandGate extends Gate {
    values: (number | Gate | null)[] | undefined;
    g: AND_GATE;
    b1: Bus;
    b2: Bus;
    b3: Bus;
    b4: Bus;
    n: NotGate;

    constructor() {
        super(2, 1, "NandGate");
        this.b1 = new Bus();
        this.b2 = new Bus();
        this.b3 = new Bus();
        this.b4 = new Bus();
        this.g = new AND_GATE();
        this.n = new NotGate();

    }
    process() {
        this.g.appendInput(this.b1);
        this.g.appendInput(this.b2);
        this.g.appendOutput(this.b3);
        this.n.appendInput(this.b3);
        this.n.appendOutput(this.b4);
        if(this.inputs[0].leftNode && this.inputs[1].leftNode){
            this.b1.recieveLeft((this.inputs[0].leftNode));
            this.b2.recieveLeft(this.inputs[1].leftNode);
        }
        this.g.process();
        this.n.process();
        this.values = Array.from([ this.b4.leftNode ]);
        this.send( (this.b4.leftNode as number) );
    }
}


export default NandGate