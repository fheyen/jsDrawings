"use strict";
/**
 * Class for a drawing in JavaScript.
 */
var Drawing = /** @class */ (function () {
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width width of the canvas
     * @param {number} height height of the canvas
     * @param {number} margin margin around image content
     */
    function Drawing(parent, width, height, margin, title) {
        if (parent === void 0) { parent = document.getElementsByTagName("body")[0]; }
        if (width === void 0) { width = 500; }
        if (height === void 0) { height = 500; }
        if (margin === void 0) { margin = 10; }
        if (title === void 0) { title = "Unnamed Drawing"; }
        this.width = width;
        this.height = height;
        this.margin = margin;
        this.parent = parent;
        this.title = title;
    }
    /**
     * Creates the drawing container, title and canvas and draws the image.
     * @return {Drawing} this
     */
    Drawing.prototype.init = function () {
        this.clear();
        this.createCanvas();
        this.draw();
        return this;
    };
    /**
     * Clears the parent element.
     * @return {Drawing} this
     */
    Drawing.prototype.clear = function () {
        if (this.canvas) {
            this.parent.removeChild(this.canvas);
        }
        return this;
    };
    /**
     * Draws the image.
     * @return {Drawing} this
     */
    Drawing.prototype.draw = function () {
        console.warn("draw(): Not implemented yet!");
        return this;
    };
    /**
     * Creates the canvas.
     * @return {Drawing} this
     */
    Drawing.prototype.createCanvas = function () {
        if (!this.canvas) {
            this.canvas = document.createElement("canvas");
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.parent.appendChild(this.canvas);
        }
        this.ctx = this.canvas.getContext("2d");
        return this;
    };
    return Drawing;
}());
