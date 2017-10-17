"use strict";
/**
 * Class for a drawing in JavaScript.
 */
class Drawing {
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width width of the canvas
     * @param {number} height height of the canvas
     * @param {number} margin margin around image content
     */
    constructor(parent = document.getElementsByTagName("body")[0], width = 500, height = 500, margin = 10, title = "Unnamed Drawing") {
        this.width = width;
        this.height = height;
        this.margin = margin;
        this.parent = parent;
        this.title = title;
    }
    /**
     * Sets the size of this drawing.
     *
     * @param {number} width width
     * @param {number} height height
     * @returns {Drawing} this
     * @memberof Drawing
     */
    setSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
    }
    /**
     * Sets the width of this drawing.
     *
     * @param {number} width width
     * @returns {Drawing} this
     * @memberof Drawing
     */
    setWidth(width) {
        this.width = width;
        return this;
    }
    /**
     * Sets the height of this drawing.
     *
     * @param {number} height height
     * @returns {Drawing} this
     * @memberof Drawing
     */
    setHeight(height) {
        this.height = height;
        return this;
    }
    /**
     * Creates the drawing container, title and canvas and draws the image.
     * @return {Drawing} this
     */
    init(draw = true) {
        this.clear();
        this.createCanvas();
        if (draw) {
            this.draw();
        }
        return this;
    }
    /**
     * Clears the parent element.
     * @return {Drawing} this
     */
    clear() {
        if (this.canvas) {
            this.parent.removeChild(this.canvas);
        }
        return this;
    }
    /**
     * Draws the image.
     * @return {Drawing} this
     */
    draw() {
        console.warn("draw(): Not implemented yet!");
        return this;
    }
    /**
     * Creates the canvas.
     * @return {Drawing} this
     */
    createCanvas() {
        if (!this.canvas) {
            this.canvas = document.createElement("canvas");
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.parent.appendChild(this.canvas);
        }
        this.ctx = this.canvas.getContext("2d");
        return this;
    }
}
