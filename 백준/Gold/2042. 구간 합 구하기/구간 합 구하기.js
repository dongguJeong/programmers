const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");

const [N, M, K] = input[0].split(" ").map(Number);
const arr = Array.from({ length: N }, (_, i) => BigInt(input[i + 1]));

class BinaryIndexedTree {
  constructor(n) {
    this.tree = Array(n + 1).fill(0n);
  }

  add(pos, delta) {
    pos++;
    while (pos < this.tree.length) {
      this.tree[pos] += delta;
      pos += pos & -pos;
    }
  }

  sum(pos) {
    pos++;
    let res = 0n;
    while (pos > 0) {
      res += this.tree[pos];
      pos &= pos - 1;
    }
    return res;
  }

  sumRange(left, right) {
    let res = this.sum(right);
    if (left > 0) {
      res -= this.sum(left - 1);
    }
    return res;
  }
}

const BIT = new BinaryIndexedTree(N);
for (let i = 0; i < N; i++) {
  BIT.add(i, arr[i]);
}

for (let i = 1; i <= M + K; i++) {
  const query = input[N + i].split(" ");
  const a = Number(query[0]);
  const b = Number(query[1]);
  
  if (a === 1) {
    const c = BigInt(query[2]); // 값은 BigInt
    const delta = c - arr[b - 1];
    BIT.add(b - 1, delta);
    arr[b - 1] = c;
  } else {
    const c = Number(query[2]); // 인덱스는 Number
    console.log(BIT.sumRange(b - 1, c - 1).toString());
  }
}