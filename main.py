from andGate import AND_GATE
from Bus import Bus
from notGate import NotGate
from NandGate import NandGate
from OR_GATE import OrGate


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
    o = OrGate()
    o.appendInput(b1)
    o.appendInput(b2)
    o.appendOutput(b3)

    b1.recieveLeft(0)
    b2.recieveLeft(0)
    o.process()

    print(b3.leftNode)
    # b1.appendRight()
