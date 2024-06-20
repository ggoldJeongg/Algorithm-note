// 문제 설명 : 특정 조건(문서의 수, 중요도)에 따른 프린트 인쇄 순서 찾기 (큐)
// 핵심 개념 : 큐, 문서의 수(N), 문서의 위치(M), 중요도(priorities) 세부 조건 구현

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const T = Number(input[0]); // 첫번째 줄 : 테스트 케이스의 수
let result = []; // 결과 저장 배열

let index = 1;
for (let t = 0; t < T; t++) {
  const [N, M] = input[index].split(" ").map(Number); // 문서의 수 N과 궁금한 문서의 위치 M
  const priorities = input[index + 1].split(" ").map(Number); // 문서들의 중요도 배열

  // 큐 생성: 각 문서의 중요도와 초기 위치를 함께 저장
  let queue = priorities.map((priority, idx) => ({ priority, idx }));
  let printOrder = 0;

  while (queue.length > 0) {
    let current = queue.shift(); // 큐의 첫 번째 문서 확인
    // 나머지 문서 중 현재 문서보다 중요도가 높은 문서가 있는지 확인
    if (queue.some(doc => doc.priority > current.priority)) {
      queue.push(current); // 중요도가 높은 문서가 있으면 현재 문서를 큐의 뒤로 보냄
    } else {
      printOrder += 1; // 그렇지 않으면 현재 문서를 인쇄
      if (current.idx === M) {
        result.push(printOrder); // 궁금한 문서의 인쇄 순서 저장
        break;
      }
    }
  }

  index += 2; // 다음 테스트 케이스로 이동
}

console.log(result.join("\n")); // 결과 출력


// 선택 자료구조 : 큐. 직접적으로 프린터는 FIFO 자료구조로 큐에 쌓여서 인쇄가 되는 원리라고 언급했다.

/* 조건 요약
- 첫줄에 테스트케이스의 수가 주어짐(T)
- 각 테스트케이스는 두줄로 이루어짐
- 첫째줄 : 문서의 개수 N (1 <= N <=100), 몇번째로 인쇄되는지 궁금한 문서가 몇번째 큐에 있는지 나타내는 정수 M (0 <= M < N)
- 두번째줄 : N개 문서의 중요도 (1 <= priorities <= 9) / 같은 문서가 여러개일 수 있음.
- 각 테스트케이스가 몇번째로 인쇄되는지 출력
*/