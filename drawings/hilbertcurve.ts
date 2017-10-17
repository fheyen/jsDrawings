/**
 * Class for a Hilbert Curve drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Hilbert_curve
 */
class HilbertCurve extends Drawing
{
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    constructor(
        parent: HTMLElement,
        width: number,
        height: number,
        margin: number
    )
    {
        super(parent, width, height, margin);
        this.title = "Hilbert Curve";
    }

    /**
     * Draws the image.
     * @returns {HilbertCurve} this
     */
    public draw(): HilbertCurve
    {
        // color brewer spectral 11
        const palette = [
            "#9e0142",
            "#d53e4f",
            "#f46d43",
            "#fdae61",
            "#fee08b",
            "#ffffbf",
            "#e6f598",
            "#abdda4",
            "#66c2a5",
            "#3288bd",
            "#5e4fa2"
        ];
        const level = 7;

        // get curve
        // l: left turn, r: right turn
        let curve = "A";
        for (let l = 1; l < level; l++)
        {
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

        for (let i = 0; i < curve.length; i++)
        {
            switch (curve[i])
            {
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

            // add new point
            path.push([currentX, currentY]);
        }

        // scale and center
        path = lib.rescaleAndCenter(path, this.width, this.height, this.margin);

        // draw
        lib.drawPath(this.ctx, path, palette, false);

        return this;
    }

    /**
     * Get next-level curve
     * @param curve old curve
     * @returns new curve
     */
    private getNext(curve: string): string
    {
        // A -> -BF+AFA+FB-
        // B -> +AF-BFB−FA+
        curve = lib.replaceAll(curve, "A", "-bF+AFA+Fb-");
        curve = lib.replaceAll(curve, "B", "+AF-BFB-FA+");
        curve = lib.replaceAll(curve, "b", "B");
        return curve;
    }
}
