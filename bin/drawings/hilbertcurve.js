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
 * Class for a Hilbert Curve drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Hilbert_curve
 */
var HilbertCurve = /** @class */ (function (_super) {
    __extends(HilbertCurve, _super);
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    function HilbertCurve(parent, width, height, margin) {
        var _this = _super.call(this, parent, width, height, margin) || this;
        _this.title = "Hilbert Curve";
        return _this;
    }
    /**
     * Draws the image.
     * @returns {HilbertCurve} this
     */
    HilbertCurve.prototype.draw = function () {
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
        var level = 7;
        // get curve
        // l: left turn, r: right turn
        var curve = "A";
        for (var l = 1; l < level; l++) {
            curve = this.getNext(curve);
        }
        // draw curve
        var factor = 100;
        var currentX = 0;
        var currentY = -10;
        // start upwards
        var currentAngleDeg = 90;
        var path = [];
        path.push([0, 0]);
        path.push([0, -factor]);
        for (var i = 0; i < curve.length; i++) {
            switch (curve[i]) {
                case "F":
                    // go forward (in the current direction)
                    var currentAngleRad = currentAngleDeg / 180 * Math.PI;
                    currentX += factor * Math.cos(currentAngleRad);
                    currentY += factor * Math.sin(currentAngleRad);
                    // add new point
                    path.push([currentX, currentY]);
                    break;
                case "+":
                    // turn left 90 degrees
                    currentAngleDeg = (currentAngleDeg + 90) % 360;
                    break;
                case "-":
                    // turn right 90 degrees
                    currentAngleDeg = (currentAngleDeg - 90);
                    currentAngleDeg = currentAngleDeg < 0 ? currentAngleDeg + 360 : currentAngleDeg;
                    break;
                default:
                    break;
            }
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
    HilbertCurve.prototype.getNext = function (curve) {
        // A -> -BF+AFA+FB-
        // B -> +AF-BFB−FA+
        curve = lib.replaceAll(curve, "A", "-bF+AFA+Fb-");
        curve = lib.replaceAll(curve, "B", "+AF-BFB-FA+");
        curve = lib.replaceAll(curve, "b", "B");
        return curve;
    };
    return HilbertCurve;
}(Drawing));
