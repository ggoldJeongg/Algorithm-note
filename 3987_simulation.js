// 문제 설명 : 탐사선이 시그널을 보내면 항성계 내부에 있는 시간이 최대가 되는 프로그램 작성
// 핵심 개념 : 시뮬레이션 알고리즘

//입력
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 탐사선 이동 방향 정의 : 2차원 행렬 매트릭스
const directions = ["U", "R", "D", "L"];
const dr = [-1, 0, 1, 0]; // 탐사선 행의 방향
const dc = [0, 1, 0, -1]; // 탐사선 열의 방향
const P = [1, 0, 3, 2]; // `/`에서의 방향 전환 : 오른쪽(1)으로 전환 (P 배열 참조)
const Q = [3, 2, 1, 0]; // `\`에서의 방향 전환 : 왼쪽(3)으로 전환 (Q 배열 참조)

const [N, M] = input[0].split(" ").map(Number); // 첫 행 정의 (항성계 사이즈)
const stellar = []; // 항성계 초기화

// 블랙홀로 둘러싸기 : 배열의 범위를 벗어나지 않도록
stellar.push(Array(M + 2).fill("C")); // 상단 블랙홀
for (let i = 1; i <= N; i++) {
  // C N개줄 입력 C
  stellar.push(["C", ...input[i].trim().split(""), "C"]);
}
stellar.push(Array(M + 2).fill("C")); // 하단 블랙홀

// 탐사선 초기 위치 pr, pc 정의
const [pr, pc] = input[N + 1].split(" ").map(Number);

function solve() {
  let maxTime = 0; // 시간 초기화
  let maxDir = 0; // 방향 초기화

  // 탐사선 초기 신호 방향(start direction) 0: 위 (U) 1: 오른쪽 (R) 2: 아래 (D) 3: 왼쪽 (L)
  for (let sd = 0; sd < 4; sd++) {
    let r = pr; // 현재 위치
    let c = pc; // 현재 위치
    let d = sd; // 현재 방향
    let time = 1; // 시그널 전파 시간

    while (true) {
      // 블랙홀 만났거나 항성계를 벗어나면 종료
      if (stellar[r + dr[d]][c + dc[d]] === "C") {
        break;
      }

      // 위치 갱신
      r += dr[d];
      c += dc[d];

      // 방향 전환
      if (stellar[r][c] === "/") {
        d = P[d];
      } else if (stellar[r][c] === "\\") {
        d = Q[d];
      }
      time++; // 전파 시간 증가

      // 시작 위치, 시작 방향과 현재 위치, 현재 방향이 같으면
      if (r === pr && c === pc && d === sd) {
        console.log(directions[sd]); // 시작 위치를 반환하면서
        console.log("Voyager"); // 시그널이 무한히 반복
        return; // 종료 조건
      }
    }

    // 최대 시간 갱신
    if (time > maxTime) {
      // 현재 방향에서 계산된 전파 시간이 maxTime보다 크면
      maxTime = time; // 최대 시간 갱신
      maxDir = sd; // 최대시간 기록한 방향도 갱신
    }
  }

  console.log(directions[maxDir]); // 최대 시간을 기록한 방향 출력
  console.log(maxTime); // 최대 시간 출력
}

solve(); //답안 출력

// N : 줄 (행)
// M : 문자 개수
// \ / : 행성
// C : 블랙홀
// . : 빈칸
// 탐사선 : PR, PC
// 방향 : U D R L
