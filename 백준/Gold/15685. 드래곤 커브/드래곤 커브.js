const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
// d: 0=→, 1=↑, 2=←, 3=↓
const dx = [1, 0, -1, 0];
const dy = [0, -1, 0, 1];

const board = Array.from({ length: 101 }, () => Array(101).fill(0));

for (let i = 1; i <= N; i++) {
  let [x, y, d, g] = input[i].split(" ").map(Number);

  // 1) 방향 배열 만들기
  const dirs = [d];
  for (let gen = 0; gen < g; gen++) {
    // 역순으로 돌며 +1(mod 4) 해서 뒤에 붙임 (시계 90°)
    for (let k = dirs.length - 1; k >= 0; k--) {
      dirs.push((dirs[k] + 1) % 4);
    }
  }

  // 2) 방향 배열대로 점 찍기
  board[y][x] = 1;
  for (const dir of dirs) {
    x += dx[dir];
    y += dy[dir];
    if (0 <= x && x <= 100 && 0 <= y && y <= 100) board[y][x] = 1;
  }
}

// 3) 1×1 정사각형 개수 세기
let cnt = 0;
for (let y = 0; y < 100; y++) {
  for (let x = 0; x < 100; x++) {
    if (
      board[y][x] &&
      board[y][x + 1] &&
      board[y + 1][x] &&
      board[y + 1][x + 1]
    ) {
      cnt++;
    }
  }
}

console.log(cnt);
