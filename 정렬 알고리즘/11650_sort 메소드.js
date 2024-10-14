// 문제 설명 : 2차원 평면 위의 N개의 점을 x좌표 오름차순 정렬, 같으면 y좌표 오름차순 정렬
// 핵심 개념 : 오름차순으로 정렬 알고리즘 구현

// fs 모듈을 사용하여 data를 문자열로 변환 후 줄바꿈 기준 분할
const fs = require("fs");
const data = fs.readFileSync().toString().split("\n");

const N = Number(data[0]); // 첫번째 줄을 변수 N에 담고 숫자 객체 생성
const dots = []; // 좌표를 담을 배열 생성
for (let i = 1; i <= N; i++) {
  const [x, y] = data[i].split(" ").map(Number); // 구조 분해 할당 : 다음의 i 반복문을 순회하며 공백 기준 숫자 객체로 배열 반환
  dots.push([x, y]);
}
/* 입력값 처리
- 줄바꿈과 공백 기준으로 입력된 data값을 
- 2차원 배열 형태로 좌표를 저장. 
예) const dots =[
    [1, 2],
    [3, 4],
    [5, 6] 
];
*/

// 정렬 비교 함수
function compare(a, b) {
  if (a[0] !== b[0])
    return a[0] - b[0]; // x좌표가 다르면 x좌표 기준으로 오름차순 정렬,
  else return a[1] - b[1]; // 같으면 y좌표 오름차순 정렬
}

dots.sort(compare);

let answer = "";
for (let point of dots) {
  answer += point[0] + " " + point[1] + "\n"; // 생성된 점들을 x좌표와 y좌표로 데이터 출력
}
/* for ...of 
- 배열이나 여러 데이터를 모아둔 객체에서 하나씩 "값"을 꺼내와 반복
- 인덱스나 키를 다루는 것이 아니라, 객체의 값을 직접 다룸
- Array, Map, Set, String 같은 반복 가능한 객체에 사용

vs. for ...in
- 객체의 모든 열거 가능한 "속성" 혹은 인덱스(key)에 대해 반복
*/

console.log(answer);

// 시간복잡도 : sort 정렬 사용으로 O(NlogN)
// 자료구조 : 배열
