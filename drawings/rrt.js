/**
 * Class for a Rapidly-exploring Random Tree drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Rapidly-exploring_random_tree
 */
class RRT extends Drawing {
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    constructor(parent = document.getElementsByTagName("body")[0], width = 500, height = 500, margin = 10) {
        super(parent, width, height, margin);
        this.title = "Yin Yang";
    }

    /**
     * Draws the image.
     */
    // TODO: add obstacles
    // TODO: add target
    // TODO: draw path to target
    draw() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;

        const iterations = 100;

        const distance = 10;

        const tree = new randomTree(
            {
                width: this.width,
                height: this.height
            },
            {
                x: centerX,
                y: centerY
            }
        );

        for (var i = 0; i < iterations; i++) {
            tree.addVertex();
        }


        return this;
    }





}

class randomTree {
    constructor(areaSize, position, targetPosition, obstacles) {
        this.width = areaSize.width;
        this.height = areaSize.height;
        this.vertices = [];
        this.edges = [];
    }

    addVertex(position) {

    }

    addEdge(vertex1, vertex2) {

    }

    getNearestVertex(position) {

    }

    getRandomPosition() {

    }

    drawGraph(ctx) {
        // draw links for edges


        // do not draw vertices
    }

}

class Obstacle {
    constructor(points, safetyMargin) {
        this.points = points;
        this.safetyMargin = safetyMargin;
    }

    isHit(position) {

    }
}
