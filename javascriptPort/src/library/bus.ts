import uuid from 'uuid';
import Gate from './gate';

class Bus {
    id: string;
    leftNode: Gate | number | null;
    rightNodes: {
        [key: string]: Gate
    };

    constructor() {
        this.rightNodes = {};
        this.id = uuid.v4();
        this.leftNode = null;
    }

    appendRight(g: Gate) {
        this.rightNodes[g.id] = g;
    }

    recieveLeft(value: Gate | number) {
        this.leftNode = value;
        Object.keys(this.rightNodes).forEach(x => {
            this.rightNodes[x].recieve(value);
        });
    }

    toJson(): { rightNodes: string[]; leftNode: string | number | null; id: string } {
        return {
            "rightNodes": Object.keys(this.rightNodes),
            "leftNode": this.leftNode instanceof Gate ? this.leftNode.id :  this.leftNode,
            "id": this.id
        };
    }
}

export default Bus;