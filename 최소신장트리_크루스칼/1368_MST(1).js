// 문제 설명 : 모든 논에 물을 대는 데 필요한 최소 비용을 계산하는 문제이다.

// 핵심 개념 : MST(최소 신장 트리리),

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]); // 첫 번째 줄: 논의 개수 N
const eList = []; // 간선 정보를 저장할 리스트
const vRoot = Array.from({ length: N + 1 }, (_, i) => i); // Union-Find를 위한 부모 배열 초기화
const rank = Array(N + 1).fill(0); // Union-Find의 랭크 배열 초기화

// 간선 리스트 생성 - 우물을 파는 경우
for (let i = 1; i <= N; i++) {
  // 가상의 0번 노드와 각 논 i를 연결하는 간선 추가
  eList.push([0, i, Number(input[i])]);
}

// 간선 리스트 생성 - 논 사이의 연결 비용
for (let i = 0; i < N; i++) {
  const tmp = input[N + 1 + i].split(" ").map(Number); // 연결 비용 입력
  for (let j = i + 1; j < N; j++) {
    // i < j인 경우만 처리하여 중복 간선 제거
    eList.push([i + 1, j + 1, tmp[j]]);
  }
}

// 간선 리스트 정렬 - 비용 기준 오름차순
eList.sort((a, b) => a[2] - b[2]);

// Union-Find 함수 - 부모 찾기 (경로 압축)
const findParent = (x) => {
  if (x !== vRoot[x]) {
    vRoot[x] = findParent(vRoot[x]); // 경로 압축으로 부모 갱신
  }
  return vRoot[x];
};

// Union-Find 함수 - 두 집합 병합 (랭크 기반)
const union = (u, v) => {
  const uP = findParent(u); // u의 대표 노드
  const vP = findParent(v); // v의 대표 노드
  if (uP !== vP) {
    // 두 집합이 다르면 병합
    if (rank[uP] > rank[vP]) {
      // u의 랭크가 크면 v를 u에 병합
      vRoot[vP] = uP;
    } else if (rank[uP] < rank[vP]) {
      // v의 랭크가 크면 u를 v에 병합
      vRoot[uP] = vP;
    } else {
      // 랭크가 같으면 v를 u에 병합하고 u의 랭크 증가
      vRoot[vP] = uP;
      rank[uP] += 1;
    }
  }
};

let result = 0; // 최소 비용 합계를 저장할 변수

// 크루스칼 알고리즘 실행
eList.forEach(([u, v, w]) => {
  if (findParent(u) !== findParent(v)) {
    // u와 v가 다른 집합에 속해 있으면
    union(u, v); // 두 집합을 병합
    result += w; // 해당 간선의 비용을 결과에 추가
  }
});

console.log(result); // 최소 비용 출력

// 최소 신장 트리 :그래프의 모든 정점을 연결하면서, 간선의 가중치 합이 최소가 되는 트리
// 크루스칼 알고리즘 -> MST를 구하기 / Union-Find 자료구조를 사용으로 효율적인 집합 관리리
