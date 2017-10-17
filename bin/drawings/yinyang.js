"use strict";
/**
 * Class for a Yin Yang drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Yin_and_yang
 */
class YinYang extends Drawing {
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    constructor(parent, width, height, margin) {
        super(parent, width, height, margin, "Yin Yang");
    }
    /**
     * Draws the image.
     * @returns {YinYang} this
     */
    draw() {
        const cx = this.width / 2;
        const cy = this.height / 2;
        const r = Math.min(this.width, this.height) / 2 - this.margin;
        lib.drawCircle(this.ctx, cx, cy, r, "#000", "#000", 0, Math.PI);
        lib.drawCircle(this.ctx, cx, cy, r, "#fff", "#fff", Math.PI, 2 * Math.PI);
        lib.drawCircle(this.ctx, cx - r / 2, cy, r / 2, "#000", "#000");
        lib.drawCircle(this.ctx, cx + r / 2, cy, r / 2, "#fff", "#fff");
        lib.drawCircle(this.ctx, cx - r / 2, cy, r / 8, "#fff", "#fff");
        lib.drawCircle(this.ctx, cx + r / 2, cy, r / 8, "#000", "#000");
        return this;
    }
}
