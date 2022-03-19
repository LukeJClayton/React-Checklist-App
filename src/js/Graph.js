export class Graph {
  constructor() {
    this.edges = {};
    this.nodes = [];
    this.output = '';
  }

  addNode(node) {
    this.nodes.push(node);
    this.edges[node] = [];
  }

  addEdge(node1, node2) {
    this.edges[node1].push(node2);
    this.edges[node2].push(node1);
  }

  addDirectedEdge(node1, node2) {
    if (this.edges[node1] && this.edges[node2]) {
      this.edges[node1].push(node2);
    }
  }

  display() {
    let graph = ""; this.nodes.forEach(node => {
      graph += node + "->" + this.edges[node].join(", ") + "\n";
    });
    console.log(graph);
  }

  topologicalSortHelper(node, explored, stack) {
    explored.add(node);

    this.edges[node].forEach(n => {
      if (!explored.has(n)) {
        this.topologicalSortHelper(n, explored, stack);
      }
    });

     stack.push(node);
  }

  topologicalSort() {
    let stack = []
      , explored = new Set();

    this.nodes.forEach(node => {
      if (!explored.has(node)) {
        this.topologicalSortHelper(node, explored, stack);
      }
    });

    this.output = stack.slice().reverse();
  }
}
