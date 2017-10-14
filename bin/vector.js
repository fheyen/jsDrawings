"use strict";
/**
 * Simple 2d vector class.
 */
var Vector = /** @class */ (function () {
    function Vector() {
    }
    Vector.add = function (vector1, vector2) {
        return {
            x: vector1.x + vector2.x,
            y: vector1.y + vector2.y
        };
    };
    Vector.translate = function (vector, x, y) {
        return {
            x: vector.x + x,
            y: vector.y + y
        };
    };
    Vector.diff = function (vector1, vector2) {
        return {
            x: vector1.x - vector2.x,
            y: vector1.y - vector2.y
        };
    };
    Vector.norm = function (vector) {
        return Math.hypot(vector.x, vector.y);
    };
    Vector.normalize = function (vector) {
        var norm = Vector.norm(vector);
        return {
            x: vector.x / norm,
            y: vector.y / norm
        };
    };
    Vector.mult = function (vector, factor) {
        return {
            x: vector.x * factor,
            y: vector.y * factor
        };
    };
    Vector.dist = function (vector1, vector2) {
        return Vector.norm(Vector.diff(vector1, vector2));
    };
    /**
     * Scales the point relative to a center at (cx, cy) by fx and fy.
     * @param {object} vector point
     * @param {number} cx center point x
     * @param {number} cy center point y
     * @param {number} fx factor x
     * @param {number} fy factor y
     * @returns {object} scaled vector
     */
    Vector.scale = function (vector, cx, cy, fx, fy) {
        vector = Vector.translate(vector, -cx, -cy);
        vector.x *= fx;
        vector.y *= fy;
        vector = Vector.translate(vector, cx, cy);
        return vector;
    };
    /**
     * Rotates the point around a center at (cx, cy) by angle.
     * @param {object} vector point
     * @param {number} cx center point x
     * @param {number} cy center point y
     * @param {number} angle rotation angle
     * @returns {object} rotated vector
     */
    Vector.rotate = function (vector, cx, cy, angle) {
        vector = Vector.translate(vector, -cx, -cy);
        var x = vector.x;
        var y = vector.y;
        vector.x = Math.cos(angle) * x - Math.sin(angle) * y;
        vector.y = Math.sin(angle) * x + Math.cos(angle) * y;
        vector = Vector.translate(vector, cx, cy);
        return vector;
    };
    return Vector;
}());
