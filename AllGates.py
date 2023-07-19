from NorGate import NorGate
from andGate import AND_GATE
from OrGate import OrGate
from NandGate import NandGate
from notGate import NotGate

nor = NorGate()
nand = NandGate()
o = OrGate()
ng = NotGate()
a = AND_GATE()

ALL_GATES = {
    str(type(nor)): NorGate,
    str(type(nand)): NandGate,
    str(type(o)): OrGate,
    str(type(ng)): NotGate,
    str(type(a)): AND_GATE
}
