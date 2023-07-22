import ALL_GATES from "./AllGates";
import Bus from "./bus";
import Gate from "./gate";
import fs from "node:fs";

class Circuit {
  nrInputs: number;
  nrOutputs: number;
  busses: Array<Bus>;
  gates: Array<(Gate & {process: Function})>;
  inputs: Array<string>;
  outputs: Array<string>;
  values: Array<number | Gate | null>;
  metadata: {
    gates: Array<object>;
    busses: Array<object>;
  };

  constructor(nrInputs: number, nrOutputs: number) {
    this.nrInputs = nrInputs;
    this.nrOutputs = nrOutputs;
    this.busses = [];
    this.gates = [];
    this.inputs =[];
    this.outputs =[];
    this.values = [];
    this.metadata = {
      gates: [],
      busses: [],
    };
  }

  appendGate(gate: (Gate & { process: Function })) {
    const data = gate.toJson();
    if (!data.type) {
      data.type = gate.constructor.name;
    }

    this.metadata.gates.push(data);
    this.gates.push(gate);
  }

  appendInput(bus: Bus){
    this.inputs.push(bus.id);
  }

  appendOutput(bus: Bus){
    this.outputs.push(bus.id);
  }

  process(values: Array<number>) {
    var i = 0
    for(const b of this.inputs) {
      for(const bus of this.busses) {
        if(b == bus.id) {
          bus.recieveLeft(values[i])
        }
      }
      i += 1
    }
    for(const g of this.gates){
      g.process()
    }

    for(const o of this.outputs) {
      for(const c of this.busses){
        if(c.id == o) {
          this.values.push(c.leftNode)
        }
      }
    }

  }

  appendBus(bus: Bus) {
    this.metadata.busses.push(bus.toJson());
    this.busses.push(bus);
  }

  export(fileName: string) {
    const data = {
      nrInputs: this.nrInputs,
      nrOutputs: this.nrOutputs,
      busses: this.metadata.busses,
      gates: this.metadata.gates,
    };
    fileName += ".json";
    fs.writeFileSync(fileName, JSON.stringify(data));
    return data;
  }

  static retrieve(fileName: string) {
    const data = JSON.parse(fs.readFileSync(fileName).toString());

    const gates: { [key: string]: Gate } = {};
    const busses: { [key: string]: Bus } = {};

    for (const gate of data.gates) {
      const g = new ALL_GATES[(gate.type as ("AndGate" | "OrGate" | "NandGate" | "NotGate"))]();
      gates[gate.id] = g;
    }

    for (const bus of data.busses) {
      const b = new Bus();
      busses[bus.id] = b;
    }

    for (const bus of data.busses) {
      const b = busses[bus.id];
      for (const rightNode of bus.rightNodes) {
        b.appendRight(gates[rightNode]);
      }

      b.leftNode = bus.leftNode;
      b.id = bus.id;

      busses[bus.id] = b;
    }

    for (const gate of data.gates) {
      const g = gates[gate.id];
      for (const leftNode of gate.leftNodes) {
        g.appendInput(busses[leftNode]);
      }

      for (const rightNode of gate.rightNodes) {
        g.appendOutput(busses[rightNode]);
      }

      g.id = gate.id;
      gates[gate.id] = g
    }

    const circuit = new Circuit(data.nrInputs, data.nrOutputs);
    for (const x in busses) {
      circuit.appendBus(busses[x]);
    }

    for (const y in gates) {
      circuit.appendGate((gates[y] as (Gate & {process: Function})));
    }

    return circuit;
  }
}

export default Circuit;
