const lib = {
    /**
     * Translates and scales 2D points to fit given bounds, while keeping aspect ratio.
     * @param {array[]} points array of points as [x, y]
     * @param {number} width
     * @param {number} height
     * @param {number} margin
     */
    rescaleAndCenter(points, width, height, margin) {
        let [minX, minY, maxX, maxY] = this.getMinMax(points);
        let w = width;
        let h = height;
        let m = margin;

        // get scaling factor and translation vector
        let factor = Math.min((w - 2 * m) / (maxX - minX), (h - 2 * m) / (maxY - minY));
        let moveX = (w - (maxX - minX) * factor) / 2;
        let moveY = (h - (maxY - minY) * factor) / 2;

        // map points to new locations
        points = points.map(p => [
            (p[0] - minX) * factor + moveX,
            (p[1] - minY) * factor + moveY
        ]);

        return points;
    },

    /**
     * Returns the minimum and maximum x and y coordinates
     * @param {array[]} points array of points as [x, y]
     * @return {number[]} [minX, minY, maxX, maxY]
     */
    getMinMax(points) {
        let minX = Number.MAX_VALUE;
        let minY = Number.MAX_VALUE;
        let maxX = Number.MIN_VALUE;
        let maxY = Number.MIN_VALUE;

        points.forEach(p => {
            minX = p[0] < minX ? p[0] : minX;
            minY = p[1] < minY ? p[1] : minY;
            maxX = p[0] > maxX ? p[0] : maxX;
            maxY = p[1] > maxY ? p[1] : maxY;
        });

        return [minX, minY, maxX, maxY];
    },

    /*******************************************************************************
     * Escapes a regular expression.
     *
     * http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
     */
    escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    },

    /*******************************************************************************
     * Replaces all occurrences of <find> in <str> with <replace>.
     *
     * http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
     */
    replaceAll(str, find, replace) {
        return str.replace(new RegExp(this.escapeRegExp(find), "g"), replace);
    },

    /**
     * Converts a color in hex code (e.g. #FFFFFF) to an RGB object.
     * @param {string} color color in hex code
     */
    hexColorToRGB(color) {
        if (typeof (color) != "string") {
            throw new TypeError(`color is not a hex string: ${color}`);
        }
        let c = color.charAt(0) == "#" ? color.substring(1, 7) : color;
        if (c.length < 6) {
            throw new TypeError(`color has not the correct length of 6 characters: ${color}`);
        }
        return {
            r: parseInt(c.substring(0, 2), 16),
            g: parseInt(c.substring(2, 4), 16),
            b: parseInt(c.substring(4, 6), 16)
        };
    },

    /**
     * Converts a color in RGB to a hex string.
     * @param {number} r red color component
     * @param {number} g green color component
     * @param {number} b blue color component
     */
    rgbColorToHex(r, g, b) {
        // one value from integer to hex string, copied from d3
        function rgbToHex(v) {
            return v < 16 ? `0${Math.max(0, v).toString(16)}` : Math.min(255, v).toString(16);
        }
        return `#${rgbToHex(r)}${rgbToHex(g)}${rgbToHex(b)}`;
    },

    /**
     * Returns a color interpolated between two specified colors.
     * @param {string} color1 color as hex code
     * @param {string} color2 color as hex code
     * @param {number} fraction value in [0, 1] that represents the relative position between to interpolation points
     */
    colorLinearInterpolation(color1, color2, fraction) {
        if (fraction > 1 || fraction < 0) {
            console.error(`fraction is not in [0, 1]: ${fraction}`);
        }
        try {
            let rgb1 = this.hexColorToRGB(color1);
            let rgb2 = this.hexColorToRGB(color2);
            let resultRgb = {
                r: Math.round(rgb1.r * (1 - fraction) + rgb2.r * fraction),
                g: Math.round(rgb1.g * (1 - fraction) + rgb2.g * fraction),
                b: Math.round(rgb1.b * (1 - fraction) + rgb2.b * fraction)
            };
            let { r, g, b } = resultRgb;
            return this.rgbColorToHex(r, g, b);
        } catch (error) {
            console.error(error);
            console.error("invalid colors:");
            console.error(color1);
            console.error(color2);
        }
    },

    /**
     * Draws a circle or partial circle.
     * @param {CanvasContext} ctx canvas context
     * @param {number} x x-cooridnate
     * @param {number} y y-coordinate
     * @param {number} radius radius
     * @param {string} stroke stroke style
     * @param {string} fill fill style
     * @param {number} startAngle (default: 0) start angle
     * @param {number} endAngle (default: 2 * Pi) end angle
     */
    drawCircle(ctx, x, y, radius, stroke = "#000", fill = "rgba(0, 0, 0, 0)", startAngle = 0, endAngle = 2 * Math.PI) {
        ctx.save();
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    },

    /**
     * Draws a filled triangle.
     * @param {CanvasContext} ctx canvas context
     * @param {any[]} points array with 3 points as {x, y}
     * @param {string} stroke stroke style
     * @param {string} fill fill style
     */
    drawTriangle(ctx, points, stroke = "#000", fill = "rgba(0, 0, 0, 0)") {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
        ctx.closePath();
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    },

    /**
     * Draws a path consisting of 2D point arrays onto a canvas.
     * @param {CanvasContext} ctx canvas context
     * @param {array[]} path points as [x, y]
     * @param {string[]} palette stroke style array
     */
    drawPath(ctx, path, palette, interpolate = true) {
        let oldP = path[0];
        let i = 0;
        let blocklength = path.length / palette.length;
        path.forEach(p => {
            ctx.beginPath();
            ctx.moveTo(oldP[0], oldP[1]);
            ctx.lineTo(p[0], p[1]);
            ctx.closePath();

            // change color while progressing
            let color1 = palette[~~(i / path.length * (palette.length - 1))];

            if (interpolate) {
                // interpolate intermediate colors
                let color2 = palette[~~(i / path.length * (palette.length - 1)) + 1];
                if (!color2) {
                    color2 = palette[palette.length - 1];
                }
                let fraction = (i % blocklength) / blocklength;
                ctx.strokeStyle = lib.colorLinearInterpolation(color1, color2, fraction);
            } else {
                ctx.strokeStyle = color1;
            }
            ctx.stroke();

            i++;
            oldP = p;
        });
    }
}