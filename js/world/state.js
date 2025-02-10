import { chooseRandom } from "../utils/array.js";
import { RGBA } from "../utils/color.js";
import { randomRange, Vector2 } from "../utils/math.js";
import { Perlin } from "../utils/perlin.js";
import { TILE_SIZE } from "./parameters.js";
class StateNameMaker {
    constructor() {
        this.starts = ["Ada", "Efu", "Dread", "Frug", "West", "Est", "Bog", "Rip", "Can", "Ger", "Fra", "Si", "Mi", "Chi"];
        this.mids = ["enu", "ack", "wro", "ja", "mu", "ze", "oi", "oo", "la"];
        this.ends = ["ton", "berg", "ia", "don", "na", "an", "am"];
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
class State {
    constructor(id) {
        this.ownedTiles = new Set();
        this.id = id;
        const color = RGBA.randomColor();
        color.a = 1;
        this.color = color;
        this.perlin = new Perlin();
        this.name = new StateNameMaker().makeName();
    }
    draw(ctx, mousePos, view) {
        const ownedIds = new Set(Array.from(this.ownedTiles).map((x) => x.toString()));
        this.hovered = ownedIds.has(Vector2.multiply(mousePos, 1 / TILE_SIZE).floor().toString());
        for (const pos of this.ownedTiles) {
            if (!pos.neighbourVectors().every((x) => ownedIds.has(x.toString()))) {
                ctx.fillStyle = RGBA.lerpColor(this.color, new RGBA(0, 0, 0), 0.3).toRGBAString();
            }
            else {
                ctx.fillStyle = (this.hovered ? RGBA.lerpColor(this.color, new RGBA(255, 255, 255), 0.33) : this.color).toRGBAString();
            }
            ctx.fillRect(pos.x * TILE_SIZE, pos.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
    strengthAt(x, y) {
        /*const scales = [0.0001, 0.001, 0.01, 0.02];
        let strength = 0;
        for (const scale of scales) {
            strength += this.perlin.get(x * scale, y * scale);
        }
        return strength;*/
        return 0;
    }
}
class StatePosition {
    constructor(stateId, pos) {
        this.stateId = stateId;
        this.pos = pos;
    }
}
export { State, StatePosition };
//# sourceMappingURL=state.js.map