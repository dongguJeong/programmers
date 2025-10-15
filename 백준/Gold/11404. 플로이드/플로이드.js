const fs = require("fs");
 const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");

const N = Number(input[0]);
const M = Number(input[1]);

const INF = Infinity;
const dist = Array.from({ length: N + 1 }, () => Array(N + 1).fill(INF));

// 자기 자신 비용 0
for (let i = 1; i <= N; i++) dist[i][i] = 0;

// 간선 입력 (중복 간선의 경우 최소값만 반영)
for (let i = 2; i < 2 + M; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  if (c < dist[a][b]) dist[a][b] = c;
}

// 플로이드-워셜
for (let k = 1; k <= N; k++) {
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      const w = dist[i][k] + dist[k][j];
      if (w < dist[i][j]) dist[i][j] = w;
    }
  }
}

// 출력 (도달 불가는 0)
for (let i = 1; i <= N; i++) {
  const line = [];
  for (let j = 1; j <= N; j++) {
    line.push(dist[i][j] === INF ? 0 : dist[i][j]);
  }
  console.log(line.join(" "));
}
