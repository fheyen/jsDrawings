/**
 * Simple 2d vector class.
 */
class Vector {
    public static add(
        vector1: { x: number, y: number },
        vector2: { x: number, y: number }
    ) {
        return {
            x: vector1.x + vector2.x,
            y: vector1.y + vector2.y
        };
    }

    public static translate(
        vector: { x: number, y: number },
        x: number,
        y: number
    ) {
        return {
            x: vector.x + x,
            y: vector.y + y
        };
    }

    public static diff(
        vector1: { x: number, y: number },
        vector2: { x: number, y: number }
    ) {
        return {
            x: vector1.x - vector2.x,
            y: vector1.y - vector2.y
        };
    }

    public static norm(
        vector: { x: number, y: number }
    ) {

        return Math.hypot(vector.x, vector.y);
    }

    public static normalize(
        vector: { x: number, y: number }
    ) {
        const norm = Vector.norm(vector);
        return {
            x: vector.x / norm,
            y: vector.y / norm
        };
    }

    public static mult(
        vector: { x: number, y: number },
        factor: number
    ) {
        return {
            x: vector.x * factor,
            y: vector.y * factor
        };
    }

    public static dist(
        vector1: { x: number, y: number },
        vector2: { x: number, y: number }
    ) {
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
    public static scale(
        vector: { x: number, y: number },
        cx: number,
        cy: number,
        fx: number,
        fy: number
    ) {
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
    public static rotate(
        vector: { x: number, y: number },
        cx: number,
        cy: number,
        angle: number
    ) {
        vector = Vector.translate(vector, -cx, -cy);
        const x = vector.x;
        const y = vector.y;
        vector.x = Math.cos(angle) * x - Math.sin(angle) * y;
        vector.y = Math.sin(angle) * x + Math.cos(angle) * y;
        vector = Vector.translate(vector, cx, cy);
        return vector;
    }
}
