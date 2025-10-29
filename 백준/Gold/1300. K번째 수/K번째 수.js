const fs = require("fs");
// const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
 const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const M = Number(input[1]);

function decide(mid) {
    let cnt = 0;
  for(let i = 1  ; i <= N ; i++){
      cnt += Math.min(Math.floor(mid/i) , N )
  }
    
  return cnt >= M
}

function binarySearch() {
  let lo = 1;
  let hi = N * N;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (decide(mid)) {
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  return lo;
}

console.log(binarySearch());
