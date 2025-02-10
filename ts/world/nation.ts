import { RGBA } from "../utils/color.js";
import { randomRange, Vector2 } from "../utils/math.js";
import { TILE_SIZE } from "./parameters.js";
import { Perlin } from "../utils/perlin.js";

class Nation {
    id: number;

    ownedTiles: Set<Vector2>;

    color: RGBA;

    perlin: Perlin;

    constructor(id: number) {
        this.ownedTiles = new Set();
        this.id = id;
        const color = RGBA.randomColor();
        color.a = 1;
        this.color = color;
        this.perlin = new Perlin();
    }

    draw(ctx: CanvasRenderingContext2D) {

        const ownedIds = new Set(Array.from(this.ownedTiles).map((x) => x.toString()));

        for (const pos of this.ownedTiles) {

            if (!pos.neighbourVectors().every((x) => ownedIds.has(x.toString()))) {
                ctx.fillStyle = RGBA.lerpColor(this.color, new RGBA(0, 0, 0), 0.3).toRGBAString();
            }
            else {
                ctx.fillStyle = this.color.toRGBAString();
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