const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");

const [R, C, M] = input[0].split(" ").map(Number);

const board = Array.from({ length: R + 1 }, () => Array(C + 1));

const sharks = input.slice(1).map((line) => line.split(" ").map(Number));
let answer = 0;

for (const [r, c, s, d, z] of sharks) {
  board[r][c] = [s, d, z];
}

for (let t = 1; t <= C; t++) {
  // 물고기를 잡았다
  for (let y = 1; y <= R; y++) {
    if (board[y][t] && board[y][t][2] > 0) {
      answer += board[y][t][2];
      board[y][t] = undefined;
      break;
    }
  }

  // 상어를 움직인다
  const move = Array.from({ length: R + 1 }, () =>
    Array.from({ length: C + 1 }, () => [])
  );

  // 모든 칸을 순회하면서
  for (let y = 1; y <= R; y++) {
    for (let x = 1; x <= C; x++) {
      // 상어가 존재하는 칸
      if (board[y][x]) {
        const [s, d, z] = board[y][x];
        let ty = y;
        let tx = x;
        let ts = s;
        let td = d;

        if (d === 1 || d === 2) {
          // 더 이상 움직일 수 없을 때까지
          while (ts > 0) {
            // 위로 간다
            if (td === 1) {
              // 천장과의 거리
              let dd = ty - 1;
              if (ts >= dd) {
                ts -= dd;
                td = 2;
                ty = 1;
              } else {
                ty -= ts;
                ts = 0;
              }
            } else {
              // 바닥 까지와의 거리
              let dd = R - ty;
              if (ts >= dd) {
                ts -= dd;
                td = 1;
                ty = R;
              } else {
                ty += ts;
                ts = 0;
              }
            }
          }
        } else {
          while (ts > 0) {
            // 오른쪽으로 간다
            if (td === 3) {
              // 오른쪽 벽까지와의 거리
              let dd = C - tx;
              if (ts >= dd) {
                ts -= dd;
                td = 4;
                tx = C;
              } else {
                tx += ts;
                ts = 0;
              }
            } else {
              // 왼쪽 벽까지와의 거리
              let dd = tx - 1;
              if (ts >= dd) {
                ts -= dd;
                tx = 1;
                td = 3;
              } else {
                tx -= ts;
                ts = 0;
              }
            }
          }
        }

        move[ty][tx].push([s, td, z]);
      }
    }
  }

  for (let y = 1; y <= R; y++)
    for (let x = 1; x <= C; x++) {
      if (move[y][x].length > 0) {
        move[y][x].sort((a, b) => b[2] - a[2]);
        board[y][x] = move[y][x][0];
      } else {
        board[y][x] = undefined;
      }
    }
}

console.log(answer);
