// 문제 설명 : 1번 컴퓨터를 통해 바이러스에 걸리게 되는 컴퓨터의 수 출력
// 핵심 개념 : DFS, BFS중 적절한 알고리즘 선택, 그래프와 트리 자료구조

let fs = require("fs");
let data = fs.readFileSync("/dev/stdin").toString().split("\n");

// 입력 처리
let computers = Number(data[0]);
let connections = Number(data[1]);

// 그래프 초기화 (인접리스트-객체 사용. 각 컴퓨터의 연결 정보 저장)
// 각 컴퓨터의 번호를 key로 사용
let graph = {};

// 각 컴퓨터에 대해 빈 배열 초기화
for (let i = 1; i <= computers; i++) {
  graph[i] = [];
}

// 연결 정보 입력
// data의 2번째~ connections 수만큼 반복하여 연결 정보 입력
for (let i = 2; i < 2 + connections; i++) {
  let [a, b] = data[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

// DFS 탐색 초기 설정
let visited = {};

// 각 컴퓨터에 대한 방문 여부 초기화
for (let i = 1; i <= computers; i++) {
  visited[i] = false;
}

// 재귀 사용
function dfs(node) {
  visited[node] = true; // 현재 노드를 방문 처리
  let count = 0;

  // 현재 노드와 연결된 모든 노드를 순회
  for (let next of graph[node]) {
    if (!visited[next]) {
      count += 1 + dfs(next); // 재귀 호출 : 방문 노드의 수를 누적하여 반환
    }
  }

  return count;
}

console.log(dfs(1));

/* 조건 요약
- 컴퓨터 네트워크를 통해 전파된 웜 바이러스
- 웜바이러스에 걸린 컴퓨터와 네트워크상 연결된 컴퓨터만 바이러스에 걸린다

~ 입력 ~
- 첫째줄 : 컴퓨터의 수 (computers >= 100), 1번부터 차례로 번호 부여
- 둘째줄 : 네트워크 상에서 직접 연결된 컴퓨터 쌍의 수
- 셋째줄~ : 컴퓨터 쌍의 수 만큼 한줄-한쌍씩 네트워크상에서 직접 연결된 컴퓨터의 번호 쌍 입력

~ 출력 ~
- 첫째줄 : 1번 컴퓨터를 통해 걸리게 되는 컴퓨터의 수

~ 풀이 전략 ~
- 네트워크 유형 : DFS/BFS 문제
- 인접한 모든 노드를 탐색하기 위해 DFS 선택 -> 재귀로 구현
- 컴퓨터의 수가 100 이하로 정의되어있어 연산 시간 문제는 없을것으로 보았다.
- 인접리스트 사용
*/
