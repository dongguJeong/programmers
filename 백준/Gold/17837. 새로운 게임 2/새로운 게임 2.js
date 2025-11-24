const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);

const board = input.slice(1, N + 1).map((line) => line.split(" ").map(Number));
const play = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => [])
);

// 0: →, 1: ←, 2: ↑, 3: ↓
const dir = [
  { dy: 0, dx: 1 },
  { dy: 0, dx: -1 },
  { dy: -1, dx: 0 },
  { dy: 1, dx: 0 },
];

// 말 정보: x, y, dir
const horse = {};
for (let i = 0; i < K; i++) {
  horse[i] = { x: 0, y: 0, dir: 0 };
}

for (let i = N + 1, num = 0; i <= N + K; i++, num++) {
  const [R, C, d] = input[i].split(" ").map(Number);
  horse[num].x = C - 1;
  horse[num].y = R - 1;
  horse[num].dir = d - 1; // 1~4 → 0~3

  play[R - 1][C - 1].push(num);
}

let ans = -1;

function isBlueOrOut(y, x) {
  if (x < 0 || x >= N || y < 0 || y >= N) return true;
  return board[y][x] === 2; // 파란 칸
}

function reverseDir(d) {
  if (d === 0) return 1;
  if (d === 1) return 0;
  if (d === 2) return 3;
  if (d === 3) return 2;
}

for (let t = 1; t <= 1000; t++) {
  let finished = false;

  for (let k = 0; k < K; k++) {
    const cx = horse[k].x;
    const cy = horse[k].y;
    let cdir = horse[k].dir;

    let nx = cx + dir[cdir].dx;
    let ny = cy + dir[cdir].dy;

    // 1. 첫 번째 칸이 파란색 or 범위 밖이면 방향 반전
    if (isBlueOrOut(ny, nx)) {
      cdir = reverseDir(cdir);
      horse[k].dir = cdir; // 방향은 어쨌든 바뀜

      nx = cx + dir[cdir].dx;
      ny = cy + dir[cdir].dy;

      // 2. 반전 후 칸도 파란색 or 범위 밖이면 이동하지 않음
      if (isBlueOrOut(ny, nx)) {
        continue; // 이 말은 이번 턴에 안 움직임
      }
    }

    // 여기 도달했다 = (nx, ny)로 "실제로 이동"해야 함
    const fromStack = play[cy][cx];
    const idx = fromStack.indexOf(k);
    const moving = fromStack.slice(idx); // k 위에 쌓인 말들 포함

    // 원래 칸에서 이동한 말들 제거
    play[cy][cx] = fromStack.slice(0, idx);

    // 빨간 칸이면 이동하는 말들 순서를 뒤집음
    if (board[ny][nx] === 1) {
      moving.reverse();
    }

    // 이동하는 말들 위치 갱신 + 새 칸 스택에 추가
    for (const h of moving) {
      horse[h].x = nx;
      horse[h].y = ny;
      play[ny][nx].push(h);
    }

    // 말이 4개 이상 쌓이면 종료
    if (play[ny][nx].length >= 4) {
      ans = t;
      finished = true;
      break;
    }
  }

  if (finished) break;
}

console.log(ans);
