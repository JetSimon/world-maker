import { Vector2 } from "./utils/math.js";
import { World } from "./world/world.js";
const canvas = document.getElementById("canvas");
;
const ctx = canvas.getContext("2d");
const world = new World(new Vector2(500 / 4, 500 / 4));
world.draw(ctx);
//# sourceMappingURL=main.js.map