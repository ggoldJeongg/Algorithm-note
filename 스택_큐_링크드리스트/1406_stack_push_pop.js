// 문제설명 : 명령어에 매칭되는 커서 위치 연산 후 최종 결과물 출력
// 핵심 개념 : 스택, push, pop

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const initialString = input[0]; // 조건 1. 첫째줄 : 초기 입력된 문자열
const M = Number(input[1]); // 조건 2. 둘째줄 : 입력할 명령어 갯수 M
const commands = input.slice(2, 2 + M); // 조건 3. M개의 줄에 걸쳐 입력할 명령어를 순서대로 2번째 인덱스~M 까지 길이의 문자열 슬라이싱

// 에디터 함수 생성
function editor(initialString, commands) {
    // 스택 생성 : 왼쪽, 오른쪽 커서의 문자열을 관리하기 위해 두개 생성
  let leftStack = initialString.split('');
  let rightStack = [];

  for (let command of commands) {
    // 커서 명령어 구현
    // 명령어가 L -> 첫 문자열의 길이가 0보다 클 경우 왼쪽스택에서 제거한 값을 오른쪽 스택에 추가한다.
    if (command[0] === 'L' && leftStack.length > 0) {
      rightStack.push(leftStack.pop());
      // 명령어가 D -> 오른쪽 스택이 0보다 클 경우 오른쪽 스택에서 제거한값을 왼쪽 스택에 추가한다.
    } else if (command[0] === 'D' && rightStack.length > 0) {
      leftStack.push(rightStack.pop());
      // 명령어가 B -> 커서 왼쪽의 문자를 삭제
    } else if (command[0] === 'B' && leftStack.length > 0) {
      leftStack.pop();
      // 명령어가 P -> 왼쪽 스택에 공백을 기준으로 문자를 추가한다.
    } else if (command[0] === 'P') {
      leftStack.push(command.split(' ')[1]);
    }
  }
// 오른쪽 스택을 뒤집은 값과 왼쪽 스택을 합친뒤, 공백 없이 나란히 정렬한다.
  return leftStack.concat(rightStack.reverse()).join('');
}

// 답안 출력
const result = editor(initialString, commands);
console.log(result);


// 선택 자료구조 : 스택. 이전값의 연산 + 최근값의 연산을 계속 시행한 뒤, 최종 연산된 값을 확인하여 출력하는 문제이기 때문에.

/* 문제 조건 요약
- 커서 : 문장 맨 앞, 맨 뒤, 중간 임의의 곳 / 길이 L인 문자열의 커서 위치는 L+1인 경우가 있음. (마지막 문자의 오른쪽이기 때문)
- 4가지 명령어.
1. 첫째줄 : 초기 입력된 문자열
2. 둘째줄 : 입력할 명령어 갯수 M (1<= M <= 500,000)
3. 셋째줄 : M개의 줄에 걸쳐 입력할 명령어를 순서대로
- 길이 : N
- 영어 소문자만 기록 가능. 최대 600,000글자
- 첫째줄에 모든 명령어 수행 후 편집기에 입력된 문자열 출력 */

// concat() : 하나의 배열을 다른 배열과 합친다. 원본 배열을 건드리지 않고 새로운 배열을 반환한다.