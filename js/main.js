import { Vector2 } from "./utils/math.js";
import { World } from "./world/world.js";
const canvas = document.getElementById("canvas");
;
const ctx = canvas.getContext("2d");
const world = new World(new Vector2(500 / 4, 500 / 4));
let xOffset = 0;
world.draw(ctx, xOffset);
document.addEventListener("keydown", (e) => {
});
//# sourceMappingURL=main.js.map