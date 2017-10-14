/**
 * Class for a Hilbert Curve drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Hilbert_curve
 */
class HilbertCurve extends Drawing {
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    constructor(parent = document.getElementsByTagName("body")[0], width = 500, height = 500, margin = 10) {
        super(parent, width, height, margin);
        this.title = "Hilbert Curve";
    }

    /**
     * Draws the image.
     * @returns {HilbertCurve} this
     */
    draw() {
        // color brewer spectral 11
        const palette = ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"];
        const level = 7;

        // get curve
        // l: left turn, r: right turn
        let curve = "A";
        for (let l = 1; l < level; l++) {
            curve = this.getNext(curve);
        }

        // draw curve
        const factor = 100;
        let currentX = 0;
        let currentY = -10;
        // start upwards
        let currentAngleDeg = 90;
        let path = [];
        path.push([0, 0]);
        path.push([0, -factor]);

        for (let i = 0, len = curve.length; i < len; i++) {
            switch (curve[i]) {
                case "F":
                    // go forward (in the current direction)
                    const currentAngleRad = currentAngleDeg / 180 * Math.PI;
                    currentX += factor * Math.cos(currentAngleRad);
                    currentY += factor * Math.sin(currentAngleRad);

                    // add new point
                    path.push([currentX, currentY]);
                    break;

                case "+":
                    // turn left 90 degrees
                    currentAngleDeg = (currentAngleDeg + 90) % 360;
                    break;

                case "-":
                    // turn right 90 degrees
                    currentAngleDeg = (currentAngleDeg - 90);
                    currentAngleDeg = currentAngleDeg < 0 ? currentAngleDeg + 360 : currentAngleDeg;
                    break;

                default:
                    break;
            }

            const currentAngleRad = currentAngleDeg / 180 * Math.PI;
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
        // A -> -BF+AFA+FB-
        // B -> +AF-BFB−FA+
        curve = lib.replaceAll(curve, "A", "-bF+AFA+Fb-");
        curve = lib.replaceAll(curve, "B", "+AF-BFB-FA+");
        curve = lib.replaceAll(curve, "b", "B");
        return curve;
    }
}