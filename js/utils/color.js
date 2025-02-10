import { lerp } from "./math.js";
class RGBA {
    constructor(r, g, b, a = 1) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 0;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    static fromHsl(h, s, l) {
        const hueToRgb = (p, q, t) => {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        let r, g, b;
        if (s === 0) {
            r = g = b = l; // achromatic
        }
        else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hueToRgb(p, q, h + 1 / 3);
            g = hueToRgb(p, q, h);
            b = hueToRgb(p, q, h - 1 / 3);
        }
        return new RGBA(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), 1);
    }
    static lerpColor(a, b, t) {
        return new RGBA(lerp(a.r, b.r, t), lerp(a.g, b.g, t), lerp(a.b, b.b, t), lerp(a.a, b.a, t));
    }
    toRGBString() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    toRGBAString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
    static randomColor() {
        return new RGBA(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255));
    }
}
export { RGBA };
//# sourceMappingURL=color.js.map