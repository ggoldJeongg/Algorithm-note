// 문제 설명 : 재귀함수가 무엇인지 설명해줄 수 있는 프로그램 작성하기
// 핵심 개념 : 브루트포스, 재귀함수

let fs = require("fs");
let data = fs.readFileSync("/dev/stdin").toString().trim();

let N = Number(data);

// 1) 첫줄에 고정 출력되는 문구
console.log("어느 한 컴퓨터공학과 학생이 유명한 교수님을 찾아가 물었다.");

// 2) 재귀함수 : 들여쓰기, 반복횟수를 인자로 한다.
function chatBot(indent, n) {
  let indentation = "_".repeat(indent); // 들여쓰기 추가

  console.log(`${indentation}"재귀함수가 뭔가요?"`);

  // 3) 기본 조건 (종료 조건) : 마지막 질문에 대한 답변
  if (n === 0) {
    console.log(`${indentation}"재귀함수는 자기 자신을 호출하는 함수라네"`);
    console.log(`${indentation}라고 답변하였지.`);
    return;
  }
  // 4) 재귀적으로 반복 설명되는 부분
  console.log(
    `${indentation}"잘 들어보게. 옛날옛날 한 산 꼭대기에 이세상 모든 지식을 통달한 선인이 있었어.`
  );
  console.log(
    `${indentation}마을 사람들은 모두 그 선인에게 수많은 질문을 했고, 모두 지혜롭게 대답해 주었지.`
  );
  console.log(
    `${indentation}그의 답은 대부분 옳았다고 하네. 그런데 어느 날, 그 선인에게 한 선비가 찾아와서 물었어."`
  );

  chatBot(indent + 4, n - 1); // 5) 재귀 호출

  console.log(`${indentation}라고 답변하였지.`); // 재귀 호출 후 답변 출력
}

chatBot(0, N); //재귀 실행

// 시간복잡도 : 재귀호출의 횟수가 입력된 n의 영향을 받으므로, O(n)

/* 풀이 전략
1) 기본 출력 프로그램이 시작되면 고정된 문구를 출력한다.
2) 재귀 함수 정의 : 재귀 함수 정의시 들여쓰기와 반복 횟수를 인자로 받는다.
3) 기본 조건 (종료 조건) : 재귀 함수가 언제 멈출지 결정하는 부분.n이 0일 때 멈춘다.
  종료 조건에 도달하면 답변을 출력하고 재귀 종료 
4) 재귀적으로 반복되는 설명 : 종료 조건이 아닌 경우, 추가 설명을 출력하고 들여쓰기를 증가시켜서 재귀 호출
5) 재귀 함수 호출 : 초기 들여쓰기는 0으로 시작, 반복 횟수는 입력값 N
  */
