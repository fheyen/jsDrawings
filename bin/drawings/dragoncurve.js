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
 * Class for a Dragon Curve drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Dragon_curve
 */
var DragonCurve = /** @class */ (function (_super) {
    __extends(DragonCurve, _super);
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    function DragonCurve(parent, width, height, margin) {
        var _this = _super.call(this, parent, width, height, margin) || this;
        _this.title = "Dragon Curve";
        return _this;
    }
    /**
     * Draws the image.
     * @returns {DragonCurve} this
     */
    DragonCurve.prototype.draw = function () {
        // color brewer spectral 11
        var palette = [
            "#9e0142",
            "#d53e4f",
            "#f46d43",
            "#fdae61",
            "#fee08b",
            "#ffffbf",
            "#e6f598",
            "#abdda4",
            "#66c2a5",
            "#3288bd",
            "#5e4fa2"
        ];
        var level = 10;
        // get curve
        // l: left turn, r: right turn
        var curve = "R";
        for (var l = 1; l < level; l++) {
            curve = this.getNext(curve);
        }
        // draw curve
        var currentX = 0;
        var currentY = -1;
        // start upwards
        var currentAngleDeg = 90;
        var path = [];
        path.push([0, 0]);
        path.push([0, -1]);
        for (var i = 0; i < curve.length; i++) {
            // go 1 step in current direction
            if (curve[i] === "L") {
                currentAngleDeg = (currentAngleDeg + 90) % 360;
            }
            else {
                currentAngleDeg = (currentAngleDeg - 90);
                currentAngleDeg = currentAngleDeg < 0 ? currentAngleDeg + 360 : currentAngleDeg;
            }
            var currentAngleRad = currentAngleDeg / 180 * Math.PI;
            currentX += Math.cos(currentAngleRad);
            currentY += Math.sin(currentAngleRad);
            // add new point
            path.push([currentX, currentY]);
        }
        // scale and center
        path = lib.rescaleAndCenter(path, this.width, this.height, this.margin);
        // draw
        lib.drawPath(this.ctx, path, palette, false);
        return this;
    };
    /**
     * Get next-level curve
     * @param curve old curve
     * @returns new curve
     */
    DragonCurve.prototype.getNext = function (curve) {
        // replace middle by L
        var middle = (curve.length - 1) / 2;
        var curveL = curve.substring(0, middle) + "L" + curve.substring(middle + 1, curve.length);
        return curve + "R" + curveL;
    };
    return DragonCurve;
}(Drawing));
