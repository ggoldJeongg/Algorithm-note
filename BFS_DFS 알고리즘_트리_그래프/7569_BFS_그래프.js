// 문제 설명 : 토마토를 창고에 보관하는 격자 모양 상자들의 크기,
// 익은 토마토, 익지 않은 토마토 정보가 주어졌을 때 며칠이 지나면 토마토들이 익는지 최소일수 구하기
// 핵심 개념 : BFS, 그래프

const fs = require("fs");

// 입력 처리
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [M, N, H] = input[0].split(" ").map(Number);

// 토마토 창고 정보 배열 초기화
const tomatoes = [];
let index = 1;
for (let h = 0; h < H; h++) {
  const box = [];
  for (let n = 0; n < N; n++) {
    box.push(input[index++].split(" ").map(Number));
  }
  tomatoes.push(box);
}

// 6방향 벡터 (위, 아래, 왼쪽, 오른쪽, 앞, 뒤)
const directions = [
  [0, 0, -1],
  [0, 0, 1], // 위, 아래
  [0, -1, 0],
  [0, 1, 0], // 왼쪽, 오른쪽
  [-1, 0, 0],
  [1, 0, 0], // 앞, 뒤
];

// BFS를 위한 큐 초기화
const queue = [];
let unripeCount = 0;

// 초기 상태에서 익은 토마토 위치를 큐에 추가하고 익지 않은 토마토 개수 세기
for (let h = 0; h < H; h++) {
  for (let n = 0; n < N; n++) {
    for (let m = 0; m < M; m++) {
      if (tomatoes[h][n][m] === 1) {
        queue.push([h, n, m, 0]); // 위치와 날짜를 함께 큐에 저장
      } else if (tomatoes[h][n][m] === 0) {
        unripeCount++;
      }
    }
  }
}

// BFS 함수 정의
function bfs() {
  let days = 0;

  while (queue.length > 0) {
    const [h, n, m, day] = queue.shift();
    days = day;

    // 6방향으로 이동하면서 익지 않은 토마토를 익히기
    for (const [dh, dn, dm] of directions) {
      const nh = h + dh;
      const nn = n + dn;
      const nm = m + dm;

      // 범위 내에 있고 익지 않은 토마토일 경우
      if (
        nh >= 0 &&
        nh < H &&
        nn >= 0 &&
        nn < N &&
        nm >= 0 &&
        nm < M &&
        tomatoes[nh][nn][nm] === 0
      ) {
        tomatoes[nh][nn][nm] = 1; // 익히기
        unripeCount--; // 익지 않은 토마토 개수 감소
        queue.push([nh, nn, nm, day + 1]); // 다음 날짜로 큐에 추가
      }
    }
  }

  return unripeCount === 0 ? days : -1; // 모두 익었다면 걸린 일수 반환, 아니면 -1 반환
}

// 모든 토마토가 처음부터 익어 있는 경우
if (unripeCount === 0) {
  console.log(0);
} else {
  // BFS 수행하여 최소 일수 계산
  const result = bfs();
  console.log(result);
}

/* 조건 요약 */

// 선택 알고리즘: BFS
// BFS를 사용하는 이유는 토마토가 익어가는 과정을 날짜별로 탐색하여 최단 시간에 모두 익을 수 있는지를 확인하기 위해서
// 토마토가 익어가는 과정을 각 날짜별로 큐를 이용해 탐색

// 선택 자료구조: 큐, 3차원 배열
// 큐: BFS 탐색을 위해 사용, 현재 위치와 날짜를 함께 저장
// 3차원 배열: 토마토 창고의 각 칸의 상태를 기록하기 위해 사용
/* tomatoes 배열: 3차원 배열로 초기화하여 각 칸의 토마토 상태를 기록
   const tomatoes = [
     [
       [0, -1, 0, 0, 0],
       [-1, -1, 0, 1, 1],
       [0, 0, 0, 1, 1]
     ]
     ...
   ]; */

// 시간 복잡도: O(M * N * H)
// BFS의 특성상 모든 칸을 최대 한 번씩 방문하므로 체스판 크기에 대해 O(M * N * H)의 시간 복잡도를 가짐

/* BFS 함수 구성
1) 큐가 빌 때까지 반복: while (queue.length > 0)
2) 현재 위치에서 6방향으로 이동 탐색: for (const [dh, dn, dm] of directions)
3) 이동 가능한 칸이고 익지 않은 토마토라면 큐에 추가하고 익히기: queue.push([nh, nn, nm, day + 1]), tomatoes[nh][nn][nm] = 1
4) 모든 토마토가 익었는지 확인하여 결과 반환: return unripeCount === 0 ? days : -1
*/
