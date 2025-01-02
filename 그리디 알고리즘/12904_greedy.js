// 문제 설명 : 문자열 S를 T로 특정 규칙을 따라 변환할 수 있는지 판별하기
// 핵심 개념 : 문자열, 그리디 알고리즘

const fs = require("fs");

// 입력 처리
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const S = input[0]; // S 문자열
const T = input[1]; // T 문자열

function canTransform(S, T) {
  // T를 S로 변환하기 위해 역으로 진행
  let current = T;

  while (current.length > S.length) {
    // 문자열의 마지막 문자가 'A'인 경우, 마지막 'A'를 제거
    if (current[current.length - 1] === "A") {
      current = current.slice(0, -1);
    }
    // 문자열의 마지막 문자가 'B'인 경우, 'B'를 제거하고 뒤집기
    else if (current[current.length - 1] === "B") {
      current = current.slice(0, -1).split("").reverse().join("");
    }

    // 변환할 수 없으면 반복문 탈출
    if (current.length < S.length) {
      break;
    }
  }

  // 변환이 가능하면 1, 아니면 0 반환
  return current === S ? 1 : 0;
}

// 실행
console.log(canTransform(S, T));
