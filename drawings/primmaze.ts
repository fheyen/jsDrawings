/**
 * Class for a Prim's Maze drawing in JavaScript.
 *
 * http://weblog.jamisbuck.org/2011/1/10/maze-generation-prim-s-algorithm
 */
class PrimMaze extends Drawing
{
    /**
     * @param {Element} parent DOM elemnt to append this drawing to
     * @param {number} width (default: 100) width of the canvas
     * @param {number} height (default: 100) height of the canvas
     * @param {number} margin (default: 10) margin around image content
     */
    constructor(
        parent: HTMLElement,
        width: number,
        height: number,
        margin: number
    )
    {
        super(parent, width, height, margin, "Prim Maze");
    }

    /**
     * Draws the image.
     * @returns {PrimMaze} this
     */
    public draw(): PrimMaze
    {
        const grid: number[][] = [];

        const frontier: number[][] = [];

        // maze cell size in pixels
        const cellSize = 10;

        const cols = Math.floor(this.width / cellSize);
        const rows = Math.floor(this.height / cellSize);

        // fill all grid cells with 0
        for (let row = 0; row < rows; row++)
        {
            grid.push(new Array<number>(cols).fill(0));
        }

        // maze starts at (0, 0)
        frontier.push([0, 0]);


        // TODO: while (frontier.length > 0)
        for (let iteration = 0; iteration < 2500; iteration++)
        {
            // choose random frontier cell and add to path
            const index = Math.floor((Math.random() * frontier.length));

            const fr = frontier[index];
            if (!fr)
            {
                console.log(index);
                console.log(frontier);
            }
            const row = fr[0];
            const col = fr[1];



            // update frontier
            frontier.splice(index, 1);


            // check 4 neighbor cells and add to frontier if inside grid and 0
            const neighbors = [
                [row - 1, col],
                [row, col - 1],
                [row + 1, col],
                [row, col + 1]
            ];
            neighbors.forEach(n =>
            {
                if (
                    grid[n[0]] !== undefined
                    && grid[n[0]][n[1]] !== undefined
                    && grid[n[0]][n[1]] === 0
                )
                {
                    if (this.getNumberOfWayNeighbors(n[0], n[1], grid) < 2)
                    {
                        frontier.push([n[0], n[1]]);
                    }
                    else
                    {
                        grid[n[0]][n[1]] = 3;
                    }
                }
            });


            // set frontier to 2
            frontier.forEach((f) =>
            {
                grid[f[0]][f[1]] = 2;
            }
            );

            this.drawGrid(grid, cellSize);

            let a = "";
        }

        return this;
    }

    private drawGrid(grid: number[][], cellSize: number): void
    {
        const rows = grid.length;
        const cols = grid[0].length;
        for (let row = 0; row < rows; row++)
        {
            for (let col = 0; col < cols; col++)
            {
                switch (grid[row][col])
                {
                    case 0:
                        // initial
                        this.ctx.fillStyle = "#00f";
                        break;

                    case 1:
                        // way
                        this.ctx.fillStyle = "#fff";
                        break;

                    case 2:
                        // frontier
                        this.ctx.fillStyle = "#f00";
                        break;

                    default:
                        // wall
                        this.ctx.fillStyle = "#000";
                        break;
                }

                this.ctx.fillRect(
                    col * cellSize,
                    row * cellSize,
                    cellSize,
                    cellSize
                );
            }
        }
    }
}
