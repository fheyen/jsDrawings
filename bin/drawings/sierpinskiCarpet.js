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
 * Class for a Sierpinski Carpet drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Sierpinski_carpet
 */
var SierpinskiCarpet = /** @class */ (function (_super) {
    __extends(SierpinskiCarpet, _super);
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    function SierpinskiCarpet(parent, width, height, margin) {
        var _this = _super.call(this, parent, width, height, margin) || this;
        _this.title = "Sierpinsky Carpet";
        return _this;
    }
    /**
     * Draws the image.
     * @returns {SierpinskiCarpet} this
     */
    SierpinskiCarpet.prototype.draw = function () {
        if (this.ctx === null) {
            throw new Error("ctx is null!");
        }
        // maximum recursion level
        var maxLevel = 5;
        // initial values
        var size = Math.min(this.width, this.height) - 2 * this.margin;
        var center = {
            x: this.width / 2,
            y: this.height / 2
        };
        // draw background
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(center.x - size / 2, center.y - size / 2, size, size);
        // recursively draw
        this.ctx.fillStyle = "#fff";
        this.recurse(maxLevel, maxLevel, size / 3, center);
        return this;
    };
    /**
     * Recursively draws carpet.
     * @param {number} level current recursion level
     * @param {number} maxLevel maximum recursion level
     * @param {number} size size of the child squares
     * @param {any} center center of the square as {x, y}
     */
    SierpinskiCarpet.prototype.recurse = function (level, maxLevel, size, center) {
        if (this.ctx === null) {
            throw new Error("ctx is null!");
        }
        // fill middle
        this.ctx.fillRect(center.x - size / 2, center.y - size / 2, size, size);
        // get centers of child squares
        var startX = center.x - size;
        var startY = center.y - size;
        var centers = [];
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                centers.push({
                    x: startX + col * size,
                    y: startY + row * size
                });
            }
        }
        // recurse
        if (level > 1) {
            for (var i = 0; i < 9; i++) {
                this.recurse(level - 1, maxLevel, size / 3, centers[i]);
            }
        }
    };
    return SierpinskiCarpet;
}(Drawing));
