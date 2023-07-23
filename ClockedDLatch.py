from Gate import Gate
from Bus import Bus
from DLatch import DLatch
from andGate import AND_GATE
from notGate import NotGate

class ClockedDLatch(Gate):
    def __init__(self) -> None:
        super().__init__(2, 1, "OBR")
        self.x0 = Bus()
        self.x1 = Bus()
        self.x2 = Bus()
        self.x3 = Bus()
        self.x4 = Bus()
        self.dl1 = DLatch()
        self.dl2 = DLatch()
        self.n1 = NotGate()

        self.dl1.appendInput(self.x0)
        self.n1.appendInput(self.x1)
        self.n1.appendOutput(self.x2)
        self.dl1.appendInput(self.x2)
        self.dl1.appendOutput(self.x3)
        self.dl2.appendInput(self.x3)
        self.dl2.appendInput(self.x1)
        self.dl2.appendOutput(self.x4)

    def process(self):
        self.x0.recieveLeft(self.inputs[0].leftNode)
        self.x1.recieveLeft(self.inputs[1].leftNode)

        self.n1.process()
        self.dl1.process()
        self.dl2.process()

        self.values = [ self.x4.leftNode ]
        self.send(self.x4.leftNode)
