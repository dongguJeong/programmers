const fs = require("fs");
 const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");

const board = Array.from({ length: 4 }, (_, i) =>
  input[i].split("").map(Number)
);

const commandNum = Number(input[4]);

for (let i = 0; i < commandNum; i++) {
  const [index, dir] = input[5 + i].split(" ").map(Number);
  const queue = [];
  const newIndex = index - 1;
  queue.push([newIndex, dir]);
  let dir1 = dir * -1;
  // newIndex를 중심으로 왼쪽 톱니 탐색하는 for 문
  for (let j = newIndex; j >= 1; j--) {
    // 현재 톱니의 6번과
    // 왼쪽 톱니의 2번을 비교

    // 극이 다르다면 현재 톱니가 돌아가는 방향의 반대 방향으로 회전해야 된다는 명령을 queue에 집어넣는다
    if (board[j][6] !== board[j - 1][2]) {
      queue.push([j - 1, dir1]);
      dir1 *= -1;
    } else break;
  }

  dir1 = dir * -1;
  // 오른쪽 탐색 하는 for 문
  for (let j = newIndex; j < 3; j++) {
    // 현재 톱니의 2번과
    // 왼쪽 톱니의 6번을 비교
    // 극이 다르다면 현재 톱니가 돌아가는 방향의 반대 방향으로 회전해야 된다는 명령을 queue에 집어넣는다
    if (board[j][2] !== board[j + 1][6]) {
      queue.push([j + 1, dir1]);
      dir1 *= -1;
    } else break;
  }

  // queue를 하나씩 꺼내면서 명령을 실행시킨다
  while (queue.length > 0) {
    const [idx, dir3] = queue.shift();
    if (dir3 === 1) {
      rotateRight(board[idx]);
    } else {
      rotateLeft(board[idx]);
    }
  }
}

let ans = 0;
for (let i = 0; i < 4; i++) {
  if (board[i][0] === 1) {
    ans += Math.pow(2, i);
  }
}

console.log(ans);

function rotateRight(arr) {
  arr.unshift(arr.pop());
}
function rotateLeft(arr) {
  arr.push(arr.shift());
}
