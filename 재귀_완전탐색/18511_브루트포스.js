// 문제 설명 : N보다 작거나 같은 자연수 중 K의 원소로만 구성된 가장 큰 수 출력
// 핵심 개념 : 브루트포스, 재귀함수

let fs = require("fs");
let data = fs.readFileSync("/dev/stdin").toString().split("\n");

// 입력 설정
let input = data[0].split(" ").map(Number);
let N = input[0];
let elements = data[1].split(" ").map(Number);

// 가장 큰 수 초기화
let maxNumber = 0;

// 재귀함수 작성 : 가장 최근의 수를 N값과 비교
function findAnswer(currentNumber) {
  // N보다 값이 크면 함수 종료
  if (currentNumber > N) {
    return;
  }
  // Math.max() : 값이 N과 같거나 작으면 가장 큰값인지 maxNumber내의 변수와 비교
  if (currentNumber <= N) {
    maxNumber = Math.max(maxNumber, currentNumber);
  }
  // K의 원소를 순회하면서 현재 숫자의 뒤에 digit를 붙여 새로운 숫자 생성
  // 생성된 숫자를 인자로 재귀함수 호출
  for (let digit of elements) {
    findAnswer(currentNumber * 10 + digit);
  }
}

// 초기 재귀함수 호출
for (let digit of elements) {
  findAnswer(digit);
}

console.log(maxNumber);
