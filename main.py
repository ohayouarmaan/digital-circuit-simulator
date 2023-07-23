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
    x5 = Bus()
    x6 = Bus()
    x7 = Bus()

    and1 = AND_GATE()
    and2 = AND_GATE()
    and3 = AND_GATE()
    and4 = AND_GATE()

    n1 = NotGate()
    n2 = NotGate()
    
    n1.appendInput(x0)
    n2.appendInput(x1)
    n1.appendOutput(x2)
    n2.appendOutput(x3)

    and1.appendInput(x2)
    and1.appendInput(x3)
    and1.appendOutput(x4)

    and2.appendInput(x3)
    and2.appendInput(x1)
    and2.appendOutput(x5)

    and3.appendInput(x2)
    and3.appendInput(x1)
    and3.appendOutput(x6)

    and4.appendInput(x1)
    and4.appendInput(x0)
    and4.appendOutput(x7)

    x0.recieveLeft(0)
    x1.recieveLeft(0)

    n1.process()
    n2.process()
    and1.process()
    and2.process()
    and3.process()
    and4.process()

    newC = Circuit(2, 4)
    for b in [x0, x1, x2, x3, x4, x5, x6, x7]:
        newC.appendBus(b)
    
    for g in [n1, n2, and1, and2, and3, and4]:
        newC.appendGate(g)

    newC.appendInput(x0)
    newC.appendInput(x1)

    for o in [x4, x5, x6, x7]:
        newC.appendOutput(o)
    
    newC.export("./BuiltCircuits/2to4demuxer.json")

    # print([x4.leftNode, x5.leftNode, x6.leftNode, x7.leftNode])



