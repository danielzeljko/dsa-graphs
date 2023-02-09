/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set(); // {a, b, c}
  }

  /** add Node instance and add it to nodes property on graph. */

  addVertex(vertex) {
    // this.nodes.add(new Node(vertex));
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */

  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  /** add edge between vertices v1,v2 */

  addEdge(v1, v2) {
    // We don't have to check if already adjacent because the
    // set guarantees them to be unique/no duplicates
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */

  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */

  removeVertex(vertex) {
    for (const adjNode of vertex.adjacent) {
      adjNode.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */

  // depthFirstSearch(start) {
  //   const stack = [start];
  //   const seen = new Set(stack);

  //   while (stack.length) {

  //     let currentNode = stack.pop();
  //     seen.add(currentNode);

  //     for (const adj of currentNode.adjacent) {
  //       if (!seen.has(adj)) {
  //         stack.push(adj);
  //       }
  //     }
  //   }
  //   const results = [];

  //   for (const node of seen) {
  //     results.push(node.value);
  //   }
  //   return results;
  // }

  depthFirstSearch(start, seen = new Set([start])) {
    //base case => if node is in seen, return
    //progress => add each node to seen set

    for(const adj of start.adjacent) {
      if (!seen.has(adj)) {
        seen.add(adj);
        this.depthFirstSearch(adj, seen)
      }
    }

    const results = [];

    for (const node of seen) {
      results.push(node.value);
    }
    return results;
  }

  /** traverse graph with BFS and returns array of Node values */
  breadthFirstSearch(start) {

    const queue = [start];
    const seen = new Set(queue);

    while (queue.length) {
      let currentNode = queue.shift();
      seen.add(currentNode);

      for (let adj of currentNode.adjacent) {
        if (!seen.has(adj)) {
          queue.push(adj);
        }
      }
    }
    const results = [];

    for (const node of seen) {
      results.push(node.value);
    }

    return results;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {

    let depth = 0;
    const queue = [[start, depth]];
    const seen = new Set([start]);

    while(queue.length) {
      let [currentNode, depth] = queue.shift();

      seen.add(currentNode);

      if (currentNode === end) return depth;

      for(let adj of currentNode.adjacent) {
        if(!seen.has(adj)) {
          queue.push([adj, depth + 1]);
        }
      }
    }
  }
}

module.exports = { Graph, Node };
