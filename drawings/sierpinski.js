/**
 * Class for a Dragon Curve drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Sierpinski_triangle
 */
class Sierpinski extends Drawing {
    /**
     * @param parent DOM elemnt to append this drawing to
     * @param width (default: 100) width of the canvas
     * @param height (default: 100) height of the canvas
     * @param margin (default: 10) margin around image content
     */
    constructor(parent = document.getElementsByTagName("body")[0], width = 500, height = 500, margin = 10) {
        super(parent, width, height, margin);
        this.title = "Sierpinski Triangle";
    }

    /**
     * Draws the image.
     */
    draw() {
        // maximum recursion level
        const maxLevel = 10;

        // start triangle
        const startPoints = [
            {
                x: this.margin,
                y: this.height - this.margin
            },
            {
                x: this.width - this.margin,
                y: this.height - this.margin
            },
            {
                x: this.width / 2,
                y: this.margin
            }
        ];

        // recursively draw triangles
        this.recurse(maxLevel, maxLevel, startPoints);

        return this;
    }

    /**
     * Recursively draws triangles.
     * @param {*} level current recursion level
     * @param {*} maxLevel maximum recursion level
     * @param {*} points points of the parent triangle
     */
    recurse(level, maxLevel, points) {
        // draw triangle
        lib.drawTriangle(this.ctx, points, "rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.1)");

        // get points of child triangles
        let pointsA = [
            points[0],
            {
                x: (points[0].x + points[1].x) / 2,
                y: points[0].y
            },
            {
                x: (points[0].x + points[2].x) / 2,
                y: (points[0].y + points[2].y) / 2
            }
        ];

        let pointsB = [
            pointsA[1],
            points[1],
            {
                x: (points[1].x + points[2].x) / 2,
                y: (points[1].y + points[2].y) / 2
            }
        ];

        let pointsC = [
            pointsA[2],
            pointsB[2],
            points[2]
        ];

        // recurse
        if (level > 1) {
            this.recurse(level - 1, maxLevel, pointsA);
            this.recurse(level - 1, maxLevel, pointsB);
            this.recurse(level - 1, maxLevel, pointsC);
        }
    }
}
