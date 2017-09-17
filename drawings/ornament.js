/**
 * Class for an ornament drawing in JavaScript.
 *
 * https://de.wikipedia.org/wiki/Blume_des_Lebens
 *
 * Usage:
 * Create and render a new object with
 *    const ornament = new Ornament(...).init();
 */
// TODO: flood fill?
// https://gist.github.com/binarymax/4071852
class Ornament extends Drawing {
    /**
     * @param parent DOM elemnt to append this drawing to
     * @param width (default: 100) width of the canvas
     * @param height (default: 100) height of the canvas
     * @param margin (default: 0) margin around image content
     */
    constructor(parent, width = 100, height = 100, margin = 0, colors) {
        super(parent, width, height, margin);
        this.title = "Ornament";
        this.colors = colors;
    }

    /**
     * Draws the image.
     */
    draw() {
        const ctx = this.canvas.getContext("2d");
        const cx = this.width / 2;
        const cy = this.height / 2;

        // start values
        let r = Math.min(this.width, this.height) / 2 - this.margin;

        // draw outer circle
        this.drawCircle(cx, cy, r);
        r -= 10;
        this.drawCircle(cx, cy, r);

        r /= 3;

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
     * Draws a circle or partial circle.
     * @param x x-cooridnate
     * @param y y-coordinate
     * @param r r
     * @param stroke (default: "#fff") stroke color
     * @param startAngle (default: 0) start angle
     * @param endAngle (default: 2 * Pi) end angle
     */
    drawCircle(x, y, r, stroke = "#fff", fill = "rgba(0, 0, 0, 0)", startAngle = 0, endAngle = 2 * Math.PI) {
        const ctx = this.canvas.getContext("2d");
        ctx.save();
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(x, y, r, startAngle, endAngle);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

    drawPart(x, y, r) {
        const pi = Math.PI;
        x += r / 2;
        y += - 1 / 2 * r * Math.sqrt(3);
        this.drawCircle(x, y, r, this.colors.stroke, this.colors.fill, 1 / 3 * pi, 2 / 3 * pi);
        y += Math.sqrt(3) * r;
        this.drawCircle(x, y, r, this.colors.stroke, this.colors.fill, 4 / 3 * pi, 5 / 3 * pi);
    }

    drawLines(r, cy) {
        const m = this.margin + 10;
        const lengths = [6, 5, 4, 3];
        for (let line = 0; line < lengths.length; line++) {
            for (let i = 0; i < lengths[line]; i++) {
                let top = line * 0.5 * r * Math.sqrt(3);
                let left = m + (line * 0.5 + i) * r;
                this.drawPart(left, cy + top, r);
                if (line > 0) {
                    this.drawPart(left, cy - top, r);
                }
            }
        }
    }
}
