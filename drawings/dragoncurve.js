/**
 * Class for a Dragon Curve drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Dragon_curve
 */
class DragonCurve extends Drawing {
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    constructor(parent = document.getElementsByTagName("body")[0], width = 500, height = 500, margin = 10) {
        super(parent, width, height, margin);
        this.title = "Dragon Curve";
    }

    /**
     * Draws the image.
     */
    draw() {
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
        let currentY = -1, minY = -1, maxY = -1;
        let currentAngleDeg = 90; // start upwards
        let path = [];
        path.push([0, 0]);
        path.push([0, -1]);

        for (let i = 0, len = curve.length; i < len; i++) {
            // go 1 step in current direction
            if (curve[i] == "L") {
                currentAngleDeg = (currentAngleDeg + 90) % 360;
            } else {
                currentAngleDeg = (currentAngleDeg - 90);
                currentAngleDeg = currentAngleDeg < 0 ? currentAngleDeg + 360 : currentAngleDeg;
            }

            let currentAngleRad = currentAngleDeg / 180 * Math.PI;
            currentX += Math.cos(currentAngleRad);
            currentY += Math.sin(currentAngleRad);

            // add new point
            path.push([currentX, currentY]);
        }

        // scale and center
        path = lib.rescaleAndCenter(path, this.width, this.height, this.margin);

        // draw
        lib.drawPath(this.ctx, path, palette, false);

        return this;
    }

    getNext(curve) {
        // replace middle by L
        let middle = (curve.length - 1) / 2;
        let curveL = `${curve.substring(0, middle)}L${curve.substring(middle + 1, curve.length)}`;
        return `${curve}R${curveL}`;
    }
}
