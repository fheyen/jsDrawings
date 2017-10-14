"use strict";
/**
 * Simple square class.
 */
var Square = /** @class */ (function () {
    function Square(points) {
        this.points = points;
    }
    /**
     * Returns the center point.
     * @returns {object} center
     */
    Square.prototype.getCenter = function () {
        return {
            x: (this.points[0].x + this.points[2].x) / 2,
            y: (this.points[0].y + this.points[2].y) / 2
        };
    };
    /**
     * Translates by x and y.
     * @param {number} x x
     * @param {number} y y
     * @returns {object} this
     */
    Square.prototype.translate = function (x, y) {
        this.points = this.points.map(function (p) { return Vector.translate(p, x, y); });
        return this;
    };
    /**
     * Scales by factor.
     * @param {number} cx center x
     * @param {number} cy center y
     * @param {number} factor factor
     * @returns {object} this
     */
    Square.prototype.scale = function (cx, cy, factor) {
        this.points = this.points.map(function (p) { return Vector.scale(p, cx, cy, factor, factor); });
        return this;
    };
    /**
     * Rotates by angle.
     * @param {number} cx center x
     * @param {number} cy center y
     * @param {number} angle angle
     * @returns {object} this
     */
    Square.prototype.rotate = function (cx, cy, angle) {
        this.points = this.points.map(function (p) { return Vector.rotate(p, cx, cy, angle); });
        return this;
    };
    /**
     * Returns a copy of this object.
     * @returns {object} new square
     */
    Square.prototype.clone = function () {
        return new Square(this.points.slice(0));
    };
    /**
     * Draws this onto a canvas.
     * @param {CanvasRenderingContext2D} ctx canvas context
     * @returns {void}
     */
    Square.prototype.draw = function (ctx) {
        lib.drawPolygon(ctx, this.points, "#000", "rgba(0, 0, 0, 0)");
    };
    return Square;
}());
