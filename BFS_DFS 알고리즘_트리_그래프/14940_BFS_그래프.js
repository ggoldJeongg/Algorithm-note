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
  let row = input[i].split(" ").map(Number); // 각 행의 정보를 배열로 변환
  map.push(row); // 지도를 입력받아 map에 추가
  for (let j = 0; j < m; j++) {
    if (row[j] === 2) {
      // 목표 지점(2)을 찾으면
      target = [i - 1, j]; // 목표 지점의 좌표 저장
    }
  }
}

// 방향 배열 (상, 하, 좌, 우)
let directions = [
  [-1, 0], // 상
  [1, 0], // 하
  [0, -1], // 좌
  [0, 1], // 우
];

// BFS 초기 설정
let queue = []; // BFS를 위한 큐
let distances = Array.from({ length: n }, () => Array(m).fill(-1)); // 거리 배열, 초기값은 -1

// 목표 지점 초기화
queue.push(target); // 큐에 목표 지점 추가
distances[target[0]][target[1]] = 0; // 목표 지점의 거리는 0

// BFS 수행
while (queue.length > 0) {
  let [x, y] = queue.shift(); // 큐에서 좌표를 하나 꺼냄
  for (let [dx, dy] of directions) {
    // 4개의 방향으로 이동
    let nx = x + dx; // 새로운 x 좌표
    let ny = y + dy; // 새로운 y 좌표
    // 유효한 좌표인지 검사하고, 이동할 수 있으며, 아직 방문하지 않은 경우
    if (
      nx >= 0 &&
      nx < n &&
      ny >= 0 &&
      ny < m &&
      map[nx][ny] === 1 &&
      distances[nx][ny] === -1
    ) {
      distances[nx][ny] = distances[x][y] + 1; // 거리를 갱신
      queue.push([nx, ny]); // 큐에 새로운 좌표를 추가
    }
  }
}

// 결과 출력
for (let i = 0; i < n; i++) {
  let row = []; // 출력할 행을 저장할 배열
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 0) {
      // 장애물(0)은 그대로 출력
      row.push(0);
    } else {
      row.push(distances[i][j]); // 거리 값을 출력
    }
  }
  console.log(row.join(" ")); // 행을 문자열로 변환하여 출력
}

/* 조건 요약
- 세로 n, 가로 m 크기의 지도가 주어진다.
- 이동은 오직 가로와 세로로만 가능하다.
- 0 : 갈 수 없는 땅, 1 : 갈 수 있는 땅, 2 : 목표 지점
*/
