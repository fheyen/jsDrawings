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
 * Class for an Mandelbrot Set drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Mandelbrot_set#Continuous_.28smooth.29_coloring
 */
var Mandelbrot = /** @class */ (function (_super) {
    __extends(Mandelbrot, _super);
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    function Mandelbrot(parent, width, height, margin) {
        var _this = _super.call(this, parent, width, height, margin) || this;
        _this.title = "Mandelbrot Set";
        return _this;
    }
    /**
     * Draws the image.
     * @returns {Mandelbrot} this
     */
    Mandelbrot.prototype.draw = function () {
        // source: https://stackoverflow.com/questions/16500656/
        //         which-color-gradient-is-used-to-color-mandelbrot-in-wikipedia
        var palette = [
            lib.rgbColorToHex(66, 30, 15),
            lib.rgbColorToHex(25, 7, 26),
            lib.rgbColorToHex(9, 1, 47),
            lib.rgbColorToHex(4, 4, 73),
            lib.rgbColorToHex(0, 7, 100),
            lib.rgbColorToHex(12, 44, 138),
            lib.rgbColorToHex(24, 82, 177),
            lib.rgbColorToHex(57, 125, 209),
            lib.rgbColorToHex(134, 181, 229),
            lib.rgbColorToHex(211, 236, 248),
            lib.rgbColorToHex(241, 233, 191),
            lib.rgbColorToHex(248, 201, 95),
            lib.rgbColorToHex(255, 170, 0),
            lib.rgbColorToHex(204, 128, 0),
            lib.rgbColorToHex(153, 87, 0),
            lib.rgbColorToHex(106, 52, 3)
        ];
        var pixelSize = 1;
        var maxIteration = 800;
        // for each pixel
        var w = Math.floor(this.width);
        var h = Math.floor(this.height);
        for (var px = 0; px <= w; px += pixelSize) {
            for (var py = 0; py <= Math.floor(h / 2); py += pixelSize) {
                // x0 = scaled x coordinate of pixel (scaled to lie in the Mandelbrot X scale (-2.5, 1))
                var x0 = (px / w) * 3.5 - 2.5;
                // y0 = scaled y coordinate of pixel (scaled to lie in the Mandelbrot Y scale (-1, 1))
                var y0 = (py / h) * 2 - 1;
                var x = 0.0;
                var y = 0.0;
                var iteration = 0;
                // Here N=2^8 is chosen as a reasonable bailout radius.
                while (x * x + y * y < (1 << 16) && iteration < maxIteration) {
                    var xtemp = x * x - y * y + x0;
                    y = 2 * x * y + y0;
                    x = xtemp;
                    iteration = iteration + 1;
                }
                // Used to avoid floating point issues with points inside the set.
                if (iteration < maxIteration) {
                    // sqrt of inner term removed using log simplification rules.
                    var logZn = Math.log(x * x + y * y) / 2;
                    var nu = Math.log(logZn / Math.log(2)) / Math.log(2);
                    // Rearranging the potential function.
                    // Dividing logZn by log(2) instead of log(N = 1<<8)
                    // because we want the entire palette to range from the
                    // center to radius 2, NOT our bailout radius.
                    iteration = iteration + 1 - nu;
                }
                // get color
                if (this.ctx === null) {
                    throw new Error("canvas is null!");
                }
                var color = this.getCachedColor(iteration, maxIteration, palette);
                if (color !== undefined) {
                    this.ctx.fillStyle = color;
                    this.ctx.fillRect(px, py, pixelSize, pixelSize);
                    // use symmetry
                    this.ctx.fillRect(px, h - py, pixelSize, pixelSize);
                }
            }
        }
        return this;
    };
    /**
     * Use a cache to avaoid redundant color interpolation.
     * @param {number} value value to map to a color
     * @param {number} max maximum possible value
     * @param {string[]} palette color palette
     * @returns {string} cached color
     */
    Mandelbrot.prototype.getCachedColor = function (value, max, palette) {
        // crate cache if not yet done
        if (!this.colorCache) {
            this.colorCache = new Map();
        }
        if (this.colorCache.has(value)) {
            // cache lookup
            return this.colorCache.get(value);
        }
        else {
            // calculate value
            var color1 = palette[Math.floor(value / max * (palette.length - 1))];
            var color2 = palette[Math.floor(value / max * (palette.length - 1)) + 1];
            if (!color2) {
                color2 = palette[palette.length - 1];
            }
            var fraction = (value / (max / palette.length));
            if (fraction >= 1) {
                fraction = 1;
            }
            var color = lib.colorLinearInterpolation(color1, color2, fraction);
            this.colorCache.set(value, color);
            return color;
        }
    };
    return Mandelbrot;
}(Drawing));
