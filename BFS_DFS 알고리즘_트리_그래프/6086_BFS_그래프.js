// 문제 설명 : A-Z까지 잇는 N개의 배수관 최대 유량 계산
// 핵심 개념 : 그래프, BFS, 네트워크 플로우, Edmonds-Karp 알고리즘

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]); // 첫 번째 줄: 파이프의 개수 (N)
const INF = Number.MAX_SAFE_INTEGER; // 무한대를 표현하기 위한 값
const MAX = 52; // 노드의 최대 개수 (A-Z 대문자 26개 + a-z 소문자 26개)

// 문자(char)를 숫자(index)로 변환하는 함수
const ctoi = (char) => {
  if (char >= "A" && char <= "Z") return char.charCodeAt(0) - "A".charCodeAt(0); // 대문자: 0~25
  return char.charCodeAt(0) - "a".charCodeAt(0) + 26; // 소문자: 26~51
};

// 용량(capacity)와 유량(flow)을 저장할 2차원 배열
const capacity = Array.from({ length: MAX }, () => Array(MAX).fill(0));
const flow = Array.from({ length: MAX }, () => Array(MAX).fill(0));

// 그래프 연결 정보 저장을 위한 인접 리스트
const graph = Array.from({ length: MAX }, () => []);

// 입력 데이터를 처리하여 그래프 구성
for (let i = 1; i <= N; i++) {
  const [a, b, c] = input[i].split(" ");
  const u = ctoi(a); // 문자 A, B 등을 숫자로 변환
  const v = ctoi(b); // 문자 A, B 등을 숫자로 변환
  const cap = Number(c); // 파이프의 용량

  capacity[u][v] += cap; // 파이프가 여러 개일 경우 용량을 누적
  capacity[v][u] += cap; // 양방향 그래프이므로 반대 방향도 동일하게 설정
  graph[u].push(v); // u에서 v로 가는 간선을 추가
  graph[v].push(u); // v에서 u로 가는 간선을 추가
}

// 시작 노드(A)와 종료 노드(Z)
const start = ctoi("A");
const end = ctoi("Z");

let totalFlow = 0; // 최대 유량을 저장할 변수

// BFS 함수: 시작 노드에서 종료 노드까지 경로를 탐색
const bfs = () => {
  const parent = Array(MAX).fill(-1); // 부모 노드를 저장 (경로 추적용)
  const visited = Array(MAX).fill(false); // 방문 여부를 확인
  const queue = [start]; // BFS를 위한 큐
  visited[start] = true; // 시작 노드는 방문 처리

  while (queue.length) {
    const cur = queue.shift(); // 현재 노드

    if (cur === end) return parent; // 종료 노드(Z)에 도달하면 경로 반환

    for (const next of graph[cur]) {
      // 연결된 모든 노드 탐색
      if (!visited[next] && capacity[cur][next] - flow[cur][next] > 0) {
        // 방문하지 않았고 잔여 용량이 남아 있는 경우
        queue.push(next); // 큐에 추가
        visited[next] = true; // 방문 처리
        parent[next] = cur; // 경로 추적을 위해 부모 노드 저장
        if (next === end) return parent; // 종료 노드에 도달하면 즉시 반환
      }
    }
  }
  return null; // 더 이상 경로가 없으면 null 반환
};

// Edmonds-Karp 알고리즘
while (true) {
  const parent = bfs(); // BFS로 A에서 Z까지 경로 탐색

  if (!parent) break; // 경로가 없으면 종료

  // 경로에서 최소 잔여 용량 계산
  let minFlow = INF;
  for (let cur = end; cur !== start; cur = parent[cur]) {
    const prev = parent[cur];
    minFlow = Math.min(minFlow, capacity[prev][cur] - flow[prev][cur]);
  }

  // 경로에 따라 유량을 업데이트
  for (let cur = end; cur !== start; cur = parent[cur]) {
    const prev = parent[cur];
    flow[prev][cur] += minFlow; // 순방향 간선에 유량 추가
    flow[cur][prev] -= minFlow; // 역방향 간선에 유량 감소
  }

  totalFlow += minFlow; // 총 유량에 추가
}

console.log(totalFlow); // 최대 유량 출력


// 우물-외양간 잇는 N개의 배수관 지도
// 한줄 연결 : 최솟값 유량 선택
// 병렬 연결 : 각 용량의 합
// 연결되지 않은 파이프 : 제거
// 한개의 최대 유량 갖는 배수관이 됨
// 파이프 맵으로부터 우물-외양간 사이 유량 결정
// 노드 이름 : 알파벳
// 한 파이프들의 집합 읽기. 두 끝점을 가진 파이프 만들기. A-Z까지 최대 유량 계산

// i번째 파이프가 두개의 다른 노드 a,b 연결, F만큼의 유량
// 대소문자 다르면 다른 문자
// 파이프는 양방향으로 흐름