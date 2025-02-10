import { GameView } from "./game/GameView.js";
import { Vector2 } from "./utils/math.js";
import { TILE_SIZE } from "./world/parameters.js";
import { World } from "./world/world.js";
const canvas = document.getElementById("canvas");
;
const ctx = canvas.getContext("2d");
const world = new World(new Vector2(1000 / 4, 500 / 4));
const mousePos = new Vector2(-1, -1);
const debugMouseSpan = document.getElementById("debugMouse");
const hoverSpan = document.getElementById("hoverText");
const view = new GameView(debugMouseSpan, hoverSpan);
document.addEventListener("keydown", (e) => {
});
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mousePos.x = e.clientX - rect.left - 16;
    mousePos.y = e.clientY - rect.top - 16;
    view.setMouseText(`(${mousePos.x}, ${mousePos.y}) => (${Math.floor(mousePos.x / TILE_SIZE)}, ${Math.floor(mousePos.y / TILE_SIZE)})`);
});
setInterval(() => {
    world.draw(ctx, mousePos, view);
}, 1000 / 30);
//# sourceMappingURL=main.js.map