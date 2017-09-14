// TODO: comment
class YinYang {
  constructor(parent, width = 100, height = 100, margin = 0) {
    this.title = "Yin Yang";
    this.width = width;
    this.height = height;
    this.margin = margin;
    this.parent = parent;
    this.container = {};
    this.canvas = {};
  }

  init() {
    this.clear();
    this.createContainer();
    this.createCanvas();
    this.draw();
  }

  clear() {
    this.parent.innerHTML = "";
  }

  createContainer() {
    this.container = document.createElement("div");
    this.container.className = "drawingContainer";
    this.parent.appendChild(this.container);

    // add heading with title
    this.heading = document.createElement("h2");
    this.heading.innerHTML = this.title;
    this.container.appendChild(this.heading);
  }

  createCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.container.appendChild(this.canvas);
  }

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

  drawCircle(x, y, radius, fill, startAngle = 0, endAngle = 2 * Math.PI) {
    const ctx = this.canvas.getContext("2d");
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fill();
  }
}
