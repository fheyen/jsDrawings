/**
 * Class for a drawing in JavaScript.
 */
class Drawing
{
    public title: string;
    protected width: number;
    protected height: number;
    protected margin: number;
    protected parent: HTMLElement;
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D | null;

    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width width of the canvas
     * @param {number} height height of the canvas
     * @param {number} margin margin around image content
     */
    constructor(
        parent: HTMLElement = document.getElementsByTagName("body")[0],
        width: number = 500,
        height: number = 500,
        margin: number = 10,
        title: string = "Unnamed Drawing"
    )
    {
        this.width = width;
        this.height = height;
        this.margin = margin;
        this.parent = parent;
        this.title = title;
    }

    /**
     * Creates the drawing container, title and canvas and draws the image.
     * @return {Drawing} this
     */
    public init(): Drawing
    {
        this.clear();
        this.createCanvas();
        this.draw();
        return this;
    }

    /**
     * Clears the parent element.
     * @return {Drawing} this
     */
    public clear(): Drawing
    {
        if (this.canvas)
        {
            this.parent.removeChild(this.canvas);
        }
        return this;
    }

    /**
     * Draws the image.
     * @return {Drawing} this
     */
    public draw(): Drawing
    {
        console.warn("draw(): Not implemented yet!");
        return this;
    }

    /**
     * Creates the canvas.
     * @return {Drawing} this
     */
    private createCanvas(): Drawing
    {
        if (!this.canvas)
        {
            this.canvas = document.createElement("canvas");
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.parent.appendChild(this.canvas);
        }
        this.ctx = this.canvas.getContext("2d");
        return this;
    }
}
