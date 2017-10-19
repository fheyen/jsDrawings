class Graph
{
    private vertices: Map<number, GraphVertex>;
    // source, target, directed
    private edges: GraphEdge[];

    constructor()
    {
        this.vertices = new Map<number, GraphVertex>();
        this.edges = new Array<GraphEdge>();
    }

    public addVertex(id: number): void
    {
        this.vertices.set(id, new GraphVertex(id));
    }

    public getVertex(id: number): GraphVertex
    {
        if (this.vertices.has(id))
        {
            return this.vertices.get(id) as GraphVertex;
        }
        else
        {
            return GraphVertex.NullVertex;
        }
    }

    public addEdge(
        source: GraphVertex,
        target: GraphVertex,
        directed: boolean = true,
        weight: number = 1
    ): void
    {
        this.edges.push(new GraphEdge(
            source,
            target,
            directed = true,
            weight = 1
        ));
    }

    public shortestPath()
    {
        // TODO: dijkstra

    }

    public depthFirstSearch(start: GraphVertex, searchId: number): void
    {
        return;
    }

    public breadthFirstSearch(start: GraphVertex, searchId: number): void
    {
        return;
    }

    public minimalSpanningTree(start: GraphVertex): Graph
    {
        return new Graph();
    }
}

class GraphVertex
{
    public static NullVertex: GraphVertex = new GraphVertex(-1);
    private id: number;

    constructor(id: number)
    {
        this.id = id;
    }

}

class GraphEdge
{
    private source: GraphVertex;
    private target: GraphVertex;
    private directed: boolean;
    private weight: number;

    constructor(
        source: GraphVertex,
        target: GraphVertex,
        directed: boolean = true,
        weight: number = 1
    )
    {
        this.source = source;
        this.target = target;
        this.directed = directed;
        this.weight = weight;
    }
}
