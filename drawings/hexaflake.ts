/**
 * Class for a Hexa Flake drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Hexaflake
 */
class HexaFlake extends Drawing
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
        this.title = "Hexa Flake";
    }

    /**
     * Draws the image.
     * @returns {HexaFlake} this
     */
    public draw(): HexaFlake
    {
        // maximum recursion level
        const maxLevel = 7;

        // initial values
        const radius = Math.min(this.width, this.height) / 2 - this.margin;
        const center = {
            x: this.width / 2,
            y: this.height / 2
        };

        // recursively draw hexagons
        this.recurse(maxLevel, maxLevel, radius, center);

        return this;
    }

    /**
     * Recursively draws hexagon.
     * @param {number} level current recursion level
     * @param {number} maxLevel maximum recursion level
     * @param {number} radius radius of hexagons' outher bounding circle
     * @param {any} center of the hexagon as {x, y}
     * @returns {void}
     */
    private recurse(
        level: number,
        maxLevel: number,
        radius: number,
        center: { x: number, y: number }
    ): void
    {
        // calculate hexagon points
        const points = [];
        let angleDeg = 30;
        for (let i = 0; i < 6; i++)
        {
            points.push({
                x: center.x + radius * Math.cos(angleDeg / 180 * Math.PI),
                y: center.y + radius * Math.sin(angleDeg / 180 * Math.PI)
            });
            angleDeg += 60;
        }
        // draw hexagon
        lib.drawPolygon(this.ctx, points, "rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.1)");

        // get center and radius of child hexagons
        const childRadius = radius / 3;
        const centers = [];
        angleDeg = 30;
        for (let i = 0; i < 6; i++)
        {
            centers.push({
                x: center.x + 2 * childRadius * Math.cos(angleDeg / 180 * Math.PI),
                y: center.y + 2 * childRadius * Math.sin(angleDeg / 180 * Math.PI)
            });
            angleDeg += 60;
        }

        // recurse
        if (level > 1)
        {
            for (let i = 0; i < 6; i++)
            {
                this.recurse(level - 1, maxLevel, childRadius, centers[i]);
            }
        }
    }
}
