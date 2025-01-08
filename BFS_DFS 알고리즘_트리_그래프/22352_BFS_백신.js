// 문제 설명 : SP 촬영 기법에서 백신 투약 후 데이터 변화 여부 확인
// 핵심 개념 : BFS를 활용한 그래프 탐색으로 백신 데이터 변화를 비교

const fs = require("fs");

// 방향 배열 정의 (상, 우, 하, 좌)
// 각 방향으로 탐색할 때 x, y 좌표의 이동량을 나타냄
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

let N, M; // N: 세로 크기, M: 가로 크기
let originalMap, vaccinatedMap; // originalMap: 백신 투약 전 데이터, vaccinatedMap: 투약 후 데이터

// 범위 확인 함수: 주어진 좌표가 맵 범위 안에 있는지 확인
// x, y: 확인할 좌표
// 맵 범위를 벗어나면 false 반환
function inRange(x, y) {
  return x >= 0 && x < M && y >= 0 && y < N;
}

// BFS를 사용해 항체가 퍼진 영역을 탐색하고 확인
// startX, startY: 탐색을 시작할 좌표
// newNum: 항체가 퍼진 후 바뀌어야 할 값
function bfs(startX, startY, newNum) {
  const queue = [[startX, startY]]; // 탐색할 좌표를 저장하는 큐
  const visited = Array.from({ length: N }, () => Array(M).fill(false)); // 방문 여부를 기록하는 배열

  const target = originalMap[startY][startX]; // 시작점의 원래 데이터 값
  visited[startY][startX] = true; // 시작점 방문 처리

  while (queue.length > 0) {
    const [x, y] = queue.shift(); // 큐에서 현재 좌표를 꺼냄
    originalMap[y][x] = newNum; // 현재 좌표의 값을 변경

    // 4방향 탐색
    for (let d = 0; d < 4; d++) {
      const nx = x + dx[d]; // 이동 후 x 좌표
      const ny = y + dy[d]; // 이동 후 y 좌표

      // 다음 좌표가 범위 내에 있고, 방문하지 않았으며, target 값과 동일한 경우
      if (
        inRange(nx, ny) &&
        !visited[ny][nx] &&
        originalMap[ny][nx] === target
      ) {
        visited[ny][nx] = true; // 방문 처리
        queue.push([nx, ny]); // 큐에 추가
      }
    }
  }
}

// 두 맵을 비교하여 백신 투약 결과가 유효한지 확인
// originalMap과 vaccinatedMap을 순차적으로 비교
// 값이 다르면 false 반환, 끝까지 같으면 true 반환
function checkAll() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (originalMap[i][j] !== vaccinatedMap[i][j]) {
        return false; // 값이 다르면 false 반환
      }
    }
  }
  return true; // 끝까지 문제가 없으면 true 반환
}

// 문제 해결 함수
// 맵을 탐색하며 다른 값을 발견하면 BFS 실행 후 결과 확인
function solve() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (originalMap[i][j] !== vaccinatedMap[i][j]) {
        bfs(j, i, vaccinatedMap[i][j]); // BFS로 항체 퍼짐을 처리

        if (checkAll()) {
          // 모든 값이 일치하는지 확인
          return "YES"; // 일치하면 YES 반환
        } else {
          return "NO"; // 불일치하면 NO 반환
        }
      }
    }
  }
  return "YES"; // 끝까지 문제 없으면 YES 반환
}

// 입력 처리 및 실행
// 입력값을 표준 입력에서 읽어와 처리
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [m, n] = input[0].split(" ").map(Number); // 첫 줄에서 맵 크기 읽기
M = n;
N = m;
originalMap = input.slice(1, 1 + m).map((line) => line.split(" ")); // 백신 투약 전 데이터 읽기
vaccinatedMap = input.slice(1 + m, 1 + 2 * m).map((line) => line.split(" ")); // 백신 투약 후 데이터 읽기

console.log(solve()); // 결과 출력
