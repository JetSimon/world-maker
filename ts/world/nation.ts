import { GameView } from "../game/GameView.js";
import { chooseRandom } from "../utils/array.js";
import { randomRange, Vector2 } from "../utils/math.js";
import { State } from "./state.js";

class NationNameMaker {
    starts = ["Red", "Welk", "Wun", "Ret", "Ja", "Mo", "Xi"];
    mids = ["enu", "ack", "wro", "ja", "mu", "ze", "oi", "oo", "la"];
    ends = ["ia", "em", "un", "on", "da", "io", "n"];

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

    states: State[];
    name: string;

    constructor(states: State[]) {
        this.states = states;
        this.name = new NationNameMaker().makeName();
    }

    draw(ctx: CanvasRenderingContext2D, mousePos: Vector2, view: GameView) {
        for (const state of this.states) {
            state.draw(ctx, mousePos, view);
            if (state.hovered) {
                view.setHoverText(state.name + " | " + this.name);
            }
        }
    }
}

export { Nation };

