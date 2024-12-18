// 문제 설명: 그래프에서 최단 경로를 계산하여 건우를 도울 수 있는지 확인하는 문제
// 핵심 개념: 다익스트라 알고리즘, 그래프 탐색, 조건 확인

// 필요한 모듈 import
const fs = require('fs');

// 입력 처리
// 파일을 읽어서 문자열로 변환 후, 줄바꿈 기준으로 분할
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫 번째 줄: 정점 개수(V), 간선 개수(E), 건우의 위치(P)
const [V, E, P] = input[0].split(' ').map(Number);

// 나머지 줄: 간선 정보 (a, b, c)
const edges = input.slice(1).map((line) => line.split(' ').map(Number));

// 그래프 생성
// 각 정점에 연결된 간선 정보를 저장하는 배열 초기화
const graph = Array.from({ length: V + 1 }, () => []);
for (const [a, b, c] of edges) {
  graph[a].push([b, c]); // a에서 b로 가는 비용 c
  graph[b].push([a, c]); // b에서 a로 가는 비용 c (양방향 그래프)
}

// 다익스트라 알고리즘 정의
// 특정 시작 정점(start)에서 모든 정점까지의 최단 거리를 계산
const dijkstra = (start) => {
  const dist = Array(V + 1).fill(Infinity); // 각 정점까지의 거리를 무한대로 초기화
  const pq = [[0, start]]; // 우선순위 큐: [현재 비용, 현재 위치]
  dist[start] = 0; // 시작 정점의 거리는 0

  while (pq.length) {
    const [currentCost, currentNode] = pq.shift(); // 큐에서 가장 작은 비용의 노드 추출
    if (currentCost > dist[currentNode]) continue; // 이미 처리된 노드라면 무시

    // 현재 노드와 연결된 모든 간선을 확인
    for (const [nextNode, weight] of graph[currentNode]) {
      const nextCost = currentCost + weight; // 다음 노드로 가는 비용 계산
      if (nextCost < dist[nextNode]) { // 더 짧은 경로를 발견한 경우
        dist[nextNode] = nextCost; // 거리 갱신
        pq.push([nextCost, nextNode]); // 큐에 추가
      }
    }
  }

  return dist; // 최단 거리 배열 반환
};

// 다익스트라 실행
// 1번 정점에서 모든 정점까지의 최단 거리
const distFromStart = dijkstra(1);
// 건우의 위치(P)에서 모든 정점까지의 최단 거리
const distFromGunwoo = dijkstra(P);

// 조건 확인
// 1번 정점에서 V번 정점까지의 최단 거리
const shortestToEnd = distFromStart[V];
// 1번 -> P번 -> V번 경로의 거리
const viaGunwoo = distFromStart[P] + distFromGunwoo[V];

// 경로 비교
if (viaGunwoo === shortestToEnd) {
  console.log("SAVE HIM"); // 건우를 도울 수 있는 경우
} else {
  console.log("GOOD BYE"); // 건우를 도울 수 없는 경우
}
