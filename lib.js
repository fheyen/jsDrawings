class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }


    translate(dx, dy) {
        this.x += dx;
        this.y += dy;
        return this;
    }

    rotate(cx, cy, angle) {
        this.translate(-cx, -cy);
        const x = this.x;
        const y = this.y;
        this.x = Math.cos(angle) * x - Math.sin(angle) * y;
        this.y = Math.sin(angle) * x + Math.cos(angle) * y;
        this.translate(cx, cy);
        return this;
    }

    clone() {
        return new Point(this.x, this.y);
    }

    toString() {
        return `Point (${this.x.toFixed(3)}, ${this.x.toFixed(3)})`;
    }
}