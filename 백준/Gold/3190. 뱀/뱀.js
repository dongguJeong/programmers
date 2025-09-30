const fs = require("fs");
//let input = fs.readFileSync("stdin.txt").toString().split("\n");
 let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);
const board = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(0));
const APPLES = Number(input[1]);
const COMMANDS = [];

for (let i = 2; i < APPLES + 2; i++) {
  const [row, col] = input[i].split(" ").map(Number);
  board[row][col] = 1;
}

const c = Number(input[2 + APPLES]);
for (let i = 3 + APPLES; i < 3 + APPLES + c; i++) {
  const [sec, dir] = input[i].split(" ");
  COMMANDS.push({ sec: Number(sec), dir });
}

const snake = [{ y: 1, x: 1 }];
const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];
let dir = 0;
let timer = 0;

while (true) {
  timer += 1;

  const head = snake[snake.length - 1];
  const nx = head.x + dx[dir];
  const ny = head.y + dy[dir];

  if (nx < 1 || nx > N || ny < 1 || ny > N) break;
  if (snake.some((part) => part.x === nx && part.y === ny)) break;

  snake.push({ y: ny, x: nx });

  if (board[ny][nx] === 1) {
    // 사과 먹음 → 꼬리 안 줄임
    board[ny][nx] = 0;
  } else {
    // 사과 없음 → 꼬리 줄이기
    snake.shift();
  }

  if (COMMANDS.length > 0 && COMMANDS[0].sec === timer) {
    const nextDir = COMMANDS.shift().dir;

    if (nextDir === "D") {
      dir = (dir + 1) % 4;
    } else {
      dir = (dir + 3) % 4;
    }
  }
}

console.log(timer);
