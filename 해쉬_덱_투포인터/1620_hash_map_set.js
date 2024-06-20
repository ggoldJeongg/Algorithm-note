// 문제 설명 :
// 핵심 개념 : 해쉬테이블 생성, 번호 : 이름 저장 및 조회
let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0].split(" ")[0]);
const M = Number(input[0].split(" ")[1]);

let pokemonNameToNumber = new Map();
let pokemonNumberToName = new Map();

for (let i = 1; i <= N; i++) {
  let pokemonName = input[i];
  pokemonNameToNumber.set(pokemonName, i);
  pokemonNumberToName.set(i, pokemonName);
}

let result = [];

for (let i = N + 1; i < N + 1 + M; i++) {
  let query = input[i];
  if (isNaN(query)) {
    result.push(pokemonNameToNumber.get(query));
  } else {
    result.push(pokemonNumberToName.get(Number(query)));
  }
}

console.log(result.join("\n"));

// 해시, 맵 사용하기 -> map(ES6), set(ES6), object

/* 조건 요약
- 첫째줄 : 도감 수록된 "포켓몬 개수" 100,000 >= N >=1 / 맞춰야하는 "문제 개수" 100,000 >= M >=1'
- 둘째줄 : N개의 줄~ 포켓몬 번호 1~N까지.
- 포켓몬 이름은 모두 영문, 첫글자만 대문자, 나머지는 소문자, 일부 포켓몬은 마지막만 대문자..ㅡㅡ;
- 2 <= nameLength <= 20
- 그 다음줄(?) ~ : M개의 줄에 맞춰야 하는 문제가 들어오는데,
ㄴ 알파벳으로만 들어오면 번호 출력 (반드시 도감에 있는 이름만 주어짐)
ㄴ 숫자로만 들어오면 해당 번호의 알파벳 출력 (N>=number>=1)
 */
