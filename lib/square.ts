
/**
 * Simple square class.
 */
class Square
{
    public points: { x: number, y: number }[];
    constructor(points: { x: number, y: number }[])
    {
        this.points = points;
    }

    /**
     * Returns the center point.
     * @returns {object} center
     */
    public getCenter(): { x: number, y: number }
    {
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
    public translate(x: number, y: number): Square
    {
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
    public scale(cx: number, cy: number, factor: number): Square
    {
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
    public rotate(cx: number, cy: number, angle: number): Square
    {
        this.points = this.points.map(p => Vector.rotate(p, cx, cy, angle));
        return this;
    }

    /**
     * Returns a copy of this object.
     * @returns {object} new square
     */
    public clone(): Square
    {
        return new Square(this.points.slice(0));
    }

    /**
     * Draws this onto a canvas.
     * @param {CanvasRenderingContext2D} ctx canvas context
     * @returns {void}
     */
    public draw(ctx: CanvasRenderingContext2D): void
    {
        lib.drawPolygon(ctx, this.points, "#000", "rgba(0, 0, 0, 0)");
    }
}
