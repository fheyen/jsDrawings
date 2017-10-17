"use strict";
/**
 * Simple 2d vector class.
 */
class Vector {
    static add(vector1, vector2) {
        return {
            x: vector1.x + vector2.x,
            y: vector1.y + vector2.y
        };
    }
    static translate(vector, x, y) {
        return {
            x: vector.x + x,
            y: vector.y + y
        };
    }
    static diff(vector1, vector2) {
        return {
            x: vector1.x - vector2.x,
            y: vector1.y - vector2.y
        };
    }
    static norm(vector) {
        return Math.hypot(vector.x, vector.y);
    }
    static normalize(vector) {
        const norm = Vector.norm(vector);
        return {
            x: vector.x / norm,
            y: vector.y / norm
        };
    }
    static mult(vector, factor) {
        return {
            x: vector.x * factor,
            y: vector.y * factor
        };
    }
    static dist(vector1, vector2) {
        return Vector.norm(Vector.diff(vector1, vector2));
    }
    /**
     * Scales the point relative to a center at (cx, cy) by fx and fy.
     * @param {object} vector point
     * @param {number} cx center point x
     * @param {number} cy center point y
     * @param {number} fx factor x
     * @param {number} fy factor y
     * @returns {object} scaled vector
     */
    static scale(vector, cx, cy, fx, fy) {
        vector = Vector.translate(vector, -cx, -cy);
        vector.x *= fx;
        vector.y *= fy;
        vector = Vector.translate(vector, cx, cy);
        return vector;
    }
    /**
     * Rotates the point around a center at (cx, cy) by angle.
     * @param {object} vector point
     * @param {number} cx center point x
     * @param {number} cy center point y
     * @param {number} angle rotation angle
     * @returns {object} rotated vector
     */
    static rotate(vector, cx, cy, angle) {
        vector = Vector.translate(vector, -cx, -cy);
        const x = vector.x;
        const y = vector.y;
        vector.x = Math.cos(angle) * x - Math.sin(angle) * y;
        vector.y = Math.sin(angle) * x + Math.cos(angle) * y;
        vector = Vector.translate(vector, cx, cy);
        return vector;
    }
}
