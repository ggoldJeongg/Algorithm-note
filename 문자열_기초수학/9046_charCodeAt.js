//문제 설명 : 암호문 알파벳의 빈도수를 확인, 가장 빈도 높은 문자를 출력
//핵심 개념 : 아스키코드를 활용한 비교
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().split("\n");

// 테스트 케이스 수를 가져오기
const T = Number(input[0]);

for (let i = 1; i <= T; i++) {
  const sentence = input[i].split(" ").join(""); // 공백 제거
  const charCount = new Array(26).fill(0); // 각 문자의 빈도수를 저장할 배열 생성

  // 각 문자의 빈도수
  for (const char of sentence) {
    const index = char.charCodeAt(0) - "a".charCodeAt(0);
    charCount[index]++;
  }

  let maxCount = 0;
  let mostFrequentChar = "";
  let isTie = false;

  // 가장 빈번한 문자 찾기
  for (let j = 0; j < 26; j++) {
    if (charCount[j] > maxCount) {
      maxCount = charCount[j];
      mostFrequentChar = String.fromCharCode(j + "a".charCodeAt(0));
      isTie = false;
    } else if (charCount[j] === maxCount && charCount[j] !== 0) {
      isTie = true;
    }
  }

  if (isTie) {
    console.log("?");
  } else {
    console.log(mostFrequentChar);
  }
}

// 배열을 사용해서 각 알파벳의 빈도수를 저장하고 계산
