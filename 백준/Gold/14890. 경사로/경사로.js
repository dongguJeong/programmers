const fs = require("fs");
 const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");

const [N, L] = input[0].split(" ").map(Number);
const board = Array.from({ length: N }, (_, i) =>
  input[i + 1].split(" ").map(Number)
);

let cnt = 0;
function canGo(arr) {
  const used = Array(N).fill(false);
  for (let i = 1; i < N; i++) {
    const diff = arr[i] - arr[i - 1];
    if (Math.abs(diff) > 1) return false;

    //  오르막길
    if (diff === 1) {
      // arr[i-1] 과 같은 높이의 블록이 L개가 필요하다
      for (let j = 1; j <= L; j++) {
        let idx = i - j;
        if (idx < 0 || arr[idx] !== arr[i - 1] || used[idx]) return false;
        used[idx] = true;
      }
    }

    // 내리막길
    if (diff === -1) {
      // arr[i] 과 같은 높이의 블록이 L개가 필요하다
      for (let j = 0; j < L; j++) {
        let idx = i + j;
        if (idx >= N || arr[idx] !== arr[i] || used[idx]) return false;
        used[idx] = true;
      }
    }
  }
  return true;
}

for (let y = 0; y < N; y++) {
  if (canGo(board[y])) cnt++;
}

for (let x = 0; x < N; x++) {
  const col = board.map((row) => row[x]);
  if (canGo(col)) cnt++;
}

console.log(cnt);
