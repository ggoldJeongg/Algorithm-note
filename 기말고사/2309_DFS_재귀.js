// 문제 설명 : 아홉 난쟁이의 키가 주어졌을 때, 일곱 난쟁이를 찾기
// 핵심 개념 : DFS, 재귀

let fs = require("fs");
let dwarfs = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

function findSevenDwarfs(dwarfs) {
  let result = [];

  // DFS 함수 정의: start는 시작 인덱스, count는 선택한 난쟁이 수,
  // sum은 현재까지의 합, selected는 선택된 난쟁이 리스트
  function dfs(start, count, sum, selected) {
    // 7명의 난쟁이를 선택했을 때
    if (count === 7) {
      // 선택된 7명의 합이 100인 경우
      if (sum === 100) {
        // result에 현재 선택된 난쟁이 리스트를 저장
        result = selected.slice();
      }
      return;
    }

    // 시작 인덱스부터 아홉 난쟁이까지 반복
    for (let i = start; i < dwarfs.length; i++) {
      // 현재 난쟁이를 선택 리스트에 추가
      selected.push(dwarfs[i]);
      // 재귀 호출로 다음 난쟁이를 선택 (인덱스를 i+1로 이동, count+1, sum 갱신)
      dfs(i + 1, count + 1, sum + dwarfs[i], selected);
      // 선택 리스트에서 현재 난쟁이 제거 (백트래킹)
      selected.pop();
      // 이미 정답을 찾은 경우 더 이상 진행하지 않음
      if (result.length > 0) return;
    }
  }

  // DFS 함수 초기 호출
  dfs(0, 0, 0, []);
  return result;
}

// DFS를 통해 찾은 일곱 난쟁이 리스트를 result에 저장
const result = findSevenDwarfs(dwarfs);
// 오름차순으로 정렬
result.sort((a, b) => a - b);
// 정답 출력
console.log(result.join("\n"));

/* 풀이 전략
1. 아홉 난쟁이 중 두 명을 제외한 나머지 일곱 난쟁이의 합이 100인 경우 찾기 (여집합 느낌)
2. 일곱 난쟁이의 키 오름차순으로 정렬 (정렬 알고리즘)
3. 출력
*/

// 선택 알고리즘 : DFS 알고리즘
// 아홉 명의 난쟁이 중 일곱 명을 선택하는 모든 조합을 탐색
// 불필요한 경로를 빠르게 포기할 수 있음

// 선택 자료구조 : 배열
// 인덱스로 원소에 접근하는데 push/pop이 빠르다.

// 시간 복잡도 : O(2^N)
