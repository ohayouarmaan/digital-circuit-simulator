import json
from AllGates import ALL_GATES
from Bus import Bus
from json import JSONEncoder


class Circuit:
    def __init__(self, nr_inputs, nr_outputs):
        self.nr_inputs = nr_inputs
        self.nr_outputs = nr_outputs
        self.busses = []
        self.gates = []
        self.metadata = {
            "gates": [],
            "busses": []
        }
    
    def appendGate(self, gate):
        data = gate.toJson()
        if data["type"] is None:
            data["type"] = str(type(gate))

        self.metadata["gates"].append(data)
        self.gates.append(gate)
    
    def appendBus(self, bus):
        self.metadata['busses'].append(bus.toJson())
        self.busses.append(bus)
    
    def export(self, fileName):
        data = {
            "nr_inputs": self.nr_inputs,
            "nr_outputs": self.nr_outputs,
            "busses": self.metadata['busses'],
            "gates": self.metadata['gates']
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
        
        gates = {}
        busses = {}

        for gate in data['gates']:
            g = ALL_GATES[gate['type']]()
            gates[gate['id']] = g
        
        for bus in data['busses']:
            b = Bus()
            busses[bus['id']] = b
        
            
        for bus in data['busses']:
            b = busses[bus['id']]
            for rightNode in bus['rightNodes']:
                b.appendRight(gates[rightNode])

            b.leftNode = bus['leftNode']
            b.id = bus['id']

            busses[bus['id']] = b
        
        for gate in data['gates']:
            g = gates[gate['id']]
            for leftNode in gate['leftNodes']:
                g.appendInput(busses[leftNode])
            
            for rightNode in gate['rightNodes']:
                g.appendOutput(busses[rightNode])
            
            g.id = gate['id']

        c = Circuit(data['nr_inputs'], data['nr_outputs'])
        for x in busses:
            c.appendBus(busses[x])
        
        for y in gates:
            c.appendGate(gates[y])

        return c

