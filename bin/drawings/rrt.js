"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Class for a Rapidly-exploring Random Tree drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Rapidly-exploring_random_tree
 */
var RRT = /** @class */ (function (_super) {
    __extends(RRT, _super);
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    function RRT(parent, width, height, margin) {
        var _this = _super.call(this, parent, width, height, margin) || this;
        _this.title = "RRT";
        return _this;
    }
    /**
     * Draws the image.
     * @returns {RRT} this
     */
    RRT.prototype.draw = function () {
        if (this.ctx === null) {
            throw new Error("ctx is null!");
        }
        var stepsize = 5;
        var start = {
            x: this.width / 2,
            y: this.height / 2
        };
        var target = {
            x: this.width * 0.5,
            y: this.height * 0.85
        };
        // make some obstacles
        var obstacles = [
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
        var tree = new RandomTree({
            width: this.width,
            height: this.height
        }, stepsize, start, target, 0.1, obstacles, this.ctx);
        // generate tree
        tree.generateTree(10000, 2500, false);
        // draw tree, obstacles, start, target and path
        tree.draw();
        return this;
    };
    return RRT;
}(Drawing));
var RandomTreeVertex = /** @class */ (function () {
    function RandomTreeVertex(position) {
        this.x = position.x;
        this.y = position.y;
        this.children = [];
    }
    return RandomTreeVertex;
}());
var RandomTree = /** @class */ (function () {
    function RandomTree(areaSize, stepsize, rootPosition, targetPosition, targetProb, obstacles, ctx) {
        if (ctx === null) {
            throw new Error("ctx is null!");
        }
        this.width = areaSize.width;
        this.height = areaSize.height;
        this.root = new RandomTreeVertex(rootPosition);
        this.target = targetPosition;
        this.targetProb = targetProb;
        this.stepsize = stepsize;
        this.obstacles = obstacles;
        this.ctx = ctx;
        this.vertices = [new RandomTreeVertex(this.root)];
    }
    /**
     * Generates an RRT.
     * @param {number} maxVertices maximum number of vertices
     * @param {number} maxIterations maximum number of iterations
     * @param {boolean} stopWhenTargetReached if this is set to true,
     *  tree generation is stopped once the target has been reached
     * @returns {void}
     */
    RandomTree.prototype.generateTree = function (maxIterations, maxVertices, stopWhenTargetReached) {
        console.log("generating tree with max. " + maxIterations + " iterations, max. " + maxVertices + " vertices");
        console.log("stop when target reached: " + stopWhenTargetReached);
        console.log("stepsize " + this.stepsize);
        for (var i = 0; i < maxIterations; i++) {
            this.samplePosition();
            if (stopWhenTargetReached && this.isTargetReached()) {
                break;
            }
            if (this.vertices.length >= maxVertices) {
                break;
            }
        }
        if (this.isTargetReached()) {
            console.log("target reached");
        }
        console.log(this.vertices.length + " vertices created");
    };
    /**
     * Returns true iff the nearest vertex to the target has a
     * distance of less than this.stepsize.
     * @returns {boolean} true iff target is closer than this.stepsize
     */
    RandomTree.prototype.isTargetReached = function () {
        var nearest = this.getNearestVertex(this.target);
        var distance = Vector.dist(nearest, this.target);
        return distance < this.stepsize;
    };
    /**
     * Draws the tree with start, target, path and obstacles.
     * @returns {void}
     */
    RandomTree.prototype.draw = function () {
        var _this = this;
        if (this.ctx === null) {
            throw new Error("ctx is null!");
        }
        this.ctx.fillStyle = "#000";
        // draw background
        this.ctx.fillRect(0, 0, this.width, this.height);
        // draw obstacles
        this.obstacles.forEach(function (o) {
            if (_this.ctx) {
                o.draw(_this.ctx);
            }
        });
        // draw tree: recurse from root
        this.ctx.strokeStyle = "#aaa";
        this.drawSubtree(this.root);
        // draw path to the vertex that is nearest to target
        var path = this.getPath();
        this.ctx.strokeStyle = "#f00";
        this.drawPath(path);
        // draw straightened path
        var sPath = this.getStraightenedPath();
        this.ctx.strokeStyle = "#0f0";
        this.drawPath(sPath);
        // draw start
        lib.drawCircle(this.ctx, this.root.x, this.root.y, 4, "#fff", "#fff");
        // draw target
        lib.drawCircle(this.ctx, this.target.x, this.target.y, 4, "#fff", "#0f0");
    };
    /**
     * Returns the path from the vertex nearest
     * to the target up to the root.
     * @returns {object[]} path
     */
    RandomTree.prototype.getPath = function () {
        var vertex = this.getNearestVertex(this.target);
        // get initial path
        var path = [vertex];
        while (vertex.parent) {
            path.push(vertex.parent);
            vertex = vertex.parent;
        }
        return path;
    };
    /**
     * Draws a path.
     * @param {any[]} path
     * @returns {void}
     */
    RandomTree.prototype.drawPath = function (path) {
        if (this.ctx === null) {
            throw new Error("ctx is null!");
        }
        // just go up in tree until root is rached
        for (var i = 0; i < path.length - 1; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(path[i].x, path[i].y);
            this.ctx.lineTo(path[i + 1].x, path[i + 1].y);
            this.ctx.stroke();
        }
    };
    /**
     * Simplifies the path from root to target by using straight shortcuts.
     * This is achieved by simply removing waypoints that are not necessary.
     * * @returns {object[]} straightened path
     */
    RandomTree.prototype.getStraightenedPath = function () {
        var path = this.getPath();
        // remove vertices from path while still not hitting obstacles
        var improved;
        do {
            improved = false;
            for (var i = 0; i < path.length - 2; i++) {
                var collision = this.pathCollision(path[i], path[i + 2]);
                // console.log(`${i}: collision: ${collision}`);
                if (!collision) {
                    // remove path[i+1]
                    path.splice(i + 1, 1);
                    improved = true;
                }
            }
        } while (improved);
        return path;
    };
    /**
     * Samples a random position and goes one stepsize in
     * its direction from the nearest vertex of the tree.
     * If there is no obstacle, the new position is added to the tree.
     *  @returns {boolean} true iff new position was obstacle free and added to the tree
     */
    RandomTree.prototype.samplePosition = function () {
        var position = this.getRandomPosition();
        var nearest = this.getNearestVertex(position);
        var difference = Vector.diff(position, nearest);
        var direction = Vector.normalize(difference);
        var distance = Vector.dist(position, nearest);
        var step = Math.min(distance, this.stepsize);
        var newPosition = Vector.add(nearest, Vector.mult(direction, this.stepsize));
        // check for obstacles
        for (var i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].isHit(newPosition)) {
                return false;
            }
        }
        // add new position
        var newVertex = new RandomTreeVertex(newPosition);
        newVertex.parent = nearest;
        nearest.children.push(newVertex);
        this.vertices.push(newVertex);
        return true;
    };
    /**
     * Returns the vertex that is closest to the target.
     * @param {any} position
     *  @returns {object} nearest vertex
     */
    RandomTree.prototype.getNearestVertex = function (position) {
        var tmpNearest = this.root;
        var tmpDistance = Number.MAX_VALUE;
        this.vertices.forEach(function (v) {
            var distance = Vector.dist(v, position);
            if (distance < tmpDistance) {
                tmpDistance = distance;
                tmpNearest = v;
            }
        });
        return tmpNearest;
    };
    /**
     * Returns a position or the target at random.
     * @returns {object} random position
     */
    RandomTree.prototype.getRandomPosition = function () {
        // sometimes take the target
        if (Math.random() < this.targetProb) {
            return this.target;
        }
        return {
            x: lib.randomInt(0, this.width),
            y: lib.randomInt(0, this.height)
        };
    };
    /**
     * Draws a subtree recursively.
     * @param {any} root
     * @returns {void}
     */
    RandomTree.prototype.drawSubtree = function (root) {
        var _this = this;
        if (root.children.length === 0) {
            // leaf vertex
            return;
        }
        // draw line from root to all children ...
        root.children.forEach(function (c) {
            if (_this.ctx === null) {
                return;
            }
            _this.ctx.beginPath();
            _this.ctx.moveTo(root.x, root.y);
            _this.ctx.lineTo(c.x, c.y);
            _this.ctx.stroke();
        });
        // ... then recurse
        root.children.forEach(function (c) {
            _this.drawSubtree(c);
        });
    };
    /**
     * Subsamples a straight line from position1 to position2 and checks for collisions.
     * @param {any} position1 a position as {x, y}
     * @param {any} position2 a position as {x, y}
     * @return true iff a collision has been detected
     */
    RandomTree.prototype.pathCollision = function (position1, position2) {
        var distance = Vector.dist(position1, position2);
        var steps = Math.ceil(distance / this.stepsize);
        var stepsize = distance / steps;
        var difference = Vector.diff(position2, position1);
        var direction = Vector.normalize(difference);
        var tmpPosition = position1;
        var oneStep = Vector.mult(direction, stepsize);
        for (var step = 0; step < steps; step++) {
            tmpPosition = Vector.add(tmpPosition, oneStep);
            // check for obstacles
            for (var i = 0; i < this.obstacles.length; i++) {
                if (this.obstacles[i].isHit(tmpPosition)) {
                    return true;
                }
            }
        }
        return false;
    };
    return RandomTree;
}());
/**
 * Obstacle super class.
 */
var Obstacle = /** @class */ (function () {
    function Obstacle(safetyMargin) {
        this.marginColor = "rgba(255, 255, 255, 0.4)";
        this.fillColor = "rgba(200, 0, 0, 0.5)";
        this.safetyMargin = safetyMargin;
    }
    /**
     * Hit test.
     * @param {object} position
     * @return true iff hit
     */
    Obstacle.prototype.isHit = function (position) {
        alert("nyi");
        return false;
    };
    /**
     * Draws this obstacle onto the canvas.
     * @param {CanvasRenderingContext2D} ctx
     * @returns {void}
     */
    Obstacle.prototype.draw = function (ctx) {
        alert("nyi");
    };
    return Obstacle;
}());
/**
 * Circular obstacle class.
 */
var CircularObstacle = /** @class */ (function (_super) {
    __extends(CircularObstacle, _super);
    function CircularObstacle(center, radius, safetyMargin) {
        var _this = _super.call(this, safetyMargin) || this;
        _this.center = center;
        _this.radius = radius;
        return _this;
    }
    /**
     * Hit test.
     * @param {object} position
     * @return true iff hit
     */
    CircularObstacle.prototype.isHit = function (position) {
        return Vector.dist(this.center, position) < this.radius + this.safetyMargin;
    };
    /**
     * Draws this obstacle onto the canvas.
     * @param {CanvasRenderingContext2D} ctx
     * @returns {void}
     */
    CircularObstacle.prototype.draw = function (ctx) {
        var trans = "rgba(0, 0, 0, 0)";
        // draw safetyMargin
        lib.drawCircle(ctx, this.center.x, this.center.y, this.radius + this.safetyMargin, trans, this.marginColor);
        // draw obstacle
        lib.drawCircle(ctx, this.center.x, this.center.y, this.radius, trans, this.fillColor);
    };
    return CircularObstacle;
}(Obstacle));
/**
 * Rectangular obstacle class.
 */
var RectangularObstacle = /** @class */ (function (_super) {
    __extends(RectangularObstacle, _super);
    function RectangularObstacle(position, width, height, safetyMargin) {
        var _this = _super.call(this, safetyMargin) || this;
        _this.position = position;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    /**
     * Hit test.
     * @param {object} position
     * @return true iff hit
     */
    RectangularObstacle.prototype.isHit = function (position) {
        return position.x > this.position.x - this.safetyMargin
            && position.y > this.position.y - this.safetyMargin
            && position.x < this.position.x + this.width + this.safetyMargin
            && position.y < this.position.y + this.height + this.safetyMargin;
    };
    /**
     * Draws this obstacle onto the canvas.
     * @param {CanvasRenderingContext2D} ctx
     * @returns {void}
     */
    RectangularObstacle.prototype.draw = function (ctx) {
        // draw safetyMargin
        ctx.fillStyle = this.marginColor;
        ctx.fillRect(this.position.x - this.safetyMargin, this.position.y - this.safetyMargin, this.width + 2 * this.safetyMargin, this.height + 2 * this.safetyMargin);
        // draw obstacle
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    };
    return RectangularObstacle;
}(Obstacle));
