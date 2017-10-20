"use strict";
/**
 * Class for an ornament drawing in JavaScript.
 *
 * https://de.wikipedia.org/wiki/Blume_des_Lebens
 */
class Ornament extends Drawing {
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    constructor(parent, width, height, margin) {
        super(parent, width, height, margin, "Ornament");
    }
    /**
     * Draws the image.
     * @returns {Ornament} this
     */
    draw() {
        const ctx = this.ctx;
        const cx = this.width / 2;
        const cy = this.height / 2;
        // start values
        let r = Math.min(this.width, this.height) / 2 - this.margin;
        // draw outer circles
        lib.drawCircle(ctx, cx, cy, r, "#fff", "rgba(0, 0, 0, 0)");
        r -= 10;
        lib.drawCircle(ctx, cx, cy, r, "#fff", "rgba(0, 0, 0, 0)");
        r /= 3;
        // draw inner pattern line-wise and rotate canvas in between
        this.drawLines(r, cy);
        ctx.translate(this.width / 2, this.height / 2);
        ctx.rotate(Math.PI / 3);
        ctx.translate(-this.width / 2, -this.height / 2);
        this.drawLines(r, cy);
        ctx.translate(this.width / 2, this.height / 2);
        ctx.rotate(Math.PI / 3);
        ctx.translate(-this.width / 2, -this.height / 2);
        this.drawLines(r, cy);
        return this;
    }
    /**
     * Draws a small part consisting of two partial circles.
     * @param {number} x x-coordinate
     * @param {number} y y-coordinate
     * @param {number} r radius
     */
    drawPart(x, y, r) {
        const ctx = this.canvas.getContext("2d");
        const pi = Math.PI;
        x += r / 2;
        y += -1 / 2 * r * Math.sqrt(3);
        lib.drawCircle(ctx, x, y, r, "#fff", "rgba(0, 0, 0, 0)", 1 / 3 * pi, 2 / 3 * pi);
        y += Math.sqrt(3) * r;
        lib.drawCircle(ctx, x, y, r, "#fff", "rgba(0, 0, 0, 0)", 4 / 3 * pi, 5 / 3 * pi);
    }
    /**
     * Draws a line of parts.
     * @param {number} r radius
     * @param {number} cy center y coodinate of the canvas
     */
    drawLines(r, cy) {
        const m = this.margin + 10;
        const lengths = [6, 5, 4, 3];
        for (let line = 0; line < lengths.length; line++) {
            for (let i = 0; i < lengths[line]; i++) {
                const top = line * 0.5 * r * Math.sqrt(3);
                const left = m + (line * 0.5 + i) * r;
                this.drawPart(left, cy + top, r);
                if (line > 0) {
                    this.drawPart(left, cy - top, r);
                }
            }
        }
    }
}
