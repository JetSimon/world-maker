import { Vector2 } from "../utils/math.js";
class Perlin {
    constructor() {
        this.seed();
    }
    rand_vect() {
        let theta = Math.random() * 2 * Math.PI;
        return new Vector2(Math.cos(theta), Math.sin(theta));
    }
    dot_prod_grid(x, y, vx, vy) {
        let g_vect;
        let d_vect = new Vector2(x - vx, y - vy);
        if (this.gradients[[vx, vy].toString()]) {
            g_vect = this.gradients[[vx, vy].toString()];
        }
        else {
            g_vect = this.rand_vect();
            this.gradients[[vx, vy].toString()] = g_vect;
        }
        return Vector2.dot(g_vect, d_vect);
    }
    smootherstep(x) {
        return 6 * Math.pow(x, 5) - 15 * Math.pow(x, 4) + 10 * Math.pow(x, 3);
    }
    interp(x, a, b) {
        return a + this.smootherstep(x) * (b - a);
    }
    seed() {
        this.gradients = {};
        this.memory = {};
    }
    get(x, y) {
        if (this.memory.hasOwnProperty([x, y].toString()))
            return this.memory[[x, y].toString()];
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
        this.memory[[x, y].toString()] = v;
        return v;
    }
}
;
export { Perlin };
//# sourceMappingURL=perlin.js.map