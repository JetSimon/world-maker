import { RGBA } from "../utils/color.js";
import { TILE_SIZE } from "./parameters.js";
var TileType;
(function (TileType) {
    TileType[TileType["Grass"] = 0] = "Grass";
    TileType[TileType["Water"] = 1] = "Water";
    TileType[TileType["Mountain"] = 2] = "Mountain";
})(TileType || (TileType = {}));
class Tile {
    constructor() {
        this.type = TileType.Grass;
        this.height = 0;
    }
    setHeight(height) {
        this.height = height;
    }
    setType(type) {
        this.type = type;
    }
    getType() {
        return this.type;
    }
    getColor() {
        let baseColor;
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
    draw(x, y, ctx) {
        if (x < 0 || x > 500) {
            return;
        }
        ctx.fillStyle = this.getColor().toRGBString();
        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
}
export { Tile, TileType };
//# sourceMappingURL=tile.js.map