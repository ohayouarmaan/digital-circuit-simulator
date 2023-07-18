from NandGate import NandGate
from notGate import NotGate
from Gate import Gate
from Bus import Bus

class OrGate(Gate):
    def __init__(self) -> None:
        super().__init__(2, 1)

    def process(self):
        b1 = Bus()
        b2 = Bus()
        b3 = Bus()
        b4 = Bus()
        b5 = Bus()
        n1 = NotGate()
        n2 = NotGate()
        nand = NandGate()

        n1.appendInput(b1)
        n2.appendInput(b2)
        n1.appendOutput(b3)
        n2.appendOutput(b4)
        nand.appendInput(b3)
        nand.appendInput(b4)
        nand.appendOutput(b5)

        b1.appendRight(n1, 0)
        b2.appendRight(n2, 0)

        b3.appendRight(nand, 0)
        b4.appendRight(nand, 0)
        
        b1.recieveLeft(self.inputs[0].leftNode)
        b2.recieveLeft(self.inputs[1].leftNode)

        n1.process()
        n2.process()
        nand.process()
        self.values = [ b5.leftNode ]
        self.send(b5.leftNode)

