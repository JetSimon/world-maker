import { chooseRandom } from "../utils/array.js";
import { randomRange } from "../utils/math.js";
class NationNameMaker {
    constructor() {
        this.starts = ["Red", "Welk", "Wun", "Ret", "Ja", "Mo", "Xi"];
        this.mids = ["enu", "ack", "wro", "ja", "mu", "ze", "oi", "oo", "la"];
        this.ends = ["ia", "em", "un", "on", "da", "io", "n"];
    }
    makeName() {
        let name = chooseRandom(this.starts);
        for (let i = 0; i < randomRange(0, 3); i++) {
            name += chooseRandom(this.mids);
        }
        name += chooseRandom(this.ends);
        return name;
    }
}
class Nation {
    constructor(states) {
        this.states = states;
        this.name = new NationNameMaker().makeName();
    }
    draw(ctx, mousePos, view) {
        for (const state of this.states) {
            state.draw(ctx, mousePos, view);
            if (state.hovered) {
                view.setHoverText(state.name + " | " + this.name);
            }
        }
    }
}
export { Nation };
//# sourceMappingURL=nation.js.map