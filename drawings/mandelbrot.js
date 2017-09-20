/**
 * Class for an mandelbrot set drawing in JavaScript.
 *
 * https://en.wikipedia.org/wiki/Mandelbrot_set#Continuous_.28smooth.29_coloring
 */
class Mandelbrot extends Drawing {
    /**
     * @param parent DOM elemnt to append this drawing to
     * @param width (default: 100) width of the canvas
     * @param height (default: 100) height of the canvas
     * @param margin (default: 0) margin around image content
     */
    constructor(parent, width = 500, height = 500, margin = 10, colors) {
        super(parent, width, height, margin);
        this.title = "Mandelbrot";
        this.colors = colors;
    }

    /**
     * Draws the image.
     */
    draw() {
        const ctx = this.canvas.getContext("2d");

        // color brewer spectral 11
        const palette = ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"];

        const pixelSize = 0.5;
        const max_iteration = 500;

        // for each pixel
        for (let px = 0, w = ~~(this.width); px <= w; px += pixelSize) {
            for (let py = 0, h = ~~(this.height); py <= ~~(h / 2); py += pixelSize) {

                // x0 = scaled x coordinate of pixel (scaled to lie in the Mandelbrot X scale (-2.5, 1))
                let x0 = (px / w) * 3.5 - 2.5;
                // y0 = scaled y coordinate of pixel (scaled to lie in the Mandelbrot Y scale (-1, 1))
                let y0 = (py / h) * 2 - 1;

                let x = 0.0;
                let y = 0.0;
                let iteration = 0;

                // Here N=2^8 is chosen as a reasonable bailout radius.
                while (x * x + y * y < (1 << 16) && iteration < max_iteration) {
                    let xtemp = x * x - y * y + x0;
                    y = 2 * x * y + y0;
                    x = xtemp;
                    iteration = iteration + 1;
                }

                // Used to avoid floating point issues with points inside the set.
                if (iteration < max_iteration) {
                    // sqrt of inner term removed using log simplification rules.
                    let log_zn = Math.log(x * x + y * y) / 2;
                    let nu = Math.log(log_zn / Math.log(2)) / Math.log(2);

                    // Rearranging the potential function.
                    // Dividing log_zn by log(2) instead of log(N = 1<<8)
                    // because we want the entire palette to range from the
                    // center to radius 2, NOT our bailout radius.
                    iteration = iteration + 1 - nu;
                }

                let color1 = palette[~~(iteration)];
                let color2 = palette[~~(iteration) + 1];

                // iteration % 1 = fractional part of iteration.
                // TODO: transparency?
                let color = this.linear_interpolate(color1, color2, iteration % 1);

                ctx.fillStyle = color;
                ctx.fillRect(px, py, pixelSize, pixelSize);
                // use symmetry
                ctx.fillRect(px, ~~(h - py), pixelSize, pixelSize);
            }
        }

        return this;
    }

    linear_interpolate(color1, color2, fraction) {
        // TODO:
        return color1;
    }
}
