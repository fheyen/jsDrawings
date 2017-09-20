/**
 * Class for a Dragon Curve drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Dragon_curve
 */
class DragonCurve extends Drawing {
    /**
     * @param parent DOM elemnt to append this drawing to
     * @param width (default: 100) width of the canvas
     * @param height (default: 100) height of the canvas
     * @param margin (default: 0) margin around image content
     */
    constructor(parent, width = 500, height = 500, margin = 10) {
        super(parent, width, height, margin);
        this.title = "Dragon Curve";
    }

    /**
     * Draws the image.
     */
    draw() {
        const ctx = this.canvas.getContext("2d");


        // color brewer spectral 11
        const palette = ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"];

        const level = 10;

        // get curve
        let curve = "R"; // l: left turn, r: right turn
        for (let l = 1; l < level; l++) {
            curve = this.getNext(curve);
        }

        // draw curve
        let currentX = 0, minX = 0, maxX = 0;
        let currentY = -10, minY = -10, maxY = -10;
        let currentAngleDeg = 90; // start upwards

        let path = [];
        path.push([0, 0]);
        path.push([0, -10]);

        for (let i = 0, len = curve.length; i < len; i++) {
            // go 1 step in current direction
            if (curve[i] == "L") {
                currentAngleDeg = (currentAngleDeg + 90) % 360;
            } else {
                currentAngleDeg = (currentAngleDeg - 90);
                currentAngleDeg = currentAngleDeg < 0 ? currentAngleDeg + 360 : currentAngleDeg;
            }

            switch (currentAngleDeg) {
                case 0:
                    currentX += 10;
                    break;
                case 90:
                    currentY -= 10;
                    break;
                case 180:
                    currentX -= 10;
                    break;
                case 270:
                    currentY += 10;
                    break;
            }

            // add new point
            path.push([currentX, currentY]);

            minX = currentX < minX ? currentX : minX;
            minY = currentY < minY ? currentY : minY;
            maxX = currentX > maxX ? currentX : maxX;
            maxY = currentY > maxY ? currentY : maxY;

        }

        // rescale and translate
        const w = this.width;
        const h = this.height;
        const m = this.margin;

        // translate (minX, minY) to (0, 0)

        path = path.map(function (p) { return [p[0] - minX, p[1] - minY] });

        // scale to fit into canvas - margin
        const factor = Math.min((w - 2 * m) / (maxX - minX), (h - 2 * m) / (maxY - minY));
        path = path.map(p => [p[0] * factor, p[1] * factor]);

        // center
        let width = (maxX - minX) * factor;
        let height = (maxY - minY) * factor;
        let moveX = (w - width) / 2;
        let moveY = (h - height) / 2;
        path = path.map(p => [p[0] + moveX, p[1] + moveY]);


        // draw
        let oldP = path[0];
        let i = 0;
        path.forEach(p => {
            ctx.beginPath();
            ctx.moveTo(oldP[0], oldP[1]);
            ctx.lineTo(p[0], p[1]);
            ctx.closePath();
            // change color while progressing
            ctx.strokeStyle = palette[~~((i++ / path.length) * palette.length)];
            ctx.stroke();
            oldP = p;
        });

        return this;
    }

    getNext(curve) {
        // replace middle by L
        let middle = (curve.length - 1) / 2;
        let curveL = `${curve.substring(0, middle)}L${curve.substring(middle + 1, curve.length)}`;

        return `${curve}R${curveL}`;
    }
}
