import json
from json import JSONEncoder

class Circuit:
    def __init__(self, nr_inputs, nr_outputs):
        self.nr_inputs = nr_inputs
        self.nr_outputs = nr_outputs
        self.busses = []
        self.gates = []
    
    def appendGate(self, gate):
        data = gate.toJson()
        if "type" not in data.keys():
            data["type"] = type(gate)

        self.gates.append(data)
    
    def appendBus(self, bus):
        self.busses.append(bus.toJson())
    
    def export(self):
        data = {
            "nr_inputs": self.nr_inputs,
            "nr_outputs": self.nr_outputs,
            "busses": self.busses,
            "gates": self.gates
        }
        return data
