// 문제 설명 : 최소 핀 개수와 이동 횟수 계산산
// 핵심 개념 : 브루트포스, 백트래킹

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 방향 배열 정의 (상, 우, 하, 좌)
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

// 맵 크기 정의 (5x9 고정)
const xx = 5,
  yy = 9;

let map, remainPin, move;

// 범위 확인 함수: 주어진 좌표가 맵 범위 안에 있는지 확인
function inRange(x, y) {
  return x >= 0 && x < xx && y >= 0 && y < yy;
}

// DFS 함수: 백트래킹을 통해 최소 핀 개수와 이동 횟수 계산
function dfs(x, y, remain, moveCnt) {
  // 현재 남은 핀 개수가 최소값보다 작거나 같으면 갱신
  if (remain <= remainPin) {
    remainPin = remain;
    move = moveCnt;
  }

  // 네 방향으로 이동 시도
  for (let d = 0; d < 4; d++) {
    const nx = x + dx[d];
    const ny = y + dy[d];

    // 이동 방향에 핀이 있는지 확인
    if (inRange(nx, ny) && map[nx][ny] === "o") {
      const nnx = nx + dx[d];
      const nny = ny + dy[d];

      // 핀을 뛰어넘을 수 있는지 확인
      if (inRange(nnx, nny) && map[nnx][nny] === ".") {
        // 상태 변경: 핀 제거 및 이동
        map[x][y] = map[nx][ny] = ".";
        map[nnx][nny] = "o";

        // 모든 핀에 대해 DFS 호출
        for (let i = 0; i < xx; i++) {
          for (let j = 0; j < yy; j++) {
            if (map[i][j] === "o") dfs(i, j, remain - 1, moveCnt + 1);
          }
        }

        // 상태 복구: 원래 상태로 되돌림
        map[x][y] = map[nx][ny] = "o";
        map[nnx][nny] = ".";
      }
    }
  }
}

// 입력 처리 및 실행
let input = [];
rl.on("line", (line) => {
  input.push(line.trim());
}).on("close", () => {
  // 테스트 케이스 개수 입력
  const T = parseInt(input[0], 10);
  let idx = 1;

  const results = [];
  for (let tc = 0; tc < T; tc++) {
    // 현재 테스트 케이스의 맵 초기화
    map = Array.from({ length: xx }, (_, i) => input[idx++].split(""));
    let pin = 0;

    // 초기 핀 개수 계산
    for (let i = 0; i < xx; i++) {
      for (let j = 0; j < yy; j++) {
        if (map[i][j] === "o") pin++;
      }
    }

    // 초기값 설정
    remainPin = pin;
    move = 0;

    // 모든 핀에 대해 DFS 호출
    for (let i = 0; i < xx; i++) {
      for (let j = 0; j < yy; j++) {
        if (map[i][j] === "o") dfs(i, j, pin, 0);
      }
    }

    idx++; // 빈 줄 건너뜀
    results.push(`${remainPin} ${move}`);
  }

  // 결과 출력
  console.log(results.join("\n"));
});
