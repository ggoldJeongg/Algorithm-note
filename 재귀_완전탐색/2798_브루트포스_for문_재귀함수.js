// 문제 설명 : 블랙잭 게임 규칙에 따라 최대한 가까운 카드 3장의 합 출력
// 핵심 개념 : 브루트포스

// (1) 3중 for문으로 카드 3개 조합하기
let fs = require("fs");
let data = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = data[0].split(" ").map(Number); // 입력값 첫번째줄 공백 기준으로 숫자 추출
let N = input[0]; // 첫번째 숫자
let M = input[1]; // 두번째 숫자
let cardNumbers = data[1].split(" ").map(Number); // 입력값 두번째줄 공백 기준으로 숫자 추출

let cardSum = 0; // 카드 합 초기화

// 첫 번째 카드 선택을 위한 반복문
for (let i = 0; i < N - 2; i++) {
  // 두 번째 카드는 첫 번째 카드 다음부터 선택
  for (let j = i + 1; j < N - 1; j++) {
    // 세 번째 카드는 두 번째 카드 다음부터 선택
    for (let k = j + 1; k < N; k++) {
      // 현재 선택된 세 장의 카드의 합을 계산
      let currentSum = cardNumbers[i] + cardNumbers[j] + cardNumbers[k];
      // 합이 M보다 작거나 같고, 현재까지의 최대 합보다 큰 경우 업데이트
      if (currentSum <= M && currentSum > cardSum) {
        cardSum = currentSum;
      }
    }
  }
}

console.log(cardSum);

// (2) 재귀함수로 카드 3장 조합하기
// ~ input , N, M 입력 데이터 생략 ~

let closestSum = 0;

// 매개변수 : 현재 합, 시작 인덱스, 선택된 카드 수
function findBestSum(currentSum, start, count) {
  // 카드 수가 3개가 되면
  if (count === 3) {
    // 현재 합이 M보다 작거나 같고, 지금까지 찾은 값보다 큰 경우
    if (currentSum <= M && currentSum > closestSum) {
      // 가장 가까운 수를 갱신
      closestSum = currentSum;
    }
    return;
  }

  // 재귀 호출 : 시작 인덱스부터 N까지 반복
  for (let i = start; i < N; i++) {
    findBestSum(currentSum + cardNumbers[i], i + 1, count + 1);
  }
}

// 초기 호출 => 재귀 탐색
findBestSum(0, 0, 0);

console.log(closestSum);

/* 조건 요약
- 카드 합 > 21 내에서 카드 합을 가장 크게 만든다
- 카드 숫자는 양의 정수
- N장의 카드
- 딜러가 M 숫자를 크게 외침
- 플레이어가 제한시간 내 N장의 카드 중 3장 고름 (a, b, c)
- a + b + c는 M을 넘지 않으면서 최대한 가깝게 만든다.
- N장의 카드 / M을 넘지 않는 최대한 가까운 카드 3장의 합을 출력

~ 입력 ~
- 첫째줄 : 카드 개수 N, M
- 둘째줄 : 카드에 적힌 수 (cardNumbers)

~ 출력 ~
- 첫째줄에 M을 넘지 않는 최대한 가까운 카드 3장의 합을 출력하기
*/

/* 풀이 전략
1. 1, 2, 3번째 카드를 고르는 반복문을 통해 조합 생성
2. 각 조합의 합을 계산
3. 긹된 가장 큰 합을 계산 */

// 브루트포싱(완전탐색)
// 가능한 모든 경우를 전부 탐색하는 알고리즘
