// 문제 설명 : 배열로 표현된 미로에서 1,1 출발 -> N,M의 위치로 이동할 때 지나야 하는 최소의 칸수를 구하기
// 핵심 개념 : BFS, 그래프

let fs = require("fs");
let data = fs.readFileSync("/dev/stdin").toString().split("\n");

// 첫째줄 입력처리
let N = parseInt(data[0].split(" ")[0]);
let M = parseInt(data[0].split(" ")[1]);

// 미로 배열 초기화
let maze = [];
// 0부터 N까지 길이로 '공백없이' 숫자로 변환하여 미로 배열에 출력
for (let i = 0; i < N; i++) {
  maze.push(data[i + 1].trim().split("").map(Number));
}

//x, y 상하좌우 이동 정의 : x,y 좌표의 변화량
let dx = [-1, 1, 0, 0];
let dy = [0, 0, -1, 1];

// 큐 생성 : 1.1부터 시작하여 움직이는 역할 (BFS탐색)
queue.push([0, 0]);
maze[0][0] = 1; // 시작 위치
// 큐의 길이가 0보다 크면 (1이면)
while (queue.length > 0) {
  // x,y 배열(좌표)을 큐에서 제거
  let [x, y] = queue.shift();

  // 상하좌우로 이동하기 위해 4번 반복
  for (let i = 0; i < 4; i++) {
    // nx, ny는 다음 이동할 위치
    let nx = x + dx[i];
    let ny = y + dy[i];

    // 이동할 위치가 미로 범위 내에 있고, 이동할 수 있는 칸(1)이면
    if (nx >= 0 && ny >= 0 && nx < N && ny < M && maze[nx][ny] === 1) {
      // 큐에 다음 위치 추가
      queue.push([nx, ny]);
      // 다음 위치의 값을 현재 위치의 값 + 1로 설정 (이동 거리 기록)
      maze[nx][ny] = maze[x][y] + 1;
    }
  }
}
// 도착 위치의 값 출력 (최소 칸 수)
console.log(maze[N - 1][M - 1]);

/* 조건 요약
- 첫째줄 : 이동할 위치 N, M
- 둘째줄~ : N개의 줄에 M개의 정수로 미로가 주어짐
- 각 수는 붙어서 입력

** 풀이 전략 **
- 선택 자료구조 : 그래프
  따로 부모-자식 노드 관계가 아니라고 생각해서 일반 그래프를 선택했다.
- 선택 알고리즘 : BFS
  위치를 이동할 때 지나는 최소의 칸 수 구하기 -> 최단경로 구하기로 이해했다.
  BFS가 최단경로 구할 때 효율적이라고 생각해서 선택했다.
*/
