"use strict";
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
    constructor(parent, width, height, margin) {
        super(parent, width, height, margin, "RRT");
    }
    /**
     * Draws the image.
     * @returns {RRT} this
     */
    draw() {
        const stepsize = 5;
        const start = {
            x: this.width / 2,
            y: this.height / 2
        };
        const target = {
            x: this.width * 0.5,
            y: this.height * 0.85
        };
        // make some obstacles
        const obstacles = [
            new CircularObstacle({
                x: this.width * 0.2,
                y: this.height * 0.6
            }, 40, stepsize),
            new CircularObstacle({
                x: this.width * 0.75,
                y: this.height * 0.25
            }, 50, stepsize),
            new RectangularObstacle({
                x: this.width * 0.2,
                y: this.height * 0.6
            }, 300, 20, stepsize)
        ];
        // initialize RRT
        const tree = new RandomTree({
            width: this.width,
            height: this.height
        }, stepsize, start, target, 0.1, obstacles, this.ctx);
        // generate tree
        tree.generateTree(10000, 2500, false);
        // draw tree, obstacles, start, target and path
        tree.draw();
        return this;
    }
}
/**
 * Helper class for RandomTree.
 *
 * @class RandomTreeVertex
 */
class RandomTreeVertex {
    constructor(position) {
        this.x = position.x;
        this.y = position.y;
        this.children = [];
    }
}
/**
 * Random tree class.
 *
 * @class RandomTree
 */
class RandomTree {
    constructor(areaSize, stepsize, rootPosition, targetPosition, targetProb, obstacles, ctx) {
        this.width = areaSize.width;
        this.height = areaSize.height;
        this.root = new RandomTreeVertex(rootPosition);
        this.target = targetPosition;
        this.targetProb = targetProb;
        this.stepsize = stepsize;
        this.obstacles = obstacles;
        this.ctx = ctx;
        this.vertices = [this.root];
    }
    /**
     * Generates an RRT.
     * @param {number} maxVertices maximum number of vertices
     * @param {number} maxIterations maximum number of iterations
     * @param {boolean} stopWhenTargetReached if this is set to true,
     *  tree generation is stopped once the target has been reached
     * @returns {void}
     */
    generateTree(maxIterations, maxVertices, stopWhenTargetReached) {
        console.log(`generating tree with max. ${maxIterations} iterations, max. ${maxVertices} vertices`);
        console.log(`stop when target reached: ${stopWhenTargetReached}`);
        console.log(`stepsize ${this.stepsize}`);
        for (let i = 0; i < maxIterations; i++) {
            this.samplePosition();
            if (stopWhenTargetReached && this.isTargetReached()) {
                break;
            }
            if (this.vertices.length >= maxVertices) {
                break;
            }
        }
        if (this.isTargetReached()) {
            console.log(`target reached`);
        }
        console.log(`${this.vertices.length} vertices created`);
    }
    /**
     * Returns true iff the nearest vertex to the target has a
     * distance of less than this.stepsize.
     * @returns {boolean} true iff target is closer than this.stepsize
     */
    isTargetReached() {
        const nearest = this.getNearestVertex(this.target);
        const distance = Vector.dist(nearest, this.target);
        return distance < this.stepsize;
    }
    /**
     * Draws the tree with start, target, path and obstacles.
     * @returns {void}
     */
    draw() {
        this.ctx.fillStyle = "#000";
        // draw background
        this.ctx.fillRect(0, 0, this.width, this.height);
        // draw obstacles
        this.obstacles.forEach(o => {
            if (this.ctx) {
                o.draw(this.ctx);
            }
        });
        // draw tree: recurse from root
        this.ctx.strokeStyle = "#aaa";
        this.drawSubtree(this.root);
        // draw path to the vertex that is nearest to target
        const path = this.getPath();
        this.ctx.strokeStyle = "#f00";
        this.drawPath(path);
        // draw straightened path
        const sPath = this.getStraightenedPath();
        this.ctx.strokeStyle = "#0f0";
        this.drawPath(sPath);
        // draw start
        lib.drawCircle(this.ctx, this.root.x, this.root.y, 4, "#fff", "#fff");
        // draw target
        lib.drawCircle(this.ctx, this.target.x, this.target.y, 4, "#fff", "#0f0");
    }
    /**
     * Returns the path from the vertex nearest
     * to the target up to the root.
     * @returns {object[]} path
     */
    getPath() {
        let vertex = this.getNearestVertex(this.target);
        // get initial path
        const path = [vertex];
        while (vertex.parent) {
            path.push(vertex.parent);
            vertex = vertex.parent;
        }
        return path;
    }
    /**
     * Draws a path.
     * @param {any[]} path
     * @returns {void}
     */
    drawPath(path) {
        // just go up in tree until root is rached
        for (let i = 0; i < path.length - 1; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(path[i].x, path[i].y);
            this.ctx.lineTo(path[i + 1].x, path[i + 1].y);
            this.ctx.stroke();
        }
    }
    /**
     * Simplifies the path from root to target by using straight shortcuts.
     * This is achieved by simply removing waypoints that are not necessary.
     * * @returns {object[]} straightened path
     */
    getStraightenedPath() {
        const path = this.getPath();
        // remove vertices from path while still not hitting obstacles
        let improved;
        do {
            improved = false;
            for (let i = 0; i < path.length - 2; i++) {
                const collision = this.pathCollision(path[i], path[i + 2]);
                // console.log(`${i}: collision: ${collision}`);
                if (!collision) {
                    // remove path[i+1]
                    path.splice(i + 1, 1);
                    improved = true;
                }
            }
        } while (improved);
        return path;
    }
    /**
     * Samples a random position and goes one stepsize in
     * its direction from the nearest vertex of the tree.
     * If there is no obstacle, the new position is added to the tree.
     *  @returns {boolean} true iff new position was obstacle free and added to the tree
     */
    samplePosition() {
        const position = this.getRandomPosition();
        const nearest = this.getNearestVertex(position);
        const difference = Vector.diff(position, nearest);
        const direction = Vector.normalize(difference);
        const distance = Vector.dist(position, nearest);
        const step = Math.min(distance, this.stepsize);
        const newPosition = Vector.add(nearest, Vector.mult(direction, step));
        // check for obstacles
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].isHit(newPosition)) {
                return false;
            }
        }
        // add new position
        const newVertex = new RandomTreeVertex(newPosition);
        newVertex.parent = nearest;
        nearest.children.push(newVertex);
        this.vertices.push(newVertex);
        return true;
    }
    /**
     * Returns the vertex that is closest to the target.
     * @param {any} position
     *  @returns {object} nearest vertex
     */
    getNearestVertex(position) {
        let tmpNearest = this.root;
        let tmpDistance = Number.MAX_VALUE;
        this.vertices.forEach(v => {
            const distance = Vector.dist(v, position);
            if (distance < tmpDistance) {
                tmpDistance = distance;
                tmpNearest = v;
            }
        });
        return tmpNearest;
    }
    /**
     * Returns a position or the target at random.
     * @returns {object} random position
     */
    getRandomPosition() {
        // sometimes take the target
        if (Math.random() < this.targetProb) {
            return this.target;
        }
        return {
            x: lib.randomInt(0, this.width),
            y: lib.randomInt(0, this.height)
        };
    }
    /**
     * Draws a subtree recursively.
     * @param {any} root
     * @returns {void}
     */
    drawSubtree(root) {
        if (root.children.length === 0) {
            // leaf vertex
            return;
        }
        // draw line from root to all children ...
        root.children.forEach(c => {
            this.ctx.beginPath();
            this.ctx.moveTo(root.x, root.y);
            this.ctx.lineTo(c.x, c.y);
            this.ctx.stroke();
        });
        // ... then recurse
        root.children.forEach(c => {
            this.drawSubtree(c);
        });
    }
    /**
     * Subsamples a straight line from position1 to position2 and checks for collisions.
     * @param {any} position1 a position as {x, y}
     * @param {any} position2 a position as {x, y}
     * @return true iff a collision has been detected
     */
    pathCollision(position1, position2) {
        const distance = Vector.dist(position1, position2);
        const steps = Math.ceil(distance / this.stepsize);
        const stepsize = distance / steps;
        const difference = Vector.diff(position2, position1);
        const direction = Vector.normalize(difference);
        let tmpPosition = position1;
        const oneStep = Vector.mult(direction, stepsize);
        for (let step = 0; step < steps; step++) {
            tmpPosition = Vector.add(tmpPosition, oneStep);
            // check for obstacles
            for (let i = 0; i < this.obstacles.length; i++) {
                if (this.obstacles[i].isHit(tmpPosition)) {
                    return true;
                }
            }
        }
        return false;
    }
}
/**
 * Obstacle super class.
 */
class Obstacle {
    constructor(safetyMargin) {
        this.marginColor = "rgba(255, 255, 255, 0.4)";
        this.fillColor = "rgba(200, 0, 0, 0.5)";
        this.safetyMargin = safetyMargin;
    }
    /**
     * Hit test.
     * @param {object} position
     * @return true iff hit
     */
    isHit(position) {
        console.error(`not yet implemented, argument: ${position}`);
        return false;
    }
    /**
     * Draws this obstacle onto the canvas.
     * @param {CanvasRenderingContext2D} ctx
     * @returns {void}
     */
    draw(ctx) {
        console.error(`not yet implemented, argument: ${ctx}`);
    }
}
/**
 * Circular obstacle class.
 */
class CircularObstacle extends Obstacle {
    constructor(center, radius, safetyMargin) {
        super(safetyMargin);
        this.center = center;
        this.radius = radius;
    }
    /**
     * Hit test.
     * @param {object} position
     * @return true iff hit
     */
    isHit(position) {
        return Vector.dist(this.center, position) < this.radius + this.safetyMargin;
    }
    /**
     * Draws this obstacle onto the canvas.
     * @param {CanvasRenderingContext2D} ctx
     * @returns {void}
     */
    draw(ctx) {
        const trans = "rgba(0, 0, 0, 0)";
        // draw safetyMargin
        lib.drawCircle(ctx, this.center.x, this.center.y, this.radius + this.safetyMargin, trans, this.marginColor);
        // draw obstacle
        lib.drawCircle(ctx, this.center.x, this.center.y, this.radius, trans, this.fillColor);
    }
}
/**
 * Rectangular obstacle class.
 */
class RectangularObstacle extends Obstacle {
    constructor(position, width, height, safetyMargin) {
        super(safetyMargin);
        this.position = position;
        this.width = width;
        this.height = height;
    }
    /**
     * Hit test.
     * @param {object} position
     * @return true iff hit
     */
    isHit(position) {
        return position.x > this.position.x - this.safetyMargin
            && position.y > this.position.y - this.safetyMargin
            && position.x < this.position.x + this.width + this.safetyMargin
            && position.y < this.position.y + this.height + this.safetyMargin;
    }
    /**
     * Draws this obstacle onto the canvas.
     * @param {CanvasRenderingContext2D} ctx
     * @returns {void}
     */
    draw(ctx) {
        // draw safetyMargin
        ctx.fillStyle = this.marginColor;
        ctx.fillRect(this.position.x - this.safetyMargin, this.position.y - this.safetyMargin, this.width + 2 * this.safetyMargin, this.height + 2 * this.safetyMargin);
        // draw obstacle
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
