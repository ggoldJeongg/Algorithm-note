// 문제 설명 : 주어진 지도의 모든 지점에 대해서 목표 지점까지의 거리 구하기
// 핵심 개념 : BFS, 그래프

let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 지도 크기 입력 받기
let [n, m] = input[0].split(" ").map(Number);
let map = [];
let target = null;

// 지도 정보 입력 받기 및 목표 지점 찾기
for (let i = 1; i <= n; i++) {
  let row = input[i].split(" ").map(Number);
  map.push(row);
  for (let j = 0; j < m; j++) {
    if (row[j] === 2) {
      target = [i - 1, j];
    }
  }
}

// 방향 배열 (상, 하, 좌, 우)
let directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// BFS 초기 설정
let queue = [];
let distances = Array.from({ length: n }, () => Array(m).fill(-1));

// 목표 지점 초기화
queue.push(target);
distances[target[0]][target[1]] = 0;

// BFS 수행
while (queue.length > 0) {
  let [x, y] = queue.shift();
  for (let [dx, dy] of directions) {
    let nx = x + dx;
    let ny = y + dy;
    if (
      nx >= 0 &&
      nx < n &&
      ny >= 0 &&
      ny < m &&
      map[nx][ny] === 1 &&
      distances[nx][ny] === -1
    ) {
      distances[nx][ny] = distances[x][y] + 1;
      queue.push([nx, ny]);
    }
  }
}

// 결과 출력
for (let i = 0; i < n; i++) {
  let row = [];
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 0) {
      row.push(0);
    } else {
      row.push(distances[i][j]);
    }
  }
  console.log(row.join(" "));
}

/* 조건 요약
- 세로 n, 가로 m 크기의 지도가 주어진다.
- 이동은 오직 가로와 세로로만 가능하다.
- 0 : 갈 수 없는 땅, 1 : 갈 수 있는 땅, 2 : 목표 지점
*/
