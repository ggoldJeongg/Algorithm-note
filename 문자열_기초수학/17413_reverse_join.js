// 문제 설명 : 문자열의 단어 뒤집기
// 핵심 개념 : 태그 안쪽과 바깥쪽을 기준으로 반복문 + 조건문 작성. 세부적인 조건 정해서 문자열 뒤집기
let input = [];

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 한 줄 입력을 받아서 input 배열에 저장
readline.on("line", (line) => {
  input = line.split("");
});

// 입력이 끝나면 solution 함수 호출
readline.on("close", () => {
  solution(input);
  process.exit();
});

const solution = (inp) => {
  let str = []; // 단어를 임시로 저장할 배열
  let ans = ""; // 결과 문자열
  let temp = ""; // 현재 단어를 저장할 임시 변수
  let tag = ">"; // 태그 내부/외부를 구분하는 변수

  for (let a of inp) {
    if (a === "<") {
      // 태그 시작
      tag = "<";
      ans += temp.split("").reverse().join("") + a; // 태그 외부 단어 뒤집어 추가
      temp = "";
    } else if (a === ">") {
      // 태그 끝
      tag = ">";
      ans += temp + a; // 태그 내부 단어 그대로 추가
      temp = "";
    } else if (a === " ") {
      // 공백
      if (tag === "<") {
        // 태그 내부 공백
        ans += temp; // 단어 그대로 추가
      } else {
        // 태그 외부 공백
        ans += temp.split("").reverse().join(""); // 단어 뒤집어 추가
      }
      ans += " "; // 공백 추가
      temp = "";
    } else {
      temp += a; // 단어 이어붙이기
    }
  }
  ans += temp.split("").reverse().join(""); // 마지막 단어 처리
  console.log(ans); // 결과 출력
};
