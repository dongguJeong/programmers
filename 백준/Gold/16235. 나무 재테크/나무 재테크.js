const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
//const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");

const [N, M, K] = input[0].split(" ").map(Number);

// 8방향: 위, 아래, 왼쪽, 오른쪽, 왼위, 오위, 왼아, 오아
const dy = [-1, 1, 0, 0, -1, -1, 1, 1];
const dx = [0, 0, -1, 1, -1, 1, -1, 1];

const board = Array.from({ length: N }, () => Array(N).fill(5));
const seeds = input.slice(1, N + 1).map((line) => line.split(" ").map(Number));
const trees = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => [])
);

for (let i = N + 1; i < input.length; i++) {
  const [r, c, age] = input[i].split(" ").map(Number);
  trees[r - 1][c - 1].push(age);  // x=r(행), y=c(열)
}

for (let year = 0; year < K; year++) {
  // 봄 & 여름
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (trees[r][c].length === 0) continue;
      
      trees[r][c].sort((a, b) => a - b);
      const alive = [];
      let deadNutrient = 0;
      
      for (const age of trees[r][c]) {
        if (board[r][c] >= age) {
          board[r][c] -= age;
          alive.push(age + 1);
        } else {
          deadNutrient += Math.floor(age / 2);
        }
      }
      
      trees[r][c] = alive;
      board[r][c] += deadNutrient;
    }
  }
  
  // 가을
  const newTrees = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      for (const age of trees[r][c]) {
        if (age % 5 === 0) {
          for (let i = 0; i < 8; i++) {
            const nr = r + dy[i];
            const nc = c + dx[i];
            if (nr >= 0 && nr < N && nc >= 0 && nc < N) {
              newTrees.push([nr, nc]);
            }
          }
        }
      }
    }
  }
  
  for (const [r, c] of newTrees) {
    trees[r][c].push(1);
  }
  
  // 겨울
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      board[r][c] += seeds[r][c];
    }
  }
}

let answer = 0;
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    answer += trees[r][c].length;
  }
}

console.log(answer);