/**
 * Class for a Pythagoras Tree drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Pythagoras_tree_(fractal)
 */
class PT extends Drawing {
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    constructor(parent, width, height, margin) {
        super(parent, width, height, margin);
        this.title = "Pythagoras Tree";
    }

    /**
     * Draws the image.
     * @returns {PT} this
     */
    draw() {
        const level = 5;

        const startSize = (Math.min(this.width, this.height) - 2 * this.margin) / 6;
        const startSquare = new Square(
            [
                {
                    x: this.width / 2 - startSize / 2,
                    y: this.height - startSize - this.margin
                },
                {
                    x: this.width / 2 + startSize / 2,
                    y: this.height - startSize - this.margin
                },
                {
                    x: this.width / 2 + startSize / 2,
                    y: this.height - this.margin
                },
                {
                    x: this.width / 2 - startSize / 2,
                    y: this.height - this.margin
                }
            ]
        );

        const tree = new PythagorasTree(startSquare, level, this.ctx);

        tree.generateTree();

        // draw tree
        tree.draw();

        return this;
    }
}

class PythagorasTree {
    constructor(startSquare, level, ctx) {
        this.startSquare = startSquare;
        this.level = level;
        this.ctx = ctx;

        this.root = {
            square: this.startSquare
        };
    }

    /**
     * Generates an PT.
     */
    generateTree() {
        this.generateSubTree(this.root, this.level);
        return this;
    }

    generateSubTree(root, level) {
        if (level <= 0) {
            return;
        }
        // copy square, scale, translate and move it
        const s = root.square.clone();
        // scale down and rotate
        s.scale(s.points[0].x, s.points[0].y, 1 / 2 * Math.sqrt(2));
        s.rotate(s.points[0].x, s.points[0].y, -Math.PI * 0.75);
        // clone and mirror
        const s2 = s.clone();
        s2.scale(s2.points[3].x, s2.points[3].y, -1);

        // add to tree
        root.children = [
            {
                square: s
            },
            {
                square: s2
            }
        ];

        this.generateSubTree(root.children[0], level - 1);
        this.generateSubTree(root.children[1], level - 1);
    }

    /**
     * Draws the tree with start, target, path and obstacles.
     */
    draw() {
        // draw tree: recurse from root
        this.drawSubtree(this.root);
    }

    /**
     * Draws a subtree recursively.
     * @param {any} root
     */
    drawSubtree(root) {
        // draw square
        root.square.draw(this.ctx);
        // recurse
        if (root.children) {
            root.children.forEach(c => {
                this.drawSubtree(c);
            });
        }
    }
}

class Square {
    constructor(points) {
        this.points = points;
    }

    translate(x, y) {
        this.points = this.points.map(p => Vector.translate(p, x, y));
        return this;
    }

    scale(cx, cy, factor) {
        this.points = this.points.map(p => Vector.scale(p, cx, cy, factor, factor));
        return this;
    }

    rotate(cx, cy, angle) {
        this.points = this.points.map(p => Vector.rotate(p, cx, cy, angle));
        return this;
    }

    clone() {
        return new Square(this.points.slice(0));
    }

    draw(ctx) {
        lib.drawPolygon(ctx, this.points, "#000", "rgba(0, 0, 0, 0)");
    }
}
