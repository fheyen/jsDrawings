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
 * Class for a Osgood Curve drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Osgood_curve
 */
var OsgoodCurve = /** @class */ (function (_super) {
    __extends(OsgoodCurve, _super);
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    function OsgoodCurve(parent, width, height, margin) {
        var _this = _super.call(this, parent, width, height, margin) || this;
        _this.title = "Osgood Curve";
        return _this;
    }
    /**
     * Draws the image.
     * @returns {OsgoodCurve} this
     */
    OsgoodCurve.prototype.draw = function () {
        // maximum recursion level
        var maxLevel = 11;
        // start triangle
        var startPoints = [
            {
                x: this.margin,
                y: 0.75 * this.height - this.margin
            },
            {
                x: this.width - this.margin,
                y: 0.75 * this.height - this.margin
            },
            {
                x: this.width / 2,
                y: this.margin + this.height * 0.25
            }
        ];
        // daw triangle
        lib.drawPolygon(this.ctx, startPoints, "rgba(0, 0, 0, 0)", "#fff");
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
    OsgoodCurve.prototype.recurse = function (level, maxLevel, points) {
        var wedgeSize = 0.05;
        // draw wedge
        var diff = Vector.diff(points[1], points[0]);
        var direction = Vector.normalize(diff);
        var dist = Vector.dist(points[1], points[0]);
        var wedgeLeft = Vector.add(points[0], Vector.mult(direction, dist * (0.5 - wedgeSize)));
        var wedgeRight = Vector.add(points[0], Vector.mult(direction, dist * (0.5 + wedgeSize)));
        var wedge = [
            points[2],
            wedgeLeft,
            wedgeRight
        ];
        lib.drawPolygon(this.ctx, wedge, "#333", "#333");
        // get points of child triangles
        var pointsA = [
            points[2],
            points[0],
            wedgeLeft
        ];
        var pointsB = [
            points[1],
            points[2],
            wedgeRight
        ];
        // recurse
        if (level > 1) {
            this.recurse(level - 1, maxLevel, pointsA);
            this.recurse(level - 1, maxLevel, pointsB);
        }
    };
    return OsgoodCurve;
}(Drawing));
