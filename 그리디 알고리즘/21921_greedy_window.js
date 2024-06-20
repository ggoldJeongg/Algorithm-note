let fs = require("fs");
let data = fs.readFileSync("/dev/stdin").toString().split("\n");

let [N, X] = data[0].split(" ").map(Number);
let dayVisitors = data[1].split(" ").map(Number);

function findMaxVisitors(N, X, dayVisitors) {
  let maxVisitors = 0;
  let currentVisitors = 0;
  let maxPeriods = 0;

  // 초기 윈도우 설정
  for (let i = 0; i < X; i++) {
    currentVisitors += dayVisitors[i];
  }
  maxVisitors = currentVisitors;
  maxPeriods = 1;

  // 슬라이딩 윈도우 적용
  for (let i = X; i < N; i++) {
    currentVisitors += dayVisitors[i] - dayVisitors[i - X];
    if (currentVisitors > maxVisitors) {
      maxVisitors = currentVisitors;
      maxPeriods = 1;
    } else if (currentVisitors === maxVisitors) {
      maxPeriods++;
    }
  }

  if (maxVisitors === 0) {
    console.log("SAD");
  } else {
    console.log(maxVisitors);
    console.log(maxPeriods);
  }
}

findMaxVisitors(N, X, dayVisitors);

// 선택 알고리즘 : 슬라이딩 윈도우 (탐욕 알고리즘 중, 구간이 고정되어있음.)

/* 조건 요약
X일동안 가장 많이 들어온 방문자 수, 기간 확인
첫째줄 : 블로그 시작 후 지난 "일"수 N , X
둘째줄 : 블로그 시작 1일차~N일차 하루 방문자 수

첫째줄 출력 : X일동안 가장 많이 들어온 방문자 수 (최대 방문자 수가 0일 경우, SAD 출력
최대 방문자 수가 0이 아닌 경우 둘째줄에 기간이 몇개 있는지 출력 */
