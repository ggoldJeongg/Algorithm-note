// 문제 설명 : K원을 만드는 데 필요한 동전 개수의 최솟값
// 핵심 개념 : 단순히 가장 큰 화폐 단위부터 거슬러준다. 가치가 큰 동전은 작은 동전들의 합으로 표현.

let fs = require("fs");
let data = fs.readFileSync("/dev/stdin").toString().split("\n");

let N = Number(data[0].split(" ")[0]); // N값 입력
let K = Number(data[0].split(" ")[1]); // K값 입력

let value = []; // 가치 배열 초기화

for (let i = 1; i <= N; i++) {
  // 전체 동전의 가치 입력
  value.push(Number(data[i]));
}

let count = 0;
// 동전의 가치를 내림차순으로 정리하여 가장 가치가 큰 동전부터 확인
for (let i = N - 1; i >= 0; i--) {
  count += parseInt(K / value[i]); // 몇개 사용해야 하는지
  K %= value[i]; // 해당 동전으로 거슬러준 뒤 남은 금액
}

console.log(count);

/* 조건 요약
- N종류의 동전, 매우 많이 갖고있다.
- 가치의 합 K
- 필요한 동전 개수의 최솟값을 구한다.
- 첫째줄 : N, K
- 둘째줄~ N개의 줄에 동전의 가치A가 오름차순으로 주어짐.
 */
