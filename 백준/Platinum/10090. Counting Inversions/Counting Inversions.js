const fs = require("fs");
// const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

function merge(arr, lo, mid, hi, aux) {
  for (let i = lo, j = 0; i <= mid; i++, j++) {
    aux[j] = arr[i];
  }

  let j = 0;
  let i = mid + 1;
  let k = lo;

  let cnt = 0;
  let sw = 0;

  while (j <= mid - lo && i <= hi) {
    if (aux[j] <= arr[i]) {
      arr[k++] = aux[j++];
      cnt += sw;
    } else {
      arr[k++] = arr[i++];
      sw++;
    }
  }

  while (j <= mid - lo) {
    arr[k++] = aux[j++];
    cnt += sw;
  }

  return cnt;
}

function recSort(lo, hi, arr, aux) {
  let res = 0;
  if (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    res += recSort(lo, mid, arr, aux);
    res += recSort(mid + 1, hi, arr, aux);
    res += merge(arr, lo, mid, hi, aux);
  }

  return res;
}

const AUX = Array(N).fill(0);

console.log(recSort(0, N - 1, arr, AUX));
