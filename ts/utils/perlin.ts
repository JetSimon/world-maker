import { Vector2 } from "./math.js";

class Perlin {

  gradients: Map<string, Vector2>;
  memory: Map<string, number>;

  constructor() {
    this.seed();
  }

  rand_vect(): Vector2 {
    const theta = Math.random() * 2 * Math.PI;
    return new Vector2(Math.cos(theta), Math.sin(theta));
  }

  dot_prod_grid(x: number, y: number, vx: number, vy: number) {
    let g_vect: Vector2;
    let d_vect: Vector2 = new Vector2(x - vx, y - vy);
    const key = [vx, vy].toString();

    if (this.gradients.has(key)) {
      g_vect = this.gradients.get(key);
    } else {
      g_vect = this.rand_vect();
      this.gradients.set(key, g_vect);
    }

    return Vector2.dot(g_vect, d_vect);
  }

  smootherstep(x: number) {
    return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
  }

  interp(x: number, a: number, b: number) {
    return a + this.smootherstep(x) * (b - a);
  }

  seed() {
    this.gradients = new Map();
    this.memory = new Map();
  }

  get(x: number, y: number): number {
    const key = [x, y].toString();
    if (this.memory.has(key))
      return this.memory.get(key);
    let xf = Math.floor(x);
    let yf = Math.floor(y);
    //interpolate
    let tl = this.dot_prod_grid(x, y, xf, yf);
    let tr = this.dot_prod_grid(x, y, xf + 1, yf);
    let bl = this.dot_prod_grid(x, y, xf, yf + 1);
    let br = this.dot_prod_grid(x, y, xf + 1, yf + 1);
    let xt = this.interp(x - xf, tl, tr);
    let xb = this.interp(x - xf, bl, br);
    let v = this.interp(y - yf, xt, xb);
    this.memory.set(key, v);
    return v;
  }
};

export { Perlin };
