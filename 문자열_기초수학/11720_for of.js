// 문제 설명 : N개의 숫자를 모두 합하기
// 핵심 개념 : 문자열 인덱싱, for... of 반복문
var fs = require("fs");
var input = fs.readFileSync("/dev/stdin").toString().split("\n");

let N = Number(input[0]); // 첫 번째 줄을 숫자로 변환하여 N에 저장
let string = input[1]; // 두 번째 줄에서 문자열을 가져와 string에 저장

let answer = 0; // 정답을 저장할 변수 초기화

for (let x of string) {
  answer += Number(x); // 문자열의 각 문자를 숫자로 변환하여 더하기
}

console.log(answer);

// 숫자의 개수는 1~100
// 둘째줄에 숫자 N개가 공백없이 입력
