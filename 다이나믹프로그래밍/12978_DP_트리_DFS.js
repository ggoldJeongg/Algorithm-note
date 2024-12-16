// 문제 설명 : 도시의 수 N, 도로 연결 상태 주어질 때 최소 몇개의 도시들에 \경찰서\를 세워야 감시 가능한지 구하기
// 핵심 개념 : DFS, 트리, 다이나믹프로그래밍

const fs = require("fs");

// 입력 처리
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = parseInt(input[0], 10);
const edges = input.slice(1).map((line) => line.split(" ").map(Number));

// 그래프 초기화
const graph = Array.from({ length: N + 1 }, () => []);
edges.forEach(([u, v]) => {
  graph[u].push(v);
  graph[v].push(u);
});

// DP 배열 및 방문 처리
const dp = Array.from({ length: N + 1 }, () => [0, 0]);
const visited = Array(N + 1).fill(false);

// 트리 DP 계산
function dfs(node) {
  visited[node] = true;
  dp[node][0] = 0; // 현재 노드에 경찰서를 설치하지 않을 경우
  dp[node][1] = 1; // 현재 노드에 경찰서를 설치할 경우

  for (const neighbor of graph[node]) {
    if (!visited[neighbor]) {
      dfs(neighbor);
      dp[node][0] += dp[neighbor][1]; // 자식 노드에 경찰서가 있어야 함
      dp[node][1] += Math.min(dp[neighbor][0], dp[neighbor][1]); // 자식 노드 중 최소값 선택
    }
  }
}

// 루트 노드에서 시작 (1번 노드 기준)
dfs(1);

// 결과 출력
console.log(Math.min(dp[1][0], dp[1][1]));
