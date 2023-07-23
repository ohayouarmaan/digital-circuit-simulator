from andGate import AND_GATE
import json
from Bus import Bus
from notGate import NotGate
from NandGate import NandGate
from OrGate import OrGate
from NorGate import NorGate
from Circuit import Circuit
from DFF import DFF
from DLatch import DLatch


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
    x0 = Bus()
    x1 = Bus()
    x2 = Bus()
    x3 = Bus()
    x4 = Bus()
    dl1 = DLatch()
    dl2 = DLatch()
    n1 = NotGate()

    dl1.appendInput(x0)
    n1.appendInput(x1)
    n1.appendOutput(x2)
    dl1.appendInput(x2)
    dl1.appendOutput(x3)
    dl2.appendInput(x3)
    dl2.appendInput(x1)
    dl2.appendOutput(x4)

    x0.recieveLeft(0)
    x1.recieveLeft(0)
    n1.process()
    dl1.process()
    dl2.process()

    c = Circuit(2, 1)
    for b in [x0, x1, x2, x3, x4]:
        c.appendBus(b)

    for g in [n1, dl1, dl2]:
        c.appendGate(g)
    
    c.appendInput(x0)
    c.appendInput(x1)
    c.appendOutput(x4)

    c.export("./BuiltCircuits/DLatchClocked.json")
