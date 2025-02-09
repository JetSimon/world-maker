import { RGBA } from "../utils/color.js";

const TILE_SIZE = 4;

enum TileType {
    Grass,
    Water,
    Mountain
}

class Tile {
    private type: TileType = TileType.Grass;
    private height: number = 0;

    setHeight(height: number) {
        this.height = height;
    }

    setType(type: TileType) {
        this.type = type;
    }

    private getColor() {
        let baseColor: RGBA;
        switch (this.type) {
            case TileType.Grass:
                baseColor = new RGBA(0, 255, 0);
                break;
            case TileType.Water:
                baseColor = new RGBA(0, 0, 255);
                break;
            case TileType.Mountain:
                baseColor = new RGBA(100, 100, 100);
                break;
        }

        return RGBA.lerpColor(new RGBA(0, 0, 0), baseColor, this.height);
    }

    draw(x: number, y: number, ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.getColor().toRGBString();
        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
}

export { Tile, TileType };

