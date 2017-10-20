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
        let step = 0;
        const interval = setInterval(() => {
            this.drawStep(step++);
            if (step >= 6) {
                clearInterval(interval);
            }
        }, 500);
        return this;
    }
    /**
     * Draws one animation step of the image.
     * @param step current step
     */
    drawStep(step) {
        if (step > 0) {
            this.drawStep(step - 1);
        }
        const cx = this.width / 2;
        const cy = this.height / 2;
        const r = Math.min(this.width, this.height) / 2 - this.margin;
        switch (step) {
            case 0:
                lib.drawCircle(this.ctx, cx, cy, r, "#000", "#000", 0, Math.PI);
                return;
            case 1:
                lib.drawCircle(this.ctx, cx, cy, r, "#fff", "#fff", Math.PI, 2 * Math.PI);
                return;
            case 2:
                lib.drawCircle(this.ctx, cx - r / 2, cy, r / 2, "#000", "#000");
                return;
            case 3:
                lib.drawCircle(this.ctx, cx + r / 2, cy, r / 2, "#fff", "#fff");
                return;
            case 4:
                lib.drawCircle(this.ctx, cx - r / 2, cy, r / 8, "#fff", "#fff");
                return;
            case 5:
                lib.drawCircle(this.ctx, cx + r / 2, cy, r / 8, "#000", "#000");
                return;
            default:
                return;
        }
    }
}
