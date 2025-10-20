const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const MOD = 1000000007n;
const [N, M, K] = input[0].split(" ").map(Number);
const arr = input.slice(1, N + 1).map(x => BigInt(x));

class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = Array(this.n * 4).fill(1n);
    this.arr = arr;
    this.build(1, 0, this.n - 1);
  }

  build(node, start, end) {
    if (start === end) {
      this.tree[node] = this.arr[start] % MOD;
      return this.tree[node];
    }
    const mid = Math.floor((start + end) / 2);
    const left = this.build(node * 2, start, mid);
    const right = this.build(node * 2 + 1, mid + 1, end);
    this.tree[node] = (left * right) % MOD;
    return this.tree[node];
  }

  update(node, start, end, idx, val) {
    if (idx < start || idx > end) return this.tree[node];
    if (start === end) {
      this.tree[node] = BigInt(val) % MOD;
      return this.tree[node];
    }
    const mid = Math.floor((start + end) / 2);
    const left = this.update(node * 2, start, mid, idx, val);
    const right = this.update(node * 2 + 1, mid + 1, end, idx, val);
    this.tree[node] = (left * right) % MOD;
    return this.tree[node];
  }

  query(node, start, end, l, r) {
    if (r < start || end < l) return 1n;
    if (l <= start && end <= r) return this.tree[node];
    const mid = Math.floor((start + end) / 2);
    const left = this.query(node * 2, start, mid, l, r);
    const right = this.query(node * 2 + 1, mid + 1, end, l, r);
    return (left * right) % MOD;
  }
}

const seg = new SegmentTree(arr);
let result = [];

for (let i = N + 1; i <= N + M + K; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  if (a === 1) {
    seg.update(1, 0, N - 1, b - 1, BigInt(c));
  } else if (a === 2) {
    result.push(seg.query(1, 0, N - 1, b - 1, c - 1).toString());
  }
}

console.log(result.join("\n"));
