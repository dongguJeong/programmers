const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
//const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");

const [R, C, T] = input[0].split(" ").map(Number);
let prev = input.slice(1).map((line) => line.split(" ").map(Number));

const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];

const cleaner = [];
for (let y = 0; y < R; y++) {
  if (prev[y][0] === -1) cleaner.push([y, 0]); // ❌ 수정: [y, 0]로 저장
}

for (let i = 0; i < T; i++) {
  prev = spread();
  cleanTop(cleaner[0][0]); // ❌ 수정: cleaner[0][0]
  cleanBottom(cleaner[1][0]); // ❌ 수정: cleaner[1][0]
}

function spread() {
  let cur = Array.from({ length: R }, () => Array(C).fill(0));
  
  // ❌ 수정: 공기청정기 위치 설정
  for (const [cly, clx] of cleaner) {
    cur[cly][clx] = -1;
  }

  for (let y = 0; y < R; y++) {
    for (let x = 0; x < C; x++) {
      if (prev[y][x] > 0) { // ❌ 수정: > 4가 아니라 > 0
        const temp = [];
        const munji = Math.floor(prev[y][x] / 5);

        for (let j = 0; j < 4; j++) {
          const cx = x + dx[j];
          const cy = y + dy[j];

          // ❌ 수정: N이 아니라 C와 R
          if (cx < 0 || cx >= C || cy < 0 || cy >= R || prev[cy][cx] === -1)
            continue;

          temp.push([cy, cx]);
        }

        // ❌ 수정: temp > 0이 아니라 temp.length > 0
        if (temp.length > 0) {
          cur[y][x] += prev[y][x] - munji * temp.length;

          for (const [ty, tx] of temp) {
            cur[ty][tx] += munji;
          }
        } else {
          // 확산되지 않은 경우도 처리
          cur[y][x] += prev[y][x];
        }
      }
    }
  }

  return cur;
}

function cleanTop(top) {
  // 아래 -> 위
  for (let i = top - 1; i > 0; i--) {
    prev[i][0] = prev[i - 1][0];
  }

  // 왼 -> 우
  for (let i = 0; i < C - 1; i++) {
    prev[0][i] = prev[0][i + 1];
  }

  // 위 -> 아래
  for (let i = 0; i < top; i++) {
    prev[i][C - 1] = prev[i + 1][C - 1];
  }

  // 우 -> 왼
  for (let i = C - 1; i > 1; i--) {
    prev[top][i] = prev[top][i - 1];
  }

  prev[top][1] = 0;
}

function cleanBottom(bottom) { // ❌ 수정: 매개변수 이름 변경
  // 위 -> 아래
  for (let i = bottom + 1; i < R - 1; i++) {
    prev[i][0] = prev[i + 1][0];
  }

  // 왼 -> 우
  for (let i = 0; i < C - 1; i++) {
    prev[R - 1][i] = prev[R - 1][i + 1];
  }

  // 아래 -> 위
  for (let i = R - 1; i > bottom; i--) {
    prev[i][C - 1] = prev[i - 1][C - 1];
  }

  // 우 -> 왼 (❌ 수정: C가 아니라 C - 1부터)
  for (let i = C - 1; i > 1; i--) {
    prev[bottom][i] = prev[bottom][i - 1];
  }

  prev[bottom][1] = 0;
}

let sum = 0;
for (let y = 0; y < R; y++) {
  for (let x = 0; x < C; x++) {
    if (prev[y][x] > 0) {
      sum += prev[y][x];
    }
  }
}

console.log(sum);