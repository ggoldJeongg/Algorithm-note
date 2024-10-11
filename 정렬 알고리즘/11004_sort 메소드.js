// 문제 설명 : N개의 수를 오름차순 정렬 후 K번째 있는 수 구하기
// 핵심 개념 : 입출력 형식 정의, 오름차순 정렬

const fs = require("fs");
const data = fs.readFileSync("/dev/stdin").toString().split("\n");

// 구조 분해 할당 : 배열이나 객체 값을 각 변수에 바로 할당
const [n, k] = data[0].split(" ").map(Number);
//두번째 줄 N개의 수를 공백 기준으로 분할 후 숫자로 변환
const A = data[1].split(" ").map(Number);

// 오름차순 정렬
function compare(a, b) {
  return a - b;
}

A.sort(compare);

// 배열의 인덱스가 0부터 시작하므로, k-1 인덱스로 탐색
console.log(A[k - 1]);

//시간복잡도 : sort 정렬을 사용하여 O(NlogN);
