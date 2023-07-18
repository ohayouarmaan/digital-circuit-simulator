class Bus:
    def __init__(self) -> None:
        self.rightNodes = {}
    
    def appendRight(self, g, i):
        self.rightNodes[i] = g
    
    def recieveLeft(self, value):
        self.leftNode = value
        for x in list(self.rightNodes.keys()):
            self.rightNodes[x].recieve(value, x)
        

class Gate:
    def __init__(self, nr_inputs, nr_outputs) -> None:
        self.nr_inputs = nr_inputs
        self.nr_outputs = nr_outputs
        self.inputs = {}
        self.outputs = {}
    
    def appendInput(self, b):
        self.inputs[len(list(self.inputs.keys()))] = b
    
    def appendOutput(self, b):
        self.outputs[len(list(self.outputs.keys()))] = b

    def recieve(self, value, x):
        # rerun the processing
        print("recieved ", value, x)
        self.send(value + 1)
    
    def send(self, y):
        for x in list(self.outputs.keys()):
            self.outputs[x].recieveLeft(y)



if __name__ == "__main__":
    """
    A bus should have two ends left end and the right end
    and the left end must have only one edge where as the right end should have multiple ends

    when a bus is given a value from the left end it passes the signal to the right end
    and it loops through all the edges in the right end and passes that signal to all of those nodes

    now a gate will have two functions related to communication one being recieve and one being send
    the recieve will be the function which should be called by the bus and the bus will pass down the data with an id
    the gate will save all the input busses within a hashmap where the key will be an id and the value will be the bus itself
    """
    b1 = Bus()
    b2 = Bus()
    b3 = Bus()
    g = Gate(2, 1)
    g.appendInput(b1)
    g.appendInput(b2)
    g.appendOutput(b3)

    b1.appendRight(g, 0)
    b2.appendRight(g, 1)

    b1.recieveLeft(0)
    b2.recieveLeft(0)

    # b1.appendRight()
