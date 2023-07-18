class Bus:
    def __init__(self) -> None:
        self.rightNodes = {}
    
    def appendRight(self, g, i):
        self.rightNodes[i] = g
    
    def recieveLeft(self, value):
        self.leftNode = value
        for x in list(self.rightNodes.keys()):
            self.rightNodes[x].recieve(value, x)