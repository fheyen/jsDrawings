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
 * Class for an ornament drawing in JavaScript.
 *
 * https://de.wikipedia.org/wiki/Blume_des_Lebens
 */
var Ornament = /** @class */ (function (_super) {
    __extends(Ornament, _super);
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    function Ornament(parent, width, height, margin) {
        var _this = _super.call(this, parent, width, height, margin) || this;
        _this.title = "Ornament";
        return _this;
    }
    /**
     * Draws the image.
     * @returns {Ornament} this
     */
    Ornament.prototype.draw = function () {
        if (this.ctx === null) {
            throw new Error("canvas is null!");
        }
        var ctx = this.ctx;
        var cx = this.width / 2;
        var cy = this.height / 2;
        // start values
        var r = Math.min(this.width, this.height) / 2 - this.margin;
        // draw outer circles
        lib.drawCircle(ctx, cx, cy, r, "#fff", "rgba(0, 0, 0, 0)");
        r -= 10;
        lib.drawCircle(ctx, cx, cy, r, "#fff", "rgba(0, 0, 0, 0)");
        r /= 3;
        // draw inner pattern line-wise and rotate canvas in between
        this.drawLines(r, cy);
        ctx.translate(this.width / 2, this.height / 2);
        ctx.rotate(Math.PI / 3);
        ctx.translate(-this.width / 2, -this.height / 2);
        this.drawLines(r, cy);
        ctx.translate(this.width / 2, this.height / 2);
        ctx.rotate(Math.PI / 3);
        ctx.translate(-this.width / 2, -this.height / 2);
        this.drawLines(r, cy);
        return this;
    };
    /**
     * Draws a small part consisting of two partial circles.
     * @param {number} x x-coordinate
     * @param {number} y y-coordinate
     * @param {number} r radius
     */
    Ornament.prototype.drawPart = function (x, y, r) {
        var ctx = this.canvas.getContext("2d");
        var pi = Math.PI;
        x += r / 2;
        y += -1 / 2 * r * Math.sqrt(3);
        lib.drawCircle(ctx, x, y, r, "#fff", "rgba(0, 0, 0, 0)", 1 / 3 * pi, 2 / 3 * pi);
        y += Math.sqrt(3) * r;
        lib.drawCircle(ctx, x, y, r, "#fff", "rgba(0, 0, 0, 0)", 4 / 3 * pi, 5 / 3 * pi);
    };
    /**
     * Draws a line of parts.
     * @param {number} r radius
     * @param {number} cy center y coodinate of the canvas
     */
    Ornament.prototype.drawLines = function (r, cy) {
        var m = this.margin + 10;
        var lengths = [6, 5, 4, 3];
        for (var line = 0; line < lengths.length; line++) {
            for (var i = 0; i < lengths[line]; i++) {
                var top_1 = line * 0.5 * r * Math.sqrt(3);
                var left = m + (line * 0.5 + i) * r;
                this.drawPart(left, cy + top_1, r);
                if (line > 0) {
                    this.drawPart(left, cy - top_1, r);
                }
            }
        }
    };
    return Ornament;
}(Drawing));
