// 문제 설명 : 주어진 두 수 A와 B에 대해 최대공약수(GCD)와 최소공배수(LCM) 구하기
// 핵심 개념 : 약수를 찾은 뒤 공통약수를 필터링, 최소공배수 계산 후 반환
var fs = require("fs");
var input = fs.readFileSync("/dev/stdin").toString().split(" ");

// 주어진 숫자의 모든 약수를 찾는 함수
function findDivisors(n) {
  let divisors = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      // n을 i로 나누었을 때 나머지가 0인 경우, i는 n의 약수
      divisors.push(i);
    }
  }
  return divisors; // 약수들의 배열을 반환
}

// 최대공약수를 찾는 함수
function greatestCommonDivisor(A, B) {
  let divisorsA = findDivisors(A); // A의 약수 배열
  let divisorsB = findDivisors(B); // B의 약수 배열

  // A와 B의 공통 약수를 필터링하여 배열에 저장
  let commonDivisors = divisorsA.filter((value) => divisorsB.includes(value));

  // 공통 약수 중 가장 큰 값을 반환
  return Math.max(...commonDivisors);
}

// 최소공배수를 찾는 함수
function leastCommonMultiple(A, B) {
  let gcd = greatestCommonDivisor(A, B); // 최대공약수를 구함
  return (A * B) / gcd; // 최소공배수를 계산하여 반환
}

// 최대공약수 출력
console.log(greatestCommonDivisor(A, B));
// 최소공배수 출력
console.log(leastCommonMultiple(A, B));
