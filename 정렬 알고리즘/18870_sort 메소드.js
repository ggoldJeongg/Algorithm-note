// 문제 설명 : 수직선 위의 N개의 좌표에 좌표 압축 적용
// 핵심 개념 : sort 정렬, 좌표 압축

// fs 모듈을 사용해 입력값을 문자열로 변환 후 줄바꿈 기준으로 분할
let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// 첫 번째 줄의 N(좌표의 개수)을 숫자로 변환
let n = Number(input[0]);

// 두 번째 줄의 좌표를 배열로 저장
let arr = input[1].split(" ").map(Number);

// 중복된 좌표를 제거, Set 객체로부터 배열 생성
let uniqueArray = [...new Set(arr)];

// (1) 좌표를 오름차순으로 정렬
uniqueArray.sort((a, b) => a - b);

// Map 객체를 사용해 좌표 압축 결과 저장
let myMap = new Map();
for (let i = 0; i < uniqueArray.length; i++) {
  myMap.set(uniqueArray[i], i); // 고유 좌표값을 key, 압축된 인덱스를 value로 저장
}

// 좌표 압축된 결과를 문자열로 저장 후 출력
let answer = "";
for (x of arr) answer += myMap.get(x) + " "; // 기존 좌표를 압축된 인덱스로 변환하여 answer에 추가
console.log(answer.trim()); // 마지막 공백 제거 후 출력

/* 시간 복잡도 : sort 메소드 사용으로 O(NlogN);
   자료구조 : 배열, Set, Map */
