/**
 * Class for a Pythagoras Tree drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Pythagoras_tree_(fractal)
 */
class PT extends Drawing
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
        this.title = "Pythagoras Tree";
    }

    /**
     * Draws the image.
     * @returns {PT} this
     */
    public draw(): PT
    {
        const level = 9;
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
        tree.generateTree().draw();

        return this;
    }
}

class PythagorasTreeVertex
{
    public square: Square;
    public children: PythagorasTreeVertex[];

    constructor(square: Square, children: PythagorasTreeVertex[] = [])
    {
        this.square = square;
        this.children = children;
    }

    public addChild(child: PythagorasTreeVertex): void
    {
        this.children.push(child);
    }
}

/**
 * Pythagoras tree class.
 */
class PythagorasTree
{
    private startSquare: Square;
    private level: number;
    private ctx: CanvasRenderingContext2D;
    private root: PythagorasTreeVertex;

    constructor(
        startSquare: Square,
        level: number,
        ctx: CanvasRenderingContext2D | null
    )
    {
        if (ctx === null)
        {
            throw new Error("ctx is null!");
        }
        this.startSquare = startSquare;
        this.level = level;
        this.ctx = ctx;

        this.root = new PythagorasTreeVertex(this.startSquare);
    }

    /**
     * Draws the tree with start, target, path and obstacles.
     */
    public draw(): void
    {
        // draw tree: recurse from root
        this.drawSubtree(this.root);
    }

    /**
     * Generates an PT.
     */
    public generateTree(): PythagorasTree
    {
        this.generateSubTree(this.root, this.level);
        return this;
    }

    /**
     * Generates a subtree recursively.
     * @param {any} root
     * @param {number} level levels left to recurse
     */
    private generateSubTree(root: PythagorasTreeVertex, level: number): void
    {
        if (level <= 0)
        {
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

        // correct rotation of s
        const c = s.getCenter();
        s.rotate(c.x, c.y, Math.PI / 2);

        // add to tree
        root.addChild(new PythagorasTreeVertex(s));
        root.addChild(new PythagorasTreeVertex(s2));

        // recurse
        this.generateSubTree(root.children[0], level - 1);
        this.generateSubTree(root.children[1], level - 1);
    }

    /**
     * Draws a subtree recursively.
     * @param {any} root
     */
    private drawSubtree(root: PythagorasTreeVertex): void
    {
        // draw square
        root.square.draw(this.ctx);
        // recurse
        if (root.children)
        {
            root.children.forEach(c =>
            {
                this.drawSubtree(c);
            });
        }
    }
}
