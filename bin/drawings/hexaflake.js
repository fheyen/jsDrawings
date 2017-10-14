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
 * Class for a Hexa Flake drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Hexaflake
 */
var HexaFlake = /** @class */ (function (_super) {
    __extends(HexaFlake, _super);
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    function HexaFlake(parent, width, height, margin) {
        var _this = _super.call(this, parent, width, height, margin) || this;
        _this.title = "Hexa Flake";
        return _this;
    }
    /**
     * Draws the image.
     * @returns {HexaFlake} this
     */
    HexaFlake.prototype.draw = function () {
        // maximum recursion level
        var maxLevel = 7;
        // initial values
        var radius = Math.min(this.width, this.height) / 2 - this.margin;
        var center = {
            x: this.width / 2,
            y: this.height / 2
        };
        // recursively draw hexagons
        this.recurse(maxLevel, maxLevel, radius, center);
        return this;
    };
    /**
     * Recursively draws hexagon.
     * @param {number} level current recursion level
     * @param {number} maxLevel maximum recursion level
     * @param {number} radius radius of hexagons' outher bounding circle
     * @param {any} center of the hexagon as {x, y}
     * @returns {void}
     */
    HexaFlake.prototype.recurse = function (level, maxLevel, radius, center) {
        // calculate hexagon points
        var points = [];
        var angleDeg = 30;
        for (var i = 0; i < 6; i++) {
            points.push({
                x: center.x + radius * Math.cos(angleDeg / 180 * Math.PI),
                y: center.y + radius * Math.sin(angleDeg / 180 * Math.PI)
            });
            angleDeg += 60;
        }
        // draw hexagon
        lib.drawPolygon(this.ctx, points, "rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.1)");
        // get center and radius of child hexagons
        var childRadius = radius / 3;
        var centers = [];
        angleDeg = 30;
        for (var i = 0; i < 6; i++) {
            centers.push({
                x: center.x + 2 * childRadius * Math.cos(angleDeg / 180 * Math.PI),
                y: center.y + 2 * childRadius * Math.sin(angleDeg / 180 * Math.PI)
            });
            angleDeg += 60;
        }
        // recurse
        if (level > 1) {
            for (var i = 0; i < 6; i++) {
                this.recurse(level - 1, maxLevel, childRadius, centers[i]);
            }
        }
    };
    return HexaFlake;
}(Drawing));
