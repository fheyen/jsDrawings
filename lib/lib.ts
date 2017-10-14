const lib = {
    /**
     * Translates and scales 2D points to fit given bounds, while keeping aspect ratio.
     * @param {number[][]} points - array of points as [x, y]
     * @param {number} width - width
     * @param {number} height - height
     * @param {number} margin - margin
     * @returns {number[][]} rescaled points
     */
    rescaleAndCenter(points: number[][], width: number, height: number, margin: number): number[][] {
        const [minX, minY, maxX, maxY] = lib.getMinMax(points);
        const w = width;
        const h = height;
        const m = margin;

        // get scaling factor and translation vector
        const factor = Math.min((w - 2 * m) / (maxX - minX), (h - 2 * m) / (maxY - minY));
        const moveX = (w - (maxX - minX) * factor) / 2;
        const moveY = (h - (maxY - minY) * factor) / 2;

        // map points to new locations
        points = points.map(p => [
            (p[0] - minX) * factor + moveX,
            (p[1] - minY) * factor + moveY
        ]);

        return points;
    },

    /**
     * Returns the minimum and maximum x and y coordinates
     * @param {number[][]} points array of points as [x, y]
     * @return {number[]} [minX, minY, maxX, maxY]
     */
    getMinMax(points: number[][]): number[] {
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

    /**
     * Escapes a regular expression.
     *
     * http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
     *
     * @param {string} str regex
     * @return {string} escaped regex
     */
    escapeRegExp(str: string): string {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    },

    /**
     * Replaces all occurrences of <find> in <str> with <replace>.
     *
     * http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
     *
     * @param {string} str string
     * @param {string} find text to replace
     * @param {string} replace text to replace with
     * @returns {string} result
     */
    replaceAll(str: string, find: string, replace: string): string {
        return str.replace(new RegExp(lib.escapeRegExp(find), "g"), replace);
    },

    /**
     * Converts a color in hex code (e.g. #FFFFFF) to an RGB object.
     * @param {string} color color in hex code
     * @return {object} RGB
     */
    hexColorToRGB(color: string): { r: number, g: number, b: number } {
        if (typeof (color) !== "string") {
            throw new TypeError(`color is not a hex string: ${color}`);
        }
        const c = color.charAt(0) === "#" ? color.substring(1, 7) : color;
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
     * @return {string} hex string
     */
    rgbColorToHex(r: number, g: number, b: number): string {
        // one value from integer to hex string, copied from d3
        function rgbToHex(v: number) {
            return v < 16 ? `0${Math.max(0, v).toString(16)}` : Math.min(255, v).toString(16);
        }
        return `#${rgbToHex(r)}${rgbToHex(g)}${rgbToHex(b)}`;
    },

    /**
     * Returns a color interpolated between two specified colors.
     * @param {string} color1 color as hex code
     * @param {string} color2 color as hex code
     * @param {number} fraction value in [0, 1] that represents the relative position between to interpolation points
     * @return {object} RGB
     */
    colorLinearInterpolation(color1: string, color2: string, fraction: number): string {
        if (fraction > 1 || fraction < 0) {
            console.error(`fraction is not in [0, 1]: ${fraction}`);
        }
        try {
            const rgb1 = lib.hexColorToRGB(color1);
            const rgb2 = lib.hexColorToRGB(color2);
            const resultRgb = {
                r: Math.round(rgb1.r * (1 - fraction) + rgb2.r * fraction),
                g: Math.round(rgb1.g * (1 - fraction) + rgb2.g * fraction),
                b: Math.round(rgb1.b * (1 - fraction) + rgb2.b * fraction)
            };
            const { r, g, b } = resultRgb;
            return lib.rgbColorToHex(r, g, b);
        } catch (error) {
            console.error(error);
            console.error("invalid colors:");
            console.error(color1);
            console.error(color2);
            return "";
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
     * @return {void}
     */
    drawCircle(
        ctx: CanvasRenderingContext2D | null,
        x: number,
        y: number,
        radius: number,
        stroke: string = "#000",
        fill: string = "rgba(0, 0, 0, 0)",
        startAngle: number = 0,
        endAngle: number = 2 * Math.PI
    ): void {
        if (!ctx) {
            return;
        }
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
     * Draws a filled polygon.
     * @param {CanvasContext} ctx canvas context
     * @param {any[]} points array with points as {x, y}
     * @param {string} stroke stroke style
     * @param {string} fill fill style
     * @return {void}
     */
    drawPolygon(
        ctx: CanvasRenderingContext2D | null,
        points: { x: number, y: number }[],
        stroke: string = "#000",
        fill: string = "rgba(0, 0, 0, 0)"
    ): void {
        if (!ctx) {
            return;
        }
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
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
    drawPath(
        ctx: CanvasRenderingContext2D | null,
        path: number[][],
        palette: string[],
        interpolate: boolean = true
    ): void {
        if (!ctx) {
            return;
        }
        let oldP = path[0];
        let i = 0;
        const blocklength = path.length / palette.length;
        path.forEach(p => {
            ctx.beginPath();
            ctx.moveTo(oldP[0], oldP[1]);
            ctx.lineTo(p[0], p[1]);
            ctx.closePath();

            // change color while progressing
            const color1 = palette[Math.floor(i / path.length * (palette.length - 1))];

            if (interpolate) {
                // interpolate intermediate colors
                let color2 = palette[Math.floor(i / path.length * (palette.length - 1)) + 1];
                if (!color2) {
                    color2 = palette[palette.length - 1];
                }
                const fraction = (i % blocklength) / blocklength;
                ctx.strokeStyle = lib.colorLinearInterpolation(color1, color2, fraction);
            } else {
                ctx.strokeStyle = color1;
            }
            ctx.stroke();

            i++;
            oldP = p;
        });
    },

    /**
     * Returns a random integer from the interval [min, max)
     * @param {number} min minimum
     * @param {number} max maximum
     * @return {number} random integer
     */
    randomInt(min: number, max: number): number {
        return min + Math.floor(Math.random() * (max - min));
    }
};
