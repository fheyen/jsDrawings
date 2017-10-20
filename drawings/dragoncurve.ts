/**
 * Class for a Dragon Curve drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Dragon_curve
 */
class DragonCurve extends Drawing
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
        super(parent, width, height, margin, "Dragon Curve");
        this.maxAnimationStep = 14;
    }

    /**
     * Draws one animation step of the image.
     * @param step current step
     */
    public drawStep(step: number): void
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

        // get curve
        // l: left turn, r: right turn
        let curve = "R";
        for (let l = 1; l < step; l++)
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
            if (curve[i] === "L")
            {
                currentAngleDeg = (currentAngleDeg + 90) % 360;
            } else
            {
                currentAngleDeg = (currentAngleDeg - 90);
                currentAngleDeg = currentAngleDeg < 0 ? currentAngleDeg + 360 : currentAngleDeg;
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
    }

    /**
     * Get next-level curve
     * @param curve old curve
     * @returns new curve
     */
    private getNext(curve: string): string
    {
        // replace middle by L
        const middle = (curve.length - 1) / 2;
        const curveL = `${
            curve.substring(0, middle)
            }L${
            curve.substring(middle + 1, curve.length)
            }`;
        return `${curve}R${curveL}`;
    }
}
