// 문제 설명 : 각 명령어에 따른 큐를 구현하고 조작하는 프로그램 작성
// 핵심 개념 : 큐의 기본 연산(push, pop, size, empty, front, back)을 효율적으로 처리하기

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]); // 첫째줄 : 명령어의 수
const commands = input.slice(1); // 둘째줄 부터 : 명령어 리스트

const queue = []; // 큐를 배열로 선언
let head = 0; // 큐의 시작 인덱스 (포인터)
const results = []; // 결과 저장 배열

for (let i = 0; i < N; i++) {
  const command = commands[i]; // 

  // push 명령어 처리 : 값을 추출해서 큐에 추가
  if (command.startsWith("push")) {
    const [, value] = command.split(" ");
    queue.push(Number(value));
    // pop : 큐가 비어있으면 -1 c출력,
  } else if (command === "pop") {
    if (head === queue.length) {
      results.push(-1);
      // 그렇지 않으면 큐의 첫 요소 출력 후 head 증가
    } else {
      results.push(queue[head]);
      head += 1;
    }
    // size : 큐의 현재 크기 출력
  } else if (command === "size") {
    results.push(queue.length - head);
    // empty : 큐가 비었는지 확인 후 1, 0 출력
      } else if (command === "empty") {
    results.push(head === queue.length ? 1 : 0);
    // fromt : 큐가 비어있으면 -1 출력,
  } else if (command === "front") {
    if (head === queue.length) {
      results.push(-1);
      // 그렇지 않으면 큐의 첫 요소 출력
    } else {
      results.push(queue[head]);
    }
    // back : 큐가 비어있으면 -1 출력,
  } else if (command === "back") {
    if (head === queue.length) {
      results.push(-1);
      // 그렇지 않으면 큐의 마지막 요소 출력
    } else {
      results.push(queue[queue.length - 1]);
    }
  }
}
// 결과 출력하기
console.log(results.join("\n"));

// 선택 자료구조 : 문제에서 직접적으로 큐를 구현하라고 했기때문에 큐를 사용함.
// First In, First Out의 특성을 가지고 있어 명령어 순서대로 처리하기 좋다.
// head 포인터를 사용하여 시작 위치를 추적한다. 그래서 효올적인 큐의 연산을 수행할 수 있다.
