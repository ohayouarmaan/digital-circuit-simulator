    # x0 = Bus()
    # x1 = Bus()
    # x2 = Bus()
    # x3 = Bus()
    # x4 = Bus()
    # x5 = Bus()
    # x6 = Bus()
    # x7 = Bus()
    # x8 = Bus()
    # x9 = Bus()
    # x10 = Bus()
    # n1 = NotGate()
    # a1 = AND_GATE()
    # a2 = AND_GATE()
    # o = OrGate()
    # dl = ClockedDLatch()

    # a2.appendInput(x0)
    # a2.appendInput(x1)
    # a2.appendOutput(x3)

    # n1.appendInput(x1)
    # n1.appendOutput(x4)

    # a1.appendInput(x4)
    # a1.appendOutput(x5)

    # o.appendInput(x5)
    # o.appendInput(x3)
    # o.appendOutput(x6)

    # dl.appendInput(x2)
    # dl.appendInput(x6)
    # dl.appendOutput(x7)
    # a1.appendInput(x7)

    # x0.recieveLeft(1)
    # x1.recieveLeft(1)
    # x2.recieveLeft(1)

    # n1.process()
    # a2.process()
    # a1.process()
    # o.process()
    # dl.process()

    # print(x7.leftNode)

    # x0.recieveLeft(0)
    # x1.recieveLeft(0)
    # x2.recieveLeft(0)

    # n1.process()
    # a2.process()
    # a1.process()
    # o.process()
    # dl.process()

    # print(x7.leftNode)