class Gate:
    def __init__(self, nr_inputs, nr_outputs) -> None:
        self.nr_inputs = nr_inputs
        self.nr_outputs = nr_outputs
        self.inputs = {}
        self.inp_values = []
        self.outputs = {}
    
    def appendInput(self, b):
        self.inputs[len(list(self.inputs.keys()))] = b
    
    def appendOutput(self, b):
        self.outputs[len(list(self.outputs.keys()))] = b

    def recieve(self, value, x):
        # rerun the processing
        self.inp_values.append(value)
        if len(self.inp_values) < self.nr_inputs:
            self.send(value)
    
    def send(self, y):
        for x in list(self.outputs.keys()):
            self.outputs[x].recieveLeft(y)
