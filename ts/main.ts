import { Vector2 } from "./utils/math.js";
import { World } from "./world/world.js";

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

const world = new World(new Vector2(500 / 4, 500 / 4));

let xOffset = -500 / 8;

document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key == "d" || e.key == "ArrowRight") {
        xOffset += 5;
    }
    else if (e.key == "a" || e.key == "ArrowLeft") {
        xOffset -= 5;
    }

    ctx.clearRect(0, 0, 500, 500);
    world.draw(ctx);
});

world.draw(ctx);