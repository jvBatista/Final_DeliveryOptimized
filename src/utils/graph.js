import { PriorityQueue } from './queue';
  
export class WeightedGraph {
    constructor() {
      this.adjList = {};
    }

    addVertex(vertex) {
      if (!this.adjList[vertex]) this.adjList[vertex] = [];
    }

    addEdge(v1, v2, weight) {
      this.adjList[v1].push({ node: v2, weight });
      this.adjList[v2].push({ node: v1, weight });
    }

    dijkstraSearch(start, finish) {
      const nodes = new PriorityQueue();
      const distances = {};
      const previous = {};
      let path = [];
      let smallest;

      for (let vertex in this.adjList) {
        if (vertex == start) {
          distances[vertex] = 0;
          nodes.enQueue(vertex, 0);
        } else {
          distances[vertex] = Infinity;
          nodes.enQueue(vertex, Infinity);
        }

        previous[vertex] = null;
      }

      while (nodes.values.length) {
        smallest = nodes.deQueue().val;

        if (smallest === finish) {
          while (previous[smallest]) {
            path.push(smallest);
            smallest = previous[smallest];
          }
          break;
        }

        if (smallest || distances[smallest] !== Infinity) {
          for (let neighbor in this.adjList[smallest]) {
            let nextNode = this.adjList[smallest][neighbor];
            let candidate = distances[smallest] + nextNode.weight;
            let nextNeighbor = nextNode.node;

            if (candidate < distances[nextNeighbor]) {
              distances[nextNeighbor] = candidate;
              previous[nextNeighbor] = smallest;
              nodes.enQueue(nextNeighbor, candidate);
            }
          }
        }
      }

      return path.concat(smallest).reverse();
    }
}
  
  
  
  
  
  
