function lerp(a: number, b: number, t: number) {
    t = clamp(t, 0, 1);
    return (1 - t) * a + t * b;
}

function randomRange(min: number, max: number) {
    return min + (Math.random() * (max - min));
}

class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return this.x + "," + this.y;
    }

    neighbourVectors() {
        const neighbours = [];

        neighbours.push(new Vector2(this.x + 1, this.y));
        neighbours.push(new Vector2(this.x - 1, this.y));
        neighbours.push(new Vector2(this.x, this.y + 1));
        neighbours.push(new Vector2(this.x, this.y - 1));

        return neighbours;
    }

    static add(a: Vector2, b: Vector2) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    add(b: Vector2) {
        this.x += b.x;
        this.y += b.y;
        return this;
    }

    static subtract(a: Vector2, b: Vector2) {
        return new Vector2(a.x - b.x, a.y - b.y);
    }

    subtract(b: Vector2) {
        this.x -= b.x;
        this.y -= b.y;
        return this;
    }

    static multiply(a: Vector2, n: number) {
        return new Vector2(a.x * n, a.y * n);
    }

    multiply(n: number) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    static elementMultiply(a: Vector2, b: Vector2) {
        return new Vector2(a.x * b.x, a.y * b.y);
    }

    static dot(a: Vector2, b: Vector2) {
        return a.x * b.x + a.y * b.y;
    }

    magnitude(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    static distance(a: Vector2, b: Vector2) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    static clamp(x: Vector2, min: Vector2, max: Vector2) {
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

function clamp(x: number, min: number, max: number) {
    return Math.min(Math.max(x, min), max);
}

export { Vector2, clamp, lerp, randomRange };

