// 문제설명 : 후위표기식과 피연산자의 대응값 계산
// 핵심 개념 :스택, map(키-값), 문자열처리, 슬라이싱

var fs = require("fs");
var input = fs.readFileSync("/dev/stdin").toString().split("\n");

// ~ 입력 처리 ~
const N = parseInt(input[0]); //첫째줄 N의 값 저장 배열 - 피연산자의 개수
const expression = input[1]; // 후위표기식 저장 배열
// 각 피연산자의 대응값. 2~2+N번째 배열 내 각 요소를 숫자로 반환한다.
const values = input.slice(2, 2 + N).map(Number);
// 객체를 생성하여 피연산자의 값과 대응값을 매핑함.
const operandValues = {};
for (let i = 0; i < N; i++) {
  operandValues[String.fromCharCode(65 + i)] = values[i]; // 알파벳 동적 생성
  //
}

// 자료구조 : 스택 사용
// N번째줄까지 차례로 식의 계산 결과(마지막 자료구조까지)를 출력하는 문제이기에,
// 스택을 선택했다.
const stack = [];

// ~ 후위표기식 계산 ~
// 조건에 따라 후위표기식의 알파벳을 스택에 삽입하고,
// 알파벳이 아닐 경우 상황에 따른 연산자 케이스 지정
for (const char of expression) {
  if (char >= "A" && char <= "Z") {
    stack.push(operandValues[char]);
  } else {
    const b = stack.pop();
    const a = stack.pop();
    let result;
    switch (char) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        result = a / b;
        break;
      default:
        throw new Error("올바르지 않은 접근입니다.");
    }
    // 반복문이 끝나면 result 배열에 저장
    stack.push(result);
  }
}
// 마지막 결과를 스택에서 추출
const finalResult = stack.pop();
console.log(finalResult.toFixed(2));

/* 
첫째줄 : 피연산자의 개수 (1 <= N <= 26)
둘째줄 : 후위표기식 (영대문자, A~ N개, 길이 <= 100)
셋째줄~ : 각 피연산자의 대응값 ( 값 <= 100 자연수)
앞에서부터 계산했을 때 -20억 <= 결과 , 20억 >= 대응값
계산 결과 소숫점 둘째 자리까지 출력
*/

// slice(begin, end) : begin, end 직전의 얕은 복사를 새로운 배열 객체로 반환
// map() : 배열 내 각 요소에 대해 주어진 함수 호출 결과를 모아 새로운 배열 반환
// toFixed() : 해당 소수점까지 고정하여 출력
