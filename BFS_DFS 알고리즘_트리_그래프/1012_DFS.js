// 문제 설명 : 최소한으로 필요한 배추 흰지렁이 마리 수 출력하기
// 핵심 개념 : DFS, 인접행렬

let fs = require("fs");
let data = fs.readFileSync("/dev/stdin").toString().split("\n");

let T = parseInt(data[0]);

// 현재 입력 데이터의 인덱스 설정
let index = 1;

// 각 테스트 케이스에 대해 반복
for (let t = 0; t < T; t++) {
  // M: 밭의 가로 길이, N: 밭의 세로 길이, K: 배추가 심어진 위치 개수
  let [M, N, K] = data[index].split(" ").map(Number);
  index++;

  // 밭을 0으로 초기화된 2차원 배열 생성
  let field = Array.from(Array(N), () => Array(M).fill(0));

  // 각 배추의 위치를 밭에 표시
  for (let k = 0; k < K; k++) {
    let [X, Y] = data[index].split(" ").map(Number);
    field[Y][X] = 1; // 배추 위치를 1로 설정
    index++;
  }

  // DFS 함수를 정의
  function dfs(x, y) {
    // 스택을 이용한 DFS를 수행
    let stack = [[x, y]];
    while (stack.length) {
      let [cx, cy] = stack.pop();
      // 현재 위치가 밭을 벗어나거나 배추가 없는 경우를 처리
      if (cx < 0 || cx >= M || cy < 0 || cy >= N || field[cy][cx] === 0)
        continue;
      // 방문한 배추 위치를 0으로
      field[cy][cx] = 0;
      // 상하좌우 인접한 위치를 스택에 추가
      stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
    }
  }

  // 필요한 배추 흰지렁이 마리 수 세기
  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (field[i][j] === 1) {
        // 배추가 있는 위치를 찾으면
        dfs(j, i); // DFS를 수행하여 연결된 모든 배추를 방문
        count++; // 배추 흰지렁이 마리 수를 증가
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
