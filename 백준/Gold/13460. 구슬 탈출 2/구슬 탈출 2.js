const fs = require("fs");
// let input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
 let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 방향 (상, 하, 좌, 우)
const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const [h, w] = input[0].split(" ").map(Number);
const MAP = [];

let finish;
let R = {};
let B = {};

for (let i = 1; i <= h; i++) {
  MAP.push(input[i].split(""));
  for (let j = 0; j < w; j++) {
    const cur = MAP[i - 1][j];
    if (cur === "B") {
      B = { y: i - 1, x: j };
    } else if (cur === "R") {
      R = { y: i - 1, x: j };
    } else if (cur === "O") {
      finish = { y: i - 1, x: j };
    }
  }
}

// 방문 상태를 문자열로 관리
const visited = new Set();
function encode(ry, rx, by, bx) {
  return `${ry},${rx},${by},${bx}`;
}

function bfs() {
  const queue = [];
  queue.push({ ry: R.y, rx: R.x, by: B.y, bx: B.x, cnt: 0 });
  visited.add(encode(R.y, R.x, B.y, B.x));

  while (queue.length > 0) {
    const { ry, rx, by, bx, cnt } = queue.shift();
    if (cnt >= 10) return -1; // 10번 넘으면 실패
    if (ry === finish.y && rx === finish.x) return cnt; // 성공

    for (let dir = 0; dir < 4; dir++) {
      const { rry, rrx, bby, bbx, redInHole, blueInHole } = roll(ry, rx, by, bx, dir);

      if (blueInHole) continue; // 파란 구슬 빠지면 실패
      if (redInHole) return cnt + 1; // 빨간 구슬만 빠지면 성공

      const key = encode(rry, rrx, bby, bbx);
      if (!visited.has(key)) {
        visited.add(key);
        queue.push({ ry: rry, rx: rrx, by: bby, bx: bbx, cnt: cnt + 1 });
      }
    }
  }
  return -1;
}

function roll(ry, rx, by, bx, dir) {
  let rry = ry;
  let rrx = rx;
  let rmove = 0;
  let bby = by;
  let bbx = bx;
  let bmove = 0;

  let redInHole = false;
  let blueInHole = false;

  // 빨간 구슬 굴리기
  while (true) {
    const nry = rry + dy[dir];
    const nrx = rrx + dx[dir];
    if (MAP[nry][nrx] === "#") break;
    rry = nry;
    rrx = nrx;
    rmove++;
    if (MAP[nry][nrx] === "O") {
      redInHole = true;
      break;
    }
  }

  // 파란 구슬 굴리기
  while (true) {
    const nby = bby + dy[dir];
    const nbx = bbx + dx[dir];
    if (MAP[nby][nbx] === "#") break;
    bby = nby;
    bbx = nbx;
    bmove++;
    if (MAP[nby][nbx] === "O") {
      blueInHole = true;
      break;
    }
  }

  // 같은 칸에 도착하면 -> 더 많이 이동한 구슬 한 칸 뒤로
  if (rry === bby && rrx === bbx && !redInHole && !blueInHole) {
    if (rmove > bmove) {
      rry -= dy[dir];
      rrx -= dx[dir];
    } else {
      bby -= dy[dir];
      bbx -= dx[dir];
    }
  }

  return { rry, rrx, bby, bbx, redInHole, blueInHole };
}

console.log(bfs());
