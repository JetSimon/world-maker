import { flood, makeEmptyGrid, makeEmptyGridLike, randomGridPosition } from "../utils/array.js";
import { Vector2 } from "../utils/math.js";
import { Perlin } from "../utils/perlin.js";
import { Nation, NationPosition } from "./nation.js";
import { Tile, TileType } from "./tile.js";
class World {
    constructor(size) {
        this.tiles = makeEmptyGrid(size.y, size.x, () => new Tile());
        this.makeWorld();
        this.makeNations();
    }
    makeWorld() {
        const perlin = new Perlin();
        const zoom = 1.5;
        const scales = [0.02, 0.04, 0.08, 0.16];
        this.doTiles((x, y, tile) => {
            let height = 0;
            for (let i = 0; i < scales.length; i++) {
                const scale = zoom * scales[i];
                const perlinResult = ((perlin.get(x * scale, y * scale)) + 1) / 2;
                height += perlinResult / Math.pow(i + 1, 2);
            }
            const tileType = height > 0.65 ? height > 0.88 ? TileType.Mountain : TileType.Grass : TileType.Water;
            tile.setHeight(height);
            tile.setType(tileType);
        });
    }
    makeNations() {
        const nationNumbers = makeEmptyGridLike(this.tiles, () => 0);
        const numberOfNations = 20;
        this.nations = new Map();
        const nationQueue = [];
        for (let i = 0; i < numberOfNations; i++) {
            const pos = randomGridPosition(nationNumbers);
            nationQueue.push(new NationPosition(i + 1, pos));
            this.nations.set(i + 1, new Nation(i + 1));
        }
        while (nationQueue.length > 0) {
            const popped = nationQueue[0];
            const id = popped.nationId;
            const x = popped.pos.x;
            const y = popped.pos.y;
            nationQueue.splice(0, 1);
            const shouldFill = (x, y, tile) => {
                const nation = this.nations.get(id);
                const otherNation = tile == 0 ? null : this.nations.get(tile);
                const stronger = otherNation != null && nation.strengthAt(x, y) > otherNation.strengthAt(x, y);
                return tile != id && (stronger || tile == 0) && this.tiles[y][x].getType() == TileType.Grass;
            };
            const toFill = [];
            flood(x, y, nationNumbers, () => id, shouldFill, 2, 0, toFill);
            for (const pos of toFill) {
                nationQueue.push(new NationPosition(id, pos));
            }
        }
        for (let y = 0; y < nationNumbers.length; y++) {
            for (let x = 0; x < nationNumbers[0].length; x++) {
                const n = nationNumbers[y][x];
                if (n != 0) {
                    this.nations.get(n).ownedTiles.add(new Vector2(x, y));
                }
            }
        }
    }
    doTiles(f) {
        for (let y = 0; y < this.tiles.length; y++) {
            for (let x = 0; x < this.tiles[0].length; x++) {
                f(x, y, this.tiles[y][x]);
            }
        }
    }
    draw(ctx, mousePos, view) {
        this.doTiles((x, y, tile) => {
            tile.draw(x, y, ctx);
        });
        for (const nation of this.nations.values()) {
            nation.draw(ctx, mousePos, view);
        }
    }
}
export { World };
//# sourceMappingURL=world.js.map