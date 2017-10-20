"use strict";
class Graph {
    constructor() {
        this.vertices = new Map();
        this.edges = new Array();
    }
    addVertex(id) {
        this.vertices.set(id, new GraphVertex(id));
    }
    getVertex(id) {
        if (this.vertices.has(id)) {
            return this.vertices.get(id);
        }
        else {
            return GraphVertex.NullVertex;
        }
    }
    addEdge(source, target, directed = true, weight = 1) {
        this.edges.push(new GraphEdge(source, target, directed = true, weight = 1));
    }
    shortestPath() {
        // TODO: dijkstra
    }
    depthFirstSearch(start, searchId) {
        return;
    }
    breadthFirstSearch(start, searchId) {
        return;
    }
    minimalSpanningTree(start) {
        return new Graph();
    }
}
class GraphVertex {
    constructor(id) {
        this.id = id;
    }
}
GraphVertex.NullVertex = new GraphVertex(-1);
class GraphEdge {
    constructor(source, target, directed = true, weight = 1) {
        this.source = source;
        this.target = target;
        this.directed = directed;
        this.weight = weight;
    }
}
