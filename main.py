from andGate import AND_GATE
import json
from Bus import Bus
from notGate import NotGate
from NandGate import NandGate
from OrGate import OrGate
from NorGate import NorGate
from Circuit import Circuit
from ClockedDLatch import ClockedDLatch


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
    x8 = Bus()

    n = NotGate()
    a1 = AND_GATE()
    a2 = AND_GATE()
    o = OrGate()
    df = ClockedDLatch()

    n.append(x1)
    n.appendOutput(x3)

    a2.append(x1)
    a2.append(x0)
    a2.appendOutput(x4)

    a1.append(x3)
    a1.appendInput(x7)
    a1.appendOutput(x5)

    o.append(x5)
    o.append(x4)
    o.appendOutput(x6)

    df.append(x6)
    df.append(x2)
    df.appendOutput(x7)

    c = Circuit(3, 1)

    x0.recieveLeft(1)
    x1.recieveLeft(1)
    x2.recieveLeft(0)

    for b in [x0, x1, x2, x3, x4, x5, x6, x7]:
        c.appendBus(b)

    for b in [x0, x1, x2]:
        c.appendInput(b)

    c.appendOutput(x7)

    for g in [n, a1, a2, o, df]:
        c.appendGate(g)
    
    c.export("./BuiltCircuits/OneBitRegisterClocked.json")
