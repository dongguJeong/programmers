const fs = require("fs");
 const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");

class PriorityQueue {
  arr;
  constructor() {
    this.arr = [];
  }

  push(value, y, x) {
    let node = { value, y, x };
    this.arr.push(node);
    let idx = this.arr.length - 1;

    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      if (this.arr[parent].value > this.arr[idx].value) {
        [this.arr[parent], this.arr[idx]] = [this.arr[idx], this.arr[parent]];
        idx = parent;
      } else break;
    }
  }

  pop() {
    if (this.arr.length === 0) return null;
    if (this.arr.length === 1) return this.arr.pop();

    const top = this.arr[0];
    this.arr[0] = this.arr.pop();
    let idx = 0;

    while (true) {
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;
      let smallest = idx;
      const len = this.arr.length;

      if (left < len && this.arr[left].value < this.arr[smallest].value)
        smallest = left;
      if (right < len && this.arr[right].value < this.arr[smallest].value) {
        smallest = right;
      }

      if (smallest === idx) break;
      [this.arr[smallest], this.arr[idx]] = [this.arr[idx], this.arr[smallest]];
      idx = smallest;
    }

    return top;
  }

  length() {
    return this.arr.length;
  }
}

let idx = 0;
let phase = 1;
const dy = [0, 0, 1, -1];
const dx = [1, -1, 0, 0];

while (true) {
  const N = Number(input[idx]);

  if (N === 0) break;
  const board = Array.from({ length: N }, (_, i) =>
    input[idx + 1 + i].split(" ").map(Number)
  );
  const dist = Array.from({ length: N }, () => Array(N).fill(Infinity));

  const pq = new PriorityQueue();
  dist[0][0] = board[0][0];
  pq.push(board[0][0], 0, 0);

  while (pq.length() > 0) {
    const { value, y: cy, x: cx } = pq.pop();

    if (dist[cy][cx] < value) continue;

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
        const newDist = value + board[ny][nx];
        if (dist[ny][nx] > newDist) {
          dist[ny][nx] = newDist;
          pq.push(newDist, ny, nx);
        }
      }
    }
  }

  console.log(`Problem ${phase}: ${dist[N - 1][N - 1]}`);
  phase++;
  idx += 1 + N;
}
