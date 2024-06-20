let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);

let numbers = [];

for (let i = 1; i <= N; i++) {
  numbers.push[i];
}

while (numbers.length > 1) {
  numbers.shift();
  if (numbers.length > 1) {
    numbers.push(numbers.shift());
  }
}

console.log(numbers[0]);

// 덱을 사용하는 문제
/* 조건 요약
N장의 카드 (1~N까지의 번호. 내림차순 정렬)
카드가 한장 남을때 까지 '반복'
제일 위 카드를 바닥에 버린다. (head에 삽입된 값을 delete)
제일 위에 있는 카드를 제일 아래 카드 밑으로 옮긴다. (현재 head에 삽입된 값을 제일 마지막에 삽입)
마지막 숫자 하나가 남을때 까지 반복하고, 마지막 하나의 결과를 출력

N이 주어졌을 때 제일 마지막에 남는 카드 구하기.
 */

// 해결 포인트 : 단순 덱으로 구현 시 시간초과 발생. 이중연결리스트+덱으로 만들어서 풀기.
