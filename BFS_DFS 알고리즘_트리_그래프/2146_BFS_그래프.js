//문제 설명 : 여러 섬이 있는 지도에서 가장 짧은 다리를 놓아 두 섬 연결하는 최단거리의 칸 수 구하기
//핵심 개념 : BFS * 2

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 입력 처리
const n = Number(input[0]); // 지도의 크기 N
const graph = input.slice(1).map((line) => line.split(" ").map(Number)); // 지도 데이터

const visited = Array.from({ length: n }, () => Array(n).fill(0)); // 방문 여부를 저장하는 배열
let num = 1; // 섬 번호 (고유 번호를 부여)
let res = Infinity; // 최종 결과값 (최단 다리 길이)

// 첫 번째 BFS: 섬 구분
const bfs = (i, j) => {
  /*
  i, j: 현재 위치
  섬의 모든 영역을 탐색하여 고유 번호를 부여합니다.
  */
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1], // 상하좌우 탐색 방향
  ];
  const queue = [[i, j]]; // BFS 큐
  visited[i][j] = 1; // 현재 위치 방문 처리
  graph[i][j] = num; // 섬 번호 지정

  while (queue.length > 0) {
    const [x, y] = queue.shift(); // 현재 위치
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx >= 0 &&
        nx < n &&
        ny >= 0 &&
        ny < n &&
        !visited[nx][ny] &&
        graph[nx][ny] === 1 // 같은 섬의 영역
      ) {
        visited[nx][ny] = 1; // 방문 처리
        graph[nx][ny] = num; // 섬 번호 지정
        queue.push([nx, ny]); // 큐에 추가
      }
    }
  }
};

// 두 번째 BFS: 최단 거리 계산
const bfs2 = (v) => {
  /*
  v: 섬 번호
  현재 섬에서 다른 섬까지의 최단 거리를 구합니다.
  */
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1], // 상하좌우 탐색 방향
  ];
  const queue = [];
  const dist = Array.from({ length: n }, () => Array(n).fill(-1)); // 거리 배열 (-1로 초기화)

  // 현재 섬의 모든 점을 큐에 추가
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (graph[i][j] === v) {
        dist[i][j] = 0; // 초기 거리는 0
        queue.push([i, j]); // 큐에 추가
      }
    }
  }

  // BFS 시작
  while (queue.length > 0) {
    const [x, y] = queue.shift();
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < n && ny >= 0 && ny < n) {
        if (graph[nx][ny] && graph[nx][ny] !== v) {
          // 다른 섬에 도달한 경우
          return dist[x][y]; // 현재 거리 반환
        }
        if (graph[nx][ny] === 0 && dist[nx][ny] === -1) {
          // 바다인 경우 탐색 지속
          dist[nx][ny] = dist[x][y] + 1; // 거리 갱신
          queue.push([nx, ny]); // 큐에 추가
        }
      }
    }
  }

  return Infinity; // 다른 섬에 도달하지 못한 경우
};

// 섬 구분
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (graph[i][j] === 1 && !visited[i][j]) {
      bfs(i, j); // BFS로 섬 구분
      num++; // 다음 섬 번호
    }
  }
}

// 최단 거리 계산
for (let v = 1; v < num; v++) {
  res = Math.min(res, bfs2(v)); // 각 섬에서의 최단 거리 계산
}

console.log(res); // 최종 결과 출력
