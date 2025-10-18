const fs = require('fs');
 const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");

class BinaryIndexedTree {
  constructor(n) {
    this.tree = Array(n + 1).fill(0n);
  }

  add(idx, val) {
    while (idx < this.tree.length) {
      this.tree[idx] += val;
      idx += idx & -idx;
    }
  }

  sum(idx) {
    let res = 0n;
    while (idx > 0) {
      res += this.tree[idx];
      idx -= idx & -idx;
    }
    return res;
  }
}

class RangeFenwick {
  constructor(n) {
    this.n = n;
    this.B1 = new BinaryIndexedTree(n);
    this.B2 = new BinaryIndexedTree(n);
  }

  _add(bit, idx, val) {
    bit.add(idx, val);
  }

  rangeAdd(l, r, val) {
    // 구간 [l, r]에 val 더하기 (1-based index)
    this._add(this.B1, l, val);
    this._add(this.B1, r + 1, -val);
    this._add(this.B2, l, val * BigInt(l - 1));
    this._add(this.B2, r + 1, -val * BigInt(r));
  }

  prefixSum(idx) {
    // 공식: sum(1..x) = B1.sum(x)*x - B2.sum(x)
    return this.B1.sum(idx) * BigInt(idx) - this.B2.sum(idx);
  }

  rangeSum(l, r) {
    return this.prefixSum(r) - this.prefixSum(l - 1);
  }
}

const [N, M, K] = input[0].split(' ').map(Number);
const RF = new RangeFenwick(N);

// 초기 값 세팅
for (let i = 1; i <= N; i++) {
  const val = BigInt(input[i]);
  RF.rangeAdd(i, i, val); // 단일 원소 추가
}

const result = [];
for (let i = 1; i <= M + K; i++) {
  const parts = input[N + i].split(' ');
  const a = Number(parts[0]);
  const b = Number(parts[1]);
  const c = Number(parts[2]);
  if (a === 1) {
    const d = BigInt(parts[3]);
    RF.rangeAdd(b, c, d);
  } else {
    result.push(String(RF.rangeSum(b, c)));
  }
}

console.log(result.join('\n'));
