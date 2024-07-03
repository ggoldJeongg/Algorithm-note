// 문제 설명 : -999부터 999 사이의 연립방정식 x,y 좌표 찾기
// 핵심 개념 : 브루트포싱을 통한 x,y값 찾기, for 반복문으로 완전 탐색

let fs = require("fs");
let data = fs.readFileSync("/dev/stdin").toString().split(" ");

// 구조 분해 할당 : data 배열의 값을 변수에 할당
let [a, b, c, d, e, f] = data.map(Number);

// 정수를 매개변수로 설정
function solveEquation(a, b, c, d, e, f) {
  // x값의 범위, 하나씩 증가
  for (let x = -999; x <= 999; x++) {
    // y값의 범위, 하나씩 증가
    for (let y = -999; y <= 999; y++) {
      // 방정식 조건 설정
      if (a * x + b * y === c && d * x + e * y === f) {
        console.log(x, y); // x, y 출력
        return;
      }
    }
  }
}

solveEquation(a, b, c, d, e, f);
