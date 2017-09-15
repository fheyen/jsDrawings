/***
* Usage:
* Create a new object with   const yinyang = new YinYang(...);
* Render it using            yinyang.init();
*/
class YinYang {
  /***
  * @param parent DOM elemnt to append this drawing to
  * @param width (default: 100) width of the canvas
  * @param height (default: 100) height of the canvas
  * @param margin (default: 0) margin around image content
  */
  constructor(parent, width = 100, height = 100, margin = 0) {
    this.title = "Yin Yang";
    this.width = width;
    this.height = height;
    this.margin = margin;
    this.parent = parent;
    this.canvas = {};
  }

  /***
  * Creates the drawing container, title and canvas and draws the image.
  */
  init() {
    this.clear();
    this.createCanvas();
    this.draw();
    return this;
  }

  /***
  * Clears the parent element.
  */
  clear() {
    this.canvas.remove();
  }

  /***
  * Creates the canvas.
  */
  createCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.parent.appendChild(this.canvas);
  }

  /***
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
  }

  /***
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
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fill();
  }
}
