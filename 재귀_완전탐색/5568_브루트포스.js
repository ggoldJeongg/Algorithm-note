// 문제 설명 : n장의 카드에 적힌 숫자가 주어질 때, k개를 선택해서 만들 수 있는 정수 개수 구하기
// 핵심 개념 : 브루트포스, 재귀함수

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = parseInt(input[0], 10);
// 첫 번째 줄에서 카드의 개수(n) 읽기
const k = parseInt(input[1], 10);
// 두 번째 줄에서 선택할 카드의 개수(k) 읽기
const numbers = input.slice(2, 2 + n).map(Number);
// 나머지 줄에서 각 카드에 적힌 숫자를 읽어 배열(numbers)에 저장

const uniqueNumbers = new Set();
// Set 객체 생성 : 중복 제거

function generatePermutations(currentString, used, depth) {
  // 순열 생성 재귀함수
  if (depth === k) {
    // k개의 숫자를 선택했다면, 현재 문자열을 Set에 추가
    uniqueNumbers.add(currentString);
    return;
  }

  for (let i = 0; i < numbers.length; i++) {
    if (!used[i]) {
      // 아직 사용하지 않은 숫자인 경우
      used[i] = true;
      // 현재 숫자를 사용했다고 표시
      generatePermutations(currentString + numbers[i], used, depth + 1);
      // 새로운 문자열과 함께 재귀 호출
      used[i] = false;
      // 호출이 끝난 후에는 다시 사용하지 않음으로 표시
    }
  }
}

generatePermutations("", Array(n).fill(false), 0);
// 초기 호출로 순열 생성. 빈 문자열, 사용 여부 배열, 깊이 0에서 시작

console.log(uniqueNumbers.size);
// 유일한 숫자 조합의 개수를 출력합니다.

/* 조건 요약
- n (4~10) : 카드 n장
- 1~99 사이의 정수가 적힘.
- k (2~4) : 2~4 범위의 카드 갯수 선택
*/
