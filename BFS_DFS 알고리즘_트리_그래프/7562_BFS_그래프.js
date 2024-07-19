// 문제 설명 : 나이트가 체스판을 몇번 움직여야 지정된 칸으로 최소 몇번만에 움직일 수 있는지 구하기
// 핵심 이론 : 그래프, BFS

const fs = require("fs");

// 입력처리
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const T = parseInt(input[0]); // 테스트 케이스 개수
let index = 1;

// 나이트의 이동 방향 정의 (8방향)
const knightMoves = [
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, -1],
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
];

// BFS 함수 정의
function bfs(boardSize, start, target) {
  // 체스판을 방문 여부를 기록하는 배열
  const visited = Array.from({ length: boardSize }, () =>
    Array(boardSize).fill(false)
  );
  const queue = [[...start, 0]]; // [x, y, 이동 횟수]
  visited[start[0]][start[1]] = true; // 시작 위치 방문 표시

  while (queue.length > 0) {
    const [x, y, moves] = queue.shift();

    // 목표 위치에 도달하면 이동 횟수 반환
    if (x === target[0] && y === target[1]) {
      return moves;
    }

    // 나이트의 모든 이동 방향 탐색
    for (const [dx, dy] of knightMoves) {
      const nx = x + dx;
      const ny = y + dy;

      // 체스판 범위 내에 있고 아직 방문하지 않은 칸이라면 큐에 추가
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < boardSize &&
        ny < boardSize &&
        !visited[nx][ny]
      ) {
        visited[nx][ny] = true;
        queue.push([nx, ny, moves + 1]);
      }
    }
  }

  // 목표 위치에 도달할 수 없는 경우 (문제 조건 상 항상 도달 가능)
  return -1;
}

// 결과 저장할 배열
const results = [];

for (let t = 0; t < T; t++) {
  const boardSize = parseInt(input[index]);
  const start = input[index + 1].split(" ").map(Number);
  const target = input[index + 2].split(" ").map(Number);
  index += 3;

  // BFS를 이용하여 최소 이동 횟수 계산
  results.push(bfs(boardSize, start, target));
}

// 결과 출력
results.forEach((result) => console.log(result));

/* 조건 요약 */

// 선택 알고리즘: BFS
// BFS를 사용하는 이유는 모든 경로를 동일하게 탐색하여 최단 경로를 찾기 위해서
// 나이트가 이동할 수 있는 모든 칸을 같은 이동 횟수로 탐색하며 목표 위치에 도달하면 그때의 이동 횟수가 최단 이동 횟수

// 선택 자료구조: 큐, 2차원 배열
// 큐: BFS 탐색을 위해 사용, 현재 위치와 이동 횟수를 함께 저장
// 2차원 배열: 체스판의 각 칸의 방문 여부를 기록하기 위해 사용
/* visited 배열: 2차원 배열로 초기화하여 각 칸의 방문 여부를 기록
   const visited = Array.from({ length: boardSize }, () => Array(boardSize).fill(false)); */

// 시간 복잡도: O(N^2)
// BFS의 특성상 모든 칸을 최대 한 번씩 방문하므로 체스판 크기(boardSize)에 대해 O(N^2)의 시간 복잡도를 가짐

/* BFS 함수 구성
1) 시작 위치를 큐에 추가하고 방문 표시: queue.push([start[0], start[1], 0]), visited[start[0]][start[1]] = true
2) 큐가 빌 때까지 반복: while (queue.length > 0)
3) 현재 위치에서 나이트가 이동할 수 있는 모든 방향을 탐색: for (const [dx, dy] of knightMoves)
4) 이동 가능한 칸이고 아직 방문하지 않았다면 큐에 추가하고 방문 표시: queue.push([nx, ny, moves + 1]), visited[nx][ny] = true
5) 목표 위치에 도달하면 이동 횟수 반환: if (x === target[0] && y === target[1]) return moves
*/
