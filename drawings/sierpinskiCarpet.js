/**
 * Class for a Sierpinski Carpet drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Sierpinski_carpet
 */
class SierpinskiCarpet extends Drawing {
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    constructor(parent = document.getElementsByTagName("body")[0], width = 500, height = 500, margin = 10) {
        super(parent, width, height, margin);
        this.title = "Hexa Flake";
    }

    /**
     * Draws the image.
     * @returns {SierpinskiCarpet} this
     */
    draw() {
        // maximum recursion level
        const maxLevel = 5;

        // initial values
        const size = Math.min(this.width, this.height) - 2 * this.margin;
        const center = {
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
    }

    /**
     * Recursively draws carpet.
     * @param {number} level current recursion level
     * @param {number} maxLevel maximum recursion level
     * @param {number} size size of the child squares
     * @param {any} center center of the square as {x, y}
     */
    recurse(level, maxLevel, size, center) {
        // fill middle
        this.ctx.fillRect(center.x - size / 2, center.y - size / 2, size, size);

        // get centers of child squares
        let startX = center.x - size;
        let startY = center.y - size;
        let centers = [];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                centers.push({
                    x: startX + col * size,
                    y: startY + row * size
                });
            }
        }

        // recurse
        if (level > 1) {
            for (let i = 0; i < 9; i++) {
                this.recurse(level - 1, maxLevel, size / 3, centers[i]);
            }
        }
    }
}
