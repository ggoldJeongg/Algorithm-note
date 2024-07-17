// 문제 설명 : 특정 조건의 각 나라 인구수가 주어졌을 때 인구이동이 며칠간 발생하는지 구하기
// 핵심 개념 : BFS, 그래프

let fs = require("fs");
let data = fs.readFileSync("/dev/stdin").toString().split("\n");

// 첫째 줄 입력
let [N, L, R] = data.shift().split(" ").map(Number);
// 그래프 생성 : 문제에 주어진 각 나라의 인구수 저장, 인구 차이 계산
let graph = data.map((v) => v.split(" ").map((val) => Number(val)));

// 방향 벡터 정의 : 상,하, 좌, 우 이동
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

// BFS 함수 정의
function bfs(x, y, visited) {
  let queue = [[x, y]]; // BFS 탐색용 큐 초기화
  // 큐에 좌표 (0,0)부터 넣는다. 이 때 큐의 길이는 1이 된다.
  let open = [[x, y]]; // 연합에 해당되는 나라 저장
  let totalPopulation = graph[x][y];
  visited[x][y] = true;
  // 큐 사용 : 인접 노드(나라) 탐색
  while (queue.length > 0) {
    //큐의 길이(length) : 몇개의 좌표가 있는지 확인
    let [curX, curY] = queue.shift(); // 큐의 첫번째 요소 (좌표)를 제거 후 반환

    // 방향벡터 배열의 상하좌우 요소가 4개이기 때문에 0,1,2,3 증가
    for (let i = 0; i < 4; i++) {
      // 상하좌우로 이동한 새로운 위치(nx, ny), i에 따라 위치 결정
      let nx = curX + dx[i];
      let ny = curY + dy[i];
      // 현재 위치에서 이동시 유효한 위치 & 중복 방문 & 인구 차이 확인
      if (nx >= 0 && ny >= 0 && nx < N && ny < N && !visited[nx][ny]) {
        // Math.abs() : 주어진 숫자의 절대값을 반환
        // populationDiff : 좌표의 변화량 (현재 좌표 - 이동한 좌표)
        let populationDiff = Math.abs(graph[curX][curY] - graph[nx][ny]);
        // 좌표 변화량이 L보다 크거나 같고, R보다 작거나 같으면
        if (populationDiff >= L && populationDiff <= R) {
          queue.push([nx, ny]); // BFS 탐색에 저장
          open.push([nx, ny]); //연합인 나라로 인정
          visited[nx][ny] = true; // 방문했다고 인정
          totalPopulation += graph[nx][ny]; // 총 인구가  새로운 위치의 인구로 계속 갱신
        }
      }
    }
  }

  // 4)연합 각 칸 인구수 = 연합인구수/연합이루는 칸의 개수, 소수점 버림
  let newPopulation = Math.floor(totalPopulation / open.length);
  // 연합 각 칸의 인구수를 반영
  for (let [ux, uy] of open) {
    graph[ux][uy] = newPopulation;
  }

  return open.length > 1; // 연합 구성 여부 반환
}

// 인구이동이 발생하지 않을 때 까지 BFS 반복
let days = 0;

// 각 나라가 이미 방문됐는지 확인
while (true) {
  // N*N 땅의 크기
  let visited = Array.from(Array(N), () => Array(N).fill(false));
  let isPopulationMoved = false; // 초기값 인구이동 없음(false)

  // 방문하지 않은 땅 루프 탐색
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        // bfs함수가 true 반환시 인구이동이 발생 -> true로 설정
        if (bfs(i, j, visited)) {
          isPopulationMoved = true;
        }
      }
    }
  }

  if (!isPopulationMoved) break; // 인구 이동이 없으면 종료
  days++;
}

console.log(days);

/* 조건 요약
- 첫째줄 : N (땅크기), L(인구수), R(인구수)
- 둘째줄~N째줄 : 각 나라 인구수
- [r]행 [c]열 정수 : A[r][c] 인원수
  인구 이동 발생일수 : 0~2000번
- 각 땅에 나라 1개씩 배정
1)국경선 공유하는 나라 인구 차이 1 <= L <= R : 국경선 하루 오픈
2)국경선 모두 열리면 인구이동 시작
3)국경선이 열려 이동 가능하면 '연합'
4)연합 각 칸 인구수 = 연합인구수/연합이루는 칸의 개수, 소수점 버림
5)연합 해체 후
6)모든 국경선 닫기
1)~6) 반복 후 종료
*/

// 선택 알고리즘 : BFS
// 시작 노드에서부터 확장하면서 '인접한 모든 노드'를 탐색
// 연합의 크기와 경계를 쉽게 계산
// 중복 방문을 방지 (큐 사용)
/* 처리 과정
1)시작 노드를 큐에 넣고 방문 처리
2)큐에서 노드를 꺼내 해당 노드의 모든 인접 노드를 큐에 넣고 방문 처리
3)큐가 빌 때까지 이 과정을 반복 
*/
// DFS는 왜 안될까?
// 한 경로를 따라 가능한 깊이까지 탐색한 후 다른 경로를 탐색
// 연합의 경계 계산이 어려울 수 있다.
// 연합이 클 경우 많은 경로를 탐색하여 시간복잡도가 올라간다.

/* 선택 자료구조 
- graph : 인구수 저장을 위한 2차원 '배열'
- queue : BFS 구현을 위한 '큐'
*/

// 시간복잡도 : O(N^2)
// 그래프의 노드 수와 간선 수에 따라 결정된다.
// N x N 크기의 2차원 배열에서 BFS를 수행하기때문에 O(N^2)
// 간선 수는 최대 4개(인접 노드)이기 때문에  총 간선 수는 최대 4 * N^2
// BFS 알고리즘은 큐를 사용하여 노드를 순차적으로 방문하므로, 각 노드와 그 인접 노드를 검사하는 데 비례하는 시간 복잡도를 가진다.
// 따라서 시간 복잡도는 O(N^2 + 4N^2)로 간단히 O(N^2)을 가진다.
