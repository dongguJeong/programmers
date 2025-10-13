const fs = require("fs");
 const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");

const [N, M, X] = input[0].split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  const [st, dt, w] = input[i + 1].split(" ").map(Number);
  graph[st].push([dt, w]);
}

function daikstra(start) {
  const visited = Array.from({ length: N + 1 }, () => false);
  const dist = Array(N + 1).fill(Infinity);

  dist[start] = 0;

  for (let j = 0; j < N - 1; j++) {
    let minNode = -1;
    let minWeight = Infinity;
    for (let i = 1; i <= N; i++) {
      if (!visited[i] && dist[i] < minWeight) {
        minNode = i;
        minWeight = dist[i];
      }
    }

    if (minNode === -1) break;
    visited[minNode] = true;

    for (const [dest, cost] of graph[minNode]) {
      const newWeight = dist[minNode] + cost;
      if (dist[dest] > newWeight) {
        dist[dest] = newWeight;
      }
    }
  }

  return dist;
}

// X에서 출발
const fromX = daikstra(X);

let maxTime = 0;

for (let i = 1; i <= N; i++) {
  const toX = daikstra(i);
  const total = toX[X] + fromX[i];
  maxTime = Math.max(maxTime, total);
}

console.log(maxTime);
