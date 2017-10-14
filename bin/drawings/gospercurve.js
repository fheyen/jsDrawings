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
 * Class for a Gosper Curve drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Gosper_curve
 */
var GosperCurve = /** @class */ (function (_super) {
    __extends(GosperCurve, _super);
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    function GosperCurve(parent, width, height, margin) {
        var _this = _super.call(this, parent, width, height, margin) || this;
        _this.title = "Gosper Curve";
        return _this;
    }
    /**
     * Draws the image.
     * @returns {GosperCurve} this
     */
    GosperCurve.prototype.draw = function () {
        // color brewer spectral 11
        var palette = [
            "#9e0142",
            "#f46d43",
            "#fdae61",
            "#fee08b",
            "#abdda4",
            "#66c2a5",
            "#3288bd",
            "#5e4fa2"
        ];
        var level = 5;
        // get curve
        var curve = "A";
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
            switch (curve[i]) {
                case "A":
                case "B":
                    // go forward (in the current direction)
                    var currentAngleRad = currentAngleDeg / 180 * Math.PI;
                    currentX += Math.cos(currentAngleRad);
                    currentY += Math.sin(currentAngleRad);
                    // add new point
                    path.push([currentX, currentY]);
                    break;
                case "+":
                    // turn left 60 degrees
                    currentAngleDeg = (currentAngleDeg + 60) % 360;
                    break;
                case "-":
                    // turn right 60 degrees
                    currentAngleDeg = (currentAngleDeg - 60);
                    currentAngleDeg = currentAngleDeg < 0 ? currentAngleDeg + 360 : currentAngleDeg;
                    break;
                default:
                    break;
            }
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
    GosperCurve.prototype.getNext = function (curve) {
        // A -> A-B--B+A++AA+B-
        // B -> +A-BB--B-A++A+B
        curve = lib.replaceAll(curve, "A", "A-b--b+A++AA+b-");
        curve = lib.replaceAll(curve, "B", "+A-BB--B-A++A+B");
        curve = lib.replaceAll(curve, "b", "B");
        return curve;
    };
    return GosperCurve;
}(Drawing));
