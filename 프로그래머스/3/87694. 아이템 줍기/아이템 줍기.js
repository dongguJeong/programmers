function solution(rectangle, characterX, characterY, itemX, itemY) {
    const SIZE = 102;
    const map = Array.from({length: SIZE}, () => Array(SIZE).fill(-1));
    const visited = Array.from({length: SIZE}, () => Array(SIZE).fill(false));
    const dy = [-1, 1, 0, 0];
    const dx = [0, 0, -1, 1];

    for (const [x1, y1, x2, y2] of rectangle) {
        for (let y = y1 * 2; y <= y2 * 2; y++) {
            for (let x = x1 * 2; x <= x2 * 2; x++) {
                map[y][x] = 1;
            }
        }
    }

    // 내부 비우기
    for (const [x1, y1, x2, y2] of rectangle) {
        for (let y = y1 * 2 + 1; y < y2 * 2; y++) {
            for (let x = x1 * 2 + 1; x < x2 * 2; x++) {
                map[y][x] = 0;
            }
        }
    }

    const queue = [];
    queue.push([characterY * 2, characterX * 2, 0]);
    visited[characterY * 2][characterX * 2] = true;

    while (queue.length > 0) {
        const [cy, cx, move] = queue.shift();

        if (cy === itemY * 2 && cx === itemX * 2) {
            return move / 2; 
        }

        for (let i = 0; i < 4; i++) {
            const ny = cy + dy[i];
            const nx = cx + dx[i];

            if (
                ny >= 0 && ny < SIZE &&
                nx >= 0 && nx < SIZE &&
                map[ny][nx] === 1 &&
                !visited[ny][nx]
            ) {
                visited[ny][nx] = true;
                queue.push([ny, nx, move + 1]);
            }
        }
    }
}
