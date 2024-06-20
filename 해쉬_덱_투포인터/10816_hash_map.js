const fs = require("fs");
const input = fs.readFilesync("/dev/stdin").toString().split("\n");

// 입력 처리
let N = Number(input[0]); // 상근이 카드 '개수'
let sanggeunCards = input[1].split(" ").map(Number); // 상근이 숫자카드 숫자
let M = Number(input[2]); // 구해야할 카드 개수
let queries = input[3].split(" ").map(Number); //몇개인지 구해야할 정수카드들

// 문제 처리
// 각 수가 적힌 카드 (key) : 상근이가 가진 카드 (value) 로 해시테이블을 구성
let cardCount = new Map();

for (let card of sanggeunCards) {
  if (cardCount.has(card)) {
    cardCount.set(card, cardCount.get(card) + 1);
  } else {
    cardCount.set(card, 1);
  }
}

let result = [];
for (let query of queries) {
  if (cardCount.has(query)) {
    result.push(cardCount.get(query));
  } else {
    result.push(0);
  }
}

//공백을 기준으로 답 출력
console.log(result.join(" "));

// 자료구조 해시(map) 선택 이유 : 검색이 많이 필요한 경우

/* 조건 요약
- 숫자카드 : 정수 하나 적힘. N개 있음.
- 정수 M개
- count : 숫자카드 상근이가 몇개 있는지 구하기

- 첫째줄 : 상근이가 가지고 있는 카드 개수 N
- 둘째줄 : 숫자카드에 적힌 정수 -10,000,000 <= M <= 10,000,000
- 출력 : 첫째줄에 입력으로 주어진 M개의 수 중, 
각 수가 적힌 숫자카드를 상근이가 "몇개" 가지고 있는지
공백으로 출력
- 해시테이블, 맵 사용
 */
