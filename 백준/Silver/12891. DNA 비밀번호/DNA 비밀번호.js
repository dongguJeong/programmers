const fs = require("fs");
// const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [S, P] = input[0].split(" ").map(Number);
const str = input[1];
const dna = input[2].split(" ").map(Number);

const wordobj = {
  A: 0,
  C: 0,
  G: 0,
  T: 0,
};

let cnt = 0;
for (let i = 0; i <= S - P; i++) {
  if (i === 0) {
    for (let j = 0; j < P; j++) {
      wordobj[str[j]] += 1;
    }
  } else {
    wordobj[str[i - 1]] -= 1;
    wordobj[str[i + P - 1]] += 1;
  }

  if (
    wordobj["A"] >= dna[0] &&
    wordobj["C"] >= dna[1] &&
    wordobj["G"] >= dna[2] &&
    wordobj["T"] >= dna[3]
  )
    cnt++;
}

console.log(cnt);
