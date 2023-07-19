from andGate import AND_GATE
import json
from Bus import Bus
from notGate import NotGate
from NandGate import NandGate
from OrGate import OrGate
from NorGate import NorGate
from Circuit import Circuit


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
    b4 = Bus()
    b5 = Bus()
    o1 = NorGate()
    o2 = NorGate()

    o1.appendInput(b1)
    o1.appendOutput(b3)
    o1.appendInput(b4)
    o2.appendInput(b2)
    o2.appendInput(b3)
    o2.appendOutput(b4)
    o2.appendOutput(b5)
    
    b1.appendRight(o1)
    b2.appendRight(o2)
    b3.appendRight(o2)
    b4.appendRight(o1)

    b1.recieveLeft(1)
    b2.recieveLeft(0)

    o1.process()
    o2.process()

    print(b5.leftNode)

    b1.recieveLeft(1)
    b2.recieveLeft(1)
    o1.process()
    o2.process()
    print(b5.leftNode)

    b1.recieveLeft(0)
    b2.recieveLeft(0)
    o1.process()
    o2.process()
    print(b5.leftNode)

    c = Circuit(2, 2)
    c.appendBus(b1)
    c.appendBus(b2)
    c.appendBus(b3)
    c.appendBus(b4)
    c.appendBus(b5)
    c.appendGate(o1)
    c.appendGate(o2)

    print(c.export())
