function lerp(a, b, t) {
    t = clamp(t, 0, 1);
    return (1 - t) * a + t * b;
}
function randomRange(min, max) {
    return min + (Math.random() * (max - min));
}
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static add(a, b) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }
    add(b) {
        this.x += b.x;
        this.y += b.y;
        return this;
    }
    static subtract(a, b) {
        return new Vector2(a.x - b.x, a.y - b.y);
    }
    subtract(b) {
        this.x -= b.x;
        this.y -= b.y;
        return this;
    }
    static multiply(a, n) {
        return new Vector2(a.x * n, a.y * n);
    }
    multiply(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }
    static elementMultiply(a, b) {
        return new Vector2(a.x * b.x, a.y * b.y);
    }
    static dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }
    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    static distance(a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }
    static clamp(x, min, max) {
        return new Vector2(clamp(x.x, min.x, max.x), clamp(x.y, min.y, max.y));
    }
    norm() {
        const mag = this.magnitude();
        return mag == 0 ? new Vector2(0, 0) : Vector2.multiply(this, (1 / mag));
    }
    isNaN() {
        return isNaN(this.x) || isNaN(this.y);
    }
}
function clamp(x, min, max) {
    return Math.min(Math.max(x, min), max);
}
export { Vector2, clamp, lerp, randomRange };
//# sourceMappingURL=math.js.map