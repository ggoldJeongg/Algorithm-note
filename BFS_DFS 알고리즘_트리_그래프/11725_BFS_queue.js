// 문제 설명 : 루트가 없는 트리의 루트를 1이라고 가정한 경우, 각 노드의 부모를 구하는 프로그램 작성
// 핵심 개념 : 트리, BFS, DFS

let fs = require("fs");
let data = fs.readFileSync("/dev/stdin").toString().split("\n");

const N = Number(data[0]); // 첫째줄 N (노드 개수) 숫자로 파싱
const vertexs = data.slice(1).map((line) => line.split(" ").map(Number)); // 둘째줄 (1번째 인덱스) 부터 공백으로 구분하여 숫자로 파싱

// (1)그래프 초기화 N+1개의 빈 배열을 생성
const graph = Array.from({ length: N + 1 }, () => []);
// 인접리스트 : 각 노드에 연결된 다른 노드들을 배열로 저장
for (const [u, v] of vertexs) {
  graph[u].push(v);
  graph[v].push(u);
}

/* 예시
[
  [],
  [6, 4],    // 노드 1에 연결된 노드들
  [4],       // 노드 2에 연결된 노드들
  [6, 5],    // 노드 3에 연결된 노드들
  [1, 2, 7], // 노드 4에 연결된 노드들
  [3],       // 노드 5에 연결된 노드들
  [1, 3],    // 노드 6에 연결된 노드들
  [4]        // 노드 7에 연결된 노드들
]
*/

// 부모 노드 정보 저장을 위한 배열 초기화
const parents = Array(N + 1).fill(0);

// (2)BFS를 사용하여 트리의 부모 찾기 : 큐 자료구조 사용
const queue = [1]; // 시작 노드 1을 큐에 넣는다.
parents[1] = 1; // 루트 노드의 부모를 자기 자신으로 설정

// 큐의 길이가 0보다 클 때
while (queue.length > 0) {
  const node = queue.shift(); // 큐에서 노드를 꺼낸다.

  // 현재 노드의 인접 노드를 확인
  for (const neighbor of graph[node]) {
    // 방문하지 않은 노드
    if (parents[neighbor] === 0) {
      //부모를 현재 노드로 설정
      parents[neighbor] = node;
      // 큐에 인접 노드를 추가
      queue.push(neighbor);
    }
  }
}

// 결과 출력
const result = [];
for (let i = 2; i <= N; i++) {
  result.push(parents[i]);
}
console.log(result.join("\n"));

/* 조건 요약
- 첫째줄 : N (노드의 개수)
- 둘째줄~ : N-1개의 줄에 (첫째줄이 N이니까) 트리상에서 연결된 두 정점
- 첫째줄~N-1개의 줄에 각 노드의 부모 노드 번호를 2번부터 순서대로 출력하기

** 풀이 전략 **
- 루트가 없는 트리다. 무방향 트리다.
- BFS 알고리즘을 선택 
  -> 시작 정점(예:1)을 기준으로 가까운 정점을 탐색하기 때문에
    목표가 시작점에서 가까울수록 탐색이 빨리 종료될 수 있다.
    큐 or 링크드 리스트로 구현
- BFS 탐색 : 큐에서 노드를 꺼내는 작업으로, 큐의 길이가 최대 N이므로 
  최악의 경우에도 O(N)의 시간 복잡도
- 그래프 초기화 : 길이가 N+1인 배열을 초기화하는 작업
  이는 O(N)의 시간 복잡도를 가집니다.
*/
