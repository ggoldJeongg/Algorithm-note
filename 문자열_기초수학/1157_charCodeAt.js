// 문제 설명 : 주어진 문자열에서 가장 빈도수가 높은 알파벳을 출력
// 핵심 개념 : 아스키코드를 활용한 빈도수 비교
var fs = require("fs");
var input = fs.readFileSync("/dev/stdin").toString();

function mostFrequentAlphabet(word) {
  let frequency = new Array(26).fill(0); // 알파벳 개수 26개로 배열 길이 제한해 생성

  // 문자열 대문자로 변경 : 대소문자 구분이 없기 때문
  word = word.toUpperCase();

  // 각 문자를 순회하며
  for (let char of word) {
    // A~Z 사이의 문자를
    if (char >= "A" && char <= "Z") {
      let index = char.charCodeAt(0) - 65; //빈도수를 계산하여 A 유니코드(65) 기준으로 인덱스 계산
      frequency[index]++; // 배열에 저장
    }
  }

  // 최대 빈도수 확인 변수 초기화
  let maxFreq = 0;
  let maxChar = "?";
  let maxCount = 0;

  // 배열을 순회하면서 최대빈도수 찾기
  for (let i = 0; i < 26; i++) {
    if (frequency[i] > maxFreq) {
      maxFreq = frequency[i]; // 최대 빈도수
      maxChar = String.fromCharCode(i + 65); //유니코드 값을 문자로 반환
      maxCount = 1; // 최대 빈도수를 가진 문자가 있을 경우 1로 고정
    } else if (frequency[i] === maxFreq) {
      maxCount++; //최대 빈도수를 가진 문자가 여러개이면 카운트 증가
    }
  }
  // 만약 최대 빈도수를 가진 문자가 여러 개면 '?'로 출력
  if (maxCount > 1) {
    maxChar = "?";
  }
  // 결과 출력
  console.log(maxChar);
}
// 함수 호출
mostFrequentAlphabet(input);

// 자료구조 : 배열
// 시간복잡도 : O(N)
