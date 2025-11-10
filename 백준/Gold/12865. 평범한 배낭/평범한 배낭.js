const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

// 무게가 <= i 가 되는 경우의 최대값

// 최대 무게가 K 이니까 너비는 K+1
// y는 1부터 채울 거라서 계산의 용이함을 위해 높이가 N+1
const dp = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));

const w = [];
const v = [];

for (let i = 1; i <= N; i++) {
  const [ww, vv] = input[i].split(" ").map(Number);
  w.push(ww);
  v.push(vv);
}
// y 축이 y번째 물건을 선택할 거냐 말거냐
// x 축이 무게
// dp[y][x] 는 value

for (let i = 1; i <= N; i++) {
  const value = v[i - 1];
  const weight = w[i - 1];

  for (let j = 0; j <= M; j++) {
    if (j < weight) dp[i][j] = dp[i - 1][j];
    else dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight] + value);
  }
}

console.log(dp[N][M]);
