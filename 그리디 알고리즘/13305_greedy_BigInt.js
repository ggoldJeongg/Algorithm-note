// 문제 설명 : 제일 왼쪽 도시에서 제일 오른쪽 도시로 이동하는 최소 주유 비용을 계산
// 핵심 개념 : 각 도시의 주유소 가격 비교, 가장 저렴한 가격으로 최대한 많이 주유하며 이동하는 그리디 알고리즘

let fs = require("fs");
let data = fs.readFileSync("/dev/stdin").toString().split("\n");

let N = BigInt(data[0]); // 도시 개수
let roadDistance = data[1].split(" ").map(BigInt); // 도로 길이
let oilPrice = data[2].split(" ").map(BigInt); // 각 도시 주유소 가격 (기름 가격)

// 서브태스크 1 : 모든 주유소의 리터당 가격이 1원인 경우
let isAllPricesOne = oilPrice.every((price) => price === 1n);

let totalCost = 0n; //총 비용 저장

if (isAllPricesOne) {
  // 주유소 가격이 1원일 경우, 도로 길이의 합이 총 비용
  totalCost = roadDistance.reduce((acc, cur) => acc + cur, 0n);
} else {
  let minPrice = oilPrice[0]; // 가장 오니쪽 도시의 주유소 가격을 최소가격으로 초기화
  for (let i = 0n; i < N - 1n; i++) {
    // 현재 도시의 주유소 가격이 더 저렴하면 가격 업데이트
    if (oilPrice[i] < minPrice) {
      minPrice = oilPrice[i];
    }
    // 최소 가격으로 다음 도로 구간에 필요한 기름을 구입, 총 비용에 더하기
    totalCost += minPrice * roadDistance[i];
  }
}

console.log(totalCost.toString()); //BigInt를 문자열로 변환

// 그리디 알고리즘 사용
// 42점 서브태스크가 '원래의 제약 조건 이외에 아무 제약 조건이 없다' 이다.
// 매우 큰 숫자가 들어올 수 있으므로 Number 메소드 ->BigInt 메소드로 바꿔주었다.

/* 조건 요약
- N개의 도시, 자동차 왼쪽 -> 오른쪽 이동
- km : 도로 길이 단위 / 1km : 1L 기름 사용 / 도시마다 가격 다름 (원)
- 첫출발 : 주유소에서 기름 넣기 / 기름통 : 무제한

- 각 도시 주유소 기름 가격별로 / 각 도시 도로 길이 를 이동하는 최소 비용 계산

- 첫째줄 : 도시 개수인 정수 N
- 둘째줄 : 인접한 두 도시 연결하는 [도로 길이] N-1
- 셋째줄 : [리터당 가격] 순서대로 N개의 자연수 
*/
