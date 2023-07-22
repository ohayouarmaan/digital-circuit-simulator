import Gate from "./gate";
import OrGate from "./OrGate";
import NotGate from "./NotGate";
import Bus from "./bus";

class NorGate extends Gate {
  b1: Bus;
  b2: Bus;
  b3: Bus;
  b4: Bus;
  g: OrGate;
  n: NotGate;
  values: number[];
  constructor() {
    super(2, 1, "NorGate");
    this.b1 = new Bus();
    this.b2 = new Bus();
    this.b3 = new Bus();
    this.b4 = new Bus();
    this.g = new OrGate();
    this.n = new NotGate();
    this.values = []
    this.g.appendInput(this.b1);
    this.g.appendInput(this.b2);
    this.g.appendOutput(this.b3);
    this.n.appendInput(this.b3);
    this.n.appendOutput(this.b4);
  }

  process() {
    this.b1.recieveLeft((this.inputs[0].leftNode as number));
    this.b2.recieveLeft((this.inputs[1].leftNode as number));

    this.g.process();
    this.n.process();
    this.values = [(this.b4.leftNode as number)];
    this.send((this.b4.leftNode as number));
  }
}
