// 문제 설명 : 문자열이 올바른 괄호 문자열인지 확인
// 핵심 개념 : 스택의 장점, push일때의 조건, pop 일때의 조건 찾기

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 테스트케이스의 수
const T = parseInt(input[0]);

// 괄호 문자열
for (let i = 1; i <= T; i++) {
  const ps = input[i]; // 1번째 인덱스부터 (첫째줄 이후부터의 문자열)
  console.log(isVPS(ps) ? "YES" : "NO"); //조건이 true이면 YES, false 이면 NO 실행 (삼항조건연산자)
}
// 올바른 괄호 문자열 확인
function isVPS(ps) {
  const stack = [];
  for (let i = 0; i < ps.length; i++) {
    const char = ps[i];
    if (char === "(") {
      stack.push(char); // 여는 괄호룰 스택에 추가
    } else if (char === ")") {
      if (stack.length === 0) {
        return false; // 스택이 비어있으면 짝이 맞지 않음
      }
      stack.pop(); // 짝이 맞는 여는 괄호를 스택에서 제거
    }
  }
  return stack.length === 0; // 모든 괄호가 짝이 맞으면 스택이 비어야 함 -> 스택이 비어있으면 YES, 그렇지않으면 NO인 조건.
}

// 선택 자료구조 : 스택. 값을 이뤄서 짝을 맞춰 사라지게 하는 괄호 문제로 알고리즘을 구성했기 때문에.

/* 조건 요약
- VPS(올바른 괄호문자열)는 () / 하나의 괄호 안에 넣은 괄호 (()) / 두 VPS를 결합한 새 문자열
- 입력된 괄호 문자열이 VPS인지 판단한 결과를 YES, NO로 출력
- T개의 테스트 케이스
- 첫째줄 : 입력 데이터 수 정수 T개
- 테스트 케이스의 첫째줄에 문자열이 한줄로 주어짐
*/