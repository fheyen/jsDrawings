/**
 * Class for a Gosper Curve drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Gosper_curve
 */
class GosperCurve extends Drawing
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
        this.title = "Gosper Curve";
    }

    /**
     * Draws the image.
     * @returns {GosperCurve} this
     */
    public draw(): GosperCurve
    {
        // color brewer spectral 11
        const palette = [
            "#9e0142",
            "#f46d43",
            "#fdae61",
            "#fee08b",
            "#abdda4",
            "#66c2a5",
            "#3288bd",
            "#5e4fa2"
        ];
        const level = 5;

        // get curve
        let curve = "A";
        for (let l = 1; l < level; l++)
        {
            curve = this.getNext(curve);
        }

        // draw curve
        let currentX = 0;
        let currentY = -1;
        // start upwards
        let currentAngleDeg = 90;
        let path = [];
        path.push([0, 0]);
        path.push([0, -1]);

        for (let i = 0; i < curve.length; i++)
        {
            // go 1 step in current direction
            switch (curve[i])
            {
                case "A":
                case "B":
                    // go forward (in the current direction)
                    const currentAngleRad = currentAngleDeg / 180 * Math.PI;
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

    /**
     * Get next-level curve
     * @param curve old curve
     * @returns new curve
     */
    private getNext(curve: string): string
    {
        // A -> A-B--B+A++AA+B-
        // B -> +A-BB--B-A++A+B
        curve = lib.replaceAll(curve, "A", "A-b--b+A++AA+b-");
        curve = lib.replaceAll(curve, "B", "+A-BB--B-A++A+B");
        curve = lib.replaceAll(curve, "b", "B");
        return curve;
    }
}
