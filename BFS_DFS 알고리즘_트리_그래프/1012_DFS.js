// 문제 설명 : 최소한으로 필요한 배추 흰지렁이 마리 수 출력하기
// 핵심 개념 : DFS, 인접행렬

let fs = require("fs");
let data = fs.readFileSync("/dev/stdin").toString().split("\n");

let T = parseInt(data[0]);

let index = 1;
for (let t = 0; t < T; t++) {
  let [M, N, K] = data[index].split(" ").map(Number);
  index++;
  let field = Array.from(Array(N), () => Array(M).fill(0));

  for (let k = 0; k < K; k++) {
    let [X, Y] = data[index].split(" ").map(Number);
    field[Y][X] = 1;
    index++;
  }

  function dfs(x, y) {
    let stack = [[x, y]];
    while (stack.length) {
      let [cx, cy] = stack.pop();
      if (cx < 0 || cx >= M || cy < 0 || cy >= N || field[cy][cx] === 0)
        continue;
      field[cy][cx] = 0;
      stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
    }
  }

  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (field[i][j] === 1) {
        dfs(j, i);
        count++;
      }
    }
  }

  console.log(count);
}

/* 조건 요약
~ 입력 ~
- 첫째줄 : 테스트 케이스 수 T
- 둘째줄 : 각 T에 대한 배추를 심은 밭의 가로 길이 M, 세로 길이 N, 배추가 심어진 위치 개수 K
- 셋째줄~ : 배추의 위치 X, Y

~ 출력 ~
- 각 테스트 케이스에 필요한 최소의 배추 흰지렁이 마리 수 출력
*/
