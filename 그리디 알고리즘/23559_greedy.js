// 문제 설명 : N일간 X원 이하를 사용해 고른 메뉴의 최대치 합 구하기
// 핵심 개념 : 그리디 알고리즘

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, initialX] = input[0].split(" ").map(Number);
let X = initialX;
let totalFlavor = 0;

// 초기값 계산: 모두 1000원 메뉴로 선택
let extraCosts = [];
for (let i = 1; i <= N; i++) {
  const [A, B] = input[i].split(" ").map(Number);
  totalFlavor += B; // 1000원 메뉴 기본 선택
  const diff = A - B;
  if (diff > 0) {
    extraCosts.push(diff); // 5000원 메뉴를 선택했을 때 이득 저장
  }
}

// 1000원 메뉴 가격 제외
X -= N * 1000;

// 이득 값을 내림차순으로 정렬
extraCosts.sort((a, b) => b - a);

// 예산 내에서 맛의 차이를 추가
for (const diff of extraCosts) {
  if (X < 4000) break;
  totalFlavor += diff; // 맛의 이득 추가
  X -= 4000; // 5000원 - 1000원의 비용 차이 감소
}

console.log(totalFlavor);

// A코너 : 5000 메뉴, B코너 : 1000원짜리 메뉴
// 남은 N일간 학식 두 메뉴중 1개 골라 먹기
// N일간 X원
// 5000원짜리맛A 1000원짜리맛B
// 고른 메뉴의 합 최대치