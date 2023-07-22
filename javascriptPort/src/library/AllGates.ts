import AND_GATE from "./AndGate"
import OrGate from "./OrGate"
import NandGate from "./NandGate"
import NotGate from "./NotGate"

const a = new AND_GATE();
const o = new OrGate();
const n = new NandGate();
const no = new NotGate();

export default {
    "AndGate": AND_GATE,
    "OrGate": OrGate,
    "NandGate": NandGate,
    "NotGate": NotGate
}