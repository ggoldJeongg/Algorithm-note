// 문제 설명 : n번째 피보나치 수룰 출력
// 핵심 개념 : 피보나치 수열 개념을 활용한 재귀 함수 작성

let fs = require("fs");
let data = fs.readFileSync("/dev/stdin").toString().split(" ");

let n = Number(data[0]);

function fibonacci(n) {
  //1. 기본 조건(base case): n이 0 또는 1일 때, 각각 0과 1을 반환
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2); //재귀 호출
  }
}

console.log(fibonacci(n));

/* 조건 요약
~ 입력 ~
- 첫째줄 : n (0 <= n < 20)

~ 출력 ~
- 첫째줄 : n번째 피보나치수

** 피보나치 수열
- 첫째항, 둘째항이 1이며(첫째항을 0으로 할 때도 있다.), 
  그 뒤의 모든 항은 바로 앞 두 항의 합인 수열이다.
- 예) 처음 일곱 항은 각각 0, 1, 1, 2, 3, 5, 8...이다.

** 재귀함수 적용
1. 기본 조건(base case): n이 0 또는 1일 때, 각각 0과 1을 반환
2. 재귀 호출: n이 2 이상일 때, Fn = Fn-1 + Fn-2 공식을 사용하여 
이전 두 피보나치 수를 구하고 그 합을 반환
*/
