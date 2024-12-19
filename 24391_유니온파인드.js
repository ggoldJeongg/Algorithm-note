// 문제 설명 : 강의코드와 동일한 건물에서 이동할 때 최소 횟수 구하기
// 핵심 개념 : 유니온 파인드

// 1번~N번 N개의 강의 수강
// 강의 코드와 동일한 건물에서 강의
// 시간표 순서대로 이동 횟수를 최소화
// 최소 몇번만 나오면 되는지 구하기기
// 맨처음 횟수 카운트 X
// 유니온 파인드 구현 -> 강의실 집합이 달라질때마다 +1

const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);

// 유니온-파인드 배열 초기화: 각 노드는 자기 자신을 부모로 가짐
const disjoint = Array.from({ length: N + 1 }, (_, i) => i);

// 유니온-파인드의 Find 함수: 루트 노드(최상위 부모)를 찾음
function Find(x, disjoint) {
    if (x !== disjoint[x]) { // x가 자기자신을 부모로 가지지 않으면 = 다른 집합에 속해있으면
        //x의 부모를 재귀호출하여 최상위 부모를 찾음 (종료조건)
        //찾은 루트 노드를 현재 노드 x의 부모로 갱신 (경로압축)
        disjoint[x] = Find(disjoint[x], disjoint);
    }
    return disjoint[x];
}

// 유니온-파인드의 Union 함수: 두 집합을 병합
function Union(a, b, disjoint) {
    // 두 노드의 루트를 찾음
    a = Find(a, disjoint);
    b = Find(b, disjoint);

    // 두 루트를 병합 (작은 값의 루트를 부모로 설정)
    if (a > b) {
        disjoint[a] = b;
    } else {
        disjoint[b] = a;
    }
}

// M개의 연결 정보를 처리하여 유니온-파인드 수행
for (let idx = 1; idx <= M; idx++) {
    const [i, j] = input[idx].split(' ').map(Number); // 연결된 두 건물
    Union(i, j, disjoint); // 두 건물을 같은 집합으로 병합
}

// 강의 시간표 입력
const timeTable = input[M + 1].split(' ').map(Number);

// 최소 이동 횟수 계산
let total = 0;

// 강의 시간표를 순회하며 이전 강의 건물과 현재 강의 건물의 루트를 비교
for (let i = 1; i < timeTable.length; i++) {
    if (Find(timeTable[i - 1], disjoint) !== Find(timeTable[i], disjoint)) {
        // 서로 다른 집합에 속하면 이동이 필요하므로 이동 횟수 증가
        total++;
    }
}

// 결과 출력
console.log(total);

