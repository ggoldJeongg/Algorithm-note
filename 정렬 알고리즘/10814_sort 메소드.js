// 문제 설명 : 나이와 이름을 입력받아 나이순으로 정렬하여 출력
// 핵심 개념 : sort 메소드, 배열에서의 정렬

// fs 모듈을 사용하여 입력값을 문자열로 변환 후 줄바꿈 기준으로 분할
const fs = require('fs');
const data = fs.readFileSync('/dev/stdin').toString().split('\n');

// 첫 번째 줄의 N(회원 수)을 숫자로 변환하여 저장
const N = Number(data[0]);

// 나이와 이름을 담을 배열 생성
const members = [];
for (let i = 1; i <= N; i++) {
  // 입력값을 공백 기준으로 분할하여 나이와 이름을 배열에 저장
  let age = Number(data[i].split(" ")[0]); // 나이를 숫자로 변환
  let name = data[i].split(" ")[1];        // 이름을 문자열로 저장
  members.push([age, name]); // 나이와 이름을 배열로 묶어 members 배열에 추가
}

// 나이(age) 기준으로 오름차순 정렬
members.sort((a, b) => a[0] - b[0]);

// 정렬된 결과를 출력할 문자열 생성
let answer = "";
for (let x of members) {
  answer += x[0] + " " + x[1] + "\n"; // 나이와 이름을 출력 형식에 맞춰 저장
}

// 최종 결과 출력
console.log(answer);

/* 시간복잡도 : sort 메소드 사용으로 O(NlogN);
   배열을 정렬할 때 일반적으로 NlogN의 시간 복잡도를 가짐.
   
   자료구조 : 배열
   - 데이터가 비교적 적고, 나이와 이름의 매핑이 간단한 경우 배열 사용이 적합.
*/