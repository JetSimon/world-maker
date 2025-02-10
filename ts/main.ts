import { Vector2 } from "./utils/math.js";
import { World } from "./world/world.js";

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

const world = new World(new Vector2(500 / 4, 500 / 4));

let xOffset = 0;
world.draw(ctx, xOffset);

document.addEventListener("keydown", (e: KeyboardEvent) => {

});