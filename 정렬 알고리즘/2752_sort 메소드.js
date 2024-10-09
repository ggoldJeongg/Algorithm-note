// 문제 설명 : 세 수를 오름차순으로 차례대로 정렬시키기
// 핵심 개념 : 정수 기본 정렬

// fs모듈을 사용
const fs = require("fs");
// 문자열로 변환 후 줄바꿈 기준으로 분할
const data = fs.readFileSync("/dev/stdin").toString().split("\n");

// 받아온 data 문자열을 numbers 배열에 저장하는데
// 공백 기준으로 분할하고
// 숫자로 순차 변환
const numbers = data[0].split(" ").map(Number);

// 오름차순 정렬을 위한 비교 함수
function compare(a, b) {
  if (a < b) return -1; // a가 b보다 작을 경우 -1
  else if (a > b) return 1; // a가 b보다 클 경우 1
  else 0; // 같으면 0
}

// sort 정렬을 사용하여 정렬 함수 실행
numbers.sort(compare);

// answer 변수 초기화
let answer = "";
// 배열 0번 인덱스부터 numbers 전체 구간의 인덱스를 증가
for (let i = 0; i < numbers.length; i++) {
  // answer 변수에 증가시킨 numbers 배열 + 띄어쓰기 저장
  answer += numbers[i] + " ";
}

// answer 반복문 출력
console.log(answer);

// 시간복잡도 : sort 메소드를  사용하여 O(NlogN)
