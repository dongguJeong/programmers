const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");

const [R, C, K] = input[0].split(" ").map(Number);

let board = Array.from({ length: 100 }, () => Array(100).fill(0));

for (let y = 1; y <= 3; y++) {
  const line = input[y].split(" ").map(Number);
  line.forEach((v, idx) => (board[y - 1][idx] = v));
}

function calc(arr) {
  const numbers = Array.from({ length: 101 }, (_, idx) => [idx, 0]);

  arr.forEach((v) => {
    if (v !== 0 && v <= 100) {
      numbers[v][1] += 1;
    }
  });

  numbers.sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    return a[1] - b[1];
  });

  const newNumbers = numbers.filter((v) => v[1] !== 0);
  return newNumbers.flat().slice(0, 100);
}

let ans = -1;
let W = 3;
let H = 3;

for (let t = 0; t <= 100; t++) {
  if (board[R - 1][C - 1] === K) {
    ans = t;
    break;
  }

  const newBoard = Array.from({ length: 100 }, () => Array(100).fill(0));

  let maxW = 0;
  let maxH = 0;

  // R 연산
  if (H >= W) {
    for (let y = 0; y < H; y++) {
      const arr = calc(board[y]);
      maxW = Math.max(maxW, arr.length);
      newBoard[y] = [...arr];
    }
    W = maxW;
  } else {
    for (let x = 0; x < W; x++) {
      const line = [];
      for (let y = 0; y < H; y++) {
        line.push(board[y][x]);
      }
      const arr = calc(line);
      maxH = Math.max(maxH, arr.length);
      arr.forEach((v, idx) => (newBoard[idx][x] = v));
    }
    H = maxH;
  }

  board = newBoard;
}

console.log(ans);
