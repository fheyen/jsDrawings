/**
 * Class for a Gosper Curve drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Gosper_curve
 */
class GosperCurve extends Drawing {
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    constructor(parent, width, height, margin) {
        super(parent, width, height, margin);
        this.title = "Gosper Curve";
    }

    /**
     * Draws the image.
     */
    draw() {
        const ctx = this.canvas.getContext("2d");

        // color brewer spectral 11
        const palette = ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"];
        const level = 4;

        // get curve
        let curve = "A";
        for (let l = 1; l < level; l++) {
            curve = this.getNext(curve);
        }

        // draw curve
        let currentX;
        let currentY;
        // start upwards
        let currentAngleDeg = 90;
        let path = [];
        path.push([0, 0]);
        path.push([0, -1]);

        for (let i = 0, len = curve.length; i < len; i++) {
            // go 1 step in current direction
            switch (curve[i]) {
                case "A":
                case "B":
                    // go forward (in the current direction)
                    const currentAngleRad = currentAngleDeg / 180 * Math.PI;
                    currentX += Math.cos(currentAngleRad);
                    currentY += Math.sin(currentAngleRad);

                    // add new point
                    path.push([currentX, currentY]);

                    // update min and max
                    minX = currentX < minX ? currentX : minX;
                    minY = currentY < minY ? currentY : minY;
                    maxX = currentX > maxX ? currentX : maxX;
                    maxY = currentY > maxY ? currentY : maxY;
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

        // rescale and translate
        const w = this.width;
        const h = this.height;
        const m = this.margin;

        // translate (minX, minY) to (0, 0)
        path = path.map((p) => { return [p[0] - minX, p[1] - minY]; });

        // scale to fit into canvas - margin
        const factor = Math.min((w - 2 * m) / (maxX - minX), (h - 2 * m) / (maxY - minY));
        path = path.map(p => [p[0] * factor, p[1] * factor]);

        // center
        const width = (maxX - minX) * factor;
        const height = (maxY - minY) * factor;
        const moveX = (w - width) / 2;
        const moveY = (h - height) / 2;
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
        // A -> A-B--B+A++AA+B-
        // B -> +A-BB--B-A++A+B
        curve = this.replaceAll(curve, "A", "A-B--B+A++AA+B-");
        curve = this.replaceAll(curve, "B", "+A-BB--B-A++A+B");
        return curve;
    }

    /**
     * Escapes a regular expression.
     *
     * http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
     */
    escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    /**
     * Replaces all occurrences of <find> in <str> with <replace>.
     *
     * http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
     */
    replaceAll(str, find, replace) {
        return str.replace(new RegExp(this.escapeRegExp(find), "g"), replace);
    }
}
