/***
 * Class for a drawing in JavaScript.
 */
class Drawing {
    /***
     * @param parent DOM elemnt to append this drawing to
     * @param width (default: 100) width of the canvas
     * @param height (default: 100) height of the canvas
     * @param margin (default: 0) margin around image content
     */
    constructor(parent, width = 500, height = 500, margin = 10) {
        this.width = width;
        this.height = height;
        this.margin = margin;
        this.parent = parent;
        this.canvas;
        this.title = "Unnamed Drawing";
    }

    /**
     * Creates the drawing container, title and canvas and draws the image.
     */
    init() {
        this.clear();
        this.createCanvas();
        this.draw();
        return this;
    }

    /**
     * Clears the parent element.
     */
    clear() {
        if (this.canvas) {
            this.parent.removeChild(this.canvas);
        }
        return this;
    }

    /**
     * Creates the canvas.
     */
    createCanvas() {
        if (!this.canvas) {
            this.canvas = document.createElement("canvas");
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.parent.appendChild(this.canvas);
        }
        return this;
    }

    /**
     * Draws the image.
     */
    draw() {
        console.warn("draw(): Not implemented yet!");
        return this;
    }
}
