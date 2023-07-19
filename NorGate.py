from Gate import Gate
from Bus import Bus
from OrGate import OrGate
from notGate import NotGate

class NorGate(Gate):
    def __init__(self) -> None:
        super().__init__(2, 1)
    
    def process(self):
        b1 = Bus()
        b2 = Bus()
        b3 = Bus()
        b4 = Bus()
        g = OrGate()
        n = NotGate()
        g.appendInput(b1)
        g.appendInput(b2)
        g.appendOutput(b3)
        n.appendInput(b3)
        n.appendOutput(b4)

        b1.appendRight(g)
        b2.appendRight(g)
        b3.appendRight(n)


        b1.recieveLeft(self.inputs[0].leftNode)
        b2.recieveLeft(self.inputs[1].leftNode)

        g.process()
        n.process()
        self.values = [ b4.leftNode ]
        self.send(b4.leftNode)

