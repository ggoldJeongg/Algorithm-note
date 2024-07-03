// 문제 설명 : 정수 N, K가 입력되었을 때 K가 하나라도 포홤되는 모든 시각을 세는 프로그램 작성
// 핵심 개념 : 브루트포싱, 재귀함수, 시각 문자열 변환

let fs = require("fs");
let data = fs.readFileSync("/dev/stdin").toString().split(" ");

// 입력처리
let N = parseInt(data[0]);
let K = parseInt(data[1]);

// count 변수 초기화 : 조건을 만족하는 시각의 수 세기
let count = 0;

// 재귀함수 : 3가지 인수로 시각을 검사하고 다음 시각 탐색
function clock(hour, minute, second) {
  // 시간이 N 초과시 함수 종료
  if (hour > N) {
    return;
  }
  // 초가 60 초과시 1분 증가, 초 0 초기화
  if (second === 60) {
    second = 0;
    minute++;
  }
  // 분이 60 초과시 1시간 증가, 분 0 초기화
  if (minute === 60) {
    minute = 0;
    hour++;
  }
  if (hour > N) {
    //hour가 N 초과시 탐색 종료
    return;
  }

  // 현재 시각을 "HHMMSS" 형태로 문자열로 변환 : 조건부 연산자
  const hourStr = hour < 10 ? "0" + hour : "" + hour;
  const minuteStr = minute < 10 ? "0" + minute : "" + minute;
  const secondStr = second < 10 ? "0" + second : "" + second;
  const timeStr = hourStr + minuteStr + secondStr;

  //timeStr 변수에 K가 포함되었는지 확인
  if (timeStr.includes(K.toString())) {
    // 포함되면 count 증가
    count++;
  }

  // 다음 초를 재귀적으로 탐색
  clock(hour, minute, second + 1);
}
// 재귀 함수 호출
clock(0, 0, 0);

// 결과 출력
console.log(count);
