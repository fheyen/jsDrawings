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

        const centerX = this.width / 2;
        const centerY = this.height / 2;


        // start values
        let radius = Math.min(this.width, this.height) / 2 - this.margin;
        let center = new Point(centerX, centerY);



        // draw outer circle
        this.drawCircle(center.x, center.y, radius);


        // draw center circle
        radius /= 3;
        let p = center.clone();

        // draw circle layers
        this.drawHexagonalPart(center, radius, this);
        this.drawHexagonalPart(center.translate(Math.sqrt(3) * radius, 0), radius, this);
        for (let i = 0; i <= 6; i++) {
            this.drawHexagonalPart(center.rotate(centerX, centerY, i * 2 / 6 * Math.PI), radius, this);
        }





        return this;
    }



    drawHexagonalPart(center, radius, drawing) {
        let p = center.clone();
        p.translate(0, -radius);
        for (let i = 0; i < 6; i++) {
            let angle = 2 / 6 * Math.PI;
            p.rotate(center.x, center.x, angle);
            let a = (i + 1) * angle + 1 / 6 * Math.PI;
            // drawing.drawCircle(p.x, p.y, radius, undefined, a, a + 2 / 3 * Math.PI);
        }

        p = center.clone();
        p.translate(Math.sqrt(3) * radius, 0);
        for (let i = 0; i < 6; i++) {
            let angle = 2 / 6 * Math.PI;
            p.rotate(center.x, center.y, angle);
            let a = (i - 3) * angle + 1 / 6 * Math.PI;
            drawing.drawCircle(p.x, p.y, radius, undefined, a, a + 1 / 3 * Math.PI);
        }
    }


    /**
     * Draws a circle or partial circle.
     * @param x x-cooridnate
     * @param y y-coordinate
     * @param radius radius
     * @param stroke (default: "#fff") stroke color
     * @param startAngle (default: 0) start angle
     * @param endAngle (default: 2 * Pi) end angle
     */
    drawCircle(x, y, radius, stroke = "#fff", startAngle = 0, endAngle = 2 * Math.PI) {
        const ctx = this.canvas.getContext("2d");
        ctx.save();
        ctx.strokeStyle = stroke;
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.stroke();
        ctx.restore();
    }
}
