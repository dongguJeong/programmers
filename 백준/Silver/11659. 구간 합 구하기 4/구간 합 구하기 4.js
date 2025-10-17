const fs = require("fs");
 const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

const prefix = Array(N + 1);
prefix[0] = 0;
for (let i = 0; i < N; i++) {
  prefix[i + 1] = prefix[i] + arr[i];
}

for (let k = 2; k < 2 + M; k++) {
  const [i, j] = input[k].split(" ").map(Number);

  console.log(prefix[j + 1 - 1] - prefix[i - 1]);
}
