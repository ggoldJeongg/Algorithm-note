// 문제 설명 : D 미만의 차이를 내는 P 가격의의 선물을 받을 때 최대 만족도의 합 구하기
// 핵심 개념 : 정렬, 투포인터

// N명의 선물, P(선물가격), V(만족도)

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

//입력값값
const [N, D] = input[0].split(" ").map(Number);
const gifts = input.slice(1).map(line => line.split(" ").map(Number));

// 선물 데이터를 가격(P)을 기준으로 정렬
gifts.sort((a, b) => a[0] - b[0]);

let maxHappiness = 0; // 최대 만족도를 저장할 변수
let currentHappiness = 0; // 현재 선택된 선물들로 얻은 만족도의 합
let left = 0; // 투포인터의 왼쪽 포인터 (범위의 시작 지점)

// 오른쪽 포인터(범위의 끝)를 이동하며 선물 데이터를 순회
for (let right = 0; right < N; right++) {
    currentHappiness += gifts[right][1]; // 현재 범위에 포함된 선물의 만족도 합산

    // 현재 범위에서 선물 가격 차이가 D 이상이면 조건 불만족 -> 범위 축소
    while (gifts[right][0] - gifts[left][0] >= D) { 
        // 오른쪽 포인터와 왼쪽 포인터가 가리키는 선물들의 가격 차이가 D 이상인 경우
        // 가장 왼쪽 선물의 만족도를 제외하고 범위 축소
        currentHappiness -= gifts[left][1]; // 왼쪽 포인터가 가리키는 선물의 만족도를 제거
        left++; // 왼쪽 포인터를 오른쪽으로 한 칸 이동하여 범위 시작점 조정
    }

    // 최대 만족도 갱신
    maxHappiness = Math.max(maxHappiness, currentHappiness);
}

console.log(maxHappiness);

// (정렬 알고리즘) 가격 P 기준으로 정렬하여 특정 가격 범위(D) 내의 선물을 빨리 찾을수 있게함.
// (투포인터 알고리즘) 정렬된 배열 안에서 P의 차이가 D 미만인 선물들만 고려해야함.
// ㄴ 정렬된 배열에서 시작점, 끝점을 사용해 원하는 조건을 만족하는 구간이나 값을 효율적으로 찾는 알고리즘