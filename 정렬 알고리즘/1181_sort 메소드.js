// 문제 설명 : 알파벳 소문자로 이루어진 N개의 단어를 길이 -> 사전 순으로 정렬
// 핵심 개념 : 정렬 알고리즘, Set()

// fs 모듈을 사용해 문자열로 변환 후 줄바꿈 기준으로 분할
const fs = require("fs");
const data = fs.readFileSync("/dev/stdin").toString().split("\n");

// 첫번째줄 N(단어의 개수) 숫자로 변환
const N = Number(data[0]);
// 단어를 담을 배열 선언
let words = [];
for (let i = 1; i <= N; i++) {
  words.push(data[i]);
}

// set 객체로 중복 단어 제거
words = [...new Set(words)];
/* Set()
- 원시값이나 객체 참조 값 등 모든 유형의 고유 값 저장시 사용
*/

// 정렬 메소드 사용
words.sort((a, b) => {
  if (a.length != b.length)
    return a.length - b.length; // (1)길이가 짧은 순서로 정렬
  else {
    // (2)사전순 정렬
    if (a < b) return -1;
    else if (a > b) return 1;
    else return 0;
  }
});

for (let answer of words) {
  console.log(answer);
}

// 시간 복잡도 : sort 메소드 사용으로 O(NlogN);
// 자료구조 : 배열
