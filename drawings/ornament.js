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
    constructor(parent, width = 100, height = 100, margin = 0) {
        super(parent, width, height, margin);
        this.title = "Ornament";
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
        let center = new Point(cx, cy);
        const pi = Math.PI;



        // draw outer circle
        this.drawCircle(center.x, center.y, r);


        // draw center circle
        r /= 3;




        this.drawTriangularPart(center, r, pi, cx, cy);


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
    drawCircle(x, y, r, stroke = "#fff", startAngle = 0, endAngle = 2 * Math.PI) {
        const ctx = this.canvas.getContext("2d");
        ctx.save();
        ctx.strokeStyle = stroke;
        ctx.beginPath();
        ctx.arc(x, y, r, startAngle, endAngle);
        ctx.stroke();
        ctx.restore();
    }

    drawTriangularPart(center, r, pi, cx, cy) {
        let p = center.clone();
        this.drawCircle(p.x, p.y, r, undefined, 0, 1 / 3 * pi);
        p.translate(r, 0);
        this.drawCircle(p.x, p.y, r, undefined, pi - 1 / 3 * pi, pi);
        p.rotate(cx, cy, 2 / 3 * pi);
        this.drawCircle(p.x, p.y, r, undefined, 5 / 3 * pi, 0);
        p.translate(2 * r, 0);
        this.drawCircle(p.x, p.y, r, undefined, pi, 4 / 3 * pi);
        p.translate(-r, -Math.sqrt(3) * r);
        this.drawCircle(p.x, p.y, r, undefined, 1 / 3 * pi, 2 / 3 * pi);
        p.translate(0, Math.sqrt(3) * r);
        this.drawCircle(p.x, p.y, r, undefined, 4 / 3 * pi, 5 / 3 * pi);
    }
}
