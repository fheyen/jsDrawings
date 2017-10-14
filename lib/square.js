
/**
 * Simple square class.
 */
class Square {
    constructor(points) {
        this.points = points;
    }

    /**
     * Returns the center point.
     * @returns {object} center
     */
    getCenter() {
        return {
            x: (this.points[0].x + this.points[2].x) / 2,
            y: (this.points[0].y + this.points[2].y) / 2
        };
    }

    /**
     * Translates by x and y.
     * @param {number} x x
     * @param {number} y y
     * @returns {object} this
     */
    translate(x, y) {
        this.points = this.points.map(p => Vector.translate(p, x, y));
        return this;
    }

    /**
     * Scales by factor.
     * @param {number} cx center x
     * @param {number} cy center y
     * @param {number} factor factor
     * @returns {object} this
     */
    scale(cx, cy, factor) {
        this.points = this.points.map(p => Vector.scale(p, cx, cy, factor, factor));
        return this;
    }

    /**
     * Rotates by angle.
     * @param {number} cx center x
     * @param {number} cy center y
     * @param {number} angle angle
     * @returns {object} this
     */
    rotate(cx, cy, angle) {
        this.points = this.points.map(p => Vector.rotate(p, cx, cy, angle));
        return this;
    }

    /**
     * Returns a copy of this object.
     * @returns {object} new square
     */
    clone() {
        return new Square(this.points.slice(0));
    }

    /**
     * Draws this onto a canvas.
     * @param {CanvasRenderingContext2D} ctx canvas context
     * @returns {void}
     */
    draw(ctx) {
        lib.drawPolygon(ctx, this.points, "#000", "rgba(0, 0, 0, 0)");
    }
}