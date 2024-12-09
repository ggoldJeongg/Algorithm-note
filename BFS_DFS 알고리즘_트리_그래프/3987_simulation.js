// 문제 설명 : 탐사선이 시그널을 보내면 항성계 내부에 있는 시간이 최대가 되는 프로그램 작성
// 핵심 개념 : 시뮬레이션 알고리즘

//입력
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 방향 정의
const directions = ["U", "R", "D", "L"];
const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];
const P = [1, 0, 3, 2]; // `/`에서의 방향 전환
const Q = [3, 2, 1, 0]; // `\`에서의 방향 전환

const [N, M] = input[0].split(" ").map(Number);
const stellar = [];

// 블랙홀로 둘러싸기
stellar.push(Array(M + 2).fill("C")); // 상단 블랙홀
for (let i = 1; i <= N; i++) {
  stellar.push(["C", ...input[i].trim().split(""), "C"]);
}
stellar.push(Array(M + 2).fill("C")); // 하단 블랙홀

const [sr, sc] = input[N + 1].split(" ").map(Number);

function solve() {
  let maxTime = 0;
  let maxDir = 0;

  for (let sd = 0; sd < 4; sd++) {
    let r = sr;
    let c = sc;
    let d = sd;
    let time = 1;

    while (true) {
      // 블랙홀 만났거나 항성계를 벗어나면 종료
      if (stellar[r + dr[d]][c + dc[d]] === "C") {
        break;
      }

      // 이동
      r += dr[d];
      c += dc[d];

      // 방향 전환
      if (stellar[r][c] === "/") {
        d = P[d];
      } else if (stellar[r][c] === "\\") {
        d = Q[d];
      }
      time++;

      // 무한 루프 탐지
      if (r === sr && c === sc && d === sd) {
        console.log(directions[sd]);
        console.log("Voyager");
        return;
      }
    }

    // 최대 시간 갱신
    if (time > maxTime) {
      maxTime = time;
      maxDir = sd;
    }
  }

  console.log(directions[maxDir]);
  console.log(maxTime);
}

solve();


// N : 줄 (행)
// M : 문자 개수
// \ / : 행성
// C : 블랙홀
// . : 빈칸
// 탐사선 : PR, PC
// 방향 : U D R L
