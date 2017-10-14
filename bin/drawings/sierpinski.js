"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Class for a Sierpinski Triangle drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Sierpinski_triangle
 */
var Sierpinski = /** @class */ (function (_super) {
    __extends(Sierpinski, _super);
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    function Sierpinski(parent, width, height, margin) {
        var _this = _super.call(this, parent, width, height, margin) || this;
        _this.title = "Sierpinski Triangle";
        return _this;
    }
    /**
     * Draws the image.
     * @returns {Sierpinski} this
     */
    Sierpinski.prototype.draw = function () {
        // maximum recursion level
        var maxLevel = 10;
        // start triangle
        var startPoints = [
            {
                x: this.margin,
                y: this.height - this.margin
            },
            {
                x: this.width - this.margin,
                y: this.height - this.margin
            },
            {
                x: this.width / 2,
                y: this.margin
            }
        ];
        // recursively draw triangles
        this.recurse(maxLevel, maxLevel, startPoints);
        return this;
    };
    /**
     * Recursively draws triangles.
     * @param {number} level current recursion level
     * @param {number} maxLevel maximum recursion level
     * @param {number} points points of the parent triangle
     */
    Sierpinski.prototype.recurse = function (level, maxLevel, points) {
        // draw triangle
        lib.drawPolygon(this.ctx, points, "rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.1)");
        // get points of child triangles
        var pointsA = [
            points[0],
            {
                x: (points[0].x + points[1].x) / 2,
                y: points[0].y
            },
            {
                x: (points[0].x + points[2].x) / 2,
                y: (points[0].y + points[2].y) / 2
            }
        ];
        var pointsB = [
            pointsA[1],
            points[1],
            {
                x: (points[1].x + points[2].x) / 2,
                y: (points[1].y + points[2].y) / 2
            }
        ];
        var pointsC = [
            pointsA[2],
            pointsB[2],
            points[2]
        ];
        // recurse
        if (level > 1) {
            this.recurse(level - 1, maxLevel, pointsA);
            this.recurse(level - 1, maxLevel, pointsB);
            this.recurse(level - 1, maxLevel, pointsC);
        }
    };
    return Sierpinski;
}(Drawing));
