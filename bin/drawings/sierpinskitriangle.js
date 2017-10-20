"use strict";
/**
 * Class for a Sierpinski Triangle drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Sierpinski_triangle
 */
class SierpinskiTriangle extends Drawing {
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    constructor(parent, width, height, margin) {
        super(parent, width, height, margin, "Sierpinski Triangle");
        this.maxAnimationStep = 14;
    }
    /**
     * Draws one animation step of the image.
     * @param step current step
     */
    drawStep(step) {
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
        this.recurse(step, step, startPoints);
    }
    /**
     * Recursively draws triangles.
     * @param {number} level current recursion level
     * @param {number} maxLevel maximum recursion level
     * @param {number} points points of the parent triangle
     */
    recurse(level, maxLevel, points) {
        // draw triangle
        lib.drawPolygon(this.ctx, points, "rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.1)");
        // get points of child triangles
        const pointsA = [
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
        const pointsB = [
            pointsA[1],
            points[1],
            {
                x: (points[1].x + points[2].x) / 2,
                y: (points[1].y + points[2].y) / 2
            }
        ];
        const pointsC = [
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
