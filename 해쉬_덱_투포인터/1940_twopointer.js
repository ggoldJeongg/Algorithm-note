// 문제 설명 : N개의 재료와 M이 주어졌을 때 만들 수 있는 갑옷 개수 구하기
// 핵심 개념 : 투포인터 알고리즘을 사용한 특정한 합을 가지는 연속 수열 찾기

let fs = require("fs");
let data = fs.readFileSync("/dev/stdin").toString().split("\n");

let N = Number(data[0]); // 재료의 개수
let M = Number(data[1]); // 갑옷을 만드는데 필요한 수
let numbers = data[2].split(" ").map(Number); // 고유 번호 배열

let count = 0; //완성된 갑옷의 수
let start = 0; // 스타트 포인터 설정
let end = N - 1; // 엔드 포인터 설정 : 배열 인덱스가 0부터 시작하므로 끝점의 최대값은 N-1

numbers.sort((a, b) => a - b); // 고유 번호 배열 오름차순 정렬

while (start < end) {
  let sum = numbers[start] + numbers[end]; // 첫점과 끝점을 더했을 때
  if (sum === M) {
    // 합이 M(필요한 개수)과 같으면
    count += 1; // 카운트 증가
    start += 1; // 스타트 포인터 이동
    end -= 1; // 엔드 포인터 이동
  } else if (sum < M) {
    // 합이 M보다 작으면
    start += 1; //스타트 포인터 증가
  } else {
    end -= 1; //합이 M보다 크면 엔드 포인터 감소
  }
} // 포인터가 교차할때까지 반복

console.log(count);

/* 조건 요약 
- 갑옷 재료 A, B 2가지
- 갑옷 만들기 : 고유번호 A + B = M (1 <= M <= 10,000,000)
- 처리 : 가진 A, B로 갑옷을 몇개나 만들수 있는지 궁금.
ㄴ N개의 재료 (1 <= N <= 15,000), M이 주어졌을 때 몇개를 만들 수 있는지?

- 첫째줄 : 재료의 개수 N
- 둘째줄 : 갑옷을 만드는데 필요한 수 M
- 셋째줄 : N개의 재료들이 공백 사이로 주어짐.
- 
*/
