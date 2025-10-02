const fs = require("fs");
// let input = fs.readFileSync("stdin.txt").toString().split("\n");
 let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);
const As = input[1].split(" ").map(Number);
const [B, C] = input[2].split(" ").map(Number);
let answer = 0n;

As.forEach((a) => {
  let rest = Math.max(a - B, 0);
  let cnt = 1n; // 총감독관 1명은 반드시 필요
  cnt += BigInt(Math.ceil(rest / C));
  answer += cnt;
});

console.log(answer.toString());
