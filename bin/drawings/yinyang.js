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
 * Class for a Yin Yang drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Yin_and_yang
 */
var YinYang = /** @class */ (function (_super) {
    __extends(YinYang, _super);
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    function YinYang(parent, width, height, margin) {
        return _super.call(this, parent, width, height, margin, "Yin Yang") || this;
    }
    /**
     * Draws the image.
     * @returns {YinYang} this
     */
    YinYang.prototype.draw = function () {
        var centerX = this.width / 2;
        var centerY = this.height / 2;
        var radius = Math.min(this.width, this.height) / 2 - this.margin;
        lib.drawCircle(this.ctx, centerX, centerY, radius, "#000", "#000", 0, Math.PI);
        lib.drawCircle(this.ctx, centerX, centerY, radius, "#fff", "#fff", Math.PI, 2 * Math.PI);
        lib.drawCircle(this.ctx, centerX - radius / 2, centerY, radius / 2, "#000", "#000");
        lib.drawCircle(this.ctx, centerX + radius / 2, centerY, radius / 2, "#fff", "#fff");
        lib.drawCircle(this.ctx, centerX - radius / 2, centerY, radius / 8, "#fff", "#fff");
        lib.drawCircle(this.ctx, centerX + radius / 2, centerY, radius / 8, "#000", "#000");
        return this;
    };
    return YinYang;
}(Drawing));
