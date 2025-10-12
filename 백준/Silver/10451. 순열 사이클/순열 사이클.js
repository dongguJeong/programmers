const fs = require("fs");
 const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");

let N = Number(input[0]);
let idx = 0;

for (let i = 0; i < N; i++) {
  let nodes = Number(input[++idx]);
  let arr = input[++idx].split(" ").map(Number);
  const graph = Array(nodes).fill(0);
  for (let i = 0; i < nodes; i++) {
    graph[i] = arr[i] - 1;
  }

  const visited = Array(nodes).fill(false);
  const visitedStack = Array(nodes).fill(false);
  let cnt = 0;

  for (let i = 0; i < nodes; i++) {
    if (!visited[i]) {
      if (isCyclicGraph(i, visited, graph, visitedStack)) cnt++;
    }
  }
  console.log(cnt);
}

function isCyclicGraph(cur, visited, graph, visitedStack) {
  visited[cur] = true;
  visitedStack[cur] = true;
  const next = graph[cur];

  if (!visited[next]) {
    if (isCyclicGraph(next, visited, graph, visitedStack)) return true;
  } else if (visitedStack[cur]) return true;

  visitedStack[cur] = false;
  return false;
}
