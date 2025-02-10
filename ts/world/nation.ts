import { GameView } from "../game/GameView.js";
import { chooseRandom } from "../utils/array.js";
import { RGBA } from "../utils/color.js";
import { randomRange, Vector2 } from "../utils/math.js";
import { Perlin } from "../utils/perlin.js";
import { TILE_SIZE } from "./parameters.js";

class NationNameMaker {
    starts = ["Ada", "Efu", "Dread", "Frug", "West", "Est", "Bog", "Rip", "Can", "Ger", "Fra", "Si", "Mi", "Chi"];
    mids = ["enu", "ack", "wro", "ja", "mu", "ze", "oi", "oo", "la"];
    ends = ["ton", "berg", "ia", "don", "na", "an", "am"];

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
    id: number;

    ownedTiles: Set<Vector2>;

    color: RGBA;

    perlin: Perlin;

    name: string;

    constructor(id: number) {
        this.ownedTiles = new Set();
        this.id = id;
        const color = RGBA.randomColor();
        color.a = 1;
        this.color = color;
        this.perlin = new Perlin();

        this.name = new NationNameMaker().makeName();
    }

    draw(ctx: CanvasRenderingContext2D, mousePos: Vector2, view: GameView) {

        const ownedIds = new Set(Array.from(this.ownedTiles).map((x) => x.toString()));
        const hovered = ownedIds.has(Vector2.multiply(mousePos, 1 / TILE_SIZE).floor().toString());

        if (hovered) {
            view.setHoverText(this.name);
        }

        for (const pos of this.ownedTiles) {

            if (!pos.neighbourVectors().every((x) => ownedIds.has(x.toString()))) {
                ctx.fillStyle = RGBA.lerpColor(this.color, new RGBA(0, 0, 0), 0.3).toRGBAString();
            }
            else {
                ctx.fillStyle = (hovered ? RGBA.lerpColor(this.color, new RGBA(255, 255, 255), 0.33) : this.color).toRGBAString();
            }

            ctx.fillRect(pos.x * TILE_SIZE, pos.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }

    strengthAt(x: number, y: number) {
        /*const scales = [0.0001, 0.001, 0.01, 0.02];
        let strength = 0;
        for (const scale of scales) {
            strength += this.perlin.get(x * scale, y * scale);
        }
        return strength;*/
        return 0;
    }
}

class NationPosition {
    nationId: number;
    pos: Vector2;

    constructor(nationId: number, pos: Vector2) {
        this.nationId = nationId;
        this.pos = pos;
    }
}


export { Nation, NationPosition };

