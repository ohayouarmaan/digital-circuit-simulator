from Bus import Bus
from andGate import AND_GATE
from notGate import NotGate
from NandGate import NandGate
from DLatch import DFFE
import matplotlib.pyplot as plt
import random

basic_clock = 0
b1 = Bus()
b2 = Bus()
b3 = Bus()
dlatch = DFFE()


dlatch.appendInput(b1)
dlatch.appendInput(b2)
dlatch.appendOutput(b3)

b1.appendRight(dlatch)
b2.appendRight(dlatch)

data = {}

def printData(ds):
    y_axis = ds.values()
    str = u""
    prev = None
    for y in y_axis:
        if prev is not None:
            if prev != y:
                str += "|"

        if y == 0:
            str += "__"
        else:
            str += u"\u0305 \u0305 "
        prev = y
    
    print(str)


random_data = [random.choice([0, 1]) for _ in range(25)]

print(random_data)
for i in range(25):

    basic_clock = int(not basic_clock)


printData(data)
print(" ".join(map(lambda x: str(x), list(data.values()))))
print(data)