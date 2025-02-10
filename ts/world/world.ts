import { GameView } from "../game/GameView.js";
import { flood, makeEmptyGrid, makeEmptyGridLike, randomGridPosition } from "../utils/array.js";
import { Vector2 } from "../utils/math.js";
import { Perlin } from "../utils/perlin.js";
import { Nation } from "./nation.js";
import { State, StatePosition } from "./state.js";
import { Tile, TileType } from "./tile.js";

class World {

    tiles: Tile[][];
    states: Map<number, State>;
    nations: Nation[];

    constructor(size: Vector2) {

        this.tiles = makeEmptyGrid(size.y, size.x, () => new Tile());

        this.makeWorld();
        this.makeStates();
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

    makeStates() {
        const stateNumbers = makeEmptyGridLike(this.tiles, () => 0);
        const maxNumberOfStates = 100;

        this.states = new Map();
        const stateFrontier: StatePosition[] = [];

        for (let i = 0; i < maxNumberOfStates; i++) {
            const pos = randomGridPosition(stateNumbers);
            stateFrontier.push(new StatePosition(i + 1, pos));
            this.states.set(i + 1, new State(i + 1));
        }

        while (stateFrontier.length > 0) {
            const popped = stateFrontier[0];
            const id = popped.stateId;
            const x = popped.pos.x;
            const y = popped.pos.y;
            stateFrontier.splice(0, 1);

            const shouldFill = (x: number, y: number, tile: number) => {
                const nation = this.states.get(id)!;
                const otherNation = tile == 0 ? null : this.states.get(tile);
                const stronger = otherNation != null && nation.strengthAt(x, y) > otherNation.strengthAt(x, y);
                return tile != id && (stronger || tile == 0) && this.tiles[y][x].getType() == TileType.Grass;
            };

            const toFill: Vector2[] = [];

            flood(x, y, stateNumbers, () => id, shouldFill, 2, 0, toFill);

            for (const pos of toFill) {
                stateFrontier.push(new StatePosition(id, pos));
            }
        }

        for (let y = 0; y < stateNumbers.length; y++) {
            for (let x = 0; x < stateNumbers[0].length; x++) {
                const n = stateNumbers[y][x];
                if (n != 0) {
                    this.states.get(n).ownedTiles.add(new Vector2(x, y));
                }
            }
        }

        for (const state of this.states.values()) {
            if (state.ownedTiles.size == 0) {
                this.states.delete(state.id);
            }
        }
    }

    makeNations() {
        this.nations = [];
        for (const state of this.states.values()) {
            this.nations.push(new Nation([state]));
        }
    }

    doTiles(f: (x: number, y: number, t: Tile) => void) {
        for (let y = 0; y < this.tiles.length; y++) {
            for (let x = 0; x < this.tiles[0].length; x++) {
                f(x, y, this.tiles[y][x]);
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D, mousePos: Vector2, view: GameView) {
        this.doTiles((x, y, tile) => {
            tile.draw(x, y, ctx);
        });

        for (const nation of this.nations) {
            nation.draw(ctx, mousePos, view);
        }
    }
}

export { World };

