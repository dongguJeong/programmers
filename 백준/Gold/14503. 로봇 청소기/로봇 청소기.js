const fs = require("fs");
 const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = Array.from({ length: N }, (_, i) =>
  input[i + 2].split(" ").map(Number)
);
const visited = Array.from({ length: N }, () => Array(M).fill(false));

const dx = [0, 1, 0, -1];
const dy = [-1, 0, 1, 0];

const [startY, startX, dir] = input[1].split(" ").map(Number);

let cnt = 0;
const queue = [];
queue.push([startY, startX, dir]);

while (queue.length > 0) {
  const [cy, cx, cdir] = queue.pop();

  if (board[cy][cx] !== 1 && !visited[cy][cx]) {
    visited[cy][cx] = true;
    cnt++;
  }

  let clean = false;
  for (let i = 0; i < 4; i++) {
    const ndir = (cdir + 3 - i + 4) % 4;
    const nx = cx + dx[ndir];
    const ny = cy + dy[ndir];
    // 4방향 중 청소되지 않은 칸이 존재하다면 해당 칸으로 전진
    if (
      nx >= 0 &&
      nx < M &&
      ny >= 0 &&
      ny < N &&
      board[ny][nx] !== 1 &&
      !visited[ny][nx]
    ) {
      queue.push([ny, nx, ndir]);
      clean = true;
      break;
    }
  }
  if (clean) continue;

  // 청소할 수 있는 칸이 없다
  // 바라보는 방향을 유지한 채로 한 칸 후진할 수 있다면 한 칸 후진하고 1번으로 돌아간다.
  // 후진할 수 없다면 종료
  const backDir = (cdir + 2) % 4;
  const bx = cx + dx[backDir];
  const by = cy + dy[backDir];
  if (bx >= 0 && bx < M && by >= 0 && by < N && board[by][bx] === 0) {
    queue.push([by, bx, cdir]);
    continue;
  } else break;
}

console.log(cnt);
