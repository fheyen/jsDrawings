/**
 * Class for a Gosper Curve drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Gosper_curve
 */
class GosperCurve extends Drawing {
    /**
     * @param parent DOM elemnt to append this drawing to
     * @param width (default: 100) width of the canvas
     * @param height (default: 100) height of the canvas
     * @param margin (default: 10) margin around image content
     */
    constructor(parent = document.getElementsByTagName("body")[0], width = 500, height = 500, margin = 10) {
        super(parent, width, height, margin);
        this.title = "Gosper Curve";
    }

    /**
     * Draws the image.
     */
    draw() {
        // color brewer spectral 11
        const palette = ["#9e0142", "#f46d43", "#fdae61", "#fee08b", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"];
        const level = 5;

        // get curve
        let curve = "A";
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
            switch (curve[i]) {
                case "A":
                case "B":
                    // go forward (in the current direction)
                    let currentAngleRad = currentAngleDeg / 180 * Math.PI;
                    currentX += Math.cos(currentAngleRad);
                    currentY += Math.sin(currentAngleRad);

                    // add new point
                    path.push([currentX, currentY]);
                    break;

                case "+":
                    // turn left 60 degrees
                    currentAngleDeg = (currentAngleDeg + 60) % 360;
                    break;

                case "-":
                    // turn right 60 degrees
                    currentAngleDeg = (currentAngleDeg - 60);
                    currentAngleDeg = currentAngleDeg < 0 ? currentAngleDeg + 360 : currentAngleDeg;
                    break;

                default:
                    break;
            }
        }

        // scale and center
        path = lib.rescaleAndCenter(path, this.width, this.height, this.margin);

        // draw
        lib.drawPath(this.ctx, path, palette, false);

        return this;
    }

    getNext(curve) {
        // A -> A-B--B+A++AA+B-
        // B -> +A-BB--B-A++A+B
        curve = lib.replaceAll(curve, "A", "A-b--b+A++AA+b-");
        curve = lib.replaceAll(curve, "B", "+A-BB--B-A++A+B");
        curve = lib.replaceAll(curve, "b", "B");
        return curve;
    }
}
