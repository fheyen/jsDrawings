/**
 * Class for a Yin Yang drawing in JavaScript.
 *
 * Usage:
 * Create and render a new object with
 *    const yinyang = new YinYang(...).init();
 */
class YinYang extends Drawing {
  /**
   * @param parent DOM elemnt to append this drawing to
   * @param width (default: 100) width of the canvas
   * @param height (default: 100) height of the canvas
   * @param margin (default: 10) margin around image content
   */
  constructor(parent, width = 500, height = 500, margin = 10) {
    super(parent, width, height, margin);
    this.title = "Yin Yang";
  }

  /**
   * Draws the image.
   */
  draw() {
    const ctx = this.canvas.getContext("2d");

    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const radius = Math.min(this.width, this.height) / 2 - this.margin;

    this.drawCircle(centerX, centerY, radius, "#000", 0, Math.PI);
    this.drawCircle(centerX, centerY, radius, "#fff", Math.PI, 2 * Math.PI);

    this.drawCircle(centerX - radius / 2, centerY, radius / 2, "#000");
    this.drawCircle(centerX + radius / 2, centerY, radius / 2, "#fff");

    this.drawCircle(centerX - radius / 2, centerY, radius / 8, "#fff");
    this.drawCircle(centerX + radius / 2, centerY, radius / 8, "#000");

    return this;
  }

  /**
   * Draws a circle or partial circle.
   * @param x x-cooridnate
   * @param y y-coordinate
   * @param radius radius
   * @param fill fill color
   * @param startAngle (default: 0) start angle
   * @param endAngle (default: 2 * Pi) end angle
   */
  drawCircle(x, y, radius, fill, startAngle = 0, endAngle = 2 * Math.PI) {
    const ctx = this.canvas.getContext("2d");
    ctx.save();
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fill();
    ctx.restore();
  }
}
