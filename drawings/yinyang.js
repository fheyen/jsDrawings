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
  constructor(parent = document.getElementsByTagName("body")[0], width = 500, height = 500, margin = 10) {
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

    lib.drawCircle(ctx, centerX, centerY, radius, "#000", "#000", 0, Math.PI);
    lib.drawCircle(ctx, centerX, centerY, radius, "#fff", "#fff", Math.PI, 2 * Math.PI);

    lib.drawCircle(ctx, centerX - radius / 2, centerY, radius / 2, "#000", "#000");
    lib.drawCircle(ctx, centerX + radius / 2, centerY, radius / 2, "#fff", "#fff");

    lib.drawCircle(ctx, centerX - radius / 2, centerY, radius / 8, "#fff", "#fff");
    lib.drawCircle(ctx, centerX + radius / 2, centerY, radius / 8, "#000", "#000");

    return this;
  }
}
