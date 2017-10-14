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
 * Class for a Pythagoras Tree drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Pythagoras_tree_(fractal)
 */
var PT = /** @class */ (function (_super) {
    __extends(PT, _super);
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    function PT(parent, width, height, margin) {
        var _this = _super.call(this, parent, width, height, margin) || this;
        _this.title = "Pythagoras Tree";
        return _this;
    }
    /**
     * Draws the image.
     * @returns {PT} this
     */
    PT.prototype.draw = function () {
        var level = 9;
        var startSize = (Math.min(this.width, this.height) - 2 * this.margin) / 6;
        var startSquare = new Square([
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
        ]);
        var tree = new PythagorasTree(startSquare, level, this.ctx);
        tree.generateTree().draw();
        return this;
    };
    return PT;
}(Drawing));
var PythagorasTreeVertex = /** @class */ (function () {
    function PythagorasTreeVertex(square, children) {
        if (children === void 0) { children = []; }
        this.square = square;
        this.children = children;
    }
    PythagorasTreeVertex.prototype.addChild = function (child) {
        this.children.push(child);
    };
    return PythagorasTreeVertex;
}());
/**
 * Pythagoras tree class.
 */
var PythagorasTree = /** @class */ (function () {
    function PythagorasTree(startSquare, level, ctx) {
        if (ctx === null) {
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
    PythagorasTree.prototype.draw = function () {
        // draw tree: recurse from root
        this.drawSubtree(this.root);
    };
    /**
     * Generates an PT.
     */
    PythagorasTree.prototype.generateTree = function () {
        this.generateSubTree(this.root, this.level);
        return this;
    };
    /**
     * Generates a subtree recursively.
     * @param {any} root
     * @param {number} level levels left to recurse
     */
    PythagorasTree.prototype.generateSubTree = function (root, level) {
        if (level <= 0) {
            return;
        }
        // copy square, scale, translate and move it
        var s = root.square.clone();
        // scale down and rotate
        s.scale(s.points[0].x, s.points[0].y, 1 / 2 * Math.sqrt(2));
        s.rotate(s.points[0].x, s.points[0].y, -Math.PI * 0.75);
        // clone and mirror
        var s2 = s.clone();
        s2.scale(s2.points[3].x, s2.points[3].y, -1);
        // correct rotation of s
        var c = s.getCenter();
        s.rotate(c.x, c.y, Math.PI / 2);
        // add to tree
        root.addChild(new PythagorasTreeVertex(s));
        root.addChild(new PythagorasTreeVertex(s2));
        // recurse
        this.generateSubTree(root.children[0], level - 1);
        this.generateSubTree(root.children[1], level - 1);
    };
    /**
     * Draws a subtree recursively.
     * @param {any} root
     */
    PythagorasTree.prototype.drawSubtree = function (root) {
        var _this = this;
        // draw square
        root.square.draw(this.ctx);
        // recurse
        if (root.children) {
            root.children.forEach(function (c) {
                _this.drawSubtree(c);
            });
        }
    };
    return PythagorasTree;
}());
