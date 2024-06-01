// 문제설명 : 에라토스테네스의 체를 이용한 소수 판별 문제
// 핵심 개념 : 소수 판별 함수(에라토스테네스의 체)
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().split(" ");

const M = Number(input[0]);
const N = Number(input[1]);

/*자료구조 : 배열을 사용해 소수를 판별한다. 길이가 N + 1인 배열을 생성 후 모두 true로 채운다 
 → 모든 수를 소수로 가정 
 0, 1은 소수가 아니므로 false로 처리한다. 
 → 소수가 아닌 수는 false가 되어 걸러진다.*/
const prime = Array(N + 1).fill(true);
prime[0] = prime[1] = false;

/* 제곱근 범위까지의 배열을 순회
i의 배수이면서 / N보다 작거나 같은 / i값에 더해지는 인덱스 위치의 숫자는 false 처리되어 거른다. (소수가 아님)
*/
for (let i = 2; i <= Math.sqrt(N); i++) {
  if (prime[i]) {
    for (let j = i * i; j <= N; j += i) {
      prime[j] = false;
    }
  }
}

// M부터 N보다 작거나 같은 결과값을 results 배열에 새로 추가한다.
const results = [];

for (let i = M; i <= N; i++) {
  if (prime[i]) {
    results.push(i);
  }
}

// 걸러진 소수를 한줄에 하나씩 출력한다.
console.log(results.join("\n"));
