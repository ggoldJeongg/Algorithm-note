// 문제 설명 : N개의 수를 오름차순으로 정렬
// 핵심 개념 : 줄바꿈 기준 데이터 입출력 초기화, 오름차순 정렬

// fs 모듈을 사용
const fs = require("fs");
// 자료를 문자열로 변환 후 줄바꿈 기준으로 분할
const data = fs.readFileSync("/dev/stdin").toString().split("\n");

// 줄바꿈 기준 첫 인덱스 숫자 변환 (N값. 수의 개수)
const N = Number(data[0]);
// 숫자 저장을 위한 배열 초기화
const numbers = [];
for (let i = 1; i <= N; i++) {
  // numbers 배열에 데이터를
  // 반복문 조건에 따라 i인덱스를 차례로 저장
  numbers.push(Number(data[i]));
}

// 오름차순 정렬 비교 함수
function compare(a, b) {
  return a - b;
}
numbers.sort(compare);

// 정답 출력
let answer = "";
// 숫자들이 저장된 numbers 배열의 첫 인덱스부터 차례로 증가
for (let i = 0; i < numbers.length; i++) {
  answer += numbers[i] + "\n";
}

console.log(answer);

// 시간 복잡도 : sort 정렬을 사용하여 O(NlogN);
