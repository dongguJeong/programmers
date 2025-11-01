const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const M = Number(input[2]);

class MergeSortTree {
  constructor(arr, N) {
    this.N = N;
    this.arr = arr;
    this.tree = Array.from({ length: 4 * N }, () => []);
    this.buildRec(1, 0, N - 1);
  }

  merge(to, left, right) {
    const A = this.tree[left];
    const B = this.tree[right];
    const merged = [];
    let i = 0,
      j = 0;
    while (i < A.length && j < B.length) {
      if (A[i] <= B[j]) merged.push(A[i++]);
      else merged.push(B[j++]);
    }
    while (i < A.length) merged.push(A[i++]);
    while (j < B.length) merged.push(B[j++]);
    this.tree[to] = merged;
  }

  buildRec(node, nodeLeft, nodeRight) {
    if (nodeLeft === nodeRight) {
      this.tree[node] = [this.arr[nodeLeft]];
      return;
    }
    const mid = Math.floor((nodeLeft + nodeRight) / 2);
    this.buildRec(node * 2, nodeLeft, mid);
    this.buildRec(node * 2 + 1, mid + 1, nodeRight);
    this.merge(node, node * 2, node * 2 + 1);
  }

  count(nodeArray, k) {
    // k보다 큰 원소의 개수
    let lo = 0,
      hi = nodeArray.length - 1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (nodeArray[mid] <= k) lo = mid + 1;
      else hi = mid - 1;
    }
    return nodeArray.length - lo;
  }

  countRec(left, right, node, nodeLeft, nodeRight, k) {
    if (right < nodeLeft || nodeRight < left) return 0;
    if (left <= nodeLeft && nodeRight <= right) {
      return this.count(this.tree[node], k);
    }
    const mid = Math.floor((nodeLeft + nodeRight) / 2);
    return (
      this.countRec(left, right, node * 2, nodeLeft, mid, k) +
      this.countRec(left, right, node * 2 + 1, mid + 1, nodeRight, k)
    );
  }
}

// ✅ main logic
const mst = new MergeSortTree(arr, N);
let last_ans = 0;
let output = [];

for (let i = 3; i < 3 + M; i++) {
  let [a, b, c] = input[i].split(" ").map(Number);

  // XOR 처리
  let iVal = a ^ last_ans;
  let jVal = b ^ last_ans;
  let kVal = c ^ last_ans;

  // i ≤ j 되도록 정렬
  if (iVal > jVal) [iVal, jVal] = [jVal, iVal];

  // 1-based → 0-based
  iVal -= 1;
  jVal -= 1;

  // 구간 질의 수행
  const ans = mst.countRec(iVal, jVal, 1, 0, N - 1, kVal);

  output.push(ans);
  last_ans = ans;
}

console.log(output.join("\n"));
