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
     * @param margin (default: 0) margin around image content
     */
    constructor(parent, width = 500, height = 500, margin = 10) {
        super(parent, width, height, margin);
        this.title = "Sierpinski Triangle";
        this.palette = ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd"];
    }

    /**
     * Draws the image.
     */
    draw() {
        const maxLevel = 12;

        let startPoints = [
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

    recurse(level, maxLevel, points) {
        // change color while progressing
        // let color = this.palette[~~((level / maxLevel) * (this.palette.length - 1))];
        let color = "rgba(0, 0, 0, 0.1)";

        // draw triangle
        this.drawTriangle(points, color);

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

    drawTriangle(points, color) {
        const ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }
}
