import { makeEmptyGrid } from "../utils/array.js";
import { Vector2 } from "../utils/math.js";
import { Perlin } from "../utils/perlin.js";
import { Tile, TileType } from "./tile.js";

class World {

    tiles: Tile[][];

    constructor(size: Vector2) {
        this.tiles = makeEmptyGrid(size.y, size.x, () => new Tile());

        const perlin = new Perlin();

        const scales = [0.02, 0.04, 0.08, 0.16];

        this.doTiles((x, y, tile) => {
            let height = 0;
            for (let i = 0; i < scales.length; i++) {
                const scale = scales[i];
                const perlinResult = ((perlin.get(x * scale, y * scale)) + 1) / 2;
                height += perlinResult / Math.pow(i + 1, 2);
            }

            const tileType = height > 0.65 ? height > 0.88 ? TileType.Mountain : TileType.Grass : TileType.Water;

            tile.setHeight(height);
            tile.setType(tileType);
        });
    }

    doTiles(f: (x: number, y: number, t: Tile) => void) {
        for (let y = 0; y < this.tiles.length; y++) {
            for (let x = 0; x < this.tiles[0].length; x++) {
                f(x, y, this.tiles[y][x]);
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.doTiles((x, y, tile) => {
            tile.draw(x, y, ctx);
        });
    }
}

export { World };

