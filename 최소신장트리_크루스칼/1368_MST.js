// 문제 설명 : N개의 논에 물을 댈 때 직접 논에 우물을 팠을때 vs.다른 논에서 물을 끌어올때 최소비용
// 핵심 개념 : 최소신장트리 + 크루스칼

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]); //첫줄 입력
const eList = []; // 간선 리스트를 저장할 배열
const vRoot = Array.from({ length: N + 1 }, (_, i) => i); // 부모 배열 초기화

// 노드와 비용 입력
for (let i = 1; i <= N; i++) {
  eList.push([0, i, Number(input[i])]); // 가상의 0번 노드와 각 노드를 연결하는 비용 추가
}

// 연결 비용 입력
for (let i = 0; i < N; i++) {
  const tmp = input[N + 1 + i].split(" ").map(Number); // i번째 노드의 연결 비용 배열
  for (let j = 0; j < N; j++) {
    if (i !== j) {
      eList.push([i + 1, j + 1, tmp[j]]); // 간선 리스트에 (i, j)와 비용 추가
    }
  }
}

// 비용을 기준으로 정렬
eList.sort((a, b) => a[2] - b[2]); // 간선을 비용 오름차순으로 정렬

// 부모 찾기 함수
const findParent = (x) => {
  if (x !== vRoot[x]) {
    vRoot[x] = findParent(vRoot[x]); // 경로 압축으로 부모 갱신
  }
  return vRoot[x];
};

let result = 0; // 최소 스패닝 트리의 총 비용

// 크루스칼 알고리즘 수행
eList.forEach(([u, v, w]) => {
  const uP = findParent(u); // u의 부모를 찾음
  const vP = findParent(v); // v의 부모를 찾음

  if (uP !== vP) {
    // 두 노드가 서로 다른 집합에 속하면
    if (uP > vP) {
      vRoot[uP] = vP; // 작은 값을 부모로 설정
    } else {
      vRoot[vP] = uP;
    }
    result += w; // 간선의 비용을 결과에 추가
  }
});

console.log(result); // 최소 스패닝 트리의 총 비용 출력

// i번째 논에 우물을 팔때 드는 비용 Wi
// i번째, j번째 논 연결에 드는 비용 pi,pj
