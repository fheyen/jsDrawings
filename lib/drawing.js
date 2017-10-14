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
    constructor(parent = document.getElementsByTagName("body")[0], width = 500, height = 500, margin = 10) {
        this.width = width;
        this.height = height;
        this.margin = margin;
        this.parent = parent;
        this.canvas;
        this.title = "Unnamed Drawing";
    }

    /**
     * Creates the drawing container, title and canvas and draws the image.
     * @return {Drawing} this
     */
    init() {
        this.clear();
        this.createCanvas();
        this.draw();
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

    /**
     * Draws the image.
     * @return {Drawing} this
     */
    draw() {
        console.warn("draw(): Not implemented yet!");
        return this;
    }
}