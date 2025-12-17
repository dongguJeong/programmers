const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const sugang = input.slice(1).map((v) => v.split(" ").map(Number));

sugang.sort((a, b) => {
  if (a[0] === b[0]) return a[1] - b[1];
  return a[0] - b[0];
});

// minHeap으로 pq 만들고

class PriorityQueue {
  constructor() {
    this.arr = [];
  }

  push(value) {
    this.arr.push(value);

    let idx = this.arr.length - 1;

    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.arr[parent] > this.arr[idx]) {
        [this.arr[parent], this.arr[idx]] = [this.arr[idx], this.arr[parent]];
        idx = parent;
      } else break;
    }
  }

  pop() {
    if (this.arr.length === 0) return null;
    const top = this.arr[0];
    const last = this.arr.pop();
    if (this.arr.length === 0) return top;

    this.arr[0] = last;

    let idx = 0;

    while (true) {
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;
      let smallest = idx;

      if (left < this.arr.length && this.arr[left] < this.arr[smallest]) {
        smallest = left;
      }
      if (right < this.arr.length && this.arr[right] < this.arr[smallest]) {
        smallest = right;
      }
      if (smallest === idx) break;

      [this.arr[idx], this.arr[smallest]] = [this.arr[smallest], this.arr[idx]];
      idx = smallest;
    }

    return top;
  }

  length() {
    return this.arr.length;
  }

  top() {
    return this.arr[0];
  }
}

const pq = new PriorityQueue();

for (const [st, dt] of sugang) {
  if (pq.length() === 0) {
    pq.push(dt);
    continue;
  }

  if (pq.top() <= st) {
    pq.pop();
  }
  pq.push(dt);
}

console.log(pq.length());
