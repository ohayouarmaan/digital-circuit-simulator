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
    b1 = Bus()
    b2 = Bus()
    b3 = Bus()
    c = Circuit(2, 1)

    dl = DLatch()
    dl.appendInput(b1)
    dl.appendInput(b2)
    dl.appendOutput(b3)

    b1.recieveLeft(1)
    b2.recieveLeft(0)

    c.appendBus(b1)
    c.appendBus(b2)
    c.appendBus(b3)
    c.appendGate(dl)
    c.export("BuiltCircuits/DLatch.json")
    dl.process()
    b2.recieveLeft(1)
    dl.process()
    print(b3.leftNode)
