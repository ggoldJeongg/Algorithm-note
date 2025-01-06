// 문제 설명 :모든 건물을 최소 시간으로 건설하기 
// 핵심 개념 : DP, 그래프, 위상 정렬

const fs = require("fs");

// 입력 처리: 입력 데이터를 읽어서 각 건물 정보와 건물 수를 처리
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = parseInt(input[0], 10); // 건물의 종류 수 (노드 개수)
const buildings = input.slice(1).map((line) => line.split(" ").map(Number)); // 각 건물의 정보 (건설 시간, 선행 조건)

// 초기화
const times = Array(N + 1).fill(0); // 각 건물의 건설 시간을 저장하는 배열
const indegree = Array(N + 1).fill(0); // 각 건물의 진입차수 (선행 조건의 수)
const graph = Array.from({ length: N + 1 }, () => []); // 각 건물 간의 연결 관계를 저장하는 그래프

// 그래프 구성
for (let i = 1; i <= N; i++) {
  const [time, ...dependencies] = buildings[i - 1]; // 건물의 건설 시간과 선행 조건
  times[i] = time; // 해당 건물의 건설 시간 저장

  // 선행 조건을 기준으로 그래프와 진입차수 업데이트
  dependencies.slice(0, -1).forEach((dep) => {
    graph[dep].push(i); // 선행 건물(dep)이 현재 건물(i)로 연결됨
    indegree[i]++; // 현재 건물의 진입차수를 증가
  });
}

// 위상 정렬 + DP
const queue = []; // 위상 정렬을 위한 큐
const result = Array(N + 1).fill(0); // 각 건물의 최소 완성 시간을 저장하는 배열

// 진입차수가 0인 노드를 큐에 추가 (선행 조건이 없는 건물)
for (let i = 1; i <= N; i++) {
  if (indegree[i] === 0) {
    queue.push(i); // 큐에 추가
    result[i] = times[i]; // 해당 건물의 최소 완성 시간은 건설 시간 그대로
  }
}

// 큐를 이용한 위상 정렬 수행
while (queue.length > 0) {
  const current = queue.shift(); // 큐에서 현재 건물을 꺼냄

  for (const next of graph[current]) {
    // 현재 건물에서 연결된 다음 건물들 확인
    // 현재 건물의 완성 시간 + 다음 건물의 건설 시간 중 최대값으로 갱신
    result[next] = Math.max(result[next], result[current] + times[next]);

    // 다음 건물의 진입차수를 감소
    indegree[next]--;
    if (indegree[next] === 0) {
      // 진입차수가 0이 되면 큐에 추가
      queue.push(next);
    }
  }
}

// 결과 출력: 각 건물의 최소 완성 시간을 한 줄씩 출력
console.log(result.slice(1).join("\n"));
