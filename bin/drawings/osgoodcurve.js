"use strict";
/**
 * Class for a Osgood Curve drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Osgood_curve
 */
class OsgoodCurve extends Drawing {
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    constructor(parent, width, height, margin) {
        super(parent, width, height, margin);
        this.title = "Osgood Curve";
    }
    /**
     * Draws the image.
     * @returns {OsgoodCurve} this
     */
    draw() {
        // maximum recursion level
        const maxLevel = 11;
        // start triangle
        const startPoints = [
            {
                x: this.margin,
                y: 0.75 * this.height - this.margin
            },
            {
                x: this.width - this.margin,
                y: 0.75 * this.height - this.margin
            },
            {
                x: this.width / 2,
                y: this.margin + this.height * 0.25
            }
        ];
        // daw triangle
        lib.drawPolygon(this.ctx, startPoints, "rgba(0, 0, 0, 0)", "#fff");
        // recursively draw triangles
        this.recurse(maxLevel, maxLevel, startPoints);
        return this;
    }
    /**
     * Recursively draws triangles.
     * @param {number} level current recursion level
     * @param {number} maxLevel maximum recursion level
     * @param {number} points points of the parent triangle
     */
    recurse(level, maxLevel, points) {
        const wedgeSize = 0.05;
        // draw wedge
        const diff = Vector.diff(points[1], points[0]);
        const direction = Vector.normalize(diff);
        const dist = Vector.dist(points[1], points[0]);
        const wedgeLeft = Vector.add(points[0], Vector.mult(direction, dist * (0.5 - wedgeSize)));
        const wedgeRight = Vector.add(points[0], Vector.mult(direction, dist * (0.5 + wedgeSize)));
        const wedge = [
            points[2],
            wedgeLeft,
            wedgeRight
        ];
        lib.drawPolygon(this.ctx, wedge, "#333", "#333");
        // get points of child triangles
        const pointsA = [
            points[2],
            points[0],
            wedgeLeft
        ];
        const pointsB = [
            points[1],
            points[2],
            wedgeRight
        ];
        // recurse
        if (level > 1) {
            this.recurse(level - 1, maxLevel, pointsA);
            this.recurse(level - 1, maxLevel, pointsB);
        }
    }
}
