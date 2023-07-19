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
        if data["type"] is None:
            data["type"] = str(type(gate))

        self.gates.append(data)
    
    def appendBus(self, bus):
        self.busses.append(bus.toJson())
    
    def export(self, fileName):
        data = {
            "nr_inputs": self.nr_inputs,
            "nr_outputs": self.nr_outputs,
            "busses": self.busses,
            "gates": self.gates
        }
        fn = ""
        if fileName[len(fileName) - 5:] == ".json":
            fn = fileName
        else:
            fn = fileName + ".json"
        
        with open(fn, "w") as f:
            json.dump(data, f)
        return data
    
    @staticmethod
    def retrieve(fileName):
        with open(fileName, "r") as f:
            data = json.loads(f.read())
        

